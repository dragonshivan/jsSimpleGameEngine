var REVERSI = REVERSI || {};

REVERSI.BOARD_SIZE = 8;

// 4X8 board positions bit mask, stored using x-first key 
// (x, y) position bit mask is stored at 8*y+x array position as decimal value of the bit mask 
// the bit values for (0, 0) position of each of the 4 storage areas (tokens/empties/uppper/lower) are stored in the 4 "center" positions of the empties
REVERSI.POSITION_MASK = function() {
	var arr = [];
	var binaryAllZero = "";
	for(var i = 0; i < 31; i++) {
		binaryAllZero += "0";
	}
	for(var x = 0; x < 8; x++) {
		arr[x] = [];
		for(var y = 0; y < 4; y++) {	
			if(x == 0 && y == 0) {
				arr[y][x] = null;
			} else {
				var binaryStr =  binaryAllZero.substr(0, 8 * y + x - 1) + "1";
				if(8 * y + x < 31) {
					binaryStr += binaryAllZero.substr(8 * y + x);
				}
				arr[x][y] = parseInt(binaryStr, 2);
			}
		}
	}
	return arr;
}();

/**
 * Reserved positions :
 * - used to store token type for locations (0, 0) of uppper and lower parts of the board (aka (0,0) and (0,  4) )
 * - kept inthe empty upper storage
 * - kept in the positions normally occupied by 2 of the central startin tokens (because those positions are never empty,
 * so there's no need to keep track of their empty status) 
 */
REVERSI.EMPTY_UPPER_RESERVERD_POSITION_MASK = {
		TOKEN_TYPE_UPPER_0_0: REVERSI.POSITION_MASK[3][3],
		TOKEN_TYPE_LOWER_0_0: REVERSI.POSITION_MASK[4][3]
};

/**
 * idem, but for storage of empty state of locations (0, 0) of uppper and lower parts of the board (aka (0,0) and (0,  4) )
 */
REVERSI.EMPTY_LOWER_RESERVERD_POSITION_MASK = {
		EMPTY_UPPER_0_0: REVERSI.POSITION_MASK[3][0],
		EMPTY_LOWER_0_0: REVERSI.POSITION_MASK[4][0]
};

/**
 * @public
 * @constructor
 * @returns {REVERSI.Position}
 */
REVERSI.Position = function(x, y) {
	this.x = x;
	this.y = y;
	this.mask = REVERSI.POSITION_MASK[x][y % 4];
	this.isLowerBoardHalf = (y >= 4);
	this.canBeEmpty = !((x == 3 || x == 4) && (y == 3 || y == 4));
};

/**
 * @public
 * @param {String} endLineSeparator
 * @returns {String}
 */
REVERSI.Position.prototype.toString = function(endLineSeparator) {
	if(arguments.length == 0) {
		endLineSeparator = "\n";
	}
	var head = "(" + this.x + ", " + this.y + ") Can be empty: " + this.canBeEmpty; 
	var str = "";
	if(this.mask == null) {
		str = (this.isLowerBoardHalf ? "lower" : "upper") + " Reserved position" ;
	} else {
		var maskStr = this.mask.toString(2);
	
		for(var i = 0; i < 32 - maskStr.length; i++) {
			str += "0";
			if((i + 1) % 8 == 0) {
				str += endLineSeparator;
			}
		}
		for(var i = 32 - maskStr.length; i < 32; i++) {
			str += maskStr.charAt(i - (32 - maskStr.length));
			if((i + 1) % 8 == 0) {
				str += endLineSeparator;
			}
		}
		
		var padding = "-PADDING" + endLineSeparator +
		"00000000" + endLineSeparator + 
		"00000000" + endLineSeparator + 
		"PADDING-";
		
		if(this.isLowerBoardHalf) {
			str = padding  + endLineSeparator + str;
		} else {
			str = str + padding + endLineSeparator;
		}
	}
	
	return head + endLineSeparator + str;
};

/**
 * @public
 * @type {REVERSI.Position[][]}
 */
REVERSI.POSITION = function() {
	var arr = [];
	for(var x = 0; x < 8; x++) {
		arr[x] = [];
		for(var y = 0; y < 8; y++) {
			arr[x][y] = new REVERSI.Position(x, y);
		}
	}
	return arr;
}();

/**
 * @public
 * @constructor
 * @param {MINIMAX.Player} player
 * @param {string} color
 * @returns {REVERSI.TokenType}
 */
REVERSI.TokenType = function(player, color) {
		this.player = player;
		this.color = color;
		this.opponentTokenType;
};

REVERSI.TOKEN_TYPE_WHITE = new REVERSI.TokenType(MINIMAX.PLAYER_2, "white");
REVERSI.TOKEN_TYPE_BLACK = new REVERSI.TokenType(MINIMAX.PLAYER_1, "black");
REVERSI.TOKEN_TYPE_EMPTY = new REVERSI.TokenType(undefined, "empty");

REVERSI.TOKEN_TYPE_WHITE.opponentTokenType = REVERSI.TOKEN_TYPE_BLACK;
REVERSI.TOKEN_TYPE_BLACK.opponentTokenType = REVERSI.TOKEN_TYPE_WHITE;

/**
 * @public
 * @constructor
 * returns {REVERSI.Vector}
 */
REVERSI.Vector = function(x, y) {
	this.x = x;
	this.y = y;
};

/**
 * @public
 * @type {REVERSI.Vector[]}
 */
REVERSI.VECTOR = [
    new REVERSI.Vector(-1, -1), //left-upper
    new REVERSI.Vector(0, -1), //upper
    new REVERSI.Vector(1, -1), //right-upper
    new REVERSI.Vector(1, 0), //right
    new REVERSI.Vector(1, 1), //right-lower
    new REVERSI.Vector(0, 1), //lower
    new REVERSI.Vector(-1, 1), //left-lower
    new REVERSI.Vector(-1, 0) //left
                  ];

REVERSI.REVERSI_GAME_STATE_HELPER;

REVERSI.DEBUG_HELPER;

REVERSI.EVALUATION_CRITERIA_DICTIONARY;

REVERSI.UI = REVERSI.UI || {};
REVERSI.UI.BOARD_SIZE = 700;
REVERSI.UI.CELL_SIZE = REVERSI.UI.BOARD_SIZE / 8;
REVERSI.UI.IMG_TOKEN_WHITE = function() {
	var imgWhiteToken = new Image();
	imgWhiteToken.src = "img/token_white.png";
	return imgWhiteToken;
}();
REVERSI.UI.IMG_TOKEN_BLACK = function() {
	var imgBlackToken = new Image();
	imgBlackToken.src = "img/token_black.png";
	return imgBlackToken;
}();
REVERSI.UI.IMG_BOARD = function() {
	var img = new Image();
	img.src = "img/board.gif";
	return img;
}();
REVERSI.UI.TOKEN_ROTATION_IMAGE_ATLAS = function() {
	var tokenImageAtlast = new Image();
	tokenImageAtlast.src = "img/token_rotation_slanted.png";
	return tokenImageAtlast;
}();
REVERSI.UI.IMG_CELL_HIGHLIGHT = function() {
	var tokenImageAtlast = new Image();
	tokenImageAtlast.src = "img/cell_highlight.png";
	return tokenImageAtlast;
}();
REVERSI.UI.IMG_POSSIBLE_MOVE = function() {
	var img = new Image();
	img.src = "img/possible_move.png";
	return img;
}();
REVERSI.UI.TOKEN_ROTATION_FRAME_CROPS_B2W = 
	[new GAME_LOOP.ImageCrop(0 * 109, 0, 0, 0, 109, 109, REVERSI.UI.CELL_SIZE - REVERSI.UI.CELL_SIZE / 8, REVERSI.UI.CELL_SIZE - REVERSI.UI.CELL_SIZE / 8),
     new GAME_LOOP.ImageCrop(1 * 109, 0, 0, 0, 109, 109, REVERSI.UI.CELL_SIZE - REVERSI.UI.CELL_SIZE / 8, REVERSI.UI.CELL_SIZE - REVERSI.UI.CELL_SIZE / 8),
     new GAME_LOOP.ImageCrop(2 * 109, 0, 0, 0, 109, 109, REVERSI.UI.CELL_SIZE - REVERSI.UI.CELL_SIZE / 8, REVERSI.UI.CELL_SIZE - REVERSI.UI.CELL_SIZE / 8),
     new GAME_LOOP.ImageCrop(3 * 109, 0, 0, 0, 109, 109, REVERSI.UI.CELL_SIZE - REVERSI.UI.CELL_SIZE / 8, REVERSI.UI.CELL_SIZE - REVERSI.UI.CELL_SIZE / 8),
     new GAME_LOOP.ImageCrop(4 * 109, 0, 0, 0, 109, 109, REVERSI.UI.CELL_SIZE - REVERSI.UI.CELL_SIZE / 8, REVERSI.UI.CELL_SIZE - REVERSI.UI.CELL_SIZE / 8),
     new GAME_LOOP.ImageCrop(5 * 109, 0, 0, 0, 109, 109, REVERSI.UI.CELL_SIZE - REVERSI.UI.CELL_SIZE / 8, REVERSI.UI.CELL_SIZE - REVERSI.UI.CELL_SIZE / 8),
     new GAME_LOOP.ImageCrop(6 * 109, 0, 0, 0, 109, 109, REVERSI.UI.CELL_SIZE - REVERSI.UI.CELL_SIZE / 8, REVERSI.UI.CELL_SIZE - REVERSI.UI.CELL_SIZE / 8)];
REVERSI.UI.TOKEN_ROTATION_FRAME_CROPS_W2B = 
	[new GAME_LOOP.ImageCrop(6 * 109, 0, 0, 0, 109, 109, REVERSI.UI.CELL_SIZE - REVERSI.UI.CELL_SIZE / 8, REVERSI.UI.CELL_SIZE - REVERSI.UI.CELL_SIZE / 8),
     new GAME_LOOP.ImageCrop(5 * 109, 0, 0, 0, 109, 109, REVERSI.UI.CELL_SIZE - REVERSI.UI.CELL_SIZE / 8, REVERSI.UI.CELL_SIZE - REVERSI.UI.CELL_SIZE / 8),
     new GAME_LOOP.ImageCrop(4 * 109, 0, 0, 0, 109, 109, REVERSI.UI.CELL_SIZE - REVERSI.UI.CELL_SIZE / 8, REVERSI.UI.CELL_SIZE - REVERSI.UI.CELL_SIZE / 8),
     new GAME_LOOP.ImageCrop(3 * 109, 0, 0, 0, 109, 109, REVERSI.UI.CELL_SIZE - REVERSI.UI.CELL_SIZE / 8, REVERSI.UI.CELL_SIZE - REVERSI.UI.CELL_SIZE / 8),
     new GAME_LOOP.ImageCrop(2 * 109, 0, 0, 0, 109, 109, REVERSI.UI.CELL_SIZE - REVERSI.UI.CELL_SIZE / 8, REVERSI.UI.CELL_SIZE - REVERSI.UI.CELL_SIZE / 8),
     new GAME_LOOP.ImageCrop(1 * 109, 0, 0, 0, 109, 109, REVERSI.UI.CELL_SIZE - REVERSI.UI.CELL_SIZE / 8, REVERSI.UI.CELL_SIZE - REVERSI.UI.CELL_SIZE / 8),
     new GAME_LOOP.ImageCrop(0 * 109, 0, 0, 0, 109, 109, REVERSI.UI.CELL_SIZE - REVERSI.UI.CELL_SIZE / 8, REVERSI.UI.CELL_SIZE - REVERSI.UI.CELL_SIZE / 8)];

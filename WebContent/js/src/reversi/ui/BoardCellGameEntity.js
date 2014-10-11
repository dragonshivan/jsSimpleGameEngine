var REVERSI = REVERSI = REVERSI || {};

/**
 * @public
 * @constructor
 * @param {Number} cellX
 * @param {Number} cellY
 * @param {REVERSI.TokenType} tokenType
 * @returns {REVERSI.BoardCellGameEntity}
 */
REVERSI.BoardCellGameEntity = function(cellX, cellY, tokenType) {
	GAME_LOOP.GameEntity.call(this, 
			cellX * REVERSI.UI.CELL_SIZE, 
			cellY * REVERSI.UI.CELL_SIZE, 
			REVERSI.UI.CELL_SIZE, 
			REVERSI.UI.CELL_SIZE);
	
	this.cellX = cellX;
	this.cellY = cellY;
	this.tokenType = tokenType;
	
	this.imgWhiteToken = new Image();
	this.imgWhiteToken.src = "img/token_white.png";
	this.imgBlackToken = new Image();
	this.imgBlackToken.src = "img/token_black.png";
	this.imgHighlight = new Image();
	this.imgHighlight.src = "img/cell_highlight.png";
	
	this.imgSize = REVERSI.UI.CELL_SIZE - REVERSI.UI.CELL_SIZE / 8;
	this.imgPadding = (REVERSI.UI.CELL_SIZE / 8) / 2;
	
	this.highlight = false;
	
	this.tokenAnimationB2W = new GAME_LOOP.AtlasAnimation(
			REVERSI.UI.TOKEN_ROTATION_IMAGE_ATLAS, 
			REVERSI.UI.TOKEN_ROTATION_FRAME_CROPS_B2W, 
			11,
			true);
	this.tokenAnimationW2B = new GAME_LOOP.AtlasAnimation(
			REVERSI.UI.TOKEN_ROTATION_IMAGE_ATLAS, 
			REVERSI.UI.TOKEN_ROTATION_FRAME_CROPS_W2B, 
			11,
			true);
};

REVERSI.BoardCellGameEntity.prototype = Object.create(GAME_LOOP.GameEntity.prototype);
REVERSI.BoardCellGameEntity.prototype.constructor = REVERSI.BoardCellGameEntity;

/**
 * @public
 */
REVERSI.BoardCellGameEntity.prototype.updateState =  function() {
	
};

/**
 * @public
 * @param {CanvasRenderingContext2D} context
 */
REVERSI.BoardCellGameEntity.prototype.updateGraphics =  function(context) {
	if(this.highlight) {
		context.drawImage(this.imgHighlight, this.x + 1, this.y + 1, this.width - 1, this.height - 1);
	}
	
	if(this.tokenType !== REVERSI.TOKEN_TYPE_EMPTY) {
		var img = this.imgWhiteToken;
		if(this.tokenType === REVERSI.TOKEN_TYPE_BLACK) {
			img = this.imgBlackToken;
		}
		context.drawImage(img, this.x + this.imgPadding, this.y + this.imgPadding, this.imgSize, this.imgSize);
	}
};
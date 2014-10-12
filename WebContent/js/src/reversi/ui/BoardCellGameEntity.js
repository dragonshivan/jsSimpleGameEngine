var REVERSI = REVERSI || {};

/**
 * @public
 * @constructor
 * @param {Number} cellX
 * @param {Number} cellY
 * @returns {REVERSI.BoardCellGameEntity}
 */
REVERSI.BoardCellGameEntity = function(cellX, cellY) {
	GAME_LOOP.GameEntity.call(this, 
			cellX * REVERSI.UI.CELL_SIZE, 
			cellY * REVERSI.UI.CELL_SIZE, 
			REVERSI.UI.CELL_SIZE, 
			REVERSI.UI.CELL_SIZE);
	
	this.cellX = cellX;
	this.cellY = cellY;
	if((cellX == 3 && cellY == 3) || (cellX == 4 && cellY == 4)) {
		this.tokenType = REVERSI.TOKEN_TYPE_WHITE;
	} else if((cellX == 3 && cellY == 4) || (cellX == 4 && cellY == 3)) {
		this.tokenType = REVERSI.TOKEN_TYPE_BLACK;
	} else {
		this.tokenType = REVERSI.TOKEN_TYPE_EMPTY;
	}
	
	this.imgWhiteToken = REVERSI.UI.IMG_TOKEN_WHITE;
	this.imgBlackToken = REVERSI.UI.IMG_TOKEN_BLACK;
	this.imgHighlight = REVERSI.UI.IMG_CELL_HIGHLIGHT;
	
	this.imgSize = REVERSI.UI.CELL_SIZE - REVERSI.UI.CELL_SIZE / 8;
	this.imgPadding = (REVERSI.UI.CELL_SIZE / 8) / 2;
	
	this.highlight = false;
	
	this.tokenAnimationB2W = new GAME_LOOP.AtlasAnimation(
			REVERSI.UI.TOKEN_ROTATION_IMAGE_ATLAS, 
			REVERSI.UI.TOKEN_ROTATION_FRAME_CROPS_B2W, 
			11);
	this.tokenAnimationW2B = new GAME_LOOP.AtlasAnimation(
			REVERSI.UI.TOKEN_ROTATION_IMAGE_ATLAS, 
			REVERSI.UI.TOKEN_ROTATION_FRAME_CROPS_W2B, 
			11);
	
	this.currentFlipAnimation;
	
	this.possibleMove = false;
};

REVERSI.BoardCellGameEntity.prototype = Object.create(GAME_LOOP.GameEntity.prototype);
REVERSI.BoardCellGameEntity.prototype.constructor = REVERSI.BoardCellGameEntity;

/**
 * @public
 */
REVERSI.BoardCellGameEntity.prototype.setToken =  function(tokenType) {
	this.tokenType = tokenType;
};

/**
 * @public
 */
REVERSI.BoardCellGameEntity.prototype.flip =  function() {
	this.tokenType = this.tokenType.opponentTokenType;
	this.currentFlipAnimation = this.tokenAnimationB2W;
	if(this.tokenType === REVERSI.TOKEN_TYPE_BLACK) {
		this.currentFlipAnimation = this.tokenAnimationW2B;
	}
	this.currentFlipAnimation.start();
};

/**
 * @public
 */
REVERSI.BoardCellGameEntity.prototype.isFlipping =  function() {
	if(this.currentFlipAnimation === undefined) {
		return false;
	}
	if(!this.currentFlipAnimation.isStarted()) {
		return false;
	}
	return !this.currentFlipAnimation.isFinished();
};

/**
 * @public
 */
REVERSI.BoardCellGameEntity.prototype.updateState =  function() {
	if(this.isFlipping()) {
		this.currentFlipAnimation.onGameStateUpdate();
	}
};

/**
 * @public
 * @param {CanvasRenderingContext2D} context
 */
REVERSI.BoardCellGameEntity.prototype.updateGraphics =  function(context) {
	if(this.highlight) {
		context.drawImage(this.imgHighlight, this.x + 1, this.y + 1, this.width - 1, this.height - 1);
	}
	
	if(this.possibleMove) {
		context.drawImage(REVERSI.UI.IMG_POSSIBLE_MOVE, 
				this.x + this.imgPadding, this.y + this.imgPadding, this.imgSize, this.imgSize);
	}
	
	if(this.isFlipping()) {
		this.currentFlipAnimation.onGraphicsUpdate(context, this.x + this.imgPadding, this.y + this.imgPadding);
	} else {
		if(this.tokenType !== REVERSI.TOKEN_TYPE_EMPTY) {
			var img = this.imgWhiteToken;
			if(this.tokenType === REVERSI.TOKEN_TYPE_BLACK) {
				img = this.imgBlackToken;
			}
			context.drawImage(img, this.x + this.imgPadding, this.y + this.imgPadding, this.imgSize, this.imgSize);
		}
	}
};
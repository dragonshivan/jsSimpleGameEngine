var REVERSI = REVERSI || {};

REVERSI.BoardGameEntity = function() {
	GAME_LOOP.GameEntity.call(this, 0, 0, REVERSI.UI.BOARD_SIZE, REVERSI.UI.BOARD_SIZE, -1);
	
	this.boardImg = REVERSI.UI.IMG_BOARD;
};

REVERSI.BoardGameEntity.prototype = Object.create(GAME_LOOP.GameEntity.prototype);
REVERSI.BoardGameEntity.prototype.constructor = REVERSI.BoardGameEntity;

/**
 * @public
 */
REVERSI.BoardGameEntity.prototype.updateState =  function() {};

/**
 * @public
 * @param {CanvasRenderingContext2D} context
 */
REVERSI.BoardGameEntity.prototype.updateGraphics =  function(context) {
	context.drawImage(this.boardImg, 0, 0, context.canvas.width, context.canvas.height);
};
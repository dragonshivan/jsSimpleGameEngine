var GAME_LOOP = GAME_LOOP = GAME_LOOP || {};

/**
 * @public
 * @constructor
 * @param {Number} startX
 * @param {Number} startY
 * @param {Number} width
 * @param {Number} height
 * @param {Number} [zIndex]
 * @returns {GAME_LOOP.GameEntity}
 */
GAME_LOOP.GameEntity = function(startX, startY, width, height, zIndex) {	
	this.x = startX;
	this.y = startY;
	this.width = width;
	this.height = height;
	this.zIndex = (zIndex === undefined ? 0 : zIndex);
};

/**
 * @public
 * @param {Object}inputEvent
 */
GAME_LOOP.GameEntity.prototype.processInput =  function(inputEvent) {};

/**
 * @public
 */
GAME_LOOP.GameEntity.prototype.updateState =  function() {};

/**
 * @public
 * @param {CanvasRenderingContext2D} context
 */
GAME_LOOP.GameEntity.prototype.updateGraphics =  function(context) {};
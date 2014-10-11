var GAME_LOOP = GAME_LOOP = GAME_LOOP || {};

/**
 * @public
 * @constructor
 * @param {Number} x
 * @param {Number} y
 * @param {Number} dx
 * @param {Number} dy
 * @param {Number} width
 * @param {Number} height
 * @param {Number} drawWidth
 * @param {Number} drawHeight
 * @returns {GAME_LOOP.ImageCrop}
 */
GAME_LOOP.ImageCrop = function(x, y, dx, dy, width, height, drawWidth, drawHeight) {
	//crop upper-left corner:
	this.x = x;
	this.y = y;
	
	//how much to shift this image from the game elements actual location when drawing it:
	this.dx = dx;
	this.dy = dy;
	
	//crop width (how much to the right from x) and height (how much down from y): 
	this.width = width;
	this.height = height;
		
	//how big should the image be drawn (keep proportional to with/height in order to not distort image):
	this.drawWidth = drawWidth;
	this.drawHeight = drawHeight;
};
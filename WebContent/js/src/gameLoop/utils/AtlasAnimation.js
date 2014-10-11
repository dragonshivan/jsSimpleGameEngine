var GAME_LOOP = GAME_LOOP = GAME_LOOP || {};
/**
 * @public
 * @constructor
 * @param {Image} atlasImg
 * @param {ImageCrop[]} animationFramesCrops
 * @param {Number} fps
 * @param {Boolean} [wrapAround]
 * @returns {GAME_LOOP.AtlasAnimation}
 */
GAME_LOOP.AtlasAnimation = function(atlasImg, animationFramesCrops, fps, wrapAround) {
	this.atlasImg = atlasImg;
	this.animationFramesCrops = animationFramesCrops;
	this.fps = fps;
	this.wrapAround = wrapAround === undefined ? false : wrapAround;
	
	this.started = false;
	this.finished = false;
	this.frameIdxIncrem = this.fps / GAME_LOOP.FIXED_UPDATES_IN_A_SECOND;
	this.frameIdx = -this.frameIdxIncrem;
};

/**
 * @public
 */
GAME_LOOP.AtlasAnimation.prototype.start = function() {
	this.started = true;
};

/**
 * @public
 * @returns {Boolean}
 */
GAME_LOOP.AtlasAnimation.prototype.isFinished = function() {
	return this.finished;
};

/**
 * @public
 * @returns {Boolean}
 */
GAME_LOOP.AtlasAnimation.prototype.isStarted = function() {
	return this.started;
};

/**
 * @public
 */
GAME_LOOP.AtlasAnimation.prototype.onGameStateUpdate = function() {
	if(!this.isStarted()) {
		return;
	}
	this.frameIdx += this.frameIdxIncrem; 
	if(this.getActualFrameIdx() >= this.animationFramesCrops.length) {
		if(!this.wrapAround) {
			this.finished = true;
			this.started = false;
		} else {
			this.frameIdx = 0;
		}
	}
};

/**
 * 
 * @param {Context2D} context
 * @param {Number} x
 * @param {Number} y
 */
GAME_LOOP.AtlasAnimation.prototype.onGraphicsUpdate = function(context, x, y) {
	if(this.isStarted() && !this.isFinished()) {
				
		var frameCrop = this.animationFramesCrops[this.getActualFrameIdx()];
		context.drawImage(this.atlasImg,
				frameCrop.x, frameCrop.y, frameCrop.width, frameCrop.height, 
				x + frameCrop.dx, y + frameCrop.dy, frameCrop.drawWidth, frameCrop.drawHeight);
	}
};

/**
 * @private
 * @returns {Number}
 */
GAME_LOOP.AtlasAnimation.prototype.getActualFrameIdx = function() {
	if(this.frameIdx < 0) {
		return 0;
	}
	return Math.floor(this.frameIdx);
};	
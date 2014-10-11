var GAME_LOOP = GAME_LOOP = GAME_LOOP || {};

/**
 * @public
 * @param {GAME_LOOP.GameEntity[]} gameEntities
 * @param {GAME_LOOP.Queue} inputEventQueue
 * @param {Number} canvasWidth
 * @param {Number} canvasHeight
 * @constructor
 */
GAME_LOOP.GameLoop = function(gameEntities, inputEventQueue, canvasWidth, canvasHeight) {
	
	window.requestAnimationFrame = 
			window.requestAnimationFrame || /* Firefox 23 / IE 10 / Chrome */
			window.mozRequestAnimationFrame || /* Firefox < 23 */
			window.webkitRequestAnimationFrame || /* Safari */
			window.msRequestAnimationFrame || /* IE  */
			window.oRequestAnimationFrame; /* Opera */
	
	if(!window.requestAnimationFrame) {
		throw "Failed to get requestAnimationFrame function";
	}
	
	this.canvas = document.getElementById(GAME_LOOP.CANVAS_ID);
	
	this.gameEntities = gameEntities;
	this.inputEventQueue = inputEventQueue;
	this.canvas.width=canvasWidth;
	this.canvas.height=canvasHeight;
	
	this.context = this.canvas.getContext('2d');
	
	this.lastLoopCallTime = 0;
	this.accumulatedTimeMs = 0;
};

/**
 * @public
 */
GAME_LOOP.GameLoop.prototype.start = function() {
	this.lastLoopCallTime = this.getCurrentTimeMs();
	this.update();
};

/**
 * @rivate
 */
GAME_LOOP.GameLoop.prototype.update = function() {
	var self = this;
	
	var actualLoopDurationMs = self.getCurrentTimeMs() - self.lastLoopCallTime;
	self.lastLoopCallTime = self.getCurrentTimeMs();
	self.accumulatedTimeMs += actualLoopDurationMs;
	while(self.accumulatedTimeMs >= GAME_LOOP.FIXED_STEP_IDEAL_DURATION_MS) {
		self.processInput();
		self.updateState();
		self.accumulatedTimeMs -= GAME_LOOP.FIXED_STEP_IDEAL_DURATION_MS;
	}
	
	self.updateGraphics();
	
	window.requestAnimationFrame(function() {self.update();});
};

/**
 * @rivate
 */
GAME_LOOP.GameLoop.prototype.processInput = function() {
	while(!this.inputEventQueue.isEmpty()) {
		var event = this.inputEventQueue.pop();
		for(var i = 0; i < this.gameEntities.length; i++) {
			this.gameEntities[i].processInput(event);
		}
	}
};

/**
 * @rivate
 */
GAME_LOOP.GameLoop.prototype.updateState = function() {		
	for(var i = 0; i < this.gameEntities.length; i++) {
		this.gameEntities[i].updateState();
	}	
};

/**
 * @rivate
 */
GAME_LOOP.GameLoop.prototype.updateGraphics = function() {
	this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
	
	this.gameEntities.sort(this.gameEntityZIndexSort);
	for(var i=0; i<this.gameEntities.length; i++) {
		this.gameEntities[i].updateGraphics(this.context);
	}
};	

/**
 * @private
 */
GAME_LOOP.GameLoop.prototype.getCurrentTimeMs = function() {
	return new Date().getTime();
};

/**
 * @private
 */
GAME_LOOP.GameLoop.prototype.gameEntityZIndexSort = function(gameEntity1, gameEntity2) {
	var val = gameEntity2.zIndex - gameEntity1.zIndex;;
	if(val == 0) {
		return gameEntity1.y - gameEntity2.y;
	}
};

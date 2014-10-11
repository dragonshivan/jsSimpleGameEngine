var GAME_LOOP = GAME_LOOP = GAME_LOOP || {};

/**
 * @constructor
 * @param {Number} capacity
 * @returns {GAME_LOOP.Queue}
 */
GAME_LOOP.Queue = function(capacity) {
	this.capacity = capacity;
	this.container = [];
	this.size = 0;
};

/**
 * @public
 * @param {Object} element
 */
GAME_LOOP.Queue.prototype.push = function(element) {
	if(this.size < this.capacity) {
		this.container.push(element);
		this.size++;
		return true;
	}
	return false;
};

/**
 * @public
 * @returns {Object}
 */
GAME_LOOP.Queue.prototype.pop = function() {
	if(this.size == 0) {
		return null;
	}
	var element = this.container.shift();
	this.size--;
	return element;
};

/**
 * @public
 * @returns {Boolean}
 */
GAME_LOOP.Queue.prototype.isEmpty = function() {
	return this.size == 0;
};

/**
 * @public
 * @returns {Boolean}
 */
GAME_LOOP.Queue.prototype.isFull = function() {
	return this.size == this.capacity;
};

/**
 * @constructor
 * @param {GAME_LOOP.Queue} inputEventQueue
 * @public
 */
GAME_LOOP.CanvasMouseListener = function(inputEventQueue) {
	this.canvas = $("#" + GAME_LOOP.CANVAS_ID);
	this.inputEventQueue = inputEventQueue;
	this.canvas.bind("mouseup mousedown mousemove mouseenter mouseleave", this.enqueueEvent.bind(this));
};

/**
 * @private
 * @param {Object} event
 */
GAME_LOOP.CanvasMouseListener.prototype.enqueueEvent = function(e) {
	var canvasX, canvasY;
	if(e.offsetX == undefined) {//firefox
	    canvasX = e.pageX - this.canvas.offset().left;
	    canvasY = e.pageY - this.canvas.offset().top;
	} else {//others
	    canvasX = e.offsetX;
	    canvasY = e.offsetY;
	}
	if(canvasX >= 0 && canvasY >= 0 && canvasX <= this.canvas.width() && canvasY <= this.canvas.height()) {
		e.canvasX = canvasX;
		e.canvasY = canvasY;
	}	
	this.inputEventQueue.push(e);
};
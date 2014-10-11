var GAME_LOOP = GAME_LOOP = GAME_LOOP || {};

/**
 * @public
 * @constructor
 * @param {GAME_LOOP.FSMState} startingState
 * @param {GAME_LOOP.FSMTransitionEvent[]} transitionEvents
 * @returns {GAME_LOOP.FiniteStateMachine}
 */
GAME_LOOP.FiniteStateMachine = function(startingState, transitionEvents) {
	this.currentState = startingState;
	this.transitionEvents = transitionEvents;
};

/**
 * @public
 */
GAME_LOOP.FiniteStateMachine.prototype.onGameStateUpdate =  function() {
	this.resolveCurrentState();
	this.currentState.onGameStateUpdate();
};

/**
 * @private
 */
GAME_LOOP.FiniteStateMachine.prototype.resolveCurrentState = function() {
	for(var i = 0; i < this.transitionEvents.length; i++) {
		var transitionEvent = this.transitionEvents[i];
		if(transitionEvent.currentState === this.currentState &&
				transitionEvent.isTransition()) {
			this.currentState = transitionEvent.nextState;
			break;
		} 
	}
};

/**
 * @public
 * @constructor
 * @returns {GAME_LOOP.FSMState}
 */
GAME_LOOP.FSMState = function() {};

/**
 * @public
 */
GAME_LOOP.FSMState.prototype.onGameStateUpdate = function() {
	throw "Not implemented";
};

/**
 * @public
 * @constructor
 * @param {GAME_LOOP.FSMState} currentState
 * @param {GAME_LOOP.FSMState} nextState
 * @returns {GAME_LOOP.FSMTransitionEvent}
 */
GAME_LOOP.FSMTransitionEvent = function(currentState, nextState) {
	this.currentState = currentState;
	this.nextState = nextState;
};

/**
 * @public
 * @returns {Boolean}
 */
GAME_LOOP.FSMTransitionEvent.prototype.isTransition = function() {
	throw "Not implemented";
};
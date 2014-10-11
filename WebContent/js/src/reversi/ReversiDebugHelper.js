var REVERSI = REVERSI || {};

/**
* @public
* @constructor
* @returns {REVERSI.ReversiDebugHelper}
*/
REVERSI.ReversiDebugHelper = function() {};

/**
* @public
* @param {Array} gameStates
* @returns {REVERSI.ReversiGameState}
*/
REVERSI.ReversiDebugHelper.prototype.findByLastMove = function(x, y, gameStates) {
	if(gameStates === undefined) {
		return undefined;
	}
	var foundGameState;
	for(var i = 0; i < gameStates.length; i++) {
		var gameState = gameStates[i];
		if(gameState.getLastMove().position.x == x &&
				gameState.getLastMove().position.y == y) {
			if(foundGameState !== undefined) {
				throw "Found a 2nd game state for " + x + " " + y;
			}
			foundGameState = gameState;
		}
	}
	return foundGameState;
};

/**
* @public
* @param {String} boardString
* @param {REVERSI.ReversiGameState[]} gameStates
* @returns {REVERSI.ReversiGameState}
*/
REVERSI.ReversiDebugHelper.prototype.findByBoardString = function(boardString, gameStates) {
	if(gameStates === undefined) {
		return undefined;
	}
	var foundGameState;
	for(var i = 0; i < gameStates.length; i++) {
		var gameState = gameStates[i];
		if(gameState.toStringBoardOnly() === boardString) {
			if(foundGameState !== undefined) {
				throw "Found a 2nd game state for: \n" + boardString;
			}
			foundGameState = gameState;
		}
	}
	return foundGameState;
};

/**
 * {REVERSI.ReversiDebugHelper}
 */
REVERSI.DEBUG_HELPER = new REVERSI.ReversiDebugHelper();
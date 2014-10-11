var MINIMAX = MINIMAX = MINIMAX || {};

/**
 * @public
 * @constructor
 * @param {MINIMAX.Player} playerToMove
 * @returns {MINIMAX.GameState}
 */
MINIMAX.GameState = function(playerToMove) {	
	this.playerToMove = playerToMove;
};

/**
 * @public
 * @param {MINIMAX.Player} player
 * @param {Object} action
 */
MINIMAX.GameState.prototype.applyPlayerMove = function(player, action) {
	throw "Not implemented";
};

/**
 * @public
 * @returns {Object}
 */
MINIMAX.GameState.prototype.getLastMove = function() {
	throw "Not implemented";
};

/**
 * @public
 * @param {MINIMAX.GameState} gameState
 * @returns {Boolean}
 */
MINIMAX.GameState.prototype.equals = function(gameState) {
	throw "Not implemented";
};

/**
 * @public
 * @returns {Number}
 */
MINIMAX.GameState.prototype.getHashcode = function() {
	throw "Not implemented";
};

/**
 * @public
 * @returns {Boolean}
 */
MINIMAX.GameState.prototype.isGameEnded = function() {
	throw "Not implemented";
};

/**
 * @public
 * @returns {MINIMAX.Player}
 */
MINIMAX.GameState.prototype.getPlayerToMove = function() {
	return this.playerToMove;
};
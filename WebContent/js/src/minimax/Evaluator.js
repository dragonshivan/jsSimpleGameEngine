var MINIMAX = MINIMAX = MINIMAX || {};

/**
 * @public
 * @param {MINIMAX.Player} playerToWin
 * @constructor
 * @returns {MINIMAX.Evaluator}
 */
MINIMAX.Evaluator = function(playerToWin) {
	this.playerToWin = playerToWin;
};

/**
 * @public
 * @param {MINIMAX.GameState} currentGameState
 * @returns {MINIMAX.GameState[]}
 */
MINIMAX.Evaluator.prototype.getNextGameStates = function(currentGameState) {
	throw "Not implemented";
};

/**
 * @public
 * @param {MINIMAX.GameState} gameState
 * @returns {Number}
 */
MINIMAX.Evaluator.prototype.evaluate = function(gameState) {
	throw "Not implemented";
};

/**
 * @public
 * @param {MINIMAX.GameState} gameState
 * @returns {Number}
 */
MINIMAX.Evaluator.prototype.getEvaluationHorizon = function(gameState) {
	throw "Not implemented";
};
var REVERSI = REVERSI || {};

/**
 * @public
 * @param {MINIMAX.Player} playerToWin
 * @constructor
 * @returns {REVERSI.ReversiEvaluator}
 */
REVERSI.ReversiEvaluator = function(playerToWin) {
	MINIMAX.Evaluator.call(this, playerToWin);
	this.evaluationCriteria = [];
	this.evaluationHorizon = 6;
};

REVERSI.ReversiEvaluator.prototype = Object.create(MINIMAX.Evaluator.prototype);
REVERSI.ReversiEvaluator.prototype.constructor = REVERSI.ReversiEvaluator;

/**
 * @public
 * @param {REVERSI.ReversiGameState} currentGameState
 * @returns {Array}
 */
REVERSI.ReversiEvaluator.prototype.getNextGameStates = function(currentGameState) {
	var nextGameStates = [];
	if(currentGameState.isGameEnded()) {
		return nextGameStates;
	}

	var possibleMoves = REVERSI.REVERSI_GAME_STATE_HELPER.getPossibleMoves(currentGameState.playerToMove, currentGameState);
	for(var i = 0; i < possibleMoves.length; i++) {
		var move = possibleMoves[i];
		var nextGameState = currentGameState.clone();
		nextGameState.move(move);
		nextGameStates.push(nextGameState);
	}
	return nextGameStates;
};

/**
 * @public
 * @param {REVERSI.ReversiEvaluationCriterion} evaluationCriterion
 * @returns {Array}
 */
REVERSI.ReversiEvaluator.prototype.addEvaluationCriterion = function(evaluationCriterion) {
	this.evaluationCriteria.push(evaluationCriterion);
};

/**
 * @public
 * @param {REVERSI.ReversiGameState} gameState
 * @returns {Number}
 */
REVERSI.ReversiEvaluator.prototype.evaluate = function(gameState) {
	var score = 0;
		
	if(gameState.isGameEnded()) {
		score = 
			REVERSI.EVALUATION_CRITERIA_DICTIONARY["TOKEN_COUNTER"].evaluationFunction(this.playerToWin, gameState);
		if(score >= 0) {
			score = score + MINIMAX.MINIMAX_WIN_SCORE;
		} else {
			score = score + MINIMAX.MINIMAX_LOSE_SCORE;
		}
	} else {
		for(var i = 0; i < this.evaluationCriteria.length; i++) {
			var evaluationCriterion = this.evaluationCriteria[i];
			score += evaluationCriterion.evaluationFunction(this.playerToWin, gameState);
		}
	}
	
	return score;
};

/**
 * @public
 * @param {REVERSI.ReversiGameState} gameState
 * @returns {Number}
 */
REVERSI.ReversiEvaluator.prototype.getEvaluationHorizon = function(gameState) {
	if(gameState.tokensCount < 33) {
		return this.evaluationHorizon;
	} else if(gameState.tokensCount < 44) {
		return this.evaluationHorizon + 1;
	} else if(gameState.tokensCount < 48) {
		return this.evaluationHorizon + 2;
	} else if(gameState.tokensCount < 53){
		return this.evaluationHorizon + 3;
	} else {
		return this.evaluationHorizon + 5;
	}
};
	
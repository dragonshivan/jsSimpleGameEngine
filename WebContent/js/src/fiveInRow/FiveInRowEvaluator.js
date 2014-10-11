/**
 * @public
 * @param {PLAYER} player
 * @constructor
 * @returns {FiveInRowEvaluator}
 */
function FiveInRowEvaluator(playerToWin) {
	this.playerToWin = playerToWin;
};

FiveInRowEvaluator.prototype = Object.create(MINIMAX.Evaluator.prototype);
FiveInRowEvaluator.prototype.constructor = FiveInRowEvaluator;

/**
 * @public
 * @param {FiveInRowGameState} currentGameState
 * @returns {Array}
 */
FiveInRowEvaluator.prototype.getNextGameStates = function(currentGameState) {
	//TODO
	return [];
};

/**
 * @public
 * @param {FiveInRowGameState} gameState
 * @returns {Number}
 */
FiveInRowEvaluator.prototype.evaluate = function(gameState) {
	
	var evaluationResultLines = this.evaluateGameLines(gameState);
	var evaluationResultColumns = this.evaluateGameColumns(gameState);
	var evaluationResultDiagonalsLeftRight = this.evaluateGameDiagonalsLeftRight(gameState);
	var evaluationResultDiagonalsRightLeft = this.evaluateGameDiagonalsRightLeft(gameState);
	
	var evaluationResultTotal = {
			X: {
				1:0,
				2:0,
				3:0,
				4:0,
				5:0
			},
			O: {
				1:0,
				2:0,
				3:0,
				4:0,
				5:0
			}
	};
	
	//TODO
	
	var score = this.calculateScore(evaluationResultTotal);
	
	return score;
};

/**
 * @private
 * @param {FiveInRowGameState} gameState
 * @returns evaluationResult
 */
FiveInRowEvaluator.prototype.evaluateGameLines = function(gameState) {
	var evaluationResult = {
			X: {
				1:0,
				2:0,
				3:0,
				4:0,
				5:0
			},
			O: {
				1:0,
				2:0,
				3:0,
				4:0,
				5:0
			}
	};
	
	//TODO
	
	return evaluationResult;
};

/**
 * @private
 * @param {FiveInRowGameState} gameState
 * @returns evaluationResult
 */
FiveInRowEvaluator.prototype.evaluateGameColumn = function(gameState) {
	var evaluationResult = {
			X: {
				1:0,
				2:0,
				3:0,
				4:0,
				5:0
			},
			O: {
				1:0,
				2:0,
				3:0,
				4:0,
				5:0
			}
	};
	
	//TODO
	
	return evaluationResult;
};

/**
 * @private
 * @param {FiveInRowGameState} gameState
 * @returns evaluationResult
 */
FiveInRowEvaluator.prototype.evaluateGameDiagonalsLeftRight = function(gameState) {
	var evaluationResult = {
			X: {
				1:0,
				2:0,
				3:0,
				4:0,
				5:0
			},
			O: {
				1:0,
				2:0,
				3:0,
				4:0,
				5:0
			}
	};
	
	//TODO
	
	return evaluationResult;
};

/**
 * @private
 * @param {FiveInRowGameState} gameState
 * @returns evaluationResult
 */
FiveInRowEvaluator.prototype.evaluateGameDiagonalsRightLeft = function(gameState) {
	var evaluationResult = {
			X: {
				1:0,
				2:0,
				3:0,
				4:0,
				5:0
			},
			O: {
				1:0,
				2:0,
				3:0,
				4:0,
				5:0
			}
	};
	
	//TODO
	
	return evaluationResult;
};

/**
 * @private
 * @param evaluationResult
 * @returns {Number}
 */
FiveInRowEvaluator.prototype.calculateScore = function(evaluationResultTotal) {
	//TODO
	return null;
};
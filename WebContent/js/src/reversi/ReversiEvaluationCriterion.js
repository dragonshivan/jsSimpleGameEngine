var REVERSI = REVERSI || {};

/**
 * @public
 * @constructor
 * @param {String} label
 * @param {function} evaluationFunction
 * @returns {REVERSI.ReversiEvaluator}
 */
REVERSI.ReversiEvaluationCriterion = function(label, evaluationFunction) {
	this.label = label;
	this.evaluationFunction = evaluationFunction;
};

REVERSI.EVALUATION_CRITERIA_DICTIONARY = function() {
	var arr = [];
	
	arr["RANDOM_SCORE"] = new  REVERSI.ReversiEvaluationCriterion("RANDOM_SCORE", function(playerToWin, gameState) {
		return Math.floor(Math.random() * (2 * 64)) - 64;
	});
	
	arr["TOKEN_COUNTER"] = new  REVERSI.ReversiEvaluationCriterion("TOKEN_COUNTER", function(playerToWin, gameState) {
		var tokensDifferenceToWhite = 0;
		for(var y = 0; y < 8; y++) {
			for(var x = 0; x < 8; x++) {
				if(gameState.getTokenType(x, y) === REVERSI.TOKEN_TYPE_WHITE) {
					tokensDifferenceToWhite++;
				} else if(gameState.getTokenType(x, y) === REVERSI.TOKEN_TYPE_BLACK) {
					tokensDifferenceToWhite--;
				}
			}
		}
		var score = tokensDifferenceToWhite;
		
		if(playerToWin === MINIMAX.PLAYER_1) {
			score = -score;
		}
		
		return score;
	});
	
	arr["EDGE_TOKEN_COUNTER"] = new  REVERSI.ReversiEvaluationCriterion("EDGE_TOKEN_COUNTER", function(playerToWin, gameState) {
		var tokensDifferenceToWhite = 0;
		for(var y = 0; y < 8; y++) {
			for(var x = 0; x < 8; x++) {
				if(x % 7 == 0 || y % 8==0) {
					if(gameState.getTokenType(x, y) === REVERSI.TOKEN_TYPE_WHITE) {
						tokensDifferenceToWhite++;
						if(x % 7 == 0 && y % 8==0) {
							tokensDifferenceToWhite = tokensDifferenceToWhite + 2;
						}
					} else if(gameState.getTokenType(x, y) === REVERSI.TOKEN_TYPE_BLACK) {
						tokensDifferenceToWhite--;
						if(x % 7 == 0 && y % 8==0) {
							tokensDifferenceToWhite = tokensDifferenceToWhite - 2;
						}
					}
				}
			}
		}
		var score = 3 * tokensDifferenceToWhite;
		
		if(playerToWin === MINIMAX.PLAYER_1) {
			score = -score;
		}
		
		return score;
	});
	
	arr["MOVE_COUNTER"] = new  REVERSI.ReversiEvaluationCriterion("MOVE_COUNTER", function(playerToWin, gameState) {
		var movesDifferenceToWhite = 
			REVERSI.REVERSI_GAME_STATE_HELPER.getPossibleMoves(MINIMAX.PLAYER_2, gameState).length -
				REVERSI.REVERSI_GAME_STATE_HELPER.getPossibleMoves(MINIMAX.PLAYER_1, gameState).length;
			
		var score = 2 * movesDifferenceToWhite;
		
		if(playerToWin === MINIMAX.PLAYER_1) {
			score = -score;
		}
		
		return score;
	});
	
	return arr;
}();
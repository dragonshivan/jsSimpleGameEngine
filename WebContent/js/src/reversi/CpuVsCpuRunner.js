var REVERSI = REVERSI || {};

/**
 * @public
 * @constructor
 * @param {REVERSI.ReversiEvaluationCriterion[]} whiteEvaluationCriteria
 * @param {REVERSI.ReversiEvaluationCriterion[]} whiteEvaluationHorizon
 * @param {Number} blackEvaluationCriteria
 * @param {Number} blackEvaluationHorizon
 * @returns {REVERSI.CpuVsCpuRuner}
 */
REVERSI.CpuVsCpuRuner = function(
		whiteEvaluationCriteria,
		whiteEvaluationHorizon,
		blackEvaluationCriteria,
		blackEvaluationHorizon) {
	
	this.evaluatorWhite = new REVERSI.ReversiEvaluator(MINIMAX.PLAYER_2);
	for(var i = 0; i < whiteEvaluationCriteria.length; i++) {
		this.evaluatorWhite.addEvaluationCriterion(whiteEvaluationCriteria[i]);
	}	
	this.evaluatorWhite.evaluationHorizon = whiteEvaluationHorizon;
	this.evaluatorBlack = new REVERSI.ReversiEvaluator(MINIMAX.PLAYER_1);
	for(var i = 0; i < blackEvaluationCriteria.length; i++) {
		this.evaluatorBlack.addEvaluationCriterion(blackEvaluationCriteria[i]);
	}
	this.evaluatorBlack.evaluationHorizon = blackEvaluationHorizon;
	
	this.startingGameState = new REVERSI.ReversiGameState(MINIMAX.PLAYER_1);
	
	this.gameArbiterBlack = new MINIMAX.GameArbiter(this.evaluatorBlack, this.startingGameState);
	this.gameArbiterWhite = new MINIMAX.GameArbiter(this.evaluatorWhite, this.startingGameState);
	
	this.gameArbitersPerPlayer = [];
	this.gameArbitersPerPlayer[1] = this.gameArbiterBlack;
	this.gameArbitersPerPlayer[2] = this.gameArbiterWhite;
	
};

/**
 * @public
 * @param debugToConsole
 */
REVERSI.CpuVsCpuRuner.prototype.run = function(debugToConsole) {
	var currentGameState = this.startingGameState;
	
	var lastTurnLeader = MINIMAX.PLAYER_2;
	while(!currentGameState.isGameEnded()) {
		currentGameState = this.turnLeaderMove(currentGameState);
		if(currentGameState.getLastMove().player === lastTurnLeader) {
			console.log("!! " + lastTurnLeader.toString() + " moved multiple times in a row !!");
		}
		lastTurnLeader = currentGameState.getLastMove().player;
		if(debugToConsole) {
			console.log(currentGameState.toString());
		}
		this.turnSlaveSynchronize(currentGameState);
	}
	
	var gameOutcome = this.gameArbiterWhite.getGameOutcome(currentGameState);
	var whiteEvaluationCriteriaLabels = [];
	for(var i = 0; i < this.evaluatorWhite.evaluationCriteria.length; i++) {
		whiteEvaluationCriteriaLabels.push(this.evaluatorWhite.evaluationCriteria[i].label);
	}
	var blackEvaluationCriteriaLabels = [];
	for(var i = 0; i < this.evaluatorBlack.evaluationCriteria.length; i++) {
		blackEvaluationCriteriaLabels.push(this.evaluatorBlack.evaluationCriteria[i].label);
	}
	
	return new REVERSI.CpuVsCpuRunerResult(
			gameOutcome, 
			whiteEvaluationCriteriaLabels, 
			this.evaluatorWhite.evaluationHorizon, 
			blackEvaluationCriteriaLabels, 
			this.evaluatorBlack.evaluationHorizon);	
	
};

/**
 * @private
 * @param {REVERSI.ReversiGameState} gameState
 * @returns {REVERSI.ReversiGameState}
 */
REVERSI.CpuVsCpuRuner.prototype.turnLeaderMove = function(gameState) {
	var leaderArbiter = this.gameArbitersPerPlayer[gameState.playerToMove.playerNumber];
	return leaderArbiter.advanceGame();
};

/**
 * @private
 * @param {REVERSI.ReversiGameState} gameState
 */
REVERSI.CpuVsCpuRuner.prototype.turnSlaveSynchronize = function(gameState) {
	var slaveArbiter = this.gameArbitersPerPlayer[gameState.getLastMove().player.opponent.playerNumber];
	slaveArbiter.advanceGame(gameState.getLastMove().position);
};

/**
 * @public
 * @constructor
 * @param {MINIMAX.GameOutcome} gameOutcome
 * @param {String[]} whiteEvaluationCriteriaLabels
 * @param {Number} whiteEvaluationHorizon
 * @param {String[]} blackEvaluationCriteriaLabels
 * @param {Number} blackEvaluationHorizon
 * @returns {REVERSI.CpuVsCpuRunerResult}
 */
REVERSI.CpuVsCpuRunerResult = function(
		gameOutcome,
		whiteEvaluationCriteriaLabels,
		whiteEvaluationHorizon,
		blackEvaluationCriteriaLabels,
		blackEvaluationHorizon) {
	
	this.gameOutcome = gameOutcome;
	this.whiteEvaluationCriteria = whiteEvaluationCriteriaLabels;
	this.whiteEvaluationHorizon = whiteEvaluationHorizon;
	this.blackEvaluationCriteria = blackEvaluationCriteriaLabels;
	this.blackEvaluationHorizon = blackEvaluationHorizon;
};

/**
 * @public
 * @returns {String}
 */
REVERSI.CpuVsCpuRunerResult.prototype.toString = function() {
	var str = "";
	str += "White's evaluators: " + this.whiteEvaluationCriteria + ", horizon=" + this.whiteEvaluationHorizon +"\n";
	str += "Black's evaluators: " + this.blackEvaluationCriteria + ", horizon=" + this.blackEvaluationHorizon +"\n";
	str += "Game outcome: " + this.gameOutcome.toString() +" \n"
	return str;
};
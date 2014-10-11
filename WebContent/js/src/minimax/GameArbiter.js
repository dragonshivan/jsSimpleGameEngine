var MINIMAX = MINIMAX = MINIMAX || {};

/**
 * @public
 * @constructor
 * @param {MINIMAX.Evaluator} evaluator
 * @param {MINIMAX.GameState} startingGameState
 * @returns {MINIMAX.GameArbiter}
 */
MINIMAX.GameArbiter = function(evaluator, startingGameState) {
	this.evaluator = evaluator;
	this.gameState = startingGameState;
	
	this.cpuPlayer = evaluator.playerToWin;
	this.humanPlayer = this.cpuPlayer.opponent;
	
	this.cpuMoveTimeLastMs = -1;
	
};

/**
 * @public
 * @param {Object} [action]
 * @returns {MINIMAX.GameState}
 */
MINIMAX.GameArbiter.prototype.advanceGame = function() {
	if(this.gameState.getPlayerToMove() === this.cpuPlayer) {
		var st = new Date().getTime();
		var gameTree = new MINIMAX.GameTree(this.evaluator);
		var rootNode = gameTree.grow(this.gameState);
		this.cpuMoveTimeLastMs = new Date().getTime() - st;
		console.log(rootNode.gameState.tokensCount + " tokens, " + this.evaluator.getEvaluationHorizon(rootNode.gameState) + " horizon, " + this.cpuMoveTimeLastMs + " Ms.");
		var nextNode = this.getMaxScoredChildNode(rootNode);
		this.gameState = nextNode.gameState;		
	} else {
		if(arguments.length == 0) {
			throw "Human player's turn but no action provided for game advancement";
		}
		var action = arguments[0];
		this.gameState.applyPlayerMove(this.humanPlayer, action);
	}
	return this.gameState;
};

/**
 * @public
 * @param {MINIMAX.GameState} gameState
 * @returns {MINIMAX.GameOutcome}
 */
MINIMAX.GameArbiter.prototype.getGameOutcome = function(gameState) {
	var score = this.evaluator.evaluate(gameState);
	if(score >= MINIMAX.MINIMAX_WIN_SCORE) {
		return MINIMAX.GAME_OUTCOME_WIN_PER_PLAYER[this.cpuPlayer.playerNumber];
	} else if(score <= MINIMAX.MINIMAX_LOSE_SCORE) {
		return MINIMAX.GAME_OUTCOME_WIN_PER_PLAYER[this.humanPlayer.playerNumber];
	} else if(gameTreeNode.gameState.isGameEnded()){
		return MINIMAX.GAME_OUTCOME_DRAW;
	} else {
		return MINIMAX.GAME_OUTCOME_NONE;
	}
};

/**
 * @public
 * @returns {MINIMAX.Player}
 */
MINIMAX.GameArbiter.prototype.getHumanPlayer = function() {
	return this.humanPlayer;
};

/**
 * @public
 * @returns {MINIMAX.Player}
 */
MINIMAX.GameArbiter.prototype.getCpuPlayer = function() {
	return this.cpuPlayer;
};

/**
 * @private
 * @param {MINIMAX.GameTreeNode} gameTreeNode
 * @returns {MINIMAX.GameOutcome}
 */
MINIMAX.GameArbiter.prototype.getMaxScoredChildNode = function(gameTreeNode) {
	var maxScore = Number.NEGATIVE_INFINITY;
	var maxScoreChildNode;
	for(var i = 0; i < gameTreeNode.childNodes.length; i++) {
		var childNode = gameTreeNode.childNodes[i];
		if(childNode.score > maxScore) {
			maxScore = childNode.score;
			maxScoreChildNode = childNode;
		}
	}
	return maxScoreChildNode;
};
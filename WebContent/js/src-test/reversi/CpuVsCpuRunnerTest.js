CpuVsCpuRunnerTestCase = TestCase("CpuVsCpuRunnerTestCase");

CpuVsCpuRunnerTestCase.prototype.testRun = function() {
	var evaluator = new REVERSI.ReversiEvaluator(MINIMAX.PLAYER_1);
	evaluator.addEvaluationCriterion(REVERSI.EVALUATION_CRITERIA_DICTIONARY["EDGE_TOKEN_COUNTER"], 
			REVERSI.EVALUATION_CRITERIA_DICTIONARY["MOVE_COUNTER"]);
	evaluator.evaluationHorizon = 3;
	
	var gameState = new REVERSI.ReversiGameState(MINIMAX.PLAYER_1);
	var gameArbiter = new MINIMAX.GameArbiter(evaluator, gameState);
	
	var gameState= gameArbiter.advanceGame();
	
	gameArbiter.advanceGame(new REVERSI.Position(2, 2));	
	gameState= gameArbiter.advanceGame();
	
	gameArbiter.advanceGame(new REVERSI.Position(2, 4));
	var gameState= gameArbiter.advanceGame();
	
	gameArbiter.advanceGame(new REVERSI.Position(4, 2));
	var gameState= gameArbiter.advanceGame();
	
	gameArbiter.advanceGame(new REVERSI.Position(2, 6));
	var gameState= gameArbiter.advanceGame();
};
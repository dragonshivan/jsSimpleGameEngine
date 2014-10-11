GameArbiterTestCase = TestCase("GameArbiterTestCase");

GameArbiterTestCase.prototype.testAdvanceGameMockedEvaluatorBlack = function() {
	var visualDebug = false;
	
	var evaluator = new REVERSI.ReversiEvaluator(MINIMAX.PLAYER_1);
	evaluator.addEvaluationCriterion(REVERSI.EVALUATION_CRITERIA_DICTIONARY["TOKEN_COUNTER"]);
	evaluator.evaluationHorizon = 3;
	var startingGameState = new REVERSI.ReversiGameState(MINIMAX.PLAYER_1);
	var gameArbiter = new MINIMAX.GameArbiter(evaluator, startingGameState);
	
	var gameState1 = gameArbiter.advanceGame();
	assertSame(MINIMAX.PLAYER_2, gameState1.playerToMove);
	assertFalse(gameState1.isGameEnded());	
	if(visualDebug) {
		console.log(gameState1.toString());
	}
	
	var gameState2 = gameArbiter.advanceGame(new REVERSI.Position(2, 4));	
	assertSame(MINIMAX.PLAYER_1, gameState2.playerToMove);
	assertFalse(gameState2.isGameEnded());	
	if(visualDebug) {
		console.log(gameState2.toString());
	}
	
	var gameState3 = gameArbiter.advanceGame();	
	assertSame(MINIMAX.PLAYER_2, gameState3.playerToMove);
	assertFalse(gameState3.isGameEnded());	
	if(visualDebug) {
		console.log(gameState3.toString());
	}
	
	var gameState4 = gameArbiter.advanceGame(new REVERSI.Position(4, 2));	
	assertSame(MINIMAX.PLAYER_1, gameState4.playerToMove);
	assertFalse(gameState4.isGameEnded());	
	if(visualDebug) {
		console.log(gameState4.toString());
	}
	
	var gameState5 = gameArbiter.advanceGame();	
	assertSame(MINIMAX.PLAYER_2, gameState5.playerToMove);
	assertFalse(gameState5.isGameEnded());	
	if(visualDebug) {
		console.log(gameState5.toString());
	}
};

GameArbiterTestCase.prototype.testAdvanceGameMockedEvaluatorWhite = function() {
	var visualDebug = false;
	
	var evaluator = new REVERSI.ReversiEvaluator(MINIMAX.PLAYER_2);
	evaluator.addEvaluationCriterion(REVERSI.EVALUATION_CRITERIA_DICTIONARY["TOKEN_COUNTER"]);
	var startingGameState = new REVERSI.ReversiGameState(MINIMAX.PLAYER_1);
	var gameArbiter = new MINIMAX.GameArbiter(evaluator, startingGameState);
	
	var gameState1 = gameArbiter.advanceGame(new REVERSI.Position(2, 3));
	assertSame(MINIMAX.PLAYER_2, gameState1.playerToMove);
	assertFalse(gameState1.isGameEnded());	
	if(visualDebug) {
		console.log(gameState1.toString());
	}
	
	var gameState2 = gameArbiter.advanceGame();
	assertSame(MINIMAX.PLAYER_1, gameState2.playerToMove);
	assertFalse(gameState2.isGameEnded());	
	if(visualDebug) {
		console.log(gameState2.toString());
	}
	
	var gameState3 = gameArbiter.advanceGame(new REVERSI.Position(5, 3));
	assertSame(MINIMAX.PLAYER_2, gameState3.playerToMove);
	assertFalse(gameState3.isGameEnded());	
	if(visualDebug) {
		console.log(gameState3.toString());
	}
	
	var gameState4 = gameArbiter.advanceGame();
	assertSame(MINIMAX.PLAYER_1, gameState4.playerToMove);
	assertFalse(gameState4.isGameEnded());	
	if(visualDebug) {
		console.log(gameState4.toString());
	}
};

GameArbiterTestCase.prototype.testAdvanceGamePlayerMovesTwice = function() {
	REVERSI.REVERSI_TEST_MOCKER.mockReversiGameStateMove();
	
	var gameState = new REVERSI.ReversiGameState(MINIMAX.PLAYER_1);
	
	gameState.move(new REVERSI.ReversiMove(REVERSI.TOKEN_TYPE_BLACK.player, 0, 0, [new REVERSI.Position(3, 3)]));
	gameState.move(new REVERSI.ReversiMove(REVERSI.TOKEN_TYPE_BLACK.player, 1, 0, [new REVERSI.Position(4, 4)]));
	gameState.move(new REVERSI.ReversiMove(REVERSI.TOKEN_TYPE_BLACK.player, 2, 0, []));
	gameState.move(new REVERSI.ReversiMove(REVERSI.TOKEN_TYPE_BLACK.player, 3, 0, []));
	gameState.move(new REVERSI.ReversiMove(REVERSI.TOKEN_TYPE_BLACK.player, 4, 0, []));
	gameState.move(new REVERSI.ReversiMove(REVERSI.TOKEN_TYPE_BLACK.player, 5, 0, []));
	gameState.move(new REVERSI.ReversiMove(REVERSI.TOKEN_TYPE_BLACK.player, 6, 0, []));
	gameState.move(new REVERSI.ReversiMove(REVERSI.TOKEN_TYPE_BLACK.player, 7, 0, []));
	
	gameState.move(new REVERSI.ReversiMove(REVERSI.TOKEN_TYPE_BLACK.player, 0, 1, []));
	gameState.move(new REVERSI.ReversiMove(REVERSI.TOKEN_TYPE_BLACK.player, 1, 1, []));
	gameState.move(new REVERSI.ReversiMove(REVERSI.TOKEN_TYPE_BLACK.player, 2, 1, []));
	gameState.move(new REVERSI.ReversiMove(REVERSI.TOKEN_TYPE_BLACK.player, 3, 1, []));
	gameState.move(new REVERSI.ReversiMove(REVERSI.TOKEN_TYPE_BLACK.player, 4, 1, []));
	gameState.move(new REVERSI.ReversiMove(REVERSI.TOKEN_TYPE_BLACK.player, 5, 1, []));
	gameState.move(new REVERSI.ReversiMove(REVERSI.TOKEN_TYPE_BLACK.player, 6, 1, []));
	gameState.move(new REVERSI.ReversiMove(REVERSI.TOKEN_TYPE_BLACK.player, 7, 1, []));
	
	gameState.move(new REVERSI.ReversiMove(REVERSI.TOKEN_TYPE_BLACK.player, 0, 2, []));
	gameState.move(new REVERSI.ReversiMove(REVERSI.TOKEN_TYPE_BLACK.player, 1, 2, []));
	gameState.move(new REVERSI.ReversiMove(REVERSI.TOKEN_TYPE_BLACK.player, 2, 2, []));
	gameState.move(new REVERSI.ReversiMove(REVERSI.TOKEN_TYPE_BLACK.player, 3, 2, []));
	gameState.move(new REVERSI.ReversiMove(REVERSI.TOKEN_TYPE_BLACK.player, 4, 2, []));
	gameState.move(new REVERSI.ReversiMove(REVERSI.TOKEN_TYPE_BLACK.player, 5, 2, []));
	gameState.move(new REVERSI.ReversiMove(REVERSI.TOKEN_TYPE_BLACK.player, 6, 2, []));
	gameState.move(new REVERSI.ReversiMove(REVERSI.TOKEN_TYPE_BLACK.player, 7, 2, []));

	gameState.move(new REVERSI.ReversiMove(REVERSI.TOKEN_TYPE_BLACK.player, 0, 3, []));
	gameState.move(new REVERSI.ReversiMove(REVERSI.TOKEN_TYPE_BLACK.player, 1, 3, []));
	gameState.move(new REVERSI.ReversiMove(REVERSI.TOKEN_TYPE_BLACK.player, 2, 3, []));
	gameState.move(new REVERSI.ReversiMove(REVERSI.TOKEN_TYPE_BLACK.player, 5, 3, []));
	gameState.move(new REVERSI.ReversiMove(REVERSI.TOKEN_TYPE_BLACK.player, 6, 3, []));
	gameState.move(new REVERSI.ReversiMove(REVERSI.TOKEN_TYPE_BLACK.player, 7, 3, []));
	
	gameState.move(new REVERSI.ReversiMove(REVERSI.TOKEN_TYPE_BLACK.player, 0, 4, []));
	gameState.move(new REVERSI.ReversiMove(REVERSI.TOKEN_TYPE_BLACK.player, 1, 4, []));
	gameState.move(new REVERSI.ReversiMove(REVERSI.TOKEN_TYPE_BLACK.player, 2, 4, []));
	gameState.move(new REVERSI.ReversiMove(REVERSI.TOKEN_TYPE_BLACK.player, 5, 4, []));
	gameState.move(new REVERSI.ReversiMove(REVERSI.TOKEN_TYPE_BLACK.player, 6, 4, []));
	gameState.move(new REVERSI.ReversiMove(REVERSI.TOKEN_TYPE_BLACK.player, 7, 4, []));
	
	gameState.move(new REVERSI.ReversiMove(REVERSI.TOKEN_TYPE_BLACK.player, 0, 5, []));
	gameState.move(new REVERSI.ReversiMove(REVERSI.TOKEN_TYPE_BLACK.player, 1, 5, []));
	gameState.move(new REVERSI.ReversiMove(REVERSI.TOKEN_TYPE_BLACK.player, 2, 5, []));
	gameState.move(new REVERSI.ReversiMove(REVERSI.TOKEN_TYPE_BLACK.player, 3, 5, []));
//	gameState.move(new REVERSI.ReversiMove(REVERSI.TOKEN_TYPE_BLACK.player, 4, 5, []));
//	gameState.move(new REVERSI.ReversiMove(REVERSI.TOKEN_TYPE_BLACK.player, 5, 5, []));
//	gameState.move(new REVERSI.ReversiMove(REVERSI.TOKEN_TYPE_BLACK.player, 6, 5, []));
	gameState.move(new REVERSI.ReversiMove(REVERSI.TOKEN_TYPE_BLACK.player, 7, 5, []));
	
	gameState.move(new REVERSI.ReversiMove(REVERSI.TOKEN_TYPE_BLACK.player, 0, 6, []));
	gameState.move(new REVERSI.ReversiMove(REVERSI.TOKEN_TYPE_BLACK.player, 1, 6, []));
	gameState.move(new REVERSI.ReversiMove(REVERSI.TOKEN_TYPE_BLACK.player, 2, 6, []));
	gameState.move(new REVERSI.ReversiMove(REVERSI.TOKEN_TYPE_BLACK.player, 3, 6, []));
//	gameState.move(new REVERSI.ReversiMove(REVERSI.TOKEN_TYPE_BLACK.player, 4, 6, []));
//	gameState.move(new REVERSI.ReversiMove(REVERSI.TOKEN_TYPE_BLACK.player, 5, 6, []));
	gameState.move(new REVERSI.ReversiMove(REVERSI.TOKEN_TYPE_BLACK.player, 6, 6, []));
	gameState.move(new REVERSI.ReversiMove(REVERSI.TOKEN_TYPE_WHITE.player, 7, 6, []));
	
	gameState.move(new REVERSI.ReversiMove(REVERSI.TOKEN_TYPE_BLACK.player, 0, 7, []));
	gameState.move(new REVERSI.ReversiMove(REVERSI.TOKEN_TYPE_BLACK.player, 1, 7, []));
	gameState.move(new REVERSI.ReversiMove(REVERSI.TOKEN_TYPE_BLACK.player, 2, 7, []));
	gameState.move(new REVERSI.ReversiMove(REVERSI.TOKEN_TYPE_BLACK.player, 3, 7, []));
//	gameState.move(new REVERSI.ReversiMove(REVERSI.TOKEN_TYPE_BLACK.player, 4, 7, []));
//	gameState.move(new REVERSI.ReversiMove(REVERSI.TOKEN_TYPE_BLACK.player, 5, 7, []));
//	gameState.move(new REVERSI.ReversiMove(REVERSI.TOKEN_TYPE_BLACK.player, 6, 7, []));
	gameState.move(new REVERSI.ReversiMove(REVERSI.TOKEN_TYPE_BLACK.player, 7, 7, []));
	
	REVERSI.REVERSI_TEST_MOCKER.unmockReversiGameStateMove();
	
	gameState.playerToMove = MINIMAX.PLAYER_2;
	
	var evaluator = new REVERSI.ReversiEvaluator(MINIMAX.PLAYER_1, []);
	evaluator.addEvaluationCriterion(REVERSI.EVALUATION_CRITERIA_DICTIONARY["TOKEN_COUNTER"]);
	evaluator.evaluationHorizon = 2;
	
	var gameArbiter = new MINIMAX.GameArbiter(evaluator, gameState);
	
	var gameState1 = gameArbiter.advanceGame(new REVERSI.Position(5, 6));
	assertSame(MINIMAX.PLAYER_1, gameState1.playerToMove);
	
	var gameState2 = gameArbiter.advanceGame();
	assertSame(MINIMAX.PLAYER_1, gameState1.playerToMove);
	
	var gameState3 = gameArbiter.advanceGame();
	assertTrue(gameState3.isGameEnded());
};
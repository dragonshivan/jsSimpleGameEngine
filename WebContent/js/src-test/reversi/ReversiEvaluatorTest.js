ReversiEvaluatorTestCase = TestCase("ReversiEvaluatorTestCase");

ReversiEvaluatorTestCase.prototype.testGetNextBoardStates = function() {
	var gameState0 = new REVERSI.ReversiGameState(MINIMAX.PLAYER_1);
	var reversiEvaluator = new REVERSI.ReversiEvaluator(MINIMAX.PLAYER_1);
	var nextGameStates = reversiEvaluator.getNextGameStates(gameState0);
	
	assertEquals(4, nextGameStates.length);
	
	nextGameState32 = REVERSI.DEBUG_HELPER.findByLastMove(3, 2, nextGameStates);
	assertFalse(nextGameState32.isGameEnded());
	assertSame(REVERSI.TOKEN_TYPE_BLACK, nextGameState32.getTokenType(3, 2));
	assertSame(REVERSI.TOKEN_TYPE_BLACK, nextGameState32.getTokenType(3, 3));
	assertSame(REVERSI.TOKEN_TYPE_WHITE, nextGameState32.getTokenType(4, 4));
	
	nextGameState23 = REVERSI.DEBUG_HELPER.findByLastMove(2, 3, nextGameStates);
	assertFalse(nextGameState23.isGameEnded());
	assertSame(REVERSI.TOKEN_TYPE_BLACK, nextGameState23.getTokenType(2, 3));
	assertSame(REVERSI.TOKEN_TYPE_BLACK, nextGameState23.getTokenType(3, 3));
	assertSame(REVERSI.TOKEN_TYPE_WHITE, nextGameState23.getTokenType(4, 4));
		
	nextGameState54 = REVERSI.DEBUG_HELPER.findByLastMove(5, 4, nextGameStates);
	assertFalse(nextGameState54.isGameEnded());
	assertSame(REVERSI.TOKEN_TYPE_BLACK, nextGameState54.getTokenType(5, 4));
	assertSame(REVERSI.TOKEN_TYPE_BLACK, nextGameState54.getTokenType(4, 4));
	assertSame(REVERSI.TOKEN_TYPE_WHITE, nextGameState54.getTokenType(3, 3));
	
	nextGameState45 = REVERSI.DEBUG_HELPER.findByLastMove(4, 5, nextGameStates);
	assertFalse(nextGameState45.isGameEnded());
	assertSame(REVERSI.TOKEN_TYPE_BLACK, nextGameState45.getTokenType(4, 5));
	assertSame(REVERSI.TOKEN_TYPE_BLACK, nextGameState45.getTokenType(4, 4));
	assertSame(REVERSI.TOKEN_TYPE_WHITE, nextGameState45.getTokenType(3, 3));
	
	nextGameStates = [];
	nextGameStates = reversiEvaluator.getNextGameStates(nextGameState32);
	
	assertEquals(3, nextGameStates.length);
	assertFalse(nextGameStates[0].isGameEnded());
	assertFalse(nextGameStates[1].isGameEnded());
	assertFalse(nextGameStates[2].isGameEnded());
	
	var nextGameState32 = REVERSI.DEBUG_HELPER.findByLastMove(4, 2, nextGameStates);
	assertSame(REVERSI.TOKEN_TYPE_WHITE, nextGameState32.getTokenType(4, 2));
	assertSame(REVERSI.TOKEN_TYPE_WHITE, nextGameState32.getTokenType(4, 3));
	assertSame(REVERSI.TOKEN_TYPE_WHITE, nextGameState32.getTokenType(4, 4));
};

ReversiEvaluatorTestCase.prototype.testGetNextBoardStatesEndGame = function() {
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
	
	var evaluator = new REVERSI.ReversiEvaluator(MINIMAX.PLAYER_1);
	
	var nextGameStates1 = evaluator.getNextGameStates(gameState);
	assertEquals(1, nextGameStates1.length);
	assertSame(MINIMAX.PLAYER_1, nextGameStates1[0].playerToMove);
	
	var nextGameStates2 = evaluator.getNextGameStates(nextGameStates1[0]);
	assertEquals(2, nextGameStates2.length);
	assertSame("Should be " + MINIMAX.PLAYER_1.toString() + " but was " + nextGameStates2[0].playerToMove.toString(), 
			MINIMAX.PLAYER_1, nextGameStates2[0].playerToMove);
	assertSame("Should be " + MINIMAX.PLAYER_1.toString() + " but was " + nextGameStates2[0].playerToMove.toString(), 
			MINIMAX.PLAYER_1, nextGameStates2[1].playerToMove);
	
	var nextGameStates30 = evaluator.getNextGameStates(nextGameStates2[0]);
	var nextGameStates31 = evaluator.getNextGameStates(nextGameStates2[1]);
	
	assertEquals(2, nextGameStates30.length);
	assertEquals(2, nextGameStates31.length);
	
	var nextGameState3AStr =    "********\n" +
								"********\n" +
								"********\n" +
								"********\n" +
								"********\n" +
								"****_*_*\n" +
								"*******O\n" +
								"****___*\n";
	
	var nextGameState3BStr =    "********\n" +
								"********\n" +
								"********\n" +
								"********\n" +
								"********\n" +
								"****_*_*\n" +
								"****_**O\n" +
								"****_*_*\n";
	
	var nextGameState3CStr =    "********\n" +
								"********\n" +
								"********\n" +
								"********\n" +
								"********\n" +
								"****___*\n" +
								"*******O\n" +
								"****_*_*\n";
	
	var nextGameState30A = REVERSI.DEBUG_HELPER.findByBoardString(nextGameState3AStr, nextGameStates30);
	var nextGameState30B = REVERSI.DEBUG_HELPER.findByBoardString(nextGameState3BStr, nextGameStates30);

	assertTrue(nextGameState30A.getPlayerToMove() === undefined);
	assertTrue(nextGameState30A.isGameEnded());
	assertSame(MINIMAX.PLAYER_2, nextGameState30B.getPlayerToMove());
	assertFalse(nextGameState30B.isGameEnded());
	
	var nextGameState31B = REVERSI.DEBUG_HELPER.findByBoardString(nextGameState3BStr, nextGameStates31);
	var nextGameState31C = REVERSI.DEBUG_HELPER.findByBoardString(nextGameState3CStr, nextGameStates31);
		
	assertTrue(nextGameState31C.getPlayerToMove() === undefined);
	assertTrue(nextGameState31C.isGameEnded());
	assertSame(MINIMAX.PLAYER_2, nextGameState31B.getPlayerToMove());
	assertFalse(nextGameState31B.isGameEnded());
	
	assertEquals(nextGameState30B.getHashcode(), nextGameState31B.getHashcode());
	assertTrue(nextGameState30B.equals(nextGameState31B));	
};

ReversiEvaluatorTestCase.prototype.testDummyEvaluate = function() {
	var evaluator = new REVERSI.ReversiEvaluator(MINIMAX.PLAYER_1);
	evaluator.addEvaluationCriterion(REVERSI.EVALUATION_CRITERIA_DICTIONARY["TOKEN_COUNTER"]);
	var gameState0 = new REVERSI.ReversiGameState(MINIMAX.PLAYER_1);
	var score = evaluator.evaluate(gameState0);
	assertEquals(0, score);
	
	gameState0 = new REVERSI.ReversiGameState(MINIMAX.PLAYER_2);
	score = evaluator.evaluate(gameState0);
	assertEquals(0, score);
	
	gameState0 = new REVERSI.ReversiGameState(MINIMAX.PLAYER_1);
	gameState0.move(new REVERSI.ReversiMove(
			REVERSI.TOKEN_TYPE_BLACK.player,
			2, 
			3, 
			[new REVERSI.Position(3, 3)]));
	
	score = evaluator.evaluate(gameState0);
	assertEquals(3, score);
	
	gameState0.move(new REVERSI.ReversiMove(
			REVERSI.TOKEN_TYPE_WHITE.player,
			2, 
			2, 
			[new REVERSI.Position(3, 3)]));
	
	score = evaluator.evaluate(gameState0);
	assertEquals(0, score);
};
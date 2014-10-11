ReversiGameStateTestCase = TestCase("ReversiGameStateTestCase");

ReversiGameStateTestCase.prototype.testMove = function() {
	var gameState = new REVERSI.ReversiGameState(MINIMAX.PLAYER_1);
	
	assertSame(REVERSI.TOKEN_TYPE_EMPTY, gameState.getTokenType(2, 3));
	assertSame(REVERSI.TOKEN_TYPE_EMPTY, gameState.getTokenType(5, 4));
	
	gameState.move(new REVERSI.ReversiMove(
			REVERSI.TOKEN_TYPE_BLACK.player,
			2, 
			3, 
			[new REVERSI.Position(3, 3)]));
	assertSame("Invalid board state at position 2 3", REVERSI.TOKEN_TYPE_BLACK, gameState.getTokenType(2, 3));
	assertSame("Invalid board state at position 3 3", REVERSI.TOKEN_TYPE_BLACK, gameState.getTokenType(3, 3));
	
	gameState.move(new REVERSI.ReversiMove(
			REVERSI.TOKEN_TYPE_WHITE.player,
			2, 
			4, 
			[new REVERSI.Position(3, 4)]));
	assertSame("Invalid board state at position 2 3", REVERSI.TOKEN_TYPE_WHITE, gameState.getTokenType(2, 4));
	assertSame("Invalid board state at position 3 3", REVERSI.TOKEN_TYPE_WHITE, gameState.getTokenType(3, 4));
	
	gameState.move(new REVERSI.ReversiMove(
			REVERSI.TOKEN_TYPE_BLACK.player,
			4, 
			5, 
			[new REVERSI.Position(4, 4)]));
	assertSame("Invalid board state at position 4 5", REVERSI.TOKEN_TYPE_BLACK, gameState.getTokenType(4, 5));
	assertSame("Invalid board state at position 4 4", REVERSI.TOKEN_TYPE_BLACK, gameState.getTokenType(4, 4));
};

ReversiGameStateTestCase.prototype.testMoveAllPositions = function() {
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
	gameState.move(new REVERSI.ReversiMove(REVERSI.TOKEN_TYPE_BLACK.player, 4, 5, []));
	gameState.move(new REVERSI.ReversiMove(REVERSI.TOKEN_TYPE_BLACK.player, 5, 5, []));
	gameState.move(new REVERSI.ReversiMove(REVERSI.TOKEN_TYPE_BLACK.player, 6, 5, []));
	gameState.move(new REVERSI.ReversiMove(REVERSI.TOKEN_TYPE_BLACK.player, 7, 5, []));
	
	gameState.move(new REVERSI.ReversiMove(REVERSI.TOKEN_TYPE_BLACK.player, 0, 6, []));
	gameState.move(new REVERSI.ReversiMove(REVERSI.TOKEN_TYPE_BLACK.player, 1, 6, []));
	gameState.move(new REVERSI.ReversiMove(REVERSI.TOKEN_TYPE_BLACK.player, 2, 6, []));
	gameState.move(new REVERSI.ReversiMove(REVERSI.TOKEN_TYPE_BLACK.player, 3, 6, []));
	gameState.move(new REVERSI.ReversiMove(REVERSI.TOKEN_TYPE_BLACK.player, 4, 6, []));
	gameState.move(new REVERSI.ReversiMove(REVERSI.TOKEN_TYPE_BLACK.player, 5, 6, []));
	gameState.move(new REVERSI.ReversiMove(REVERSI.TOKEN_TYPE_BLACK.player, 6, 6, []));
	gameState.move(new REVERSI.ReversiMove(REVERSI.TOKEN_TYPE_BLACK.player, 7, 6, []));
	
	gameState.move(new REVERSI.ReversiMove(REVERSI.TOKEN_TYPE_BLACK.player, 0, 7, []));
	gameState.move(new REVERSI.ReversiMove(REVERSI.TOKEN_TYPE_BLACK.player, 1, 7, []));
	gameState.move(new REVERSI.ReversiMove(REVERSI.TOKEN_TYPE_BLACK.player, 2, 7, []));
	gameState.move(new REVERSI.ReversiMove(REVERSI.TOKEN_TYPE_BLACK.player, 3, 7, []));
	gameState.move(new REVERSI.ReversiMove(REVERSI.TOKEN_TYPE_BLACK.player, 4, 7, []));
	gameState.move(new REVERSI.ReversiMove(REVERSI.TOKEN_TYPE_BLACK.player, 5, 7, []));
	gameState.move(new REVERSI.ReversiMove(REVERSI.TOKEN_TYPE_BLACK.player, 6, 7, []));
	gameState.move(new REVERSI.ReversiMove(REVERSI.TOKEN_TYPE_BLACK.player, 7, 7, []));
	
	assertEquals("********\n" +
			"********\n" +
			"********\n" +
			"********\n" +
			"********\n" +
			"********\n" +
			"********\n" +
			"********\n", gameState.toStringBoardOnly());
	
	var gameState = new REVERSI.ReversiGameState(MINIMAX.PLAYER_1);
	
	gameState.move(new REVERSI.ReversiMove(REVERSI.TOKEN_TYPE_WHITE.player, 0, 0, [new REVERSI.Position(4, 3)]));
	gameState.move(new REVERSI.ReversiMove(REVERSI.TOKEN_TYPE_WHITE.player, 1, 0, [new REVERSI.Position(3, 4)]));
	gameState.move(new REVERSI.ReversiMove(REVERSI.TOKEN_TYPE_WHITE.player, 2, 0, []));
	gameState.move(new REVERSI.ReversiMove(REVERSI.TOKEN_TYPE_WHITE.player, 3, 0, []));
	gameState.move(new REVERSI.ReversiMove(REVERSI.TOKEN_TYPE_WHITE.player, 4, 0, []));
	gameState.move(new REVERSI.ReversiMove(REVERSI.TOKEN_TYPE_WHITE.player, 5, 0, []));
	gameState.move(new REVERSI.ReversiMove(REVERSI.TOKEN_TYPE_WHITE.player, 6, 0, []));
	gameState.move(new REVERSI.ReversiMove(REVERSI.TOKEN_TYPE_WHITE.player, 7, 0, []));
	
	gameState.move(new REVERSI.ReversiMove(REVERSI.TOKEN_TYPE_WHITE.player, 0, 1, []));
	gameState.move(new REVERSI.ReversiMove(REVERSI.TOKEN_TYPE_WHITE.player, 1, 1, []));
	gameState.move(new REVERSI.ReversiMove(REVERSI.TOKEN_TYPE_WHITE.player, 2, 1, []));
	gameState.move(new REVERSI.ReversiMove(REVERSI.TOKEN_TYPE_WHITE.player, 3, 1, []));
	gameState.move(new REVERSI.ReversiMove(REVERSI.TOKEN_TYPE_WHITE.player, 4, 1, []));
	gameState.move(new REVERSI.ReversiMove(REVERSI.TOKEN_TYPE_WHITE.player, 5, 1, []));
	gameState.move(new REVERSI.ReversiMove(REVERSI.TOKEN_TYPE_WHITE.player, 6, 1, []));
	gameState.move(new REVERSI.ReversiMove(REVERSI.TOKEN_TYPE_WHITE.player, 7, 1, []));
	
	gameState.move(new REVERSI.ReversiMove(REVERSI.TOKEN_TYPE_WHITE.player, 0, 2, []));
	gameState.move(new REVERSI.ReversiMove(REVERSI.TOKEN_TYPE_WHITE.player, 1, 2, []));
	gameState.move(new REVERSI.ReversiMove(REVERSI.TOKEN_TYPE_WHITE.player, 2, 2, []));
	gameState.move(new REVERSI.ReversiMove(REVERSI.TOKEN_TYPE_WHITE.player, 3, 2, []));
	gameState.move(new REVERSI.ReversiMove(REVERSI.TOKEN_TYPE_WHITE.player, 4, 2, []));
	gameState.move(new REVERSI.ReversiMove(REVERSI.TOKEN_TYPE_WHITE.player, 5, 2, []));
	gameState.move(new REVERSI.ReversiMove(REVERSI.TOKEN_TYPE_WHITE.player, 6, 2, []));
	gameState.move(new REVERSI.ReversiMove(REVERSI.TOKEN_TYPE_WHITE.player, 7, 2, []));

	gameState.move(new REVERSI.ReversiMove(REVERSI.TOKEN_TYPE_WHITE.player, 0, 3, []));
	gameState.move(new REVERSI.ReversiMove(REVERSI.TOKEN_TYPE_WHITE.player, 1, 3, []));
	gameState.move(new REVERSI.ReversiMove(REVERSI.TOKEN_TYPE_WHITE.player, 2, 3, []));
	gameState.move(new REVERSI.ReversiMove(REVERSI.TOKEN_TYPE_WHITE.player, 5, 3, []));
	gameState.move(new REVERSI.ReversiMove(REVERSI.TOKEN_TYPE_WHITE.player, 6, 3, []));
	gameState.move(new REVERSI.ReversiMove(REVERSI.TOKEN_TYPE_WHITE.player, 7, 3, []));
	
	gameState.move(new REVERSI.ReversiMove(REVERSI.TOKEN_TYPE_WHITE.player, 0, 4, []));
	gameState.move(new REVERSI.ReversiMove(REVERSI.TOKEN_TYPE_WHITE.player, 1, 4, []));
	gameState.move(new REVERSI.ReversiMove(REVERSI.TOKEN_TYPE_WHITE.player, 2, 4, []));
	gameState.move(new REVERSI.ReversiMove(REVERSI.TOKEN_TYPE_WHITE.player, 5, 4, []));
	gameState.move(new REVERSI.ReversiMove(REVERSI.TOKEN_TYPE_WHITE.player, 6, 4, []));
	gameState.move(new REVERSI.ReversiMove(REVERSI.TOKEN_TYPE_WHITE.player, 7, 4, []));
	
	gameState.move(new REVERSI.ReversiMove(REVERSI.TOKEN_TYPE_WHITE.player, 0, 5, []));
	gameState.move(new REVERSI.ReversiMove(REVERSI.TOKEN_TYPE_WHITE.player, 1, 5, []));
	gameState.move(new REVERSI.ReversiMove(REVERSI.TOKEN_TYPE_WHITE.player, 2, 5, []));
	gameState.move(new REVERSI.ReversiMove(REVERSI.TOKEN_TYPE_WHITE.player, 3, 5, []));
	gameState.move(new REVERSI.ReversiMove(REVERSI.TOKEN_TYPE_WHITE.player, 4, 5, []));
	gameState.move(new REVERSI.ReversiMove(REVERSI.TOKEN_TYPE_WHITE.player, 5, 5, []));
	gameState.move(new REVERSI.ReversiMove(REVERSI.TOKEN_TYPE_WHITE.player, 6, 5, []));
	gameState.move(new REVERSI.ReversiMove(REVERSI.TOKEN_TYPE_WHITE.player, 7, 5, []));
	
	gameState.move(new REVERSI.ReversiMove(REVERSI.TOKEN_TYPE_WHITE.player, 0, 6, []));
	gameState.move(new REVERSI.ReversiMove(REVERSI.TOKEN_TYPE_WHITE.player, 1, 6, []));
	gameState.move(new REVERSI.ReversiMove(REVERSI.TOKEN_TYPE_WHITE.player, 2, 6, []));
	gameState.move(new REVERSI.ReversiMove(REVERSI.TOKEN_TYPE_WHITE.player, 3, 6, []));
	gameState.move(new REVERSI.ReversiMove(REVERSI.TOKEN_TYPE_WHITE.player, 4, 6, []));
	gameState.move(new REVERSI.ReversiMove(REVERSI.TOKEN_TYPE_WHITE.player, 5, 6, []));
	gameState.move(new REVERSI.ReversiMove(REVERSI.TOKEN_TYPE_WHITE.player, 6, 6, []));
	gameState.move(new REVERSI.ReversiMove(REVERSI.TOKEN_TYPE_WHITE.player, 7, 6, []));
	
	gameState.move(new REVERSI.ReversiMove(REVERSI.TOKEN_TYPE_WHITE.player, 0, 7, []));
	gameState.move(new REVERSI.ReversiMove(REVERSI.TOKEN_TYPE_WHITE.player, 1, 7, []));
	gameState.move(new REVERSI.ReversiMove(REVERSI.TOKEN_TYPE_WHITE.player, 2, 7, []));
	gameState.move(new REVERSI.ReversiMove(REVERSI.TOKEN_TYPE_WHITE.player, 3, 7, []));
	gameState.move(new REVERSI.ReversiMove(REVERSI.TOKEN_TYPE_WHITE.player, 4, 7, []));
	gameState.move(new REVERSI.ReversiMove(REVERSI.TOKEN_TYPE_WHITE.player, 5, 7, []));
	gameState.move(new REVERSI.ReversiMove(REVERSI.TOKEN_TYPE_WHITE.player, 6, 7, []));
	gameState.move(new REVERSI.ReversiMove(REVERSI.TOKEN_TYPE_WHITE.player, 7, 7, []));
	
	assertEquals("OOOOOOOO\n" +
			"OOOOOOOO\n" +
			"OOOOOOOO\n" +
			"OOOOOOOO\n" +
			"OOOOOOOO\n" +
			"OOOOOOOO\n" +
			"OOOOOOOO\n" +
			"OOOOOOOO\n", gameState.toStringBoardOnly());
	
	REVERSI.REVERSI_TEST_MOCKER.unmockReversiGameStateMove();
};

ReversiGameStateTestCase.prototype.testClone = function() {
	//TODO
};

ReversiGameStateTestCase.prototype.testGetHashcodeEquals = function() {
	var gameState1 = new REVERSI.ReversiGameState(MINIMAX.PLAYER_1);
	var gameState2 = new REVERSI.ReversiGameState(MINIMAX.PLAYER_1);
	assertEquals(gameState1.getHashcode(), gameState2.getHashcode());
	assertTrue(gameState1.equals(gameState2));
	
	gameState1.move(new REVERSI.ReversiMove(
			REVERSI.TOKEN_TYPE_BLACK.player,
			2, 
			3, 
			[new REVERSI.Position(3, 3)]));
	assertFalse(gameState1.equals(gameState2));
	
	gameState2.move(new REVERSI.ReversiMove(
			REVERSI.TOKEN_TYPE_BLACK.player,
			2, 
			3, 
			[new REVERSI.Position(3, 3)]));
	assertEquals(gameState1.getHashcode(), gameState2.getHashcode());
	assertTrue(gameState1.equals(gameState2));
	
	gameState1.move(new REVERSI.ReversiMove(
			REVERSI.TOKEN_TYPE_WHITE.player,
			2, 
			4, 
			[new REVERSI.Position(3, 4)]));
	assertFalse(gameState1.equals(gameState2));
	
	gameState2.move(new REVERSI.ReversiMove(
			REVERSI.TOKEN_TYPE_WHITE.player,
			2, 
			4, 
			[new REVERSI.Position(3, 4)]));
	assertEquals(gameState1.getHashcode(), gameState2.getHashcode());
	assertTrue(gameState1.equals(gameState2));
};

ReversiGameStateTestCase.prototype.testToString = function() {
	//TODO
};
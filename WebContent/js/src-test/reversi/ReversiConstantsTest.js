ReversiConstantsTestCase = TestCase("ReversiConstantsTestCase");

ReversiConstantsTestCase.prototype.testPositionMask = function() {
	//TODO
};

ReversiConstantsTestCase.prototype.testGameStateInitial = function() {
	var gameState = new REVERSI.ReversiGameState(MINIMAX.PLAYER_1);
	var assertCount = 0;
	for(var x = 0; x < 8; x++) {
		for(var y = 0; y < 8; y++) {
			if(!((x == 3 || x == 4) && (y == 3 || y == 4))) {
				assertSame("Token at (" + x + " ," + y + ")", REVERSI.TOKEN_TYPE_EMPTY, gameState.getTokenType(x, y));
				assertCount++;
			}			
		}
	}
	assertEquals(60, assertCount);
	
	assertSame(REVERSI.TOKEN_TYPE_WHITE, gameState.getTokenType(3, 3));
	assertSame(REVERSI.TOKEN_TYPE_BLACK, gameState.getTokenType(3, 4));
	assertSame(REVERSI.TOKEN_TYPE_BLACK, gameState.getTokenType(4, 3));
	assertSame(REVERSI.TOKEN_TYPE_WHITE, gameState.getTokenType(4, 4));
	assertSame(REVERSI.TOKEN_TYPE_BLACK.player, gameState.getPlayerToMove());
};
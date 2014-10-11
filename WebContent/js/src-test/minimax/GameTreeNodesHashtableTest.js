GameTreeNodesHashtableTestCase = TestCase("GameTreeNodesHashtableTestCase");

GameTreeNodesHashtableTestCase.prototype.testGet = function() {
	var hashtable = new MINIMAX.GameTreeNodesHashTable();
	
	var gameState1 = new REVERSI.ReversiGameState(MINIMAX.PLAYER_1);
	var gameTreeNode1 = new MINIMAX.GameTreeNode(gameState1);
	
	assertEquals(0, hashtable.getList().length);
	
	hashtable.add(gameTreeNode1);
	assertEquals(1, hashtable.getList().length);
	
	hashtable.add(gameTreeNode1);
	assertEquals(1, hashtable.getList().length);
	
	var gameState1bis = gameState1.clone();
	var gameTreeNode1bis = new MINIMAX.GameTreeNode(gameState1bis);
	hashtable.add(gameTreeNode1bis);
	assertEquals(1, hashtable.getList().length);
	
	var gameState2 = gameState1.clone();
	gameState2.move(new REVERSI.ReversiMove(
			REVERSI.TOKEN_TYPE_BLACK.player,
			2, 
			3, 
			[new REVERSI.Position(3, 3)]));
	var gameTreeNode2 = new MINIMAX.GameTreeNode(gameState2);
	hashtable.add(gameTreeNode2);
	assertEquals(2, hashtable.getList().length);	
};
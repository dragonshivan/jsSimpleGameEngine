GameTreeTestCase = TestCase("GameTreeTestCase");

GameTreeTestCase.prototype.testGenerateNodes = function() {
	var evaluator = new REVERSI.ReversiEvaluator(MINIMAX.PLAYER_1);
	var gameTree = new MINIMAX.GameTree(evaluator);
	var gameState0 = new REVERSI.ReversiGameState(MINIMAX.PLAYER_1);
	
	var rootNode = gameTree.grow(gameState0);
	
	assertEquals(evaluator.getEvaluationHorizon(gameState0), gameTree.intermediateNodesByTreeDepth.length);
	assertEquals(4, rootNode.childNodes.length);
	assertEquals(4, gameTree.intermediateNodesByTreeDepth[1].getList().length);
	assertEquals(12, gameTree.intermediateNodesByTreeDepth[2].getList().length);
	for(var i = 0; i < rootNode.childNodes.length; i++) {
		assertSame(MINIMAX.PLAYER_2, rootNode.childNodes[i].gameState.getPlayerToMove());
		assertFalse(MINIMAX.PLAYER_2, rootNode.childNodes[i].gameState.isGameEnded());			
	}
};

/**
 * XPS Dell Laptop: 
after 4 moves (4 + 4 tokens on board): GameTreeTest.js:34
>>> 5380 nodes (6060 transitions), depth: 6, generation time: 128 ms., scoring time: 1 ms., total time: 129 ms. GameTreeTest.js:38
>>> load factor: 2.3693121693121695, (4478 elements) / (1890 buckets) GameTreeTest.js:39
 GameTreeTest.js:40
after 8 moves (8 + 4 tokens on board): GameTreeTest.js:42
>>> 3591 nodes (3897 transitions), depth: 6, generation time: 66 ms., scoring time: 1 ms., total time: 67 ms. GameTreeTest.js:46
>>> load factor: 2.488702928870293, (2974 elements) / (1195 buckets) GameTreeTest.js:47
 GameTreeTest.js:48
after 12 moves (12 + 4 tokens on board): GameTreeTest.js:50
>>> 7831 nodes (8488 transitions), depth: 6, generation time: 139 ms., scoring time: 1 ms., total time: 140 ms. GameTreeTest.js:54
>>> load factor: 2.5526729559748427, (6494 elements) / (2544 buckets) GameTreeTest.js:55
 GameTreeTest.js:56
after 16 moves (16 + 4 tokens on board): GameTreeTest.js:58
>>> 2287 nodes (2499 transitions), depth: 6, generation time: 40 ms., scoring time: 0 ms., total time: 40 ms. GameTreeTest.js:62
>>> load factor: 1.8825301204819278, (1875 elements) / (996 buckets) 
 * 
 */
GameTreeTestCase.prototype.testGrowBenchmark = function() {
	var evaluator = new REVERSI.ReversiEvaluator(MINIMAX.PLAYER_1);
	var gameTree = new MINIMAX.GameTree(evaluator);
	var gameState0 = new REVERSI.ReversiGameState(MINIMAX.PLAYER_1);
	
	var rootNode = gameTree.grow(gameState0);
	
	console.log("after 4 moves (4 + 4 tokens on board):");
	var childNode1 = rootNode.childNodes[0].childNodes[0].childNodes[0].childNodes[0];
	gameTree = new MINIMAX.GameTree(evaluator);
	childNode1 = gameTree.grow(childNode1.gameState);
	console.log(">>> " + gameTree.toString());
	console.log(">>> " + gameTree.intermediateNodesByTreeDepth[5].toString());
	console.log("");
	
	console.log("after 8 moves (8 + 4 tokens on board):");
	var childNode2 = childNode1.childNodes[0].childNodes[0].childNodes[0].childNodes[0];
	gameTree = new MINIMAX.GameTree(evaluator);
	childNode2 = gameTree.grow(childNode2.gameState);
	console.log(">>> " + gameTree.toString());
	console.log(">>> " + gameTree.intermediateNodesByTreeDepth[5].toString());
	console.log("");
	
	console.log("after 12 moves (12 + 4 tokens on board):");
	var childNode3 = childNode2.childNodes[0].childNodes[0].childNodes[0].childNodes[0];
	gameTree = new MINIMAX.GameTree(evaluator);
	childNode3 = gameTree.grow(childNode3.gameState);
	console.log(">>> " + gameTree.toString());
	console.log(">>> " + gameTree.intermediateNodesByTreeDepth[5].toString());
	console.log("");
	
	console.log("after 16 moves (16 + 4 tokens on board):");
	var childNode4 = childNode3.childNodes[0].childNodes[0].childNodes[0].childNodes[0];
	gameTree = new MINIMAX.GameTree(evaluator);
	childNode4 = gameTree.grow(childNode4.gameState);
	console.log(">>> " + gameTree.toString());
	console.log(">>> " + gameTree.intermediateNodesByTreeDepth[5].toString());
	console.log("");
};
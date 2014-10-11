var MINIMAX = MINIMAX = MINIMAX || {};

/**
 * @public
 * @constructor
 * @public {MINIMAX.Evaluator} evaluator
 * @returns {MINIMAX.GameTree}
 */
MINIMAX.GameTree = function(evaluator) {
	this.evaluator = evaluator;
	this.intermediateNodesByTreeDepth = [];
	this.nodesCount = 0;
	this.nodesGenerationMs = 0;
	this.nodesScoreMs = 0;
	this.transitionsCount = 0;
};

/**
 * @public
 * @param {MINIMAX.GameState} gameState
 * @returns {MINIMAX.GameTreeNode}
 */
MINIMAX.GameTree.prototype.grow = function(gameState) {	
	var rootNode = new MINIMAX.GameTreeNode(gameState);
	this.generateNodes(rootNode);
	this.scoreNodes();	
	return rootNode;
};

/**
 * @public
 * @returns {String}
 */
MINIMAX.GameTree.prototype.toString = function() {
	return this.nodesCount + " nodes (" + this.transitionsCount + " transitions), " +
		"depth: " + this.intermediateNodesByTreeDepth.length + ", " +
		"generation time: " + this.nodesGenerationMs +" ms., " +
		"scoring time: " + this.nodesScoreMs + " ms., " +
		"total time: " + (this.nodesGenerationMs + this.nodesScoreMs) + " ms.";
};

/**
 * @private
 * @param {MINIMAX.GameTreeNode} rootNode
 */
MINIMAX.GameTree.prototype.generateNodes = function(rootNode) {
	var st = new Date().getTime();
	
	var depth = 0;
	this.intermediateNodesByTreeDepth[depth] = new MINIMAX.GameTreeNodesHashTable();
	this.intermediateNodesByTreeDepth[depth].add(rootNode);
	this.nodesCount++;
	this.transitionsCount++;
	while(!this.intermediateNodesByTreeDepth[depth].isEmpty() && depth < this.evaluator.getEvaluationHorizon(rootNode.gameState) - 1) {
		this.intermediateNodesByTreeDepth[depth + 1] = new MINIMAX.GameTreeNodesHashTable();
		for(var i = 0; i < this.intermediateNodesByTreeDepth[depth].getList().length; i++) {
			var currentNode = this.intermediateNodesByTreeDepth[depth].getList()[i];
			if(currentNode.gameState.isGameEnded()) {
				continue;
			}
			var nextGameStates = this.evaluator.getNextGameStates(currentNode.gameState);
			if(nextGameStates.length > 0) {
				for(var j = 0; j < nextGameStates.length; j++) {
					var nextGameState = nextGameStates[j];
					var nextNode = this.intermediateNodesByTreeDepth[depth + 1].get(nextGameState);
					if(nextNode === undefined) {
						nextNode = new MINIMAX.GameTreeNode(nextGameState);
						this.intermediateNodesByTreeDepth[depth + 1].add(nextNode);
						this.nodesCount++;
					}
					this.transitionsCount++;
					currentNode.addChildNode(nextNode);
				}
			}
		}
		depth++;
	}
	
	this.nodesGenerationMs = new Date().getTime() - st;
};

/**
 * @private
 */
MINIMAX.GameTree.prototype.scoreNodes = function() {
	var st = new Date().getTime();
	
	for(var i = this.intermediateNodesByTreeDepth.length - 1; i >= 0; i--) {
		var currentDepthNodes = this.intermediateNodesByTreeDepth[i];
		for(var j = 0; j < currentDepthNodes.getList().length; j++) {
			var node = currentDepthNodes.getList()[j];
			if(node.childNodes.length == 0) {
				var score = this.evaluator.evaluate(node.gameState);
				node.score = score;
			} else {
				this.calculateMinimaxScore(node);
			}
		}
	}
	
	this.nodesScoreMs = new Date().getTime() - st;
};

/**
 * @private
 */
MINIMAX.GameTree.prototype.calculateMinimaxScore = function(node) {
	var score;
	if(node.gameState.getPlayerToMove() === this.evaluator.playerToWin) {
		score = Number.NEGATIVE_INFINITY;
		for(var i = 0; i < node.childNodes.length; i++) {
			var childNode = node.childNodes[i];
			if(childNode.score > score) {
				score = childNode.score;
			}
		}
	} else {
		score = Number.POSITIVE_INFINITY;
		for(var i = 0; i < node.childNodes.length; i++) {
			var childNode = node.childNodes[i];
			if(childNode.score < score) {
				score = childNode.score;
			}
		}
	}
	node.score = score;
};

/**
 * @public
 * @constructor
 * @param {MINIMAX.GameState} gameState
 * @returns {MINIMAX.GameTreeNode}
 */
MINIMAX.GameTreeNode = function(gameState) {
	this.gameState = gameState;
	this.score;
	this.hash = gameState.getHashcode(gameState);
	
	/**
	 * @type MINIMAX.GameTreeNode[] 
	 */
	this.childNodes = [];
};

/**
 * @private
 * @param {MINIMAX.GameTreeNode} childNode
 */
MINIMAX.GameTreeNode.prototype.addChildNode = function(childNode) {
	this.childNodes.push(childNode);
};

/**
 * @private
 * @param {MINIMAX.GameTreeNode} node
 */
MINIMAX.GameTreeNode.prototype.equals = function(node) {
	return this.gameState.equals(node.gameState);
};
var MINIMAX = MINIMAX = MINIMAX || {};

/**
 * @public
 * @constructor
 * @returns {GameTreeNodesHashTable}
 */
MINIMAX.GameTreeNodesHashTable = function() {
	this.hashtable = [];
	
	/**
	 * @type Minimax.GameTreeNode[]
	 */
	this.list = [];
	this.usedBucketsCount = 0;
};

/**
 * @public
 * @param {MINIMAX.GameTreeNode} gameTreeNode
 */
MINIMAX.GameTreeNodesHashTable.prototype.add = function(gameTreeNode) {
	var transformedHash = gameTreeNode.hash % MINIMAX.NODES_HASH_BUCKETS_MAX;
	
	var bucket = this.hashtable[transformedHash];
	if(bucket === undefined) {
		bucket = [];
		this.usedBucketsCount++;
		this.hashtable[transformedHash] = bucket;
		bucket.push(gameTreeNode);
		this.list.push(gameTreeNode);
	} else {
		var found = false;
		for(var i = 0; i < bucket.length; i++) {
			var existingGameTreeNode = bucket[i];
			if(existingGameTreeNode.equals(gameTreeNode)) {
				found = true;
				break;
			}
		}
		if(!found) {
			bucket.push(gameTreeNode);
			this.list.push(gameTreeNode);
		}
	}
};

/**
 * @public
 * @param {MINIMAX.GameState} gameState
 * @returns {Boolean}
 */
MINIMAX.GameTreeNodesHashTable.prototype.get = function(gameState) {
	var transformedHash = gameState.getHashcode() % MINIMAX.NODES_HASH_BUCKETS_MAX;
	
	var bucket = this.hashtable[transformedHash];
	if(bucket === undefined) {
		return undefined;
	}
	for(var i = 0; i < bucket.length; i++) {
		var existingGameTreeNode = bucket[i];
		if(existingGameTreeNode.gameState.equals(gameState)) {
			return existingGameTreeNode;
		}
	}	
	return undefined;
};

/**
 * @public
 * @returns {MINIMAX.GameTreeNode[]}
 */
MINIMAX.GameTreeNodesHashTable.prototype.getList = function() {
	return this.list;
};

/**
 * @public
 * @returns {Boolean}
 */
MINIMAX.GameTreeNodesHashTable.prototype.isEmpty = function() {
	return this.list.length == 0;
};

/**
 * @public
 * @returns {String}
 */
MINIMAX.GameTreeNodesHashTable.prototype.toString = function() {
	var loadFactor = 0;
	if(this.usedBucketsCount != 0) {
		loadFactor = this.list.length / this.usedBucketsCount;
	}
	return "load factor: " + loadFactor + ", " +
		"(" + this.list.length + " elements) / (" + this.usedBucketsCount + " buckets)";
		
};
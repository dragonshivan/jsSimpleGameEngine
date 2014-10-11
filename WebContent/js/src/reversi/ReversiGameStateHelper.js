var REVERSI = REVERSI || {};

/**
 * @public
 * @constructor
 * @returns {REVERSI.ReversiGameStateHelper}
 */
REVERSI.ReversiGameStateHelper = function() {};

/**
 * @private
 * @param {MINIMAX.Player} player
 * @param {REVERSI.ReversiGameState} gameState
 * @returns {REVERSI.ReversiMove[]}
 */
REVERSI.ReversiGameStateHelper.prototype.getPossibleMoves = function(player, gameState) {
	var playerTokenType = REVERSI.TOKEN_TYPE_WHITE;
	if(player === MINIMAX.PLAYER_1) {
		playerTokenType = REVERSI.TOKEN_TYPE_BLACK;
	}
	var possibleMoves = [];
	for(var y = 0; y < 8; y++) {
		for(var x = 0; x < 8; x++) {//for each board position
			if(gameState.getTokenType(x, y) === REVERSI.TOKEN_TYPE_EMPTY) {//start possible-move-check from an empty position
				var flippedTokensPositions = [];
				vectorInnerLoop: for(var i = 0; i < 8; i++) {//get all the vectors around it
					var vector = REVERSI.VECTOR[i];
					var xNeighbor = x + vector.x;//use vector.x to get xNeighbor
					if(xNeighbor >= 0 && xNeighbor < 8) {//make sure xNeighbor is not outside the board
						var yNeighbor = y + vector.y;//use vector.y to get yNeighbor
						if(yNeighbor >= 0 && yNeighbor < 8) {//make sure yNeighbor is not outside the board
							if(gameState.getTokenType(xNeighbor, yNeighbor) === playerTokenType.opponentTokenType) { //make sure neighboring token is of opposing color
								var potentialFlippedTokensPositions = [];
								potentialFlippedTokensPositions.push(new REVERSI.Position(xNeighbor, yNeighbor)); //add the neighbor to (possibly) flipped tokens
								var xCurrent = xNeighbor + vector.x; 
								var yCurrent = yNeighbor + vector.y; //advance to next vectorial position
								while(xCurrent >=0 && xCurrent < 8 &&
										yCurrent >= 0 && yCurrent < 8) {
									if(gameState.getTokenType(xCurrent, yCurrent) === REVERSI.TOKEN_TYPE_EMPTY) { //if you stumble upon an empty position, mark this as a new move
										continue vectorInnerLoop; //we're done with possible-move-checking on this vector
									} else if(gameState.getTokenType(xCurrent, yCurrent) === playerTokenType.opponentTokenType) { //if you stumble upon opponent's token, add it to flipped positions
										potentialFlippedTokensPositions.push(new REVERSI.Position(xCurrent, yCurrent));	
										xCurrent = xCurrent + vector.x;
										yCurrent = yCurrent + vector.y;
									} else {//if we stumble upon a player's token
										for(var j = 0; j < potentialFlippedTokensPositions.length; j++) {
											flippedTokensPositions.push(potentialFlippedTokensPositions[j]);
										}
										continue vectorInnerLoop; //we're done with possible-move-checking on this vector
									}
								}
							}
						}
					}
				}
				if(flippedTokensPositions.length > 0) {
					possibleMoves.push(new REVERSI.ReversiMove(
							player,  
							x, 
							y, 
							flippedTokensPositions));
				}
			}
		}
	}
	return possibleMoves;
};

REVERSI.REVERSI_GAME_STATE_HELPER = new REVERSI.ReversiGameStateHelper();
var REVERSI = REVERSI || {};

/**
 * @public
 * @constructor
 * @param {MINIMAX.Player} playerToMove
 * @returns {REVERSI.ReversiGameState}
 */
REVERSI.ReversiGameState = function(playerToMove) {
	
	this.gameEnded = false;
	
	//default starting positions (white black / black white in the 4 center squares):
	this.tokensUpper = 16;
	this.tokensLower = 134217728;
	
	//emptyPositionsUpper are all true 
	//(even the lower/center 2, as they denote 0,0 token types for upper/lower tokens):
	//except the one reserved for holding (0,0) and (0,4) tokens color, which should be set to 0 
	//(which means black if not empty - and they're never empty) 
	this.emptyPositionsUpper = 2147483623;
	
	//emptyPositionsLower are all true 
	//(even the upper/center 2, as they denote 0,0 empty positions for upper/lower emptyPositions):
	this.emptyPositionsLower = 2147483647;
	
	this.lastMove;
	
	this.tokensCount = 4;
	
	this.hash;
	
	MINIMAX.GameState.call(this, playerToMove);
};

REVERSI.ReversiGameState.prototype = Object.create(MINIMAX.GameState.prototype);
REVERSI.ReversiGameState.prototype.constructor = REVERSI.ReversiGameState;

/**
 * @public
 * @param {MINIMAX.Player} player
 * @param {REVERSI.Position} position
 */
MINIMAX.GameState.prototype.applyPlayerMove = function(player, position) {
	var possibleMoves = REVERSI.REVERSI_GAME_STATE_HELPER.getPossibleMoves(player, this);	
	var move;
	for(var i = 0; i < possibleMoves.length; i++) {
		var possibleMove = possibleMoves[i];
		if(possibleMove.position.x == position.x && possibleMove.position.y == position.y) {
			move = possibleMove;
			break;
		}
	}
	if(move === undefined) {
		throw "No valid move found for position: (" + position.x + ", " + position.y + ")";
	}
	this.move(move);
};

/**
 * @public
 * @param {REVERSI.ReversiMove} move
 */
REVERSI.ReversiGameState.prototype.move = function(move) {
	this.tokensCount++;
	this.lastMove = move;
	
	if(move.position.isLowerBoardHalf) {
		if(move.position.mask == null) {//if move is on reserved position
			if(move.player === MINIMAX.PLAYER_2) {
				//if player 2, set token to white (1):
				this.emptyPositionsUpper = this.emptyPositionsUpper | REVERSI.EMPTY_UPPER_RESERVERD_POSITION_MASK.TOKEN_TYPE_LOWER_0_0;				
			}//otherwise leave it at 0 for black
					
			//mark position as no longer empty (flip from 1 to 0), 
			this.emptyPositionsLower = this.emptyPositionsLower ^ REVERSI.EMPTY_LOWER_RESERVERD_POSITION_MASK.EMPTY_LOWER_0_0;
		} else {
			if(move.player === MINIMAX.PLAYER_2) {
				//if player 2, set token to white (1):
				this.tokensLower = this.tokensLower | move.position.mask;				
			}//otherwise leave it at 0 for black
					
			//mark position as no longer empty (flip from 1 to 0), 
			this.emptyPositionsLower = this.emptyPositionsLower ^ move.position.mask;
		}
	} else {
		if(move.position.mask == null) {//if move is on reserved position
			if(move.player === MINIMAX.PLAYER_2) {
				//if player 2, set token to white (1):
				this.emptyPositionsUpper = this.emptyPositionsUpper | REVERSI.EMPTY_UPPER_RESERVERD_POSITION_MASK.TOKEN_TYPE_UPPER_0_0;				
			}//otherwise leave it at 0 for black
					
			//mark position as no longer empty (flip from 1 to 0), 
			this.emptyPositionsLower = this.emptyPositionsLower ^ REVERSI.EMPTY_LOWER_RESERVERD_POSITION_MASK.EMPTY_UPPER_0_0;
		} else {
			if(move.player === MINIMAX.PLAYER_2) {
				//if player 2, set token to white (1):
				this.tokensUpper = this.tokensUpper | move.position.mask;				
			}//otherwise leave it at 0 for black
			
			//mark position as no longer empty (flip from 1 to 0), 
			this.emptyPositionsUpper = this.emptyPositionsUpper ^ move.position.mask;
		}
	}
	
	//flip tokens:
	for(var i = 0; i < move.flippedTokensPositions.length; i++) {
		
		var flippedTokenPosition = move.flippedTokensPositions[i];
		
		if(flippedTokenPosition.mask == null) {
			var mask = REVERSI.EMPTY_UPPER_RESERVERD_POSITION_MASK.TOKEN_TYPE_UPPER_0_0;
			if(flippedTokenPosition.isLowerBoardHalf) {
				mask = REVERSI.EMPTY_UPPER_RESERVERD_POSITION_MASK.TOKEN_TYPE_LOWER_0_0;			
			}			
			//flip token:
			this.emptyPositionsUpper = this.emptyPositionsUpper ^ mask;
		} else {
			//flip token:
			if(flippedTokenPosition.isLowerBoardHalf) {
				this.tokensLower = this.tokensLower ^ flippedTokenPosition.mask;
			} else {
				this.tokensUpper = this.tokensUpper ^ flippedTokenPosition.mask;
			}
		}
	}
	
	//update player to move and gameEnded
//	if(!this.gameEnded) {
		var possibleMovesOpponent = REVERSI.REVERSI_GAME_STATE_HELPER.getPossibleMoves(this.playerToMove.opponent, this);	
		if(possibleMovesOpponent.length > 0) {
			this.playerToMove = this.playerToMove.opponent;
		} else {
			if(REVERSI.REVERSI_GAME_STATE_HELPER.getPossibleMoves(this.playerToMove, this).length == 0) {
				this.playerToMove = undefined;
				this.gameEnded = true;
			}
		}
//	}
	
	this.updateHashcode();	
};

/**
 * @public
 * @param {Number} x
 * @param {Number} y
 * @returns {REVERSI.TokenType}
 */
REVERSI.ReversiGameState.prototype.getTokenType = function(x, y) {
	var position = REVERSI.POSITION[x][y];
	var isLowerBoardHalf = position.isLowerBoardHalf;
	
	if(position.mask == null) {//is one of the reserved positions
		
		var mask = REVERSI.EMPTY_LOWER_RESERVERD_POSITION_MASK.EMPTY_UPPER_0_0;
		if(isLowerBoardHalf) {
			mask = REVERSI.EMPTY_LOWER_RESERVERD_POSITION_MASK.EMPTY_LOWER_0_0;
		}
		
		//check if empty (emptyPositions has a 1 there):
		if((this.emptyPositionsLower & mask) != 0) {
			return REVERSI.TOKEN_TYPE_EMPTY;
		}
		
		var mask = REVERSI.EMPTY_UPPER_RESERVERD_POSITION_MASK.TOKEN_TYPE_UPPER_0_0;
		if(isLowerBoardHalf) {
			mask = REVERSI.EMPTY_UPPER_RESERVERD_POSITION_MASK.TOKEN_TYPE_LOWER_0_0;
		}
		
		//get token type (1=white, 0=black):
		if((this.emptyPositionsUpper & mask) != 0) {
			return REVERSI.TOKEN_TYPE_WHITE;
		} else {
			return REVERSI.TOKEN_TYPE_BLACK;
		}	
	} else {//is not a reserved position
		
		var mask = position.mask;
		
		if(position.canBeEmpty) {
			
			var emptyPositions = this.emptyPositionsUpper;
			if(isLowerBoardHalf) {
				emptyPositions = this.emptyPositionsLower;
			}
			
			if((emptyPositions & mask) != 0) {
				return REVERSI.TOKEN_TYPE_EMPTY;
			}
		}
		
		var tokens = this.tokensUpper;
		if(isLowerBoardHalf) {
			tokens = this.tokensLower;
		}
		
		//get token type (1=white, 0=black):
		if((tokens & mask) != 0) {
			return REVERSI.TOKEN_TYPE_WHITE;
		} else {
			return REVERSI.TOKEN_TYPE_BLACK;
		}	
	}
};

/**
 * @public
 * @returns {REVERSI.ReversiMove}
 */
REVERSI.ReversiGameState.prototype.getLastMove = function() {
	return this.lastMove;
};

/**
 * @public
 * @returns {Boolean}
 */
REVERSI.ReversiGameState.prototype.isGameEnded = function() {
	return this.gameEnded;
};

/**
 * @public
 * @returns {REVERSI.ReversiGameState}
 */
REVERSI.ReversiGameState.prototype.clone = function() {
	var clone = new REVERSI.ReversiGameState(this.playerToMove);
	clone.gameEnded = this.gameEnded;
	clone.tokensUpper = this.tokensUpper;
	clone.tokensLower = this.tokensLower;
	clone.emptyPositionsUpper = this.emptyPositionsUpper;
	clone.emptyPositionsLower = this.emptyPositionsLower;
	clone.lastMove = this.lastMove;
	clone.tokensCount = this.tokensCount;
	clone.hash = this.hash;
	return clone;
};

/**
 * @public
 * @param {String} [endLineSeparator]
 * @returns {String}
 */
REVERSI.ReversiGameState.prototype.toString = function(endLineSeparator) {
	if(arguments.length == 0) {
		endLineSeparator = "\n";
	}
	var str = "To move: " + (this.playerToMove === undefined ? "-none-" : "#" + this.playerToMove.toString()) + 
		", Last move: " + (this.getLastMove() === undefined ? "-none- " : this.getLastMove().toString()) +
		endLineSeparator;
	str += this.toStringBoardOnly(endLineSeparator);
	return str;
};

/**
 * @public
 * @param {String} [endLineSeparator]
 * @returns {String}
 */
REVERSI.ReversiGameState.prototype.toStringBoardOnly = function(endLineSeparator) {
	if(arguments.length == 0) {
		endLineSeparator = "\n";
	}
	var str = "";
	for(var y = 0; y < 8; y++) {
		for(var x = 0; x < 8; x++) {			
			if(this.getTokenType(x, y) === REVERSI.TOKEN_TYPE_WHITE) {
				str += "O";
			} else if(this.getTokenType(x, y) === REVERSI.TOKEN_TYPE_BLACK) {
				str += "*";
			} else if(this.getTokenType(x, y) === REVERSI.TOKEN_TYPE_EMPTY) {
				str += "_";
			}
		}
		str += endLineSeparator;
	}
	return str;
};

/**
 * @public
 * @param {REVERSI.ReversiGameState} gameState
 * @returns {Boolean}
 */
REVERSI.ReversiGameState.prototype.equals = function(gameState) {
	return this.isGameEnded() == gameState.isGameEnded() && 
		this.playerToMove === gameState.playerToMove &&
		this.emptyPositionsUpper == gameState.emptyPositionsUpper &&
		this.emptyPositionsLower == gameState.emptyPositionsLower &&
		this.tokensUpper == gameState.tokensUpper &&
		this.tokensLower == gameState.tokensLower;
};

/**
 * @public
 * @param {REVERSI.ReversiGameState} gameState
 * @returns {Number}
 */
REVERSI.ReversiGameState.prototype.getHashcode = function() {
	return this.hash;
};

/**
 * @public
 * @returns {Number}
 */
REVERSI.ReversiGameState.prototype.updateHashcode = function() {
	this.hash = this.tokensUpper + 2147483647 + this.tokensLower;
};

/**
 * @public
 * @constructor
 * @param {MINIMAX.Player} player
 * @param {Number} x
 * @param {Number} y
 * @param {REVERSI.Position[]} flippedTokensPositions:
 * @returns {REVERSI.ReversiMove}
 */
REVERSI.ReversiMove = function(player, x, y, flippedTokensPositions) {
	this.player = player;
	this.position = REVERSI.POSITION[x][y];
	this.flippedTokensPositions = flippedTokensPositions;
};

/**
 * @public
 * @returns {String}
 */
REVERSI.ReversiMove.prototype.toString = function() {
	return "at (" + this.position.x + ", " +  this.position.y + ") by " + this.player.toString();
};
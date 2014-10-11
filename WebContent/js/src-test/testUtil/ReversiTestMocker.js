var REVERSI = REVERSI = REVERSI || {};

/**
 * @public
 * @constructor
 * @returns {REVERSI.ReversiEvaluator}
 */
REVERSI.ReversiTestMocker = function() {
	this.originalReversiGameStateMove = REVERSI.ReversiGameState.prototype.move;
	
	this.mockedReversiGameStateMove = function(move) {
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
//		if(!this.gameEnded) {
//			var possibleMovesOpponent = REVERSI.REVERSI_GAME_STATE_HELPER.getPossibleMoves(this.playerToMove.opponent, this);	
//			if(possibleMovesOpponent.length > 0) {
//				this.playerToMove = this.playerToMove.opponent;
//			} else {
//				if(REVERSI.REVERSI_GAME_STATE_HELPER.getPossibleMoves(this.playerToMove, this).length == 0) {
//					this.playerToMove = undefined;
//					this.gameEnded = true;
//				}
//			}
//		}
		
		this.updateHashcode();	
	};
	
	this.mockedReversiGameStateGetEvaluationHorizon = function() {
		return 2;
	};
};

REVERSI.ReversiTestMocker.prototype.mockReversiGameStateMove = function() {
	REVERSI.ReversiGameState.prototype.move = this.mockedReversiGameStateMove;
};

REVERSI.ReversiTestMocker.prototype.unmockReversiGameStateMove = function() {
	REVERSI.ReversiGameState.prototype.move = this.originalReversiGameStateMove;
};

REVERSI.REVERSI_TEST_MOCKER = new REVERSI.ReversiTestMocker();
/**
 * @public
 * @constructor
 * @param {PLAYER} playerToMove
 * @returns {FiveInRowGameState}
 */
function FiveInRowGameState(playerToMove) {
	this.playerToMove = playerToMove;
	this.lastMove = null;
};

FiveInRowGameState.prototype = Object.create(MINIMAX.GameState.prototype);
FiveInRowGameState.prototype.constructor = FiveInRowGameState;

/**
 * @public
 * @param {FiveInRowMove} move
 */
FiveInRowGameState.prototype.move = function(move) {
	this.lastMove = move;
	//TODO
};

/**
 * @public
 * @returns {FiveInRowGameState}
 */
FiveInRowGameState.prototype.clone = function() {
	//TODO
	return null;
};

/**
 * @public
 */
FiveInRowGameState.prototype.getHashcode = function() {
	//TODO
};

/**
 * 
 * @param {PLAYER} player
 * @param {Number} x
 * @param {Number} y
 */
function FiveInRowMove(player, x, y) {
	this.player = player;
	this.x = x;
	this.y = y;
}
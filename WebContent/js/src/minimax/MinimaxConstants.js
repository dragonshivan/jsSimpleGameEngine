var MINIMAX = MINIMAX = MINIMAX || {};

/**
 * @public
 * @constructor
 * @param {Number} playerNumber
 * @returns {MINIMAX.Player}
 */
MINIMAX.Player = function(playerNumber) {
	this.playerNumber = playerNumber;
	this.opponent;
};

/**
 * @public
 * @param {String} endLineSeparator
 * @returns {String}
 */
MINIMAX.Player.prototype.toString = function() {
	return "Player #" + this.playerNumber;
};

MINIMAX.PLAYER_1 = new MINIMAX.Player(1);
MINIMAX.PLAYER_2 = new MINIMAX.Player(2);
MINIMAX.PLAYER_1.opponent = MINIMAX.PLAYER_2;
MINIMAX.PLAYER_2.opponent = MINIMAX.PLAYER_1;

MINIMAX.MINIMAX_WIN_SCORE = 1000 * 1000;
MINIMAX.MINIMAX_LOSE_SCORE = -1000 * 1000;

MINIMAX.NODES_HASH_BUCKETS_MAX = 360 * 1000;

/**
 * @public
 * @constructor
 * @param {MINIMAX.Player} winningPlayer
 * @returns {MINIMAX.GameOutcome}
 */
MINIMAX.GameOutcome = function(winningPlayer) {
	this.winningPlayer = winningPlayer;
};

/**
 * @public
 * @returns {String}
 */
MINIMAX.GameOutcome.prototype.toString = function() {
	return (this.winningPlayer !== undefined) ? this.winningPlayer + " has won" : "Draw";
};

MINIMAX.GAME_OUTCOME_WIN_PER_PLAYER = function() {
	var arr = [];
	arr[MINIMAX.PLAYER_1.playerNumber] = new MINIMAX.GameOutcome(MINIMAX.PLAYER_1);
	arr[MINIMAX.PLAYER_2.playerNumber] = new MINIMAX.GameOutcome(MINIMAX.PLAYER_2);
	return arr;
}();
MINIMAX.GAME_OUTCOME_DRAW = new MINIMAX.GameOutcome();
MINIMAX.GAME_OUTCOME_NONE = undefined;
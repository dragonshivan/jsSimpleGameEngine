var REVERSI = REVERSI || {};

/**
 * @public
 * @constructor
 * @returns {REVERSI.UIController}
 */
REVERSI.UIController = function() {
	$("#startGameButton").click(function() {
		var cpuPlayer = MINIMAX.PLAYER_1;
		if($("#blackPlayerOwnerSelect").val() == "HUMAN") {
			cpuPlayer = MINIMAX.PLAYER_2;
		}
		var minimaxEvaluationHorizon = parseInt($("#minimaxEvaluationHorizon").val(), 10);
		new REVERSI.GameUIController().beginGame(cpuPlayer, minimaxEvaluationHorizon);
	});
};
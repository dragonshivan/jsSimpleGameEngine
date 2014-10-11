var REVERSI = REVERSI = REVERSI || {};

/**
 * @public
 * @constructor
 * @param {REVERSI.BoardCellGameEntity[]} boardCellGameEntities
 * @returns {REVERSI.GameUIController}
 */
REVERSI.GameUIController = function(boardCellGameEntities) {
	GAME_LOOP.GameEntity.call(this, 0, 0, 0, 0);
	
	this.boardCellGameEntities = boardCellGameEntities;
	
	this.reversiGameState;
	this.reversiEvaluator;
	this.gameArbiter;
	
	this.humanMovePosition;
	true.waitAfterHumanMove = false;
	
	this.beginGame();
};

REVERSI.GameUIController.prototype = Object.create(GAME_LOOP.GameEntity.prototype);
REVERSI.GameUIController.prototype.constructor = REVERSI.GameUIController;

/**
 * @public
 * @param {Object} inputEvent
 */
REVERSI.GameUIController.prototype.processInput =  function(inputEvent) {
	this.highligtCell(inputEvent);
	if(inputEvent.type == GAME_LOOP.IO.MOUSE_UP) {
		this.humanMovePosition = new REVERSI.Position(Math.floor(inputEvent.canvasX / REVERSI.UI.CELL_SIZE), 
				Math.floor(inputEvent.canvasY / REVERSI.UI.CELL_SIZE));
	};
};

/**
 * @public
 */
REVERSI.GameUIController.prototype.updateState =  function() {
	this.updateCellsTokens();
	if(this.reversiGameState.isGameEnded()) {
		console.log("game ended");
		return;
	}
	if(this.reversiGameState.getPlayerToMove() === this.gameArbiter.getCpuPlayer()) {
		if(this.waitAfterHumanMove) {
			this.waitAfterHumanMove = false;
			return;
		}
		this.reversiGameState = this.gameArbiter.advanceGame();
	} else {
		if(this.humanMovePosition !== undefined) {
			try {
				this.reversiGameState = this.gameArbiter.advanceGame(this.humanMovePosition);
				this.waitAfterHumanMove = true;
				this.humanMovePosition = undefined;
			} catch(e) {
				console.log(e);
				this.humanMovePosition = undefined;
			}
		}
	}
};

/**
 * @private
 */
REVERSI.GameUIController.prototype.highligtCell =  function(inputEvent) {
	for(var x = 0; x < 8; x++) {
		for(var y = 0; y < 8; y++) {
			this.boardCellGameEntities[x][y].highlight = false;
		}
	}
	if(inputEvent.type == GAME_LOOP.IO.MOUSE_OUT) {
		return;
	}
	this.boardCellGameEntities[Math.floor(inputEvent.canvasX / REVERSI.UI.CELL_SIZE)]
		[Math.floor(inputEvent.canvasY / REVERSI.UI.CELL_SIZE)].highlight = true;	
};

/**
 * @private
 */
REVERSI.GameUIController.prototype.updateCellsTokens =  function(inputEvent) {
	for(var x = 0; x < 8; x++) {
		for(var y = 0; y < 8; y++) {
			this.boardCellGameEntities[x][y].tokenType = this.reversiGameState.getTokenType(x, y);
		}
	}
};

/**
 * @private
 */
REVERSI.GameUIController.prototype.beginGame =  function() {
	this.reversiGameState = new REVERSI.ReversiGameState(MINIMAX.PLAYER_1);
	this.reversiEvaluator = new REVERSI.ReversiEvaluator(MINIMAX.PLAYER_2);
	this.reversiEvaluator.addEvaluationCriterion(REVERSI.EVALUATION_CRITERIA_DICTIONARY["MOVE_COUNTER"]);
	this.reversiEvaluator.addEvaluationCriterion(REVERSI.EVALUATION_CRITERIA_DICTIONARY["EDGE_TOKEN_COUNTER"]);
	this.reversiEvaluator.evaluationHorizon = 5;
	this.gameArbiter = new MINIMAX.GameArbiter(this.reversiEvaluator, this.reversiGameState);
};
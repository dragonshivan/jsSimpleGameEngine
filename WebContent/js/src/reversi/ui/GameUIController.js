var REVERSI = REVERSI || {};

/**
 * @public
 * @constructor
 * @returns {REVERSI.GameUIController}
 */
REVERSI.GameUIController = function() {
	GAME_LOOP.GameEntity.call(this, 0, 0, 0, 0);
	
	this.boardCellGameEntities;
	
	this.reversiGameState;
	this.reversiEvaluator;
	this.gameArbiter;
	
	this.humanMovePosition;
};

REVERSI.GameUIController.prototype = Object.create(GAME_LOOP.GameEntity.prototype);
REVERSI.GameUIController.prototype.constructor = REVERSI.GameUIController;

/**
 * @private
 * @param {MINIMAX.Player} cpuPlayer
 * @param {Number} minimaxEvaluationHorizon
 */
REVERSI.GameUIController.prototype.beginGame =  function(cpuPlayer, minimaxEvaluationHorizon) {
	this.reversiGameState = new REVERSI.ReversiGameState(MINIMAX.PLAYER_1);
	this.reversiEvaluator = new REVERSI.ReversiEvaluator(cpuPlayer);
	this.reversiEvaluator.addEvaluationCriterion(REVERSI.EVALUATION_CRITERIA_DICTIONARY["MOVE_COUNTER"]);
	this.reversiEvaluator.addEvaluationCriterion(REVERSI.EVALUATION_CRITERIA_DICTIONARY["EDGE_TOKEN_COUNTER"]);
	this.reversiEvaluator.evaluationHorizon = minimaxEvaluationHorizon;
	this.gameArbiter = new MINIMAX.GameArbiter(this.reversiEvaluator, this.reversiGameState);
	
	var gameBoardEntity = new REVERSI.BoardGameEntity();
	
	var gameEntitiesIdx = 0;
	var gameEntities = [];
	var boardCellGameEntities = [];
	gameEntities[gameEntitiesIdx++] = gameBoardEntity;		
	for(var x = 0; x < 8; x++) {
		boardCellGameEntities[x] = [];
		for(var y = 0; y < 8; y++) {
			var boardCellGameEntity = new REVERSI.BoardCellGameEntity(x, y);
			gameEntities[gameEntitiesIdx++] = boardCellGameEntity;
			boardCellGameEntities[x][y] = boardCellGameEntity;
		}
	}
	this.boardCellGameEntities = boardCellGameEntities;
	gameEntities[gameEntitiesIdx++] = this;
	
	var inputEventQueue = new GAME_LOOP.Queue(10);
	new GAME_LOOP.CanvasMouseListener(inputEventQueue);
	var gameLoop = new GAME_LOOP.GameLoop(gameEntities, inputEventQueue, REVERSI.UI.BOARD_SIZE, REVERSI.UI.BOARD_SIZE);
	gameLoop.start();
};

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
	if(this.areTokensFlipping()) {
		return;
	}
	if(this.reversiGameState.isGameEnded()) {
		return;
	}
	if(this.reversiGameState.getPlayerToMove() === this.gameArbiter.getCpuPlayer()) {
		this.reversiGameState = this.gameArbiter.advanceGame();
		this.updateCellsTokens();
	} else {
		if(this.humanMovePosition !== undefined) {
			try {
				this.reversiGameState = this.gameArbiter.advanceGame(this.humanMovePosition);
				this.updateCellsTokens();	
				this.humanMovePosition = undefined;
			} catch(e) {
				console.log(e);
				this.humanMovePosition = undefined;
			}
		}
	}
};

/**
 * @public
 * @param {CanvasRenderingContext2D} context
 */
REVERSI.GameUIController.prototype.updateGraphics =  function(context) {
	if(this.areTokensFlipping()) {
		$("body").css("cursor", "progress");
	} else {
		$("body").css("cursor", "default");
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
REVERSI.GameUIController.prototype.updateCellsTokens =  function() {
	var lastMove = this.reversiGameState.lastMove;
	if(lastMove === undefined) {
		return;
	}
	var tokenType = REVERSI.TOKEN_TYPE_WHITE;
	if(lastMove.player === MINIMAX.PLAYER_1) {
		tokenType = REVERSI.TOKEN_TYPE_BLACK;
	}
	this.boardCellGameEntities[lastMove.position.x][lastMove.position.y].tokenType = tokenType;
	
	for(var i = 0; i < lastMove.flippedTokensPositions.length; i++) {
		var flippedPosition = lastMove.flippedTokensPositions[i];
		this.boardCellGameEntities[flippedPosition.x][flippedPosition.y].flip();
	}
};

/**
 * @private
 */
REVERSI.GameUIController.prototype.areTokensFlipping = function() {
	for(var x = 0; x < 8; x++) {
		for(var y = 0; y < 8; y++) {
			if(this.boardCellGameEntities[x][y].isFlipping()) {
				return true;
			}
		}
	}
	return false;
};
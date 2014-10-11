AtlastAnimationTestCase = TestCase("AtlastAnimationTestCase");

AtlastAnimationTestCase.prototype.testNonLooping = function() {
	var originalStepDuration = GAME_LOOP.FIXED_STEP_IDEAL_DURATION_MS;
	var originalUps = GAME_LOOP.FIXED_UPDATES_IN_A_SECOND;
	GAME_LOOP.FIXED_STEP_IDEAL_DURATION_MS = 1000 / 50;
	GAME_LOOP.FIXED_UPDATES_IN_A_SECOND = 1000 / GAME_LOOP.FIXED_STEP_IDEAL_DURATION_MS;
	
	var animation = new GAME_LOOP.AtlasAnimation(new Image(),
			[new GAME_LOOP.ImageCrop(0,0,0,0,0,0,0,0),
			 new GAME_LOOP.ImageCrop(1,1,0,0,0,0,0,0),
			 new GAME_LOOP.ImageCrop(2,2,0,0,0,0,0,0),
			 new GAME_LOOP.ImageCrop(3,3,0,0,0,0,0,0),
			 new GAME_LOOP.ImageCrop(4,4,0,0,0,0,0,0)],
			 25);
	var drawArguments;
	var context2D = this.mockContext2D();
	
	assertFalse(animation.isStarted());
	assertFalse(animation.isFinished());
	
	animation.onGameStateUpdate();
	animation.onGraphicsUpdate(context2D, 0, 0);
	assertUndefined(context2D.lastArguments);
	assertFalse(animation.isStarted());
	assertFalse(animation.isFinished());
	
	animation.start();
	
	animation.onGameStateUpdate();
	animation.onGraphicsUpdate(context2D, 0, 0);
	assertEquals(0, context2D.lastArguments[1]);
	assertEquals(0, context2D.lastArguments[2]);
	assertTrue(animation.isStarted());
	assertFalse(animation.isFinished());
	
	animation.onGameStateUpdate();
	animation.onGraphicsUpdate(context2D, 0, 0);
	assertEquals(0, context2D.lastArguments[1]);
	assertEquals(0, context2D.lastArguments[2]);
	assertTrue(animation.isStarted());
	assertFalse(animation.isFinished());
	
	animation.onGameStateUpdate();
	animation.onGraphicsUpdate(context2D, 0, 0);
	assertEquals(1, context2D.lastArguments[1]);
	assertEquals(1, context2D.lastArguments[2]);
	assertTrue(animation.isStarted());
	assertFalse(animation.isFinished());
	
	animation.onGameStateUpdate();
	animation.onGraphicsUpdate(context2D, 0, 0);
	assertEquals(1, context2D.lastArguments[1]);
	assertEquals(1, context2D.lastArguments[2]);
	assertTrue(animation.isStarted());
	assertFalse(animation.isFinished());
	
	animation.onGameStateUpdate();
	animation.onGraphicsUpdate(context2D, 0, 0);
	assertEquals(2, context2D.lastArguments[1]);
	assertEquals(2, context2D.lastArguments[2]);
	assertTrue(animation.isStarted());
	assertFalse(animation.isFinished());
	
	animation.onGameStateUpdate();
	animation.onGraphicsUpdate(context2D, 0, 0);
	assertEquals(2, context2D.lastArguments[1]);
	assertEquals(2, context2D.lastArguments[2]);
	assertTrue(animation.isStarted());
	assertFalse(animation.isFinished());
	
	animation.onGameStateUpdate();
	animation.onGraphicsUpdate(context2D, 0, 0);
	assertEquals(3, context2D.lastArguments[1]);
	assertEquals(3, context2D.lastArguments[2]);
	assertTrue(animation.isStarted());
	assertFalse(animation.isFinished());
	
	animation.onGameStateUpdate();
	animation.onGraphicsUpdate(context2D, 0, 0);
	assertEquals(3, context2D.lastArguments[1]);
	assertEquals(3, context2D.lastArguments[2]);
	assertTrue(animation.isStarted());
	assertFalse(animation.isFinished());
	
	animation.onGameStateUpdate();
	animation.onGraphicsUpdate(context2D, 0, 0);
	assertEquals(4, context2D.lastArguments[1]);
	assertEquals(4, context2D.lastArguments[2]);
	assertTrue(animation.isStarted());
	assertFalse(animation.isFinished());
	
	animation.onGameStateUpdate();
	animation.onGraphicsUpdate(context2D, 0, 0);
	assertEquals(4, context2D.lastArguments[1]);
	assertEquals(4, context2D.lastArguments[2]);
	assertTrue(animation.isStarted());
	assertFalse(animation.isFinished());
	
	animation.onGameStateUpdate();
	animation.onGraphicsUpdate(context2D, 0, 0);
	assertFalse(animation.isStarted());
	assertTrue(animation.isFinished());
	
	GAME_LOOP.FIXED_STEP_IDEAL_DURATION_MS = originalStepDuration;
	GAME_LOOP.FIXED_UPDATES_IN_A_SECOND = originalUps;
};

AtlastAnimationTestCase.prototype.testLooping = function() {
	var originalStepDuration = GAME_LOOP.FIXED_STEP_IDEAL_DURATION_MS;
	var originalUps = GAME_LOOP.FIXED_UPDATES_IN_A_SECOND;
	GAME_LOOP.FIXED_STEP_IDEAL_DURATION_MS = 1000 / 50;
	GAME_LOOP.FIXED_UPDATES_IN_A_SECOND = 1000 / GAME_LOOP.FIXED_STEP_IDEAL_DURATION_MS;
	
	var animation = new GAME_LOOP.AtlasAnimation(new Image(),
			[new GAME_LOOP.ImageCrop(0,0,0,0,0,0,0,0),
			 new GAME_LOOP.ImageCrop(1,1,0,0,0,0,0,0),
			 new GAME_LOOP.ImageCrop(2,2,0,0,0,0,0,0),
			 new GAME_LOOP.ImageCrop(3,3,0,0,0,0,0,0),
			 new GAME_LOOP.ImageCrop(4,4,0,0,0,0,0,0)],
			 25,
			 true);
	var drawArguments;
	var context2D = this.mockContext2D();
	
	assertFalse(animation.isStarted());
	assertFalse(animation.isFinished());
	
	animation.onGameStateUpdate();
	animation.onGraphicsUpdate(context2D, 0, 0);
	assertUndefined(context2D.lastArguments);
	assertFalse(animation.isStarted());
	assertFalse(animation.isFinished());
	
	animation.start();
	
	animation.onGameStateUpdate();
	animation.onGraphicsUpdate(context2D, 0, 0);
	assertEquals(0, context2D.lastArguments[1]);
	assertEquals(0, context2D.lastArguments[2]);
	assertTrue(animation.isStarted());
	assertFalse(animation.isFinished());
	
	animation.onGameStateUpdate();
	animation.onGraphicsUpdate(context2D, 0, 0);
	assertEquals(0, context2D.lastArguments[1]);
	assertEquals(0, context2D.lastArguments[2]);
	assertTrue(animation.isStarted());
	assertFalse(animation.isFinished());
	
	animation.onGameStateUpdate();
	animation.onGraphicsUpdate(context2D, 0, 0);
	assertEquals(1, context2D.lastArguments[1]);
	assertEquals(1, context2D.lastArguments[2]);
	assertTrue(animation.isStarted());
	assertFalse(animation.isFinished());
	
	animation.onGameStateUpdate();
	animation.onGraphicsUpdate(context2D, 0, 0);
	assertEquals(1, context2D.lastArguments[1]);
	assertEquals(1, context2D.lastArguments[2]);
	assertTrue(animation.isStarted());
	assertFalse(animation.isFinished());
	
	animation.onGameStateUpdate();
	animation.onGraphicsUpdate(context2D, 0, 0);
	assertEquals(2, context2D.lastArguments[1]);
	assertEquals(2, context2D.lastArguments[2]);
	assertTrue(animation.isStarted());
	assertFalse(animation.isFinished());
	
	animation.onGameStateUpdate();
	animation.onGraphicsUpdate(context2D, 0, 0);
	assertEquals(2, context2D.lastArguments[1]);
	assertEquals(2, context2D.lastArguments[2]);
	assertTrue(animation.isStarted());
	assertFalse(animation.isFinished());
	
	animation.onGameStateUpdate();
	animation.onGraphicsUpdate(context2D, 0, 0);
	assertEquals(3, context2D.lastArguments[1]);
	assertEquals(3, context2D.lastArguments[2]);
	assertTrue(animation.isStarted());
	assertFalse(animation.isFinished());
	
	animation.onGameStateUpdate();
	animation.onGraphicsUpdate(context2D, 0, 0);
	assertEquals(3, context2D.lastArguments[1]);
	assertEquals(3, context2D.lastArguments[2]);
	assertTrue(animation.isStarted());
	assertFalse(animation.isFinished());
	
	animation.onGameStateUpdate();
	animation.onGraphicsUpdate(context2D, 0, 0);
	assertEquals(4, context2D.lastArguments[1]);
	assertEquals(4, context2D.lastArguments[2]);
	assertTrue(animation.isStarted());
	assertFalse(animation.isFinished());
	
	animation.onGameStateUpdate();
	animation.onGraphicsUpdate(context2D, 0, 0);
	assertEquals(4, context2D.lastArguments[1]);
	assertEquals(4, context2D.lastArguments[2]);
	assertTrue(animation.isStarted());
	assertFalse(animation.isFinished());
	
	animation.onGameStateUpdate();
	animation.onGraphicsUpdate(context2D, 0, 0);
	assertEquals(0, context2D.lastArguments[1]);
	assertEquals(0, context2D.lastArguments[2]);
	assertTrue(animation.isStarted());
	assertFalse(animation.isFinished());
	
	animation.onGameStateUpdate();
	animation.onGraphicsUpdate(context2D, 0, 0);
	assertEquals(0, context2D.lastArguments[1]);
	assertEquals(0, context2D.lastArguments[2]);
	assertTrue(animation.isStarted());
	assertFalse(animation.isFinished());
	
	animation.onGameStateUpdate();
	animation.onGraphicsUpdate(context2D, 0, 0);
	assertEquals(1, context2D.lastArguments[1]);
	assertEquals(1, context2D.lastArguments[2]);
	assertTrue(animation.isStarted());
	assertFalse(animation.isFinished());
	
	animation.onGameStateUpdate();
	animation.onGraphicsUpdate(context2D, 0, 0);
	assertEquals(1, context2D.lastArguments[1]);
	assertEquals(1, context2D.lastArguments[2]);
	assertTrue(animation.isStarted());
	assertFalse(animation.isFinished());
	
	animation.onGameStateUpdate();
	animation.onGraphicsUpdate(context2D, 0, 0);
	assertEquals(2, context2D.lastArguments[1]);
	assertEquals(2, context2D.lastArguments[2]);
	assertTrue(animation.isStarted());
	assertFalse(animation.isFinished());
	
	GAME_LOOP.FIXED_STEP_IDEAL_DURATION_MS = originalStepDuration;
	GAME_LOOP.FIXED_UPDATES_IN_A_SECOND = originalUps;
};

AtlastAnimationTestCase.prototype.mockContext2D = function() {
	var context2D = {
			lastArguments: undefined,
			drawImage: function() {
				this.lastArguments = arguments;
			}
	};
	return context2D;
};
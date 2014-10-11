FiniteStateMachineTestCase = TestCase("FiniteStateMachineTestCase");

FiniteStateMachineTestCase.prototype.test2StatesTransition = function() {
	var State = function(callCountLimit) {
		this.callCountLimit = callCountLimit;
		this.callCount = 0;
	};
	State.prototype = Object.create(GAME_LOOP.FSMState.prototype);
	State.prototype.constructor = State;
	State.prototype.onGameStateUpdate = function() {
		this.callCount++;
	};
	
	var state1 = new State(2);
	var state2 = new State(3);
	
	var TransitionEvent12 = function() {
		GAME_LOOP.FSMTransitionEvent.call(this, state1, state2);
	};
	TransitionEvent12.prototype = Object.create(GAME_LOOP.FSMTransitionEvent.prototype);
	TransitionEvent12.prototype.constructor = TransitionEvent12;
	TransitionEvent12.prototype.isTransition = function() {
		return this.currentState.callCount >= this.currentState.callCountLimit;
	};
	
	var transitionEvent12 = new TransitionEvent12();
	
	var fsm = new GAME_LOOP.FiniteStateMachine(state1, [transitionEvent12]);
	
	fsm.onGameStateUpdate();
	assertEquals(1, state1.callCount);
	
	fsm.onGameStateUpdate();
	assertEquals(2, state1.callCount);
	
	fsm.onGameStateUpdate();
	assertEquals(2, state1.callCount);
	assertEquals(1, state2.callCount);
	
	fsm.onGameStateUpdate();
	assertEquals(2, state1.callCount);
	assertEquals(2, state2.callCount);
};
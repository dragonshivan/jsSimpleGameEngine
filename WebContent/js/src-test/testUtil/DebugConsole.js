var TEST_UTILS = TEST_UTILS = TEST_UTILS || {};

TEST_UTILS.DebugConsole = function() {
	
};

TEST_UTILS.DebugConsole.prototype.toConsole = function(message) {
	console.log(message);
};

TEST_UTILS.DEBUG_CONSOLE = new TEST_UTILS.DebugConsole();
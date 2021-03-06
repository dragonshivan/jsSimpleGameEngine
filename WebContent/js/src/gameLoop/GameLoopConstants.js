var GAME_LOOP = GAME_LOOP = GAME_LOOP || {};

GAME_LOOP.FIXED_STEP_IDEAL_DURATION_MS = 1000 / 50; //1000/X where X = desired (ideal) state updates per second
GAME_LOOP.FIXED_UPDATES_IN_A_SECOND = 1000 / GAME_LOOP.FIXED_STEP_IDEAL_DURATION_MS;

GAME_LOOP.CANVAS_ID = "canvas";

GAME_LOOP.IO = {};
GAME_LOOP.IO.MOUSE_MOVE = "mousemove";
GAME_LOOP.IO.MOUSE_UP = "mouseup";
GAME_LOOP.IO.MOUSE_DOWN = "mousedown";
GAME_LOOP.IO.MOUSE_OVER = "mouseover";
GAME_LOOP.IO.MOUSE_OUT = "mouseout";
GAME_LOOP.IO.MOUSE_BUTTON_LEFT = 1;
GAME_LOOP.IO.MOUSE_BUTTON_RIGHT = 3;
GAME_LOOP.IO.MOUSE_BUTTON_MIDDLE = 2;

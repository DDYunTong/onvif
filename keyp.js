/* eslint-disable node/no-unpublished-require */
/* eslint-disable camelcase */

var keypress = require('keypress');

var ignore_keypress = false;
// listen for the "keypress" events
keypress(process.stdin);
process.stdin.setRawMode(true);
process.stdin.resume();

console.log('');
console.log('Use Cursor Keys to move camera. + and - to zoom. q to quit');

// keypress handler
process.stdin.on('keypress', function(ch, key) {

	/* Exit on 'q' or 'Q' or 'CTRL C' */
	if ((key && key.ctrl && key.name == 'c')
				|| (key && key.name == 'q')) {
		throw new Error("User quited!");
	}

	if (ignore_keypress) {
		return;
	}

	if (key) {
		console.log('got "keypress"',key.name);
	} else {
		if (ch){console.log('got "keypress character"',ch);}
	}
			
	// On English keyboards '+' is "Shift and = key"
	// Accept the "=" key as zoom in
	if (key && key.name == 'up')    {
		console.log(0,1,0,'up');
	} else if (key && key.name == 'down')  {
		console.log(0,-1,0,'down');
	} else if (key && key.name == 'left')  {
		console.log(-1,0,0,'left');
	} else if (key && key.name == 'right') {
		console.log(1,0,0,'right');
	} else if (ch  && ch       == '-')     {
		console.log(0,0,-1,'zoom out');
	} else if (ch  && ch       == '+')     {
		console.log(0,0,1,'zoom in');
	} else if (ch  && ch       == '=')     {
		console.log(0,0,1,'zoom in');
	} else if (ch  && ch >= '1' && ch <= '9') {
		console.log(ch);
	}
});
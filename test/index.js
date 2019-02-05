const test = require('ava')
const async = require('../index.js')

test('Basic', t => {
	var foo = async(() => true);
	foo.exec(function(value) {
		t.true(value, 'Check if the returned value is true');
	},function(e) {
		t.fail('Error throwed, failing');
	});
});

test('Pass Arguments', t => {
	var foo = async(function(arg) {return arg;},[true]);
	foo.exec(value => {
		t.true(value,'Passed -Pass Arguments- test');
	},e => {
		t.fail('Error throwed, failing');
	});
});

test('Error Handling', t => {
	var foo = async(() => {throw new Error();});
	foo.exec(value => {
		t.fail('Not throwing error, failing')
	},e => {
		t.true(e instanceof Error, "Throwing error and passed to rejected listener, passing")
	});
})

test('Change Task', t => {
	var foo = async(function() {return true;});
	foo.task = function() {
		return false;
	}
	foo.exec(value => {
		t.false(value,"Passed -Change Task- test");
	}, e => {
		t.fail('Error throwed, failing');
	});
})

test('Change Arguments', t => {
	var bar = async(function(arg) {return arg;},[true]);
	bar.args = [false];
	bar.exec(function(value){t.false(value, "Passed -Change Arguments- test");},function(e) {t.fail('Error throwed, failing')});
})

test('Custom Event', t => {
	var fn = function() {
		this.emit('custom','custom event'); //The this object is an instance of eventemitter2, injected by the apply() function
		return 'hello custom';
	};
	
	var resHandler = function(value) {
		t.deepEqual(value, 'hello custom');
	};
	
	var rejHandler = function(e) {
		t.fail('Error throwed, failing')
	};
	
	var foo = async(fn)
	
	foo.event.on('custom', function(value) {t.deepEqual(value, 'custom event')});
	
	foo.exec(resHandler,rejHandler);
})

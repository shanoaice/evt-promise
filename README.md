# evt-async
[![Build Status](https://dev.azure.com/ksryy/evt-async/_apis/build/status/KsRyY.evt-async?branchName=master)](https://dev.azure.com/ksryy/evt-async/_build/latest?definitionId=1&branchName=master) [![Build Status](https://travis-ci.com/KsRyY/evt-async.svg?branch=master)](https://travis-ci.com/KsRyY/evt-async)

> An event-driven solution for async functions

## Install

``` bash
npm install evt-async
```

## Usage

**BASIC:**
``` javascript
const async = require('evt-async');

//Simple usage
var foo = async(function() {return true;});
foo.exec(function(value){console.log(value);},function(e) {throw e;}); //Will print true

//Catch errors
var bar = async(function() {throw new Error('TEST');});
bar.exec(function(v){}, function(e){console.error(e.message);}); //Will print 'TEST' at stderr

//Pass arguments
var baz = async(function(arg) {return arg;},[true]);
baz.exec(function(value){console.log(value);},function(e) {throw e;}); //Will print true
```

**Advanced - Change the task that you want to run, Change the arguments that you want to pass to the task function:**
``` javascript
const async = require('evt-async');

//Change the task
var foo = async(function() {return true});
foo.task = function() {
	return false;
}
foo.exec(function(value){console.log(value);},function(e) {throw e;}); //Will print false, not true

//Change the arguments
var bar = async(function(arg) {return arg;},[true]);
bar.args = [false];
bar.exec(function(value){console.log(value);},function(e) {throw e;}); //Will print false not true
```

**Advanced - Emit custom events in the task and handle it**
``` javascript
const async = require('evt-async');

var fn = function() {
	this.emit('custom','custom event'); //The this object is an instance of eventemitter2, injected by the apply() function
	return 'hello custom';
};

var resHandler = function(value) {
	console.log(value);
};

var rejHandler = function(e) {
	throw e;
};

var foo = async(fn)

foo.event.on('custom', function(value) {console.log(value);});

foo.exec(resHandler,rejHandler); //Will print 'custom event' and then 'hello coustom'
```
***Warning: If you use arrow function as the task, this example won't work because you cannot inject a this object to an arrow function***

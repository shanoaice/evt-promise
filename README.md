# evt-promise
[![Build Status](https://travis-ci.com/KsRyY/evt-promise.svg?branch=master)](https://travis-ci.com/KsRyY/evt-promise) [![Coverage Status](https://coveralls.io/repos/github/KsRyY/evt-promise/badge.svg?branch=master)](https://coveralls.io/github/KsRyY/evt-promise?branch=master)

> An event-driven promise-like function wrapper, has a different api through the ES6 Promise

## Install

``` bash
npm install evt-promise --save
```

## Usage

If you don’t understand the examples below or you want to see more detailed usage, have a look at [this](./docs/README.md)

### BASIC - Legacy API:
``` javascript
const evt = require('evt-promise');

//Simple usage
var foo = evt(function() {return true;});
foo.exec(function(value){console.log(value);},function(e) {throw e;}); //Will print true

//Catch errors
var bar = evt(function() {throw new Error('TEST');});
bar.exec(function(v){}, function(e){console.error(e.message);}); //Will print 'TEST' at stderr

//Pass arguments
var baz = evt(function(arg) {return arg;},[true]);
baz.exec(function(value){console.log(value);},function(e) {throw e;}); //Will print true
```

### BASIC - Promise-like API

``` javascript
const evt = require('evt-promise');

//Simple usage
var foo = evt.promiseLike(function() {this.emit('resolved',true)});
foo.then(function(value){console.log(value);})
   .catch(function(e) {throw e;}); //Will print true

//Catch errors
var bar = evt.promiseLike(function() {this.emit.('rejected', new Error('TEST'));});
bar.then(function(v){})
   .catch(function(e){console.error(e.message);}); //Will print 'TEST' at stderr

//Pass arguments
var baz = evt.promiseLike(function(arg) {this.emit('resolved',arg)},[true]);
baz.then(function(value){console.log(value);})
   .catch(function(e) {throw e;}); //Will print true
```

***Warning: If you are using arrow function as the task in any of the examples that uses new Promise-like API, they won't work because you can't inject a this object to an arrow function***

### BASIC - Promise API

``` javascript

```

### Advanced - Change the task that you want to run, Change the arguments that you want to pass to the task function - Legacy API:

``` javascript
const evt = require('evt-promise');

//Change the task
var foo = evt(function() {return true});
foo.task = function() {
	return false;
}
foo.exec(function(value){console.log(value);},function(e) {throw e;}); //Will print false, not true

//Change the arguments
var bar = evt(function(arg) {return arg;},[true]);
bar.args = [false];
bar.exec(function(value){console.log(value);},function(e) {throw e;}); //Will print false not true
```

### Advanced - Emit custom events in the task and handle it - Legacy API

``` javascript
const evt = require('evt-promise');

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

var foo = evt(fn)

foo.event.on('custom', function(value) {console.log(value);});

foo.exec(resHandler,rejHandler); //Will print 'custom event' and then 'hello coustom'
```
***Warning: If you use arrow function as the task, this example won't work because you cannot inject a this object to an arrow function***

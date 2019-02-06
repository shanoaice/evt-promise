# evt-promise Legacy API Docs

> This doc is not only an API doc, but also a guideline.

I suggest you to import `evt-promise` as `evt`

``` javascript
const evt = require('evt-promise');
```

To use Legacy API to wrap a function, see the syntax below:

``` javascript
evt(fn, fnArgs)
```

The `fn` parameter is the function that you want to wrap it with `evt-promise`, the `fnArgs` parameter is an array of arguments that you want to pass to the `fn` that you wrapped **(OPTIONAL, default is `[]`)**.

This function will return an object containing the arguments and the function that you wrapped and lots more, for the keys of the returned object, **SEE BELOW:**

``` javascript
{
    task: fn, //The function that you wrapped
    args: fnArgs, //The array of arguments that you want to pass to the function that you wrapped
    event: event, //An instance of the event emitter that used by the evt-promise
    exec: function(onResolvedHandler,onRejectedHandler) {...} //The function that you can use for executing the wrapped function, for more usage, see docs below
}
```

The very important thing is the `exec` key in the returned object, it is used to run the wrapped function. It has two parameters, `onResolvedHandler` and `onRejectedHandler`, shown above. They are used to register the handler that will be emitted once after the wrapped function is either `resolved`(returned a value) or `rejected`(throws an error), the returned value or the thrown error will be passed to the handler as an argument. **NOTE: These two parameter `onResolvedHandler` and `onRejectedHandler` is optional, you can register these two handler in the key `event`,a event emitter. The two status `rejected` and `resolved` corresponds with the event key `rejected`, `resolved`, below is an example:**

``` javascript
const evt = require('evt-promise')

var fn = () => true

var foo = evt(fn)

foo.event.once('resolved', value => console.log(value))
foo.event.once('rejected', e => {})

foo.exec() //Will print 'true'
```

You can change the function that you wrapped with the `task` key in the returned object, and you can also change the arguments that you want to pass to the wrapped function with the `args` key in the returned object.

### Advance usage

Have a look at a snippet form the source code:

``` javascript
this.task.apply(this.event,this.args)
```

It is from the exec function in the returned object, its usage is to apply the event emitter instance as the function’s `this` object. This means what? This means that you can emit custom events through the `this` object and register handler outside. You can use it to do a lot of cool thing, but there’s also a problem that if you use an arrow function as your task this won’t work, because you cannot apply any object as a `this` object for an arrow function, so watch out!
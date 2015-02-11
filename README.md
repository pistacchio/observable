# Observable

A javascript library with CommonJs support for simple publishing / subscribing of events. Tested with [mocha](http://mochajs.org/)

## Usage

``` javascript
var observable = require('observable'),
    obj = observable(1),
    id;

console.log(obj());
// 1

obj(2);
console.log(obj());
// 2

obj.sub(function(evt, val) {
    console.log(val);
    // 3
});
obj(3);

obj.sub('myevent', function(evt, val1, val2) {
    console.log(val1, val2);
    // 4, 5
});
obj.trigger('myevent', 4, 5);

id = obj.sub('myevent2', function(evt, val) {
    console.log(val);
    // Never reached
});
obj.unsub(id);
obj(6);

```
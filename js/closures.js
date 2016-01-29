/**
 * Closures
 *
 * Closure is when a function 'remembers' its lexical scope even when the function is executing outside that lexical scope. ~ Kyle Simpson
 *
 * Closures are useful in hiding the implementation of functionality while still revealing the interface.
 *
 * @Reference:
 * http://stackoverflow.com/questions/2728278/what-is-a-practical-use-for-a-closure-in-javascript
 */

// EXAMPLE
function foo() {
  var bar = 'bar';

  function baz() {
    console.log(bar);
  }

  bam(baz);
}

function bam(baz) {
  baz();  // bar
}
foo();


// PRACTICAL USE CASES

// 1. To enforce public/private methods.

/**
 * As you can see there, a is now an object, with a method publicfunction ( a.publicfunction() ) which calls privatefunction,
 * which only exists inside the closure.
 *
 * You can NOT call privatefunction directly (i.e. a.privatefunction() ), just publicfunction().
 */
var a = (function () {
  var privateFunction = function () {
    console.log('Accessed private method');
  };

  return {
    publicFunction: function () {
      privateFunction();
    }
  }
})();

/**
 * For example, imagine you are writing a class of date utility methods and you want to allow users to lookup
 * weekday names by index but you don't want them to be able to modify the array of names you use under the hood.
 *
 * In dateUtil(), note that the days array could simply be stored as a property of the dateUtil object but then it would be
 * visible to users of the script and they could even change it if they wanted, without even needing your source code.
 * However, since it's enclosed by the anonymous function which returns the date lookup function it is
 * only accessible by the lookup function so it is now tamper-proof.
 */

var dateUtil = {
  weekdayShort: (function () {
    var days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    return function (x) {
      if ((x != parseInt(x)) || (x < 1) || (x > 7)) {
        throw new Error("invalid weekday number");
      }
      return days[x - 1];
    };
  }())
};
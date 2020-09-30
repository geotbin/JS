import { output, randint } from './utils.js';

const INITIAL_RESULT = -10;
let result = INITIAL_RESULT;

/*
 * define a function that asynchonously assigns value to result
 */
let someAsyncFunction = value => {
    window.setTimeout(
        () => result = value,           // assign value to result
        randint(250)                    // random delay before call
    );
  }

/*
 * make asynchronous call and tries to sequentially use the result : with no success
 */
var makeAsynchronousCallAndTriesToUseTheResult = () => {
  let x = 0;
  output(`I am before asynchronous call : result is ${result} and x is ${x}`);
  // asynchronous call that sets result
  someAsyncFunction(10);
  // want to do something with result after asynchronous call
  x = x + result;
  output(`I am after asynchronous call : result is ${result} and x is ${x}`);
  output(`I am after asynchronous call : result has ${ result === INITIAL_RESULT ? 'not (yet)' : ''} been modified`);
}


makeAsynchronousCallAndTriesToUseTheResult();

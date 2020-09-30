import { output, randint } from './utils.js';

const INITIAL_RESULT = -10;
let result = INITIAL_RESULT;

/*
 * asynchonously set 'result' value to 'value'
 */
 var someAsyncFunctionWithCallback = (value, callback) => {
   window.setTimeout(
       () => {
         // asynchronously make some computation with 'value' to produce 'something'
         result = value;
         // after job is done, 'callback' is called
         callback();
       },
       randint(1000)                     // random delay before call
   );
 }

/*
 * make one asynchronous call and use a callback to make something after the asynrhonous job is done
 */
var makeAsynchronousCallWithCallBack = () => {
  let x = 0;

  output(`I am before asynchronous call : result is ${result} and x is ${x}`);
  // asynchronous call that sets 'result' then call 'callback'
  someAsyncFunctionWithCallback( 10,
      () => {               // the callback function : wants to do something with result after asynchronous computation
        x = x + result;
        output(`I am the callback function : result is ${result} and x is ${x}`);
        output(`I am the callback function : result has ${ result === INITIAL_RESULT ? 'not (yet)' : ''} been modified`);
      }
  );
}


makeAsynchronousCallWithCallBack();

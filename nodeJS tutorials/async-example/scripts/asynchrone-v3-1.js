import { output, randint } from './utils.js';

const INITIAL_RESULT = -10;
let result = INITIAL_RESULT;              // global scope

/*
 * asynchonously set 'result' value to 'value'
 */
 var asynchronouslyAssignedValueToResult = (value, callback) => {
   window.setTimeout(
       () => {
         // asynchronously assign 'value' to  'result'
         result = value;
         // after job is done, 'callback' is called
         callback();
       },
       randint(250)                     // random delay before call
   );
 }

/*
 * illustration of callback hell...
 * want to make :
 *    x = 5
 *    result = 10        => asynchronous
 *    x = x + result
 *    result = 20        => asynchronous
 *    x = x + result
 * x must be 35 at the end
 */
var firstMeetingWithCallbackHell = () => {
  let x = 5;

  output(`I am before asynchronous call : result is ${result} and x is ${x}`);

  // result = 10 => asynchronously
  asynchronouslyAssignedValueToResult(
    10,
    () => {           // first callback
      x = x + result;
      output(`I am in first callback : result is ${result} and x is ${x}`);
      // result = 20 => asynchronously
      asynchronouslyAssignedValueToResult(
        20,
        () => {       // second callback
          x = x + result;
          output(`I am in second callback : result is ${result} and x is ${x}`);
        }
      )
    }
  );

}

firstMeetingWithCallbackHell();

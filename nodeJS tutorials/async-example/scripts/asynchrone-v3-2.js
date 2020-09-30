import { output, randint } from './utils.js';

/*
 * make some comutation with 'param' and pass the produced result
 * to callback to continue
 */
 var makeSomeJobAndCallCallbackWithResult = (param, callback) => {
   window.setTimeout(
       () => {
         // asynchronously make some computation with 'param' to produce 'computedResult'
         let computedResult = param;
         // computed value is given to callback that can use it
         callback(computedResult);
       },
       randint(250)                     // random delay before call
   );
 }

/*
 * callback parameters are used to pass result from asynchronous job
 *    x = 5
  *   x = x + asynchronousJob(10)
 *    x = x + asynchronousJob(20)
 * x must be 35 at the end
 */
var useCallbackParametersToPassResult = () => {
  let x = 5;

  output(`I am before asynchronous call : x is ${x}`);

  // asynchronousJob(10)
  makeSomeJobAndCallCallbackWithResult(
    10,
    (result) => {           // result of job will be given as result parameter
      x = x + result;
      output(`I am in first callback : asynchronous result is ${result} and x is ${x}`);
      // asynchronousJob(20)
      makeSomeJobAndCallCallbackWithResult(
        20,
        (result) => {       // result of job will be given as result parameter
          x = x + result;
          output(`I am in second callback : asynchronous result is ${result} and x is ${x}`);
        }
      )
    }
  );

}

useCallbackParametersToPassResult();

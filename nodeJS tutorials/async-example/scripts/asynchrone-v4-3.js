import { output, randint } from './utils.js';

/*
 * a function that produces and returns a promise
 */
var somePromisedFunction =
  value => {
          return new Promise(
            (resolve, reject) => {
                // use setTimeout to simulate some asynchronous call, 'resolve' must be called when asynchronous work is finished
                window.setTimeout(
                    () => {
                          let result = value;   // do something here with value and produce some result
                          resolve(result);      // resolving the promise with the computed result
                    },
                    randint(250)
                  );
            }
          )
        }


/*
 * promises are used to compute
 *    x = 5
  *   x = x + asynchronousJob(10)
 *    x = x + asynchronousJob(20)
 * x must be 35 at the end
 */
// to be compared with asynchronev3-2.js
var usePromiseToMakeAsynchronousJob = () => {
    let x = 5;
    output(`I am before promise : x is ${x}`);

    somePromisedFunction(10)
        .then ( result => x = x + result )
        .then ( () => output(`I am after first resolve promise callback : x is ${x}`) )
        .then ( () => somePromisedFunction(20) )
        .then( result => x = x + result )
        .then( () => output(`I am after second resolve promise callback : x is ${x}`) );

}

usePromiseToMakeAsynchronousJob();

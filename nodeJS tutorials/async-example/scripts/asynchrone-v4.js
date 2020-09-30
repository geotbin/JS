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
                          let result = 2 * value;   // do something here with value and produce some result
                          resolve(result);       // resolving the promise with the computed result
                    },
                    randint(250)
              );
            }
          )
        }

// define the promise as a result of the function call
let firstPromise = somePromisedFunction(10);

// use the result of the promise and apply the resolve function using 'then' :
// the parameter of 'then' is the callback fired when promise has (successfully) terminated
firstPromise.then( result => output(`return value is ${result}` ) );

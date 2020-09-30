import { output, randint } from './utils.js';

/*
 * a function that produces and returns a promise
 */
var somePromisedFunction =
  value => {
          return new Promise(
            (resolve, reject) => {
                if (value >= 0) {
                // use setTimeout to simulate some asynchronous call, 'resolve' must be called when asynchronous work is finished
                window.setTimeout(
                    () => {
                          let result = 2 * value;   // do something here with value and produce some result
                          resolve(result);          // resolving the promise with the computed result
                    },
                    randint(250)
                  );
                }
                else {   // reject the promise
                  reject(new Error(`value is negative: (${value})`));
                }
            }
          )
        }


// try the promise with different values
for (let val of [10, 20, -5]) {
  // build the promise (computation starts at creation)
  let somePromise = somePromisedFunction(val);

  // use the promise result and catch the error if any
  somePromise
    .then( result => output(`return value is ${result}` ) )
    .catch( err => output(`error : ${err.message}` ) );
}

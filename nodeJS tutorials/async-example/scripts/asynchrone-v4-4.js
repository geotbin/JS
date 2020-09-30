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
                      if (value < 0)
                        reject( new Error(`rejected: value is negative: ${value}`) )     // reject the promise
                      else resolve(2 * value)      // resolving the promise with the computed result
                    },
                    randint(250)
                  );
            }
          )
        }


/*
 *  illustrate that:
 *   - catch is thenable
 *   - errors are caught even when occuring in a 'then' part, not only in promise reject
 */
for (let val of [10, 20, -5]) {

  somePromisedFunction(val)
    .then( result => {
              output(`first returned value is ${result}` );
              return result + 1;
            })
    .then( result => {
              if (result > 30)
                  // error in 'then' part is caught too
                  throw new Error(`trouble with ${result}: greater than 30`)
              else return result
            })
    .then( result =>  output(`second returned value is ${result}` )  )
    .catch( err => output(`error: ${err.message}` ) )
    // catch is 'thenable' too, following line is always done, behave like a 'finally'
    .then( () => output('--- this is always written ---') );

}

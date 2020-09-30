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
                          resolve(result);          // resolving the promise with the computed result
                    },
                    randint(250)
                  );
            }
          )
        }


// to be compared with code in asynchronev3.js or asynchronev3-2.js
var usePromiseToMakeAsynchronousJob = () => {
    let x= 0;
    output(`I am before promise : x is ${x}`);

    somePromisedFunction(10).then (
        result => {
                    x = x + result;
                    output(`I am in resolve promise callback : resolved result is ${result} and x is ${x}`);
                  }
    );
}

usePromiseToMakeAsynchronousJob();

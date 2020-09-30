import { output } from './utils.js';


/*
 * function with just one asynchronous code
 */
var functionWithAsynchronousCode = function(delay) {
  output('I am before asynchronous call');
  // use setTimeout to produce the asynchronous code : code is run after delay ms
  window.setTimeout(
      () => output(`I have been delaid for ${delay}ms`),       // delaid code
      delay,
  );
  output('I am after asynchronous call');
}

functionWithAsynchronousCode(1000);
//functionWithAsynchronousCode(0);

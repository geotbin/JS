import { output } from './utils.js';

/*
 * make two asynchronous calls, second ends before first
 */
var functionWithTwoAsynchronousCalls =
  () => {  output('I am before asynchronous call');
    // use setTimeout to simulate the asynchronous code
    window.setTimeout(
        () => output('I am first call, delaid for 1000 ms'),       // delaid code
        1000,
    );
    output('I am after first asynchronous call');
    window.setTimeout(
        () => output('I am second call, delaid for 500 ms'),       // delaid code
        500,
    );
    output('I am after second asynchronous call');
}

functionWithTwoAsynchronousCalls();

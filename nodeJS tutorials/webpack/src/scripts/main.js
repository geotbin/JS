
import '../style/main.css';

import add from './add.js';
import timoleon from '../images/timoleon.jpg';


var setupListeners = () => {
    let x = document.getElementById('x');
    x.addEventListener('change', displayResult);
    document.getElementById('y').addEventListener('change', displayResult);

    timo.src = timoleon;
}


window.addEventListener('DOMContentLoaded', setupListeners);

var displayResult = () => {
    let xValue = parseInt(document.getElementById('x').value);
    let yValue = parseInt(y.value);
    result.value = add(xValue,yValue);
}

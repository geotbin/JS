export var output = function(text) {
  let par = document.createElement('p');
  par.textContent = text;
  addTimeStamp(par);
  outputZone.appendChild(par);
  window.setTimeout( () => { par.style.backgroundColor = 'rgb(240,240,240)'; }, 10);
}

export var randint = function(max, min = 0) {
  return Math.floor(Math.random() * (max - min)) + min;
}

/* append a span.timestamp element to htmlElement
*/
let addTimeStamp = htmlElement => {
  let span = document.createElement('span');
  span.className = 'timestamp';
  span.textContent =   `printed @ ${new Date().getSeconds()}s${new Date().getMilliseconds()}ms`;
  htmlElement.appendChild(span);
}

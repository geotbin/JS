
const setupListener = () => addButton.addEventListener('click',  () => addDetailForId(addButton.dataset.bookid) );
window.addEventListener('DOMContentLoaded', setupListener);

const addDetailForId =
  bookid => {
    let body = JSON.stringify( {
                                 language : language.value,
                                 pages : pages.value,
                                 series : series.value
                                });
    let requestOptions = { method :'POST', headers : { "Content-Type": "application/json" }, body : body };
    fetch(`http://127.0.0.1:3000/books/adddetails/${bookid}`, requestOptions)
      .then ( response => response.json().then( json => ({ ok : response.ok, json : json}) ) )
      .then ( response => {
          if (response.ok)
            { return response.json; }
          else { throw new Error(` add details failed  : ${response.json.message}` ); }
        })
      .then( book => result.textContent = `details added ` )
      .catch ( error => result.textContent = `error : ${error.message}` );
  }

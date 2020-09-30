
const setupListener =
    () => document.getElementById('createbutton').addEventListener('click', createBook);

window.addEventListener('DOMContentLoaded', setupListener);

const createBook =
  () => {
    // retrieve data about book to create from the input fields
    let newBook = { title : title.value, author : author.value, year : pubyear.value,  cover : cover.value };
    // body is built from created book
    let body = JSON.stringify(newBook);
    // options for a POST method that conains json
    let requestOptions = { method :'POST', headers : { "Content-Type": "application/json" }, body : body };
    // send the request to the server to create the entry corresponding to book
    fetch('http://127.0.0.1:3000/books/create', requestOptions)
      .then (  response => response.json().then( json => ( { ok : response.ok, json : json} ) ) )
      .then ( response => {
          if (response.ok)
            { return response.json; }
          else { throw new Error(` creation failed  : ${response.json.message}` ); }
        })
      .then( book => result.textContent = `book with id ${book._id} created` )    // fetch request returns a success with created book => message is displaid in #result
      .then( () => clearField() )
      .catch( error => result.textContent = `error : ${error.message}` );        // fetch request returns an error : creation failed => error message displai in #result
  }


// utility function
/** clear all input fields */
const clearField = function() {
  title.value = "";
  author.value = "";
  pubyear.value = "";
  cover.value = "";
}

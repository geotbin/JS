
const setupListener =
    () => updatebutton.addEventListener('click', () => updateBook(updatebutton.dataset.bookid));

window.addEventListener('DOMContentLoaded', setupListener);

const updateBook =
  bookId => {
    let newBook = { title : title.value, author : author.value, year : pubyear.value,  cover : cover.value };
    let body = JSON.stringify(newBook);
    // use method PUT for an  update request
    let requestOptions = { method :'PUT', headers : { "Content-Type": "application/json" }, body : body };
    fetch(`http://127.0.0.1:3000/books/update/${bookId}`, requestOptions)
      .then ( response => response.json().then( json => ({ ok : response.ok, json : json}) ) )
      .then ( response => {
          if (response.ok)
            { result.textContent = `book updated : ${response.json.id}`; }
          else { throw new Error(` update failed  : ${response.json.message}` ); }
        })
      .catch ( error => result.textContent = `error : ${error.message}` );
  }

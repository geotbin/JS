/*
* add a mouseover event listener to each .book element
* and a change listener form input element to fire updateTitle()
*/
var initDetails =
  () =>
    {
      let books = document.getElementsByClassName('book');
      Array.from(books).forEach(
        book => book.addEventListener( 'mouseover', () => getDetails(book) )
      )

      let inputs = document.getElementsByTagName('input');
      Array.from(inputs).forEach(
        input => {
          input.addEventListener('keydown', () => input.style.backgroundColor = 'rgba(255,0,0,0.5)' );
          input.addEventListener('change', () => updateTitle(input) );
        }
      );
    }

window.addEventListener('DOMContentLoaded', initDetails);

/*
* fetch the details about hovered 'book' and display it in #details
* @param book the hovered .book element
*/
var getDetails =
  book =>
    {
      // get the id from data-id
      let id = book.dataset.id;
      // define the options for the fetch request
      let requestOptions = { method : 'GET' }
      // request the server to fetch book details for book corresponding to id, use defined options
      fetch(`http://127.0.0.1:3000/books/details/${id}`, requestOptions)
        .then( response => {
          if (response.ok) {
            return response.json();                 // decode json received response
          }
          throw new Error('book unknown');          // else = response not ok, fetch request failed 404
        })
        .then( book => displayDetails(book) )       // decoded book is displaid
        .catch( error => displayError(`problem with book id ${id}`) );
    }

/*
* create a fecth request with a PUT method to update title of book associated to given input
* @param input the changed input
*/
var updateTitle =
  (input) => {
    // get the id from data-id
    let id = input.dataset.id;
    // build a string version of body object
    let body = JSON.stringify({ newTitle : input.value });
    // define the options for the fecth request, note the used method
    let requestOptions = {
                          method : 'PUT',
                          headers: { "Content-Type": "application/json" },
                          body : body
                         };
    // make the fetch request with defined options, same route as for getDetails but method is PUT here
    fetch(`http://127.0.0.1:3000/books/details/${id}`, requestOptions)
      .then( response => {
                if (!response.ok) {
                  throw new Error('update failure');
                }
                input.style.backgroundColor = 'white';   // everything was fine, update has been made
                return response.json();
      })
      .then( book => displayDetails(book) )
      .catch( error => displayError( error.message ) );
  }


/*
* display details on book in #Details
* @param book the displaid book
*/
var displayDetails =
  book =>
    {
      let details = document.getElementById('details');
      replaceContent(details, 'title', book.title);
      replaceContent(details, 'author', book.author);
      replaceContent(details, 'year', book.year);
      details.getElementsByTagName('img')[0].src = book.cover;
    }
var displayError =
  msg => displayDetails({title : msg,  cover : 'images/book.png'})

/* replace by 'content' the text content of first element with 'className' CSS class in 'base' element
 * @param base the base outer element
 * @param className the search class
 * @param content the new content
*/
var replaceContent =
    (base, className, content) => { base.getElementsByClassName(className)[0].textContent = content; }

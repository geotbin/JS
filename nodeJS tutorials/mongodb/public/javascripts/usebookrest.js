const DELAY_BEFORE_REFRESHING = 3000;

const setupListeners =
  () => {
    let gets = document.getElementsByClassName("get");
    Array.from(gets).forEach( button => button.addEventListener('click', () => getBook(button.dataset.bookid)));
    let updates = document.getElementsByClassName("put");
    Array.from(updates).forEach( button => button.addEventListener('click', () => updateBook(JSON.parse(button.dataset.book))));
    let deletes = document.getElementsByClassName("delete");
    Array.from(deletes).forEach( button => button.addEventListener('click', () => deleteBook(button.dataset.bookid, button)));

    post.addEventListener('click', createBook );
  }

window.addEventListener('DOMContentLoaded', setupListeners);


// GET
const getBook =
    bookId => {
      let requestOptions = { method :'GET' };
      fetch(`http://127.0.0.1:3000/bookrest/${bookId}`, requestOptions)
        .then( response => response.json())
        .then( book => details2.textContent = JSON.stringify(book) );
    }


// PUT
const updateBook =
    book => {
      let newBook = { ...book,  title : book.title+'#' };
      let body = JSON.stringify(newBook);
      let requestOptions = { method :'PUT',  headers : { "Content-Type": "application/json" }, body : body  };
      fetch(`http://127.0.0.1:3000/bookrest/${book._id}`, requestOptions)
        .then( response => response.json())
        .then( book => details2.textContent = JSON.stringify(book) )
        .then( () => window.setTimeout( () => window.location.reload(), DELAY_BEFORE_REFRESHING));
    }

// DELETE
const deleteBook =
    (bookId, button) => {
      let requestOptions = { method :'DELETE' };
      fetch(`http://127.0.0.1:3000/bookrest/${bookId}`, requestOptions)
        .then( response => details2.textContent = JSON.stringify(response) )
        .then ( () => {
          let span = document.createElement('span');
          span.className = 'deleted';
          span.textContent = 'deleted';
          button.parentNode.replaceChild( span , button);
        } )
        .then( () => window.setTimeout( () => window.location.reload(), DELAY_BEFORE_REFRESHING));
    }

// POST
const createBook =
    () => {
      let newBook = { title : 'New Title', author : 'New author', year : 2018, cover : ''  };
      let body = JSON.stringify(newBook);
      let requestOptions = { method :'POST',  headers : { "Content-Type": "application/json" }, body : body  };
      fetch(`http://127.0.0.1:3000/bookrest/`, requestOptions)
        .then( response => response.json() )
        .then( book => details2.textContent = JSON.stringify(book) )
        .then( () => window.setTimeout( () => window.location.reload(), DELAY_BEFORE_REFRESHING));
    }

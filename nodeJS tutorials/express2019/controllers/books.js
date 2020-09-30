/*
  define controller for /books route
*/

// load data (simulate BD query by example)
let books = require('../data/books');

let allBooks;
let bestBook;

/* middleware that prepares data received in books,
  defining the best book and sorting books in allBooks by author ascending order
  */
let prepare =
  (req, res, next) => {
    bestBook = books[0];
    allBooks = Array.of(...books).sort( (book1, book2) => book1.author.localeCompare(book2.author) );
    next();
  };

/*
  handle logic for / path, it renders the book list
*/
let list =
  (req, res) => res.render('books',
                           {
                             title: 'Book list',
                             books : allBooks
                           });

/*
  handle logic for /best path, it displays the best book page
*/
let best =
  (req, res) => res.render('bestbook',
                            {
                              title: 'Best book',
                              book:  bestBook
                            });

/*
* handle logic for /details/:bookid GET route, send json version of book corresponding to :bookId
* and sends 404 if required books does not exist
*/
let details =
  (req,res) => {
        let book = books[req.params.bookId - 1];
        if (book) {
          res.status(200).json(book);
        } else {
          res.status(404).end();
        }
      }

/*
* handle logic for /details/:bookid PUT route, change title of book corresponding to :bookId
* with newTitle value from body
* and sends 404 if required books does not exist
*/
var updateTitle =
  (req, res) => {
    let id = req.params.bookId;
    let newTitle = req.body.newTitle;           // get newTitle value from request body
    if (books[id-1]) {                          // book exists ?
      books[id-1].title = newTitle;
      res.status(200).json( books[id-1] );
    }
    else {
      res.status(404).end();
    }
  }

// export controller functions
module.exports.prepare = prepare;
module.exports.list = list;
module.exports.best = best;
module.exports.details = details;
module.exports.updateTitle = updateTitle;

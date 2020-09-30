/* retrieve the model : the "tool" to interact with the database */
const Books = require('../models/books').model;

/*
 *  controller that renders the book list found in the database
 *  for path /books/
 */
const list =
  (req, res) =>
      Books.find()                                            // select all the books from database
           .then( allBooks => res.render('books',             // then use the result of the query to render the view 'books'
                                         { title : 'Book list',
                                           request : 'Books.find()',
                                           books : allBooks } ) );



/* controller for path /books/one */
const one =
(req, res) =>
    Books.findOne()                               // select one document
         .then( book => res.render('bookdetail',
                                   { title : 'Only first book from list',
                                     request : 'Books.findOne()',
                                     book : book } ) );

/* controller for /books/dune */
const dune =
(req, res) =>
    Books.find({title : 'Dune'})                 // select all the documents that match the given property, here title='Dune'
         .then( allBooks => res.render('books',
                                       { title : 'Only Dune',
                                         request : "Books.find({title : 'Dune'})",
                                         books : allBooks } ) );
/* controller for /books/yearv1 */
const yearv1 =
(req, res) =>
    Books.find({year : {$gt : 2000} })          // select all the documents that match the given property, here year > 2000
         .then( allBooks => res.render('books',
                                       { title : 'Books only after 2000 (v1)',
                                         request : 'Books.find({year : {$gt : 2000} })',
                                         books : allBooks } ) );
/* controller for /books/yearv2 */
const yearv2 =
(req, res) =>
    Books.find().where('year').gt(2000)       // select all the documents that match the given property, here year > 2000
         .then( allBooks => res.render('books',
                                       { title : 'Books only after 2000 (v2)',
                                         request : "Books.find().where('year').gt(2000)",
                                         books : allBooks } ) );


/* controller for /details1/:bookId */
const detailsv1 =
 (req, res) =>
   Books.findOne({ _id : req.params.bookId })
        .then( book => res.render('bookdetail',
                                   { title : 'Book by _id using find({ _id : ... })',
                                     request : 'Books.findOne({ _id : ObjectId(req.params.bookId)})',
                                     book : book } ) );
/* controller for /details2/:bookId */
const detailsv2 =
 (req, res) =>
   Books.findById( req.params.bookId )
        .then( book => res.render('bookdetail',
                                   { title : 'Book by _id using findById()',
                                     request : 'Books.findById( req.params.bookId )',
                                     book : book } ) );

/* controller for GET /create : return the view with create form */
const createHome =
 (req,res) => res.render('createBook');
/* controller for POST /create : execute the create operation in the db and return created book of successfull*/
const createBook =
 (req, res, err) => {
   //let newBook = { title : req.body.title, author : req.body.author, year : req.body.year, cover : req.body.cover };
   let newBook = { ...req.body };    // extract object from body using '...' operator
   Books.create(newBook)
     .then( newBook => res.status(200).json(newBook) )     //  if creation is successfull => responds with code 200 and created book
     .catch( error => res.status(400).json(error) );       // if creation fails => responds with code 400
 }


/* details adding */
/* controller for GET /details/:bookId */
const addDetailsForm =
 (req, res) =>
   Books.findById( req.params.bookId )
     .then( book => res.render('addDetails', { book : book }) );

/* controller for POST /details/:bookId */
const addDetails =
 (req, res, err) => {
   let details = { ...req.body };                   // in body we get details for books
   Books.findById( req.params.bookId )              // we find book by id according to param
     .then( book => {
                      book.details = details;      // book details are changed accroding to received data
                      return book.save();          // book is saved => details are updated
                    })
     .then( book => res.status(200).json(book))
     .catch( error => res.status(400).json(error) );
 }

/* updating */
/* controller for GET /update/:bookId */
const updateForm =
 (req,res) =>
 Books.findById( req.params.bookId )              // for updating, we find book and send it to client
   .then( book => res.render('updateBook', { book : book } ) );

/* controller for PUT /update/:bookId */
const update =
 (req,res,err) => {
   let updatedBook = { ...req.body };            // new value for book is received from client
//  Books.findById( req.params.bookId ).update(updatedBook)
   Books.findByIdAndUpdate( req.params.bookId, updatedBook )         // updating is done
     .then( () => res.status(200).json( {id : req.params.bookId} ) )
     .catch( error => res.status(400).json(error) );
 }

 /* deleting */
 const deleteBook =
   (req,res,err) => {
     Books.findById( req.params.bookId ).remove()   // find book by _id and remove it
     //Books.findByIdAndRemove( req.params.bookId )
       .then( () => res.redirect('/books') )
       .catch( error => { throw error } );
   }



/* export controllers */
module.exports.list = list;
module.exports.one = one;
module.exports.dune = dune;
module.exports.yearv1 = yearv1;
module.exports.yearv2 = yearv2;
module.exports.detailsv1 = detailsv1;
module.exports.detailsv2 = detailsv2;
module.exports.createHome = createHome;
module.exports.create = createBook;
module.exports.addDetailsForm = addDetailsForm;
module.exports.addDetails = addDetails;
module.exports.updateForm = updateForm;
module.exports.update = update;
module.exports.delete = deleteBook;

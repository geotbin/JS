const express = require('express');
const router = express.Router();

// import controller for books
const booksController = require('../controllers/books');

// associate controller method to path and method
router.get('/', booksController.list);
router.get('/one', booksController.one);
router.get('/dune', booksController.dune);
router.get('/yearv1', booksController.yearv1);
router.get('/yearv2', booksController.yearv2);
router.get('/detailsv1/:bookId', booksController.detailsv1 );
router.get('/detailsv2/:bookId', booksController.detailsv2 );

// path '/books/create' can be accessed using GET (for view) or POST (for book creation)
router.get('/create', booksController.createHome );
router.post('/create', booksController.create );

// path '/books/adddetails/:bookid' can be accessed using GET (for book details view) or POST (for book details creation)
router.get('/adddetails/:bookId', booksController.addDetailsForm);
router.post('/adddetails/:bookId', booksController.addDetails);

// use method PUT for an update request
router.get('/update/:bookId', booksController.updateForm );
router.put('/update/:bookId', booksController.update );

router.get('/delete/:bookId', booksController.delete );

// export books route
module.exports = router;

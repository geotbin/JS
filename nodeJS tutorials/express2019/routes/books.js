const express = require('express');
const router = express.Router();

// import controller for books
const booksController = require('../controllers/books');

// link controllers to route paths
router.use( booksController.prepare );
router.get('/', booksController.list );
router.get(/[bB]est/, booksController.best );
router.get('/details/:bookId', booksController.details );
router.put('/details/:bookId', booksController.updateTitle );


module.exports = router;

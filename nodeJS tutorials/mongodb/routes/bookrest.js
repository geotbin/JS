const express = require('express');
const router = express.Router();

// import controller for books
const controller = require('../controllers/bookrest');

// use different method to provide REST operations
router.get('/', controller.home );
router.get( '/:bookId', controller.getBook );
router.post( '/', controller.createBook );
router.put( '/:bookId', controller.updateBook );
router.delete( '/:bookId', controller.deleteBook );

module.exports = router;

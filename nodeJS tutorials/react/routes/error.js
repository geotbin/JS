const express = require('express');
const router = express.Router();

const errorController = require('../controllers/error.js');

// catch 404 and forward to error handler
router.use(errorController.notFound);
// error handler
router.use(errorController.handleError);

module.exports = router;

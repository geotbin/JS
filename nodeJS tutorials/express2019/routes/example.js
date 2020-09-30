const express = require('express');
const router = express.Router();

const exampleController = require('../controllers/example');

/* GET home page. */
router.get('/sendfile', exampleController.sendfile );
router.get('/download', exampleController.download );

module.exports = router;

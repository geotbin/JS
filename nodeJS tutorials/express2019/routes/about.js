const express = require('express');
const router = express.Router();

const aboutController = require('../controllers/about');

/* GET home page. */
router.get('/', aboutController.about );

module.exports = router;

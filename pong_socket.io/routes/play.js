const express = require('express');
const router = express.Router();

const playController = require('../controllers/play');

/* GET home page. */
router.get('/', playController.play );

module.exports = router;

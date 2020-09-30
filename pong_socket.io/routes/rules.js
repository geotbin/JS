const express = require('express');
const router = express.Router();

const rulesController = require('../controllers/rules');

/* GET home page. */
router.get('/', rulesController.rules);

module.exports = router;

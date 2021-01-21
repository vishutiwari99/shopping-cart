const express = require('express');
const router = express.Router();
const { getPrivateData } = require('../controller/privateController')
const { protect } = require('../middleware/auth')
router.get("/", protect, getPrivateData);

module.exports = router;
const express = require('express');
const adminAuth = require('../middleware/adminAuth')
const loginAuth = require('../middleware/loginAuth')
const router = express.Router();

const { createCategory, getCategories } = require('../controller/categoryController')

router.get('/category', loginAuth, adminAuth, getCategories);
router.post('/category', loginAuth, adminAuth, createCategory);

module.exports = router;
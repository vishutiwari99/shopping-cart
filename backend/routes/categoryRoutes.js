const express = require('express');
const router = express.Router();
// const adminAuth = require('../middleware/adminAuth')
// const loginAuth = require('../middleware/loginAuth')

const { createCategory, getCategories, deleteCategory, updateCategory } = require('../controller/categoryController')

router.get('/categories', getCategories);
router.post('/category', createCategory);
router.delete('/category/:id', deleteCategory);
router.put('/category/:id', updateCategory);

module.exports = router;
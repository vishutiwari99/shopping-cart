const express = require('express');
const router = express.Router();

const { register, login, forgotPassword, resetPassword } = require('../controller/authController')

router.post("/register", register);
router.post("/login", login);
router.post("/forgotPassword", forgotPassword);
router.put("/resetPassword/:resetToken", resetPassword);


module.exports = router;
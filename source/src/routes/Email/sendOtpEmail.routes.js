const express = require('express');
const router = express.Router();
const senMailController = require("../../controller/Login/ForgotPassword/SendOtpEmail.controller");
const verifyOtpController = require("../../controller/Login/ForgotPassword/VerifyOtpEmail.controller");
const changePasswordController = require('../../controller/Login/ForgotPassword/ChangePassword.controller');
router.post('/send-otp', senMailController.sendOtpEmail)
router.post('/verify-otp', verifyOtpController.verifyOtp)
router.post('/change-password', changePasswordController.ChangePassword)
module.exports = router;
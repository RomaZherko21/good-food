const express = require('express');
const auth = express.Router();
const authController = require('../controllers/auth.controller.js')

auth.post('/signUp', authController.signUp)
auth.post('/emailChecked', authController.emailChecked)
auth.post('/signIn', authController.signIn)
auth.get('/cookie', authController.cookie)


module.exports = auth;
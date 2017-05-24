const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');
const ensure = require('connect-ensure-login');
const mongoose = require('mongoose');

const User = require('../models/user-model.js');

const authRoutes = express.Router();

authRoutes.get('/signup', (req, res, next) => {
    res.render('auth/signup.ejs');
});


module.exports = authRoutes;

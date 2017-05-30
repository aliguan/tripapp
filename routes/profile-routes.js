const express      = require('express');
const passport     = require('passport');
const ensure       = require('connect-ensure-login');
const mongoose     = require('mongoose');
const multer       = require('multer');
const User         = require('../models/user-model.js');
const flash        = require('connect-flash');

const profileRoutes   = express.Router();

profileRoutes.get('/profile', (req, res, next) => {
    res.render('user/profile.ejs');
});

module.exports = profileRoutes;

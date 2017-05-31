const express      = require('express');
const bcrypt       = require('bcrypt');
const passport     = require('passport');
const ensure       = require('connect-ensure-login');
const mongoose     = require('mongoose');
const multer       = require('multer');
const User         = require('../models/user-model.js');
const flash        = require('connect-flash');
const authRoutes   = express.Router();


authRoutes.get("/login", ensure.ensureLoggedOut(), (req, res, next) => {
  res.render("auth/login.ejs");
});

authRoutes.post("/login", ensure.ensureLoggedOut(), passport.authenticate('local', {
  successRedirect: "/profile",
  failureRedirect: "/login",
  failureFlash: true,
  passReqToCallback: true
}));

authRoutes.get('/signup', ensure.ensureLoggedOut(), (req, res, next) => {
    res.render('auth/signup.ejs');
});

var upload = multer({ dest: './public/uploads/' });

authRoutes.post('/signup', upload.single('signupProfilePic'), (req, res, next) => {
    const signupName = req.body.signupName;
    const signupUsername = req.body.signupUsername;
    const signupPassword = req.body.signupPassword;

    if ( !signupUsername || !signupPassword ) {
        res.render('auth/signup.ejs', { errorMessage: 'Please provide both Username and password' });
        return;
    }

    User.findOne(
        { username: signupUsername },
        { username: 1 },
        (err, foundUser) => {
            if (err) {
                next(err);
                return;
            }
            if(foundUser) {
                res.render('auth/signup.ejs', {
                    errorMessage: 'Username is taken. Please try again.',
                });
                return;
            }
            const salt = bcrypt.genSaltSync(10);

            const hashPass = bcrypt.hashSync(signupPassword, salt);

            const theUser = new User({
                name: signupName,
                profilePic: `/uploads/${req.file.filename}`,
                username: signupUsername,
                encryptedPass: hashPass,
            });

            theUser.save((err) => {
                if (err) {
                    next(err);
                    return;
                }

                //Store a message in the box to display after redirect
                req.flash(
                    //key of message
                    'success',
                    //actual message
                    'You have registered successfully!'
                );
                res.redirect('/');
            });
        }
    );

});

authRoutes.get('/logout', (req, res, next) => {
    req.logout();
    req.flash('success', 'You have logged out successfully.');
    res.redirect('/');
});


module.exports = authRoutes;

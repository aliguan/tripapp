const express      = require('express');
const passport     = require('passport');
const ensure       = require('connect-ensure-login');
const mongoose     = require('mongoose');
const multer       = require('multer');
const User         = require('../models/user-model.js');
const Trip         = require('../models/trip-model.js');
const flash        = require('connect-flash');

const apiRoutes   = express.Router();

var uploadTripPic = multer({ dest: './public/uploads/' });

apiRoutes.post('/profile', ensure.ensureLoggedIn('/login'), uploadTripPic.single('tripThumbnail'), (req, res, next) => {
    const newTrip = new Trip({
        name: req.body.tripName,
        authorId: req.user._id,
        location: req.body.tripLocation,
        content: req.body.tripContent,
        tripThumbnail: `/uploads/${req.file.filename}`,
    });

    newTrip.save((err) => {
        if(err) {
            next(err);
            return;
        }
        res.redirect('/');
    });
});


apiRoutes.get('/api/profile',
    ensure.ensureLoggedIn('/login'),

    (req, res, next) => {
        Trip.find(
            { authorId: req.user._id },
            (err, tripsList) => {
                if(err) {
                    next(err);
                    return;
                }

                res.json(tripsList);
            }
        );
    }

);


module.exports = apiRoutes;

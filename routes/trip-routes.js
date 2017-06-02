const express      = require('express');
const passport     = require('passport');
const ensure       = require('connect-ensure-login');
const mongoose     = require('mongoose');
const multer       = require('multer');
const User         = require('../models/user-model.js');
const Trip         = require('../models/trip-model.js');
const flash        = require('connect-flash');

const tripsRoutes   = express.Router();


tripsRoutes.get('/edit/:id', (req, res, next) => {
    const tripId = req.params.id;
    Trip.findById(tripId, (err, trip) => {
        if (err) { return next(err); }
    res.render('trips/edit-trip.ejs', { trip: trip });
  });
});

var updateTripPic = multer({ dest: './public/uploads/' });


tripsRoutes.post('/:id', updateTripPic.single('updateThumbnail'), (req, res, next) => {
    const tripId = req.params.id;
    const tripUpdates = {
        name: req.body.updateName,
        location: req.body.updateLocation,
        date: req.body.updateDate,
        content: req.body.updateContent,
        tripThumbnail: `/uploads/${req.file.filename}`
    };

    Trip.findByIdAndUpdate(tripId, tripUpdates, (err, trip) => {
        if (err){ return next(err); }
            return res.redirect('/profile');
        });
});


tripsRoutes.post('/:id/delete', (req, res, next) => {
    const tripId = req.params.id;

    Trip.findByIdAndRemove(tripId, (req, res, next) => {

    });

    res.redirect('/profile');
});

module.exports = tripsRoutes;

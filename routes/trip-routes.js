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

// tripRoutes.post();


module.exports = tripsRoutes;

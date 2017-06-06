const express      = require('express');
const passport     = require('passport');
const ensure       = require('connect-ensure-login');
const mongoose     = require('mongoose');
const multer       = require('multer');
const User         = require('../models/user-model.js');
const Trip         = require('../models/trip-model.js');
const Destination  = require('../models/destination-model.js');
const flash        = require('connect-flash');

const tripsRoutes   = express.Router();


tripsRoutes.get('/trips/:id/edit', (req, res, next) => {
    const tripId = req.params.id;
    Trip.findById(tripId, (err, trip) => {
        if (err) { return next(err); }
    res.render('trips/edit-trip.ejs', { trip: trip });
  });
});

var updateTripPic = multer({ dest: './public/uploads/' });


tripsRoutes.get('/trips/:id', (req, res, next) => {
    const tripId = req.params.id;
    Trip.findById(tripId, (err, trip) => {
        if (err) { return next(err); }
        Destination.find({ tripId: tripId}, (error, destinations) => {
          if (error) { next(error); }
          else {
            res.render('trips/trip-view.ejs', { destinations: destinations, trip: trip });
          }
      });
  });
});


tripsRoutes.post('/trips/:id/edit', updateTripPic.single('updateThumbnail'), (req, res, next) => {
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
            res.redirect('/profile');
        });
});

tripsRoutes.post('/trips/:id', ensure.ensureLoggedIn('/login'), (req, res, next) => {
    const tripId = req.params.id;

      const newDest = new Destination( {
        name:        req.body.destname,
        review: req.body.destdesc,
        address: req.body.destaddress,
        tripId: tripId,
    });

    newDest.save((error) => {
        if (error) { console.log(error); }
        else {
            res.redirect('/trips/' + tripId);
        }
 });
});


tripsRoutes.post('/trips/:id/delete', (req, res, next) => {
    const tripId = req.params.id;

        Trip.findByIdAndRemove(tripId, (req, res, next) => {

    });

    res.redirect('/profile');
});



module.exports = tripsRoutes;

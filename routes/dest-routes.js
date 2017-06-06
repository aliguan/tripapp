const express      = require('express');
const passport     = require('passport');
const ensure       = require('connect-ensure-login');
const mongoose     = require('mongoose');
const multer       = require('multer');
const User         = require('../models/user-model.js');
const Trip         = require('../models/trip-model.js');
const Destination  = require('../models/destination-model.js');
const flash        = require('connect-flash');

const destRoutes   = express.Router();

destRoutes.post('/destination', (req, res, next) => {
    let location = {
      type: 'Point',
      coordinates: [req.body.longitude, req.body.latitude]
    };

    // Create a new Restaurant with location
      const newDest = {
        name:        req.body.destname,
        description: req.body.destdesc,
        location:    location
    };

    newDest.save((error) => {
   if (error) { console.log(error); }
   else {
     res.redirect('/trip/:id');
   }
 });
});

destRoutes.get('/destination',(req, res, next) => {
  Destination.find((error, destinations) => {
    if (error) { next(error); }
    else {
      res.render('trips/trip-view.ejs', { destinations: destinations });
    }
});
});



module.exports = destRoutes;

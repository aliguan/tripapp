const express = require('express');
const router  = express.Router();
const passport     = require('passport');
const ensure       = require('connect-ensure-login');
const mongoose     = require('mongoose');
const multer       = require('multer');
const User         = require('../models/user-model.js');
const Trip         = require('../models/trip-model.js');
const flash        = require('connect-flash');


/* GET home page. */
router.get('/', (req, res, next) => {
    res.render('index');

});

router.get('/featured', (req, res, next) => {
  User.find( {}, 'name profilePic', (err, usersLive) => {
      if(err) { return next(err); }
       res.render('featured', { users: usersLive } );
  });

});

router.post('/', (req, res, next) => {
    const userSearchLoc = req.body.searchLocation;

    Trip.find(
        { location: userSearchLoc }, (err, tripsFound) => {
            if(err) { return next(err); }
            res.render('trips/tripsinlocation.ejs', { trips: tripsFound });
        });
});

module.exports = router;

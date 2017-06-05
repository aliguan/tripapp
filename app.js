const express      = require('express');
const path         = require('path');
const favicon      = require('serve-favicon');
const logger       = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser   = require('body-parser');
const layouts      = require('express-ejs-layouts');
const mongoose     = require('mongoose');
const session      = require('express-session');
const passport     = require('passport');
const flash        = require('connect-flash');
const ensure       = require('connect-ensure-login');
const LocalStrategy= require("passport-local").Strategy;
const bcrypt       = require('bcrypt');
const User         = require('./models/user-model.js');
const app          = express();


mongoose.connect('mongodb://heroku_sl7gm73b:kg7tnlujnmo9pp2v86cnia1ju@ds163301.mlab.com:63301/heroku_sl7gm73b');
// mongoose.connect('mongodb://localhost/tripdb');

app.use(session({
  secret: "trip-app",
  resave: true,
  saveUninitialized: true
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// default value for title local
app.locals.title = 'Trip App';

passport.serializeUser((user, cb) => {
  cb(null, user._id);
});

passport.deserializeUser((id, cb) => {
  User.findById(id, (err, user) => {
    if (err) { return cb(err); }
    cb(null, user);
  });
});

passport.use('local', new LocalStrategy((username, password, next) => {
  User.findOne({ username }, (err, user) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return next(null, false, { message: "Incorrect username" });
    }
    if (!bcrypt.compareSync(password, user.encryptedPass)) {
      return next(null, false, { message: "Incorrect password" });
    }

    return next(null, user);
  });
}));


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(layouts);


//REDIRECTS IF USER IS NOT LOGGED IN
// app.use(function(req, res, next) {
//     if (typeof user === 'undefined'){
//         res.render('auth/signup.ejs');
//     }   else{
//         next();
//     }
// });

app.use((req, res, next) => {
    if(req.user) {
        res.locals.user = req.user;
    }
    next();
});

const index = require('./routes/index');
app.use('/', index);

const authRoutes = require('./routes/auth-routes');
app.use('/', authRoutes);

const profileRoutes = require('./routes/profile-routes');
app.use('/', profileRoutes);

const apiRoutes = require('./routes/api-routes');
app.use('/', apiRoutes);

const tripsRoutes = require('./routes/trip-routes');
app.use('/', tripsRoutes);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

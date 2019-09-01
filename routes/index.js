var express = require('express');
var router = express.Router();
var pageTitle = 'TravelBuddy';
var db = require('../models');
const Users = db.User;
const bcrypt = require('bcryptjs');
const passport = require('passport');

const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth')

// /* GET home page. */
router.get('/', forwardAuthenticated, function (req, res, next) {
  res.render('index', { title: 'TravelBuddy' });
});

router.get('/login', forwardAuthenticated, (req, res) => res.render('login'));

router.get('/signup', forwardAuthenticated, (req, res) => res.render('signup'));

router.get('/user', ensureAuthenticated, (req, res) =>
  res.render('user', {
    user: req.user
  })
);

router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success_message', 'You are logged out');
  res.redirect('/login');
});

router.post('/api/signup', (req, res) => {
  let { fName, lName, email, password, password2 } = req.body;

  console.log(req.body);

  let errors = [];
  if (!fName || !lName || !email || !password || !password2) {
    errors.push({ message: 'Please fill in all fields'});
  }
  if (password !== password2) {
    errors.push({ message: 'Passwords do not match'});
  }
  if (password.length < 6) {
    errors.push({ message: 'Password needs to be at least 6 characters long '});
  }
  if (errors.length > 0) {
    res.render('signup', {
      errors,
      fName,
      lName,
      email,
      password,
      password2
    });
  } else {
    Users.findOne({
      where: {
        email: email
      }
    }).then((dbUsers) => {
      if (dbUsers) {
        errors.push({ message: 'Email already exists please log in'});
        res.render('login', {
          errors,
          email
        });
      } else {
        console.log(typeof process.env.SALT_VAL);
        // eslint-disable-next-line handle-callback-err
        bcrypt.genSalt(parseInt(process.env.SALT_VAL), function (err, salt) {
          bcrypt.hash(password, salt, function (err, hash) {
            if (err) throw err;
            password = hash;
            console.log('password', password);
            Users.create({
              firstName: req.body.fName,
              lastName: req.body.lName,
              email: req.body.email,
              password: password
            })
            // pass the result of our call
              .then(function (dbUser) {
                // log the result to our terminal/bash window
                console.log(dbUser);
                // redirect
                req.flash('success_message', 'You are now signed up and can log in');
                res.redirect('/login');
              })
              .catch(err => console.log(err));
          });
        });
      }
    });
  }
});

router.post('/api/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/user',
    failureRedirect: '/login',
    failureFlash: true
  })(req, res, next);
});

router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success_message', 'You are logged out');
  res.redirect('/login');
});

router.get('/newTrip', ensureAuthenticated, function (req, res, next) {
  res.render('tripForm.pug', {title: pageTitle, user: req.user});
});

router.get('/updateTrip', ensureAuthenticated, function (req, res, next) {
  res.render('updateTrip.pug', {title: pageTitle, user: req.user});
});

router.get('/comingSoon', ensureAuthenticated, function (req, res, next) {
  res.render('redirect.pug', {title: pageTitle, user: req.user});
});

router.get('/tripDetails', ensureAuthenticated, function (req, res, next) {
  db.Trip.findAll({
    where: {
      UserId: req.user.id
    }
  }).then(function (trips) {
    res.render('travelInfoForm.pug', {title: pageTitle, trips: trips, user: req.user});
  }).catch(function (err) {
    res.json(err);
  });
});

router.get('/allForms', ensureAuthenticated, function (req, res, next) {
  res.render('allForms.pug', {title: pageTitle, user: req.user});
});

router.get('/flightForm', ensureAuthenticated, function (req, res, next) {
  res.render('flightInfo.pug', {title: pageTitle, user: req.user});
});

router.get('/transportForm', ensureAuthenticated, function (req, res, next) {
  res.render('transportInfo.pug', {title: pageTitle, user: req.user});
});

router.get('/lodgingForm', ensureAuthenticated, function (req, res, next) {
  res.render('lodgingInfo.pug', {title: pageTitle, user: req.user});
});

router.get('/allTrips', ensureAuthenticated, function (req, res, next) {
  db.Trip.findAll({
    where: {
      UserId: req.user.id
    },
    include: [
      {
        model: db.Flight
      },
      {
        model: db.Lodging
      },
      {
        model: db.Transport
      }
    ]
  }).then(function (trips) {
    console.log(trips);
    db.Flight.findAll({
    }).then(function (flights) {
      db.Transport.findAll({}).then(function (transports) {
        db.Lodging.findAll({}).then(function (lodgings) {
          res.render('trips.pug', {title: pageTitle, trips: trips, flights: flights, transports: transports, lodgings: lodgings, user: req.user});
        });
      });
    }).catch(function (err) {
      res.json(err);
    });
  });
});

router.delete('/api/trips/:id', function (req, res) {
  db.Trip.destroy({
    where: {
      TripId: req.params
    }
  }).then(function (dbTrip) {
    res.json(dbTrip);
  });
});

// module.exports = router;
const path = require('path');
const apiRoutes = require('./api'); // index.js
// API Routes
router.use('/api', apiRoutes);

// If no API routes are hit send home
router.use(function (req, res) {
  res.sendFile(path.join(__dirname, '../views'));
});

module.exports = router;

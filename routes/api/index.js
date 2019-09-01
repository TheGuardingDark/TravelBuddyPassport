const router = require('express').Router();
const tripRoutes = require('./trips');
const flightRoutes = require('./flights.js');
const lodgingRoutes = require('./lodgings');
const transportRoutes = require('./transports');
// const apiRoutes = require('./apiRoutes');
// const userRoutes = require('./users');

// Trip routes
router.use('/trips', tripRoutes);

// Flight routes
router.use('/flights', flightRoutes);

// Lodging routes
router.use('/lodgings', lodgingRoutes);

// Transport routes
router.use('/transports', transportRoutes);

// User routes
// router.use('/users', userRoutes);

// router.use('/signup', apiRoutes);

// router.use('/login', apiRoutes);

// router.use('logout', apiRoutes);

module.exports = router;

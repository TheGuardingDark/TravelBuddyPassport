const router = require('express').Router();
const tripsController = require('../../controllers/tripsControllers');
// const trip = require('../../models/trip');

// Matches with "/api/trips"
router.route('/')
  .get(tripsController.findAll)
  .post(tripsController.create);

// Matches with "/api/trips/:id"
router
  .route('/:id')
  .get(tripsController.findById)
  .put(tripsController.update)
  .delete(tripsController.remove);

module.exports = router;

const router = require('express').Router();
const lodgingsController = require('../../controllers/lodgingsControllers');

// Matches with "/api/lodgings"
router.route('/')
  .get(lodgingsController.findAll)
  .post(lodgingsController.create);

// Matches with "/api/lodgings/:id"
router
  .route('/:id')
  .get(lodgingsController.findById)
  .put(lodgingsController.update)
  .delete(lodgingsController.remove);

module.exports = router;

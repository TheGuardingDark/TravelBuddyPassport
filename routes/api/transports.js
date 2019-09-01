const router = require('express').Router();
const transportsController = require('../../controllers/transportsControllers');

// Matches with "/api/transports"
router.route('/')
  .get(transportsController.findAll)
  .post(transportsController.create);

// Matches with "/api/transports/:id"
router
  .route('/:id')
  .get(transportsController.findById)
  .put(transportsController.update)
  .delete(transportsController.remove);

module.exports = router;

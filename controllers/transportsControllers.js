const db = require('../models');

// Defining methods for the tripsController
module.exports = {
  findAll: function (req, res) {
    db.Transport
      .find(req.query)
      .sort({ date: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findById: function (req, res) {
    db.Transport
      .findById(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  create: function (req, res) {
    db.Transport
      .create(req.body)
      .then(dbModel => res.json(dbModel)).then(res.status(200).redirect('/user'))
      .catch(err => res.status(422).json(err));
  },
  update: function (req, res) {
    db.Transport
      .findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbModel => res.json(dbModel)).then(res.status(200).redirect('/user'))
      .catch(err => res.status(422).json(err));
  },
  remove: function (req, res) {
    db.Transport
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};

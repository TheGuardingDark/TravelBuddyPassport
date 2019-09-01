
module.exports = function (sequelize, DataTypes) {
  var Flight = sequelize.define('Flight', {
    airline: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    flightConNum: {
      type: DataTypes.STRING,
      allowNull: false
    },
    dateStartFly: {
      type: DataTypes.STRING
      // validate: {
      //   isDate: true
      // }
    },
    dateEndFly: {
      type: DataTypes.STRING
      // validate: {
      //   isDate: true
      // }
    },
    flightTime: {
      type: DataTypes.STRING
    },
    cancelledFly: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    flightNotes: {
      type: DataTypes.TEXT
    }
  });

  Flight.associate = function (models) {
    Flight.belongsTo(models.Trip, {
      foreignKey: {
        allowNull: false
      }
    });
  };
  return Flight;
};

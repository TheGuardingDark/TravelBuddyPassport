
module.exports = function (sequelize, DataTypes) {
  var Lodging = sequelize.define('Lodging', {
    lodgingName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    lodgingConNum: {
      type: DataTypes.STRING,
      allowNull: false
    },
    dateStartLodg: {
      type: DataTypes.STRING
      // validate: {
      //   isDate: true
      // }
    },
    dateEndLodg: {
      type: DataTypes.STRING
      // validate: {
      //   isDate: true
      // }
    },
    checkIn: {
      type: DataTypes.STRING
    },
    cancelledLodg: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    lodgingNotes: {
      type: DataTypes.TEXT
    }
  });
  Lodging.associate = function (models) {
    Lodging.belongsTo(models.Trip, {
      foreignKey: {
        allowNull: false
      }
    });
  };
  return Lodging;
};

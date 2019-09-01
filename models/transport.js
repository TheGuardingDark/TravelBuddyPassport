
module.exports = function (sequelize, DataTypes) {
  var Transport = sequelize.define('Transport', {
    dealer: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    carConNum: {
      type: DataTypes.STRING,
      allowNull: false
    },
    dateStartTran: {
      type: DataTypes.STRING
      // validate: {
      //   isDate: true
      // }
    },
    dateEndTran: {
      type: DataTypes.STRING
      // validate: {
      //   isDate: true
      // }
    },
    tranTime: {
      type: DataTypes.STRING
    },
    cancelledTran: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    transportNotes: {
      type: DataTypes.TEXT
    }
  });
  Transport.associate = function (models) {
    Transport.belongsTo(models.Trip, {
      foreignKey: {
        allowNull: false
      }
    });
  };
  return Transport;
};

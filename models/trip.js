module.exports = function (sequelize, DataTypes) {
  var Trip = sequelize.define('Trip', {

    tripName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    startDate: {
      type: DataTypes.STRING
      // validate: {
      //   isDate: true
      // }
    },
    endDate: {
      type: DataTypes.STRING
      // validate: {
      //   isDate: true
      // }
    },
    tripNotes: {
      type: DataTypes.STRING
    }
  });

  Trip.associate = function (models) {
    Trip.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
    Trip.hasMany(models.Flight, {
      onDelete: 'cascade'
    });
    Trip.hasMany(models.Lodging, {
      onDelete: 'cascade'
    });
    Trip.hasMany(models.Transport, {
      onDelete: 'cascade'
    });
  };
  return Trip;
};

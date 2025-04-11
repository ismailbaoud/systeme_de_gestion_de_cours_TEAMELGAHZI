const { Model, DataTypes } = require('sequelize');
const User = require('./UserModel');
const Course = require('./CourseModel');
const sequelize = require('../config/db.config');


class Enrollment extends Model {}

Enrollment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    course_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Enrollment',
    tableName: 'enrollments',
    timestamps: true,
  }
);

Enrollment.belongsTo(User, { foreignKey: 'user_id', onDelete: 'CASCADE' });
Enrollment.belongsTo(Course, { foreignKey: 'course_id', onDelete: 'CASCADE' });

module.exports = Enrollment;

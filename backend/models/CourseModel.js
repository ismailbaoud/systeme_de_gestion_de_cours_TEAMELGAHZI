const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');

class CourseModel extends Model {}

CourseModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'Course',
    tableName: 'courses', 
    timestamps: true, 
  }
);

module.exports = CourseModel;

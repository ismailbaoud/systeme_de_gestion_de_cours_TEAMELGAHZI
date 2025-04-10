const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');

class LessonModel extends Model {}

LessonModel.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  module_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'modules',
      key: 'id'
    }
  },
  title: {
    type: DataTypes.STRING(150),
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT
  },
  content: {
    type: DataTypes.TEXT
  },
  order: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
}, {
  sequelize,
  modelName: 'Lesson',
  tableName: 'lessons',
  timestamps: true
});

module.exports = LessonModel;

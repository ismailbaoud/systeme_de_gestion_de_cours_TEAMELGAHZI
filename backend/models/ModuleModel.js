// models/ModuleModel.js
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');

class ModuleModel extends Model {}

ModuleModel.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  course_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'courses',
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
  order: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
}, {
  sequelize,
  modelName: 'Module',
  tableName: 'modules',
  timestamps: true
});

module.exports = ModuleModel;

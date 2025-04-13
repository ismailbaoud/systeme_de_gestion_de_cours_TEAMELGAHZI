const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');
const ModuleModel = require('./ModuleModel');

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
  user_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'users',
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
  done: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
}, {
  sequelize,
  modelName: 'Lesson',
  tableName: 'lessons',
  timestamps: true
});

LessonModel.belongsTo(ModuleModel, {
  foreignKey: 'module_id',
  onDelete: 'CASCADE'
});

module.exports = LessonModel;

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');

class ProgressModel extends Model {}

ProgressModel.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  course_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'courses',
      key: 'id'
    }
  },
  lesson_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'lessons',
      key: 'id'
    }
  },
  progress: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  completed_at: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {
  sequelize,
  modelName: 'Progress',
  tableName: 'progress',
  timestamps: false
});

module.exports = ProgressModel;

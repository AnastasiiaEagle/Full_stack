import { DataTypes } from 'sequelize';
import { sequelize } from '@/lib/db';

export const Task = sequelize.define('Task', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
  },
  status: {
    type: DataTypes.ENUM('todo', 'in progress', 'done'),
    allowNull: false,
    defaultValue: 'todo',
  },
});
import { Sequelize } from 'sequelize';

import { User } from '@/models/User';
import { Task } from '@/models/Task';

export const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite', 
  logging: false, 
});


export const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log(' База даних підключена успішно!');
  } catch (error) {
    console.error(' Помилка підключення до бази:', error);
  }
};

export const syncDatabase = async () => {
    try {
      await sequelize.sync({ force: true });
      console.log(' База даних синхронізована!');
    } catch (error) {
      console.error(' Помилка синхронізації бази:', error);
    }
  };
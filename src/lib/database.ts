import Koa from 'koa';
import { createConnection, getConnection } from 'typeorm';
import { Sequelize } from 'sequelize';
import { initModels } from '../models/init-models';

export default (app: Koa) => {
  const { config } = app.context;

  const sequelize = new Sequelize(config.sequelize);
  initModels(sequelize);
  app.context.sequelize = sequelize;

  createConnection(config.typeorm);
  app.context.typeorm = getConnection();
};

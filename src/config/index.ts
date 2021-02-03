import fs from 'fs';
import { resolve } from 'path';

const typeorm = JSON.parse(fs.readFileSync(resolve(__dirname, '../../../ormconfig.json')).toString());

export default {
  typeorm,
  sequelize: {
    host: 'localhost',
    port: 3306,
    database: 'sequelize',
    username: 'root',
    password: 'root',
    dialect: 'mysql',
    pool: {
      max: 3,
      min: 1,
      acquire: 30000,
      idle: 15000,
    },
  },
};

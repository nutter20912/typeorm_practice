import type { Sequelize } from 'sequelize';
import { Record } from './Record.model';
import { User } from './User.model';

export function initModels(sequelize: Sequelize) {
  Record.initModel(sequelize);
  User.initModel(sequelize);

  Record.belongsTo(User, { foreignKey: 'userId' });
  User.hasMany(Record, { foreignKey: 'userId' });
}

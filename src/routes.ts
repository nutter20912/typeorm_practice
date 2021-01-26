import CashAction from './controller/CashAction';
import UserAction from './controller/UserAction';

/**
 * All application routes.
 */
export const AppRoutes = [
  // user
  { method: 'post', path: '/user', action: UserAction.store },
  { method: 'get', path: '/user/:id', action: UserAction.show },

  // cash
  { method: 'put', path: '/user/:id/cash/addByTypeOrm', action: CashAction.addByTypeOrm },
  { method: 'put', path: '/user/:id/cash/addBySequelizeOrm', action: CashAction.addBySequelizeOrm },
  { method: 'put', path: '/user/:id/cash/addOrFail', action: CashAction.addOrFail },
];

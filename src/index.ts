import { createConnection } from 'typeorm';
import Koa from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import { AppRoutes } from './routes';
import HttpKernel from './lib/HttpKernel';

createConnection().then(async connection => {
  const app = new Koa();
  const router = new Router();
  const httpKernel = new HttpKernel(app);

  AppRoutes.forEach(route => router[route.method](route.path, route.action));

  app.use(httpKernel.errorHandler);
  app.use(bodyParser());
  app.use(router.routes());
  app.use(router.allowedMethods());
  app.listen(3000);

  console.log('Koa application is up and running on port 3000');

}).catch(error => console.log('TypeORM connection error: ', error));

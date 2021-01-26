import Koa from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import config from './config/default';
import { AppRoutes } from './routes';
import database from './lib/database';
import HttpKernel from './lib/HttpKernel';

const app = new Koa();
app.context.config = config;

const router = new Router();
const httpKernel = new HttpKernel();

AppRoutes.forEach((route) => router[route.method](route.path, route.action));

app.use(httpKernel.errorHandler);
database(app);
app.use(bodyParser());
app.use(router.routes());
app.use(router.allowedMethods());
app.listen(3011);

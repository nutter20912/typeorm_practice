import Koa, { Context, Next } from 'koa';
import type { Middleware } from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import config from '../config';
import database from './database';
import { AppContainer } from './Container';
import { Controller } from '../contracts/Controller';
import { TYPES } from '../../types';

export class HttpKernel {
  private app: Koa;

  private router: Router;

  private container: AppContainer;

  public constructor() {
    this.app = new Koa();
    this.router = new Router();
    this.container = new AppContainer();
  }

  public build(): Koa {
    this.registerContainer();

    this.app.use(bodyParser());
    this.app.use(this.router.routes());
    this.app.use(this.router.allowedMethods());

    return this.app;
  }

  public setConfig(appConfig): this {
    this.app.context.config = appConfig;

    return this;
  }

  public async registerContainer() {
    await this.container.registerControllers();
    await this.container.registerServices();

    this.app.use(this.getErrorHandler());
    database(this.app);

    this.registerRoutes();
  }

  /**
   * Exception 例外處理
   */
  public getErrorHandler(): Middleware {
    return async (context: Context, next: Next) => {
      try {
        await next();
      } catch (err) {
        context.status = err.status || 500;

        context.body = {
          result: 'error',
          code: err.code,
          msg: err.message,
        };
      }
    };
  }

  /**
   * 註冊路由
   *
   * @param router
   */
  public async registerRoutes(): Promise<void> {
    console.log('get');
    const controllers = this.container.getAll<Controller>(TYPES.Controller);

    controllers.forEach((controller) => {
      const routes = controller.getRoutes();

      routes.forEach(({ method, path, action }) => {
        this.router[method](path, this.getRouterMiddleware(controller, action));
      });
    });
  }

  /**
   * 取得路由中介層閉包
   *
   * @param controller
   * @param action
   */
  public getRouterMiddleware(controller, action): Middleware {
    return async (ctx) => {
      try {
        const result = await controller[action.name](ctx);

        ctx.body = result;
      } catch (error) {
        ctx.body = {
          result: 'error',
          code: error.code,
          msg: error.message,
        };
      }
    };
  }
}

import { readdirSync } from 'fs';
import { resolve, extname, basename } from 'path';
import { Container } from 'inversify';
import { Controller } from '../contracts/Controller';
import { TYPES } from '../../types';

import { Weapon, ThrowableWeapon } from '../contracts/Services';
import { Katana } from '../services/Katana';
import { Shuriken } from '../services/Shuriken';

export class AppContainer extends Container {
  /**
   * 容器註冊控制器
   */
  public async registerControllers() {
    await this.getFiles().forEach(async (file) => this.bindController(file));
  }

  /**
   * 取得controller檔案
   */
  public getFiles() {
    return readdirSync(resolve(__dirname, '../controller'))
      .filter((file) => extname(file).toLowerCase() === '.js');
  }

  /**
   * 動態載入 controller
   * @param file
   */
  public async bindController(file) {
    const { default: myController } = await import(resolve('build/src/controller', basename(file)));
    this.bind<Controller>(TYPES.Controller).to(myController);
    console.log('bind');
  }

  /**
   * 綁定 services
   */
  public async registerServices() {
    this.bind<Weapon>(TYPES.Weapon).to(Katana);
    this.bind<ThrowableWeapon>(TYPES.ThrowableWeapon).to(Shuriken);
  }

  /**
   * 取得所有控制器
   */
  public getAllControllers() {
    console.log('get');
    return this.getAll<Controller>(TYPES.Controller);
  }
}

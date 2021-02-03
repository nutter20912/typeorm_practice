/* eslint-disable max-classes-per-file */
import { injectable, inject } from 'inversify';
import { Weapon, ThrowableWeapon } from '../contracts/Services';
import { TYPES } from '../../types';
import { Controller } from '../contracts/Controller';

@injectable()
export default class Ninja implements Controller {
  private _katana: Weapon;

  private _shuriken: ThrowableWeapon;

  public getRoutes() {
    return [
      { method: 'get', path: '/test', action: this.fight },
    ];
  }

  public constructor(
    @inject(TYPES.Weapon) katana: Weapon,
    @inject(TYPES.ThrowableWeapon) shuriken: ThrowableWeapon,
  ) {
    this._katana = katana;
    this._shuriken = shuriken;
  }

  public fight(ctx) {
    ctx.body = this._katana.hit();
    return this._katana.hit();
  }

  public sneak() {
    return this._shuriken.throw();
  }
}

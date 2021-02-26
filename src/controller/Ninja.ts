import { inject } from 'inversify';
import { provide } from 'inversify-binding-decorators';
import { Controller } from '../contracts/Controller';
import { Weapon } from '../contracts/Services';
import { TYPES, SERVICES } from '../lib/types';

@provide(TYPES.Controller)
export class Ninja implements Controller {
  private katana: Weapon;

  public constructor(
    @inject(SERVICES.Weapon) katana: Weapon,
  ) {
    this.katana = katana;
  }

  public getRoutes() {
    return [
      { method: 'get', path: '/test', action: this.fight },
    ];
  }

  public fight(ctx) {
    ctx.body = this.katana.hit();
    return this.katana.hit();
  }
}

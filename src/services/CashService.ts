// import { inject } from 'inversify';
import { provide } from 'inversify-binding-decorators';
// import { Weapon } from '../contracts/Services';
import { SERVICES } from '../lib/types';

@provide(SERVICES.CashService)
export class CashService {
  // private shuriken;
  //
  // public constructor(
  //   @inject(SERVICES.ThrowableWeapon) shuriken,
  // ) {
  //   this.shuriken = shuriken;
  // }

  public hit() {
    // return this.shuriken.throw();
    return 'aa';
  }
}

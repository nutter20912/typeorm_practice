import { provide } from 'inversify-binding-decorators';
import { ThrowableWeapon } from '../contracts/Services';
import { SERVICES } from '../lib/types';

@provide(SERVICES.ThrowableWeapon)
export class Shuriken implements ThrowableWeapon {
  public throw() {
    return 'hit!';
  }
}

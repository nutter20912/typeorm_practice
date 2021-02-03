import { injectable } from 'inversify';
import 'reflect-metadata';
import { ThrowableWeapon } from '../contracts/Services';

@injectable()
export class Shuriken implements ThrowableWeapon {
  public throw() {
    return 'hit!';
  }
}

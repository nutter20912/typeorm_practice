import { injectable } from 'inversify';
import 'reflect-metadata';
import { Weapon } from '../contracts/Services';

@injectable()
export class Katana implements Weapon {
  public hit() {
    return 'cut!';
  }
}

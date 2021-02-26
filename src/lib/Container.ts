import { Container } from 'inversify';
import { buildProviderModule } from 'inversify-binding-decorators';

export default class AppContainer extends Container {
  /**
   * 註冊服務
   */
  public async register() {
    await import('../services');
    await import('../controller');
    this.load(buildProviderModule());
    console.log('bind');
  }
}

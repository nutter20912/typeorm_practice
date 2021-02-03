import config from './config';
import { HttpKernel } from './lib/HttpKernel';

const app = new HttpKernel();

app
  .setConfig(config)
  .build()
  .listen(3011);

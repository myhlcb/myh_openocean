import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import appRoutes from './router';
import { createConnect } from './connection/mysql';
import Joi from './middleware/joi';
import responseHandle from './middleware/responseHandle';

import { run } from '../app/workers';
const PORT = process.env.PORT || 3000;
const locale = require('koa-locale');

async function init() {
  await createConnect();
  const app = new Koa();
  locale(app);
  app.use(Joi);
  app.use(bodyParser());
  app.use(responseHandle());
  app.use(appRoutes.routes());
  app.use(appRoutes.allowedMethods());
  app.listen(PORT);
  run();
  console.log(`app start with port:${PORT}`);
}
init();

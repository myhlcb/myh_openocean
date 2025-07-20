import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import appRoutes from './router';
import mysqlConnection from './connection/mysql';
import Joi from './middleware/joi';
import responseHandle from './middleware/responseHandle';
const PORT = process.env.PORT || 3000;
const locale = require('koa-locale');

async function init() {
  await mysqlConnection();
  const app = new Koa();
  locale(app);
  app.use(Joi);
  app.use(bodyParser());
  app.use(responseHandle());
  app.use(appRoutes.routes());
  app.use(appRoutes.allowedMethods());
  app.listen(PORT);

  console.log(`app start with port:${PORT}`);
}
init();

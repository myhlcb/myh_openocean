import Router from 'koa-router';
import exchangeRouter from './exchange.router';
const router = new Router({ prefix: '/api' });
router.use(exchangeRouter.routes(), exchangeRouter.allowedMethods());
export default router;

import Router from 'koa-router';
import dexRouter from './dex.router';
const router = new Router({ prefix: '/api' });
router.use(dexRouter.routes(), dexRouter.allowedMethods());
export default router;

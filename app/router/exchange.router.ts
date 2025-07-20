import Router from 'koa-router';
import openoceanRouter from './openocean.router';
const router = new Router({ prefix: '/exchange' });
router.use(openoceanRouter.routes(), openoceanRouter.allowedMethods());
export default router;

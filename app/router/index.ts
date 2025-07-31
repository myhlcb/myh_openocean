import Router from 'koa-router';
import dexRouter from './dex.router';
import { register } from 'prom-client';
import { qpsMiddleware } from '../middleware/qps';
const router = new Router({ prefix: '/api' });
router.use(dexRouter.routes(), dexRouter.allowedMethods());

router.get('/hello', qpsMiddleware(), async (ctx) => {
  ctx.body = { success: true, message: 'Hello OpenOcean API!' };
});

router.get('/metrics', async (ctx) => {
  ctx.set('Content-Type', register.contentType);
  ctx.body = await register.metrics();
});
export default router;

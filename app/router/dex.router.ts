import Router from 'koa-router';
import dexController from '../controller/dex/';
import openoceanRouter from './openocean.router';

const router = new Router({ prefix: '/dex' });
router.get('/token', dexController.tokenList);

router.use(openoceanRouter.routes(), openoceanRouter.allowedMethods());
export default router;

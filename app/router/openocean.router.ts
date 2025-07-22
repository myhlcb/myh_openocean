import Router from 'koa-router';
import openoceanController from '../controller/dex/openocean';
const router = new Router({ prefix: '/openocean' });
router.get('/chains', openoceanController.chains);
router.get('/token', openoceanController.tokenList);
router.get('/gasPrice', openoceanController.gasPrice);
router.get('/quote', openoceanController.quote);
router.get('/swap', openoceanController.swap);
export default router;

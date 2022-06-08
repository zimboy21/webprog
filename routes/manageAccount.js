import Router from 'express';
import { getMyAccount } from '../database/user.js';

const router = Router();

router.get('/', async (req, resp) => {
  const myAccount = await getMyAccount(resp.locals.payload.uid);
  const myacc = myAccount[0];
  resp.render('manageAccount', { myacc });
});

export default router;

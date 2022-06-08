import { Router } from 'express';
import { updateUserProfile, getMyAccount } from '../database/user.js';

const router = Router();

router.post('/updateUserProfile/:id', async (req, resp) => {
  try {
    await updateUserProfile(
      req.body.firstName,
      req.body.lastName,
      req.body.phone,
      req.body.address,
      resp.locals.payload.uid,
    );
    const myAccount = await getMyAccount(resp.locals.payload.uid);
    const myacc = myAccount[0];
    resp.render('manageAccount', { myacc });
  } catch (err) {
    resp.render('error', { err });
  }
});
export default router;

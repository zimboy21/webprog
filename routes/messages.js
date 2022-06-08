import { Router } from 'express';
import { getMyMessages } from '../database/chat.js';

const router = Router();

router.get('/', async (req, resp) => {
  try {
    const messages = await getMyMessages(resp.locals.payload.uid);
    resp.render('messageBox', { messages });
  } catch (err) {
    resp.render('error', { err });
  }
});

export default router;

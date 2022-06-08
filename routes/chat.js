import { Router } from 'express';
import { getChat, sendMessage } from '../database/chat.js';
import { getMyAccount } from '../database/user.js';

const router = Router();

router.post('/chat/sendMessage', async (req, resp) => {
  try {
    await sendMessage(req.body.from, req.body.to, req.body.text);
  } catch (err) {
    resp.render('error', { err });
  }
});

router.get('/:id', async (req, resp) => {
  try {
    const chat = await getChat(resp.locals.payload.uid, req.params.id);
    const acc = await getMyAccount(req.params.id);
    const user = acc[0];
    resp.render('chat', { user, chat });
  } catch (err) {
    resp.render('error', { err });
  }
});

export default router;

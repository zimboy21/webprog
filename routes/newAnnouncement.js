import { Router } from 'express';
import { getAllUser } from '../database/user.js';

const router = Router();

router.get('/', async (req, resp) => {
  try {
    const error = '';
    const users = await getAllUser();
    resp.render('newAnnouncement', { error, users });
  } catch (err) {
    resp.render('error', { err });
  }
});

export default router;

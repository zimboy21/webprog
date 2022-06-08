import { Router } from 'express';
import { getAllUser } from '../database/user.js';

const router = Router();

router.get('/', async (req, resp) => {
  const users = await getAllUser();
  resp.render('users', { users });
});

export default router;

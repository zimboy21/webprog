import { Router } from 'express';
import bcrypt from 'bcrypt';
import { createUser } from '../database/user.js';

const router = Router();

router.post('/', async (req, res) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hashSync(req.body.registerPassword, salt);
    await createUser(req.body.registerName, req.body.registerMail, hashedPassword);
    res.redirect('/');
  } catch (error) {
    const err = `Something went wrong: ${error}`;
    res.render('error', { err });
  }
});

export default router;

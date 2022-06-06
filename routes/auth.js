import { Router } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import secret from  '../utils/utils.js';
import { checkUserAuth } from '../database/user.js';

const router = Router();

router.get('/getAuthForm', (req, resp) => {
  resp.render('login');
});

router.post('/login', async (req, resp) => {
  try {
    const userMail = req.body.loginMail;
    const password = await checkUserAuth(userMail);
    if (Object.keys(password[0]).length === 0) {
      const err = 'Username does not exist!';
      resp.render('error', { err });
      return;
    }
    if (await bcrypt.compare(req.body.loginPassword, password[0].user_password)) {
      const cookie = jwt.sign({ userMail }, secret);
      resp.cookie('cookie', cookie, {
        httpOnly: true,
        sameSite: 'strict',
      });
      resp.redirect('/');
    } else {
      resp.status(401);
      const err = 'Incorrect credentials!';
      resp.render('error', { err });
    }
  } catch (error) {
    const err = `Something went wrong: ${error}`;
    resp.render('error', { err });
  }
});

router.post('/logout', (req, res) => {
  res.clearCookie('cookie');
  res.redirect('/');
});

export default router;

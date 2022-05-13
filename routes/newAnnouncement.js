import { Router } from 'express';
import { createAnnouncement } from '../database/announcement.js';
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

router.post('/', async (req, resp) => {
  try {
    await createAnnouncement(
      req.body.uploadCity,
      req.body.uploadQuarter,
      req.body.uploadArea,
      req.body.uploadPrice,
      req.body.uploadRomms,
      req.body.uploadDate,
      req.body.uploadUserId,
    );
    resp.redirect('/');
  } catch (err) {
    resp.render('error', { err });
  }
});

export default router;

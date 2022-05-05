import { Router } from 'express';
import { getAllAnnouncement } from '../database/announcement.js';

const router = Router();

router.get('/', async (req, resp) => {
  try {
    const announcements = await getAllAnnouncement();
    const error = '';
    resp.render('homepage', { error, announcements });
  } catch (err) {
    resp.render('error', { err });
  }
});

export default router;

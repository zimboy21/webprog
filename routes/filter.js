import { Router } from 'express';
import { searchAnnouncement } from '../database/announcement.js';

const router = Router();

router.post('/', async (req, resp) => {
  try {
    const announcements = await searchAnnouncement(
      req.body.searchCity,
      req.body.searchQuarter,
      req.body.searchMinPrice,
      req.body.searchMaxPrice,
    );
    const error = '';
    resp.render('homepage', { error, announcements });
  } catch (err) {
    resp.render('error', { err });
  }
});

export default router;

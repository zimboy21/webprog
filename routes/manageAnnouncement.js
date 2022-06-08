import Router from 'express';
import { getMyAnnouncements } from '../database/announcement.js';

const router = Router();

router.get('/', async (req, resp) => {
  const myAnnouncements = await getMyAnnouncements(resp.locals.payload.uid);
  resp.render('manageAnnouncement', { myAnnouncements });
});

export default router;

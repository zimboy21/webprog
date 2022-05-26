import { Router } from 'express';
import { getAnnouncementPicture } from '../database/pictures.js';
import { getAnnouncement } from '../database/announcement.js';

const router = Router();

router.get('/:id', async (req, resp) => {
  try {
    const { id } = req.params;
    const pictures = await getAnnouncementPicture(id);
    const [announcement] = await getAnnouncement(id);
    resp.render('announcement', { announcement, pictures });
  } catch (err) {
    resp.render('error', { err });
  }
});

export default router;

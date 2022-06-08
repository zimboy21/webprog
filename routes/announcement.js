import { Router } from 'express';
import { getAnnouncementPicture } from '../database/pictures.js';
import { getMyAnnouncements, getAnnouncement, updateAnnouncement } from '../database/announcement.js';

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

router.post('/:id', async (req, resp) => {
  try {
    const { id } = req.params;
    await updateAnnouncement(
      req.body.updateCity,
      req.body.updateQuarter,
      req.body.updatePrice,
      req.body.updateRomms,
      req.body.updateArea,
      id,
    );
    const myAnnouncements = await getMyAnnouncements(resp.locals.payload.uid);
    resp.render('manageAnnouncement', { myAnnouncements });
  } catch (err) {
    resp.render('error', { err });
  }
});

export default router;

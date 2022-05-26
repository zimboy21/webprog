import express, { Router } from 'express';
import eformidable from 'express-formidable';
import path from 'path';
import fs from 'fs';
import { createPicture } from '../database/pictures.js';
import { getAnnouncementPictureCount, updateAnnouncementPictureCount } from '../database/announcement.js';

const router = Router();

const imagesDir = path.join(process.cwd(), '/static/images');

if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir);
}

router.use(express.static(path.join(process.cwd(), 'static')));

router.use(eformidable({ imagesDir }));

router.post('/uploadImage/:id', async (req, resp) => {
  const file = req.files.uploadImage;
  const { id } = req.params;
  if (!(file && file.type.split('/')[0] === 'image')) {
    const err = 'Invalid file!';
    resp.render('error', { err });
  } else {
    try {
      const picCount = await getAnnouncementPictureCount(id);
      const newPath = path.join(imagesDir, `/apartment_${id}_${picCount[0].picture_count}.jpg`);
      fs.copyFile(file.path, newPath, (err) => {
        if (err) {
          resp.render('error', { err });
        }
      });
      const pictureName = `apartment_${id}_${picCount[0].picture_count}.jpg`;
      await createPicture(pictureName, id);
      await updateAnnouncementPictureCount(id);
      resp.redirect(`/announcement/${id}`);
    } catch (err) {
      resp.render('error', { err });
    }
  }
});

export default router;

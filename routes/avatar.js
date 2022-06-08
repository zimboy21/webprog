import express, { Router } from 'express';
import eformidable from 'express-formidable';
import path from 'path';
import fs from 'fs';

const router = Router();

const imagesDir = path.join(process.cwd(), '/static/avatars');

if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir);
}

router.use(express.static(path.join(process.cwd(), 'static')));

router.use(eformidable({ imagesDir }));

router.put('/uploadAvatar/:id', async (req, resp) => {
  console.log('itt');
  const file = req.files.uploadImage;
  const { id } = req.params;
  console.log(id, file);
  resp.render('error', { id });
});

export default router;

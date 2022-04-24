import express, { Router } from 'express';
import eformidable from 'express-formidable';
import path from 'path';
import fs from 'fs';

const router = Router();

router.use(express.urlencoded({ extended: true }));

const imagesDir = path.join(process.cwd(), 'images');
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir);
}

router.use(express.static(path.join(process.cwd(), 'static')));

router.use(eformidable({ imagesDir }));

router.post('/uploadImage', (req, resp) => {
  const file = req.files.uploadImage;
  let message = '';
  if (!(file && file.type.split('/')[0] === 'image')) {
    message = 'Invalid type';
  } else {
    fs.copyFile(req.files.uploadImage.path, imagesDir, (err) => {
      if (err) {
        message += err;
      }
    });
  }
  if (message === '') {
    message = 'Valid Data!';
  }
  resp.send(message);
});

export default router;

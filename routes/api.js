import Router from 'express';
import { getExtraData } from '../database/announcement.js';
import { deletePicture } from '../database/pictures.js';

const router = Router();

router.get('/announcement/:id', async (req, resp) => {
  try {
    const data = await getExtraData(req.params.id);
    if (Object.entries(data).length === 0) {
      resp.status(404);
      resp.end();
    } else {
      resp.json(data);
      resp.end();
    }
  } catch (error) {
    resp.status(500);
    resp.end();
  }
});

router.delete('/picture/:id', async (req, resp) => {
  const result = await deletePicture(req.params.id);
  if (result.affectedRows !== 0) {
    const sendMessage = 'Deleted succesfully!';
    resp.end(sendMessage);
  } else {
    const sendMessage = 'Picture already deleted!!';
    resp.status(404);
    resp.end(sendMessage);
  }
});

export default router;

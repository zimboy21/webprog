import Router from 'express';
import { getExtraData, deleteAnnouncement } from '../database/announcement.js';
import { deletePicture } from '../database/pictures.js';
import { updateUserPrivileges, deleteUser } from '../database/user.js';

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
  try {
    const result = await deletePicture(req.params.id);
    if (result.affectedRows !== 0) {
      const sendMessage = 'Deleted succesfully!';
      resp.end(sendMessage);
    } else {
      const sendMessage = 'Picture already deleted!!';
      resp.status(404);
      resp.end(sendMessage);
    }
  } catch (error) {
    resp.status(500);
    resp.end();
  }
});

router.delete('/announcement/:id', async (req, resp) => {
  try {
    const result = await deleteAnnouncement(req.params.id);
    if (result.affectedRows !== 0) {
      const sendMessage = 'Announcement deleted succesfully!';
      resp.end(sendMessage);
    } else {
      const sendMessage = 'Announcement already deleted!!';
      resp.status(404);
      resp.end(sendMessage);
    }
  } catch (error) {
    resp.status(500);
    resp.end();
  }
});

router.post('/user', async (req, resp) => {
  try {
    await updateUserPrivileges(req.body.privileges, req.body.id);
    resp.end();
  } catch (error) {
    resp.status(500);
    resp.end();
  }
});

router.delete('/user/:id', async (req, resp) => {
  try {
    await deleteUser(req.params.id);
    resp.end();
  } catch (error) {
    resp.status(500);
    resp.end();
  }
});

export default router;

import util from 'util';
import { pool } from './database.js';

const qp = util.promisify(pool.query).bind(pool);

export const createPicture = async (path, announcementId) => {
  const query = 'insert into picture (picture_path, announcement_id) values(?, ?)';
  return qp(query, [path, announcementId]);
};

export const getPicture = async (id) => {
  const query = 'select * from picture where picture_id = ?';
  return qp(query, [id]);
};

export const getAnnouncementPicture = async (id) => {
  const query = 'select * from picture where announcement_id = ?';
  return qp(query, [id]);
};

export const deletePicture = async (id) => {
  const query = 'delete from picture where picture_id = ?';
  return qp(query, [id]);
};

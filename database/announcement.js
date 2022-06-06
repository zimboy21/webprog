import util from 'util';
import { pool } from './database.js';

const qp = util.promisify(pool.query).bind(pool);

export const createAnnouncement = async (city, quarter, area, price, roomNumber, date, userId) => {
  const query = `insert into announcement(
      announcement_city, 
      announcement_quarter,
      announcement_area,
      announcement_price,
      announcement_room_number,
      announcement_date,
      user_id,
      picture_count
    )
    values(?, ?, ?, ?, ?, ?, ?, ?)`;
  return qp(query, [city, quarter, area, price, roomNumber, date, userId, 0]);
};

export const deleteAnnouncement = async (id) => {
  const query = 'delete from announcement where announcement_id = ?;';
  return qp(query, [id]);
};

export const getAnnouncementId = async () => {
  const query = 'select announcement_id from announcement';
  return qp(query);
};

export const getAllAnnouncement = async () => {
  const query = 'select * from announcement';
  return qp(query, []);
};

export const getAnnouncement = async (id) => {
  const query = 'select * from announcement where announcement_id = ?';
  return qp(query, [id]);
};

export const searchAnnouncement = async (city, quarter, minPrice, maxPrice) => {
  const query = `select * from announcement where 
  announcement_city like ?
  and announcement_quarter like ? 
  and announcement_price >= ? 
  and announcement_price <= ?;`;
  return qp(query, [city, quarter, minPrice, maxPrice]);
};

export const getAnnouncementPictureCount = async (id) => {
  const query = 'select picture_count from announcement where announcement_id = ?';
  return qp(query, [id]);
};

export const updateAnnouncementPictureCount = async (id) => {
  const query = 'update announcement set picture_count = picture_count + 1 where announcement_id = ?';
  return qp(query, [id]);
};

export const getExtraData = async (id) => {
  const query = 'select announcement_area, announcement_date, announcement_room_number from announcement where announcement_id = ?';
  return qp(query, [id]);
};

export const getAnnouncementOwner = (id) => {
  const query = 'select user_id from announcement where announcement_id = ?';
  return qp(query, [id]);
};

export const getMyAnnouncements = async (id) => {
  const query = 'select * from announcement where user_id = ?';
  return qp(query, [id]);
};

import util from 'util';
import { pool } from './database.js';

const qp = util.promisify(pool.query).bind(pool);

export const createUser = async (userName, mail, password) => {
  const query = 'insert into user(user_name, user_mail, user_password, user_privileges) values(?, ?, ?, ?)';
  pool.query(query, [userName, mail, password, 'user']);
};

export const getUserName = async () => {
  const query = 'select user_name from user';
  return qp(query);
};

export const getUserId = async () => {
  const query = 'select user_id from user';
  return qp(query);
};

export const getAllUser = async () => {
  const query = 'select * from user';
  return qp(query);
};

export const getUserData = async (mail) => {
  const query = 'select * from user where user_mail = ?';
  return qp(query, [mail]);
};

export const checkUserAuth = async (mail) => {
  const query = 'select user_password from user where user_mail = ?';
  return qp(query, [mail]);
};

export const checkExistingUser = async (mail) => {
  const query = 'select 1 from user where user_mail = ?';
  return qp(query, [mail]);
};

export const updateUserPrivileges = async (prv, id) => {
  const query = 'update user set user_privileges = ? where user_id = ?';
  return qp(query, [prv, id]);
};

export const deleteUser = async (id) => {
  const query = 'delete from user where user_id = ?';
  return qp(query, [id]);
};

export const getMyAccount = async (id) => {
  const query = 'select * from user where user_id = ?';
  return qp(query, [id]);
};

export const uploadAvatar = async (avatar, id) => {
  const query = 'update user set user_avatar = ? where user_id = ?';
  return qp(query, [avatar, id]);
};

export const updateUserProfile = async (fn, ln, phone, address, id) => {
  const query = `update user
                set user_firstName = ?,
                user_lastname = ?,
                user_phone = ?,
                user_address = ?
                where user_id = ?`;
  return qp(query, [fn, ln, phone, address, id]);
};

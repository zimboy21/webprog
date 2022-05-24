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

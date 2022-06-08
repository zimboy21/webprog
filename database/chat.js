import util from 'util';
import { pool } from './database.js';

const qp = util.promisify(pool.query).bind(pool);

export const getChat = async (from, to) => {
  const query = 'select * from chat where (from_id = ? and to_id = ?) or (from_id = ? and to_id = ?) order by chat_id';
  return qp(query, [from, to, to, from]);
};

export const sendMessage = async (from, to, text) => {
  const query = 'insert into chat(from_id, to_id, chat_text) values(?, ?, ?)';
  return qp(query, [from, to, text]);
};

export const getMyMessages = async (id) => {
  const query = `select user_id, user_name, user_mail from user
  where user_id in (select from_id from chat
  union
  select to_id from chat) and user_id != ?`;
  return qp(query, [id]);
};

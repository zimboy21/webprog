import mysql from 'mysql';

export const pool = mysql.createPool({
  database: 'webprog_2022',
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'zdim1981',
  connectionLimit: 10,
});

export const createAnnouncementTable = async () => {
  pool.query(`create table if not exists announcement (
    announcement_id int auto_increment primary key,
    user_id int,
    announcement_city varchar(64),
    announcement_quarter varchar(64),
    announcement_area float,
    announcement_price float,
    announcement_room_number int,
    announcement_date date,
    picture_count int,
    foreign key (user_id) references user(user_id) on delete cascade
    );`, (error) => {
    if (error) {
      console.error(`Create table error: ${error.message}`);
      process.exit(1);
    } else {
      console.log('Table created successfully: announcement!');
    }
  });
};

export const createUserTable = async () => {
  pool.query(`create table if not exists user (
    user_id int auto_increment primary key,
    user_name varchar(64),
    user_mail varchar(64),
    user_firstName varchar(64),
    user_lastName varchar(64),
    user_phone varchar(64),
    user_address varchar(64),
    user_avatar varchar(128),
    user_privileges varchar(64),
    user_password varchar(512));`, (error) => {
    if (error) {
      console.error(`Create table error: ${error.message}`);
      process.exit(1);
    } else {
      console.log('Table created successfully: user!');
    }
  });
};

export const createPictureTable = async () => {
  pool.query(`create table if not exists picture (
    picture_id int auto_increment primary key,
    picture_path varchar(512),
    announcement_id int,
    foreign key (announcement_id) references announcement(announcement_id) on delete cascade
    );`, (error) => {
    if (error) {
      console.error(`Create table error: ${error.message}`);
      process.exit(1);
    } else {
      console.log('Table created successfully: picture!');
    }
  });
};

export const createChatTable = async () => {
  pool.query(`create table if not exists chat (
    chat_id int auto_increment primary key,
    chat_text varchar(512),
    from_id int,
    to_id int,
    foreign key (from_id) references user(user_id) on delete cascade,
    foreign key (to_id) references user(user_id) on delete cascade
    );`, (error) => {
    if (error) {
      console.error(`Create table error: ${error.message}`);
      process.exit(1);
    } else {
      console.log('Table created successfully: chat!');
    }
  });
};

createUserTable();
createAnnouncementTable();
createPictureTable();
createChatTable();

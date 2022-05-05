create DATABASE if not exists webprog_2022;
use webprog_2022;

ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'zdim1981';
flush privileges;

drop table picture
drop table announcement
drop table user

insert into user(user_name, user_mail, user_password) values('Peter Griffyn', 'pg@mail.com', 'pawwd');
insert into user(user_name, user_mail, user_password) values('admin', 'padmin@mail.com', 'pass');
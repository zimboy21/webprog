create DATABASE if not exists webprog_2022;
use webprog_2022;

ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'zdim1981';
flush privileges;

drop table picture
drop table announcement
drop table user

select * from user

insert into user(user_name, user_mail, user_privileges, user_password) values('Peter Griffyn', 'pg@mail.com', 'admin', 'pawwd');
insert into user(user_name, user_mail, user_privileges, user_password) values('admin', 'padmin@mail.com', 'user', 'pass');
create DATABASE if not exists webprog_2022;
use webprog_2022;

ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'zdim1981';
flush privileges;

drop table picture
drop table announcement
drop table user

select * from user

select user_password from user where user_mail = 'zimi@mail.com'

delete from user

select a.user_id
from announcement as a
join picture as p
on p.announcement_id = a.announcement_id
where p.picture_id = 1

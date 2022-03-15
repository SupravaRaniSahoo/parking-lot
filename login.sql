drop database if exists loginform;
create database loginform;
use  loginform;

create table role (
    role_id INT not null,
    role_name varchar(20),
    role_description varchar(25),
    primary key(role_id)
);

create table login (
        login_id INT not null,
	roles_id INT,
	username varchar(20),
	password varchar(255),
	created_at TIMESTAMP,
	primary key(login_id),
        CONSTRAINT `login_ibfk_1` foreign key(roles_id) references role(role_id)
);

INSERT INTO role VALUES (1001,'Admin','ADMIN_ROLE');
INSERT INTO role VALUES (1002,'User','USER_ROLE');
INSERT INTO role VALUES(1003,'Manager','MANAGER_ROLE');



INSERT INTO login VALUES (2001,1002,'Steven','Steven@123', SYSDATE());
INSERT INTO login VALUES (2002,1001,'Kevin','Kevin@123', SYSDATE());
INSERT INTO login VALUES(2003,1002,'John','John@123', SYSDATE());
INSERT INTO login VALUES (2004,1003,'Tae','Tae@123', SYSDATE());
INSERT INTO login VALUES(2005,1002,'Jill','Jill@123', SYSDATE());
INSERT INTO login VALUES(2006,1001,'Jack','Jack@123', SYSDATE());
INSERT INTO login VALUES(2007,1003,'John','John@123', SYSDATE());
INSERT INTO login VALUES(2008,1003,'Jenny','Jenny@123', SYSDATE());
INSERT INTO login VALUES(2009,1002,'Lisa','Lisa@123', SYSDATE());
INSERT INTO login VALUES(2010,1001,'Harry','Harry@123', SYSDATE());


select * from role;
select * from login; 

commit;

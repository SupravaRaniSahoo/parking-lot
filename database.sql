drop database if exists database3;
create database database3;
use  database3;

create table details (
    details_id INT not null,
    user_name varchar(20),
    password varchar(15),
    primary key(details_id)
);

create table parking (
	parking_id INT not null,
	veichle_type varchar(10),
	name varchar(20),
        vehicle_number varchar(25),
	time_of_entry TIMESTAMP,
        status varchar(10),
        detail_id INT,
        time_of_exit varchar(50),
	primary key(parking_id),
        CONSTRAINT `parking_ibfk_1` foreign key(detail_id) references details(details_id)
);

INSERT INTO details VALUES (201,'Steven','steven123');
INSERT INTO details VALUES (202,'Kevin','kevin123');
INSERT INTO details VALUES(203,'John','john123');
INSERT INTO details VALUES (204,'Chan','chan123');
INSERT INTO details VALUES(205,'Jill','jill123');
INSERT INTO details VALUES(206,'Jack','jack123');
INSERT INTO details VALUES(207,'John','john123');
INSERT INTO details VALUES(208,'Jenny','jenny123');
INSERT INTO details VALUES(209,'lisa','lisa123');
INSERT INTO details VALUES(210,'tae','tae123');
INSERT INTO details VALUES(211,'jk','jk123');
INSERT INTO details VALUES(212,'rm','rm123');
INSERT INTO details VALUES(213,'Jhope','jhope123');
INSERT INTO details VALUES(214,'suga','suga123');
INSERT INTO details VALUES(215,'Jimin','jimin123');
INSERT INTO details VALUES(216,'Jin','jin123');
INSERT INTO details VALUES(217,'rose','rose123');
INSERT INTO details VALUES(218,'tom','tom123');
INSERT INTO details VALUES(219,'lizy','lizy123');
INSERT INTO details VALUES(220,'kat','kat123');



INSERT INTO parking VALUES (1001,'car', 'Steven','AP 02 BK 1084', SYSDATE(),'ACTIVE',201,null);
INSERT INTO parking VALUES (1002,'bike', 'Kevin','AP 02 CT 1075', SYSDATE(),'INACTIVE',202,'22:56:10');
INSERT INTO parking VALUES(1003,'bike', 'John','OR 02 TY 1456', SYSDATE(),'INACTIVE',203,'21:34:20');
INSERT INTO parking VALUES (1004,'car', 'tae','UP 19 D 0343', SYSDATE(),'INACTIVE',210,'23:16:54');
INSERT INTO parking VALUES(1005,'bike', 'Jill','OR 45 R 0873', SYSDATE(),'INACTIVE',205,'22:06:12');
INSERT INTO parking VALUES(1006,'car', 'Jack','CH 19 D 0343', SYSDATE(),'INACTIVE',206,'22:23:45');
INSERT INTO parking VALUES(1007,'car', 'John','CH 19 D 0343', SYSDATE(),'INACTIVE',207,'21:16:12');
INSERT INTO parking VALUES(1008,'bike', 'Jenny','199 RR 999', SYSDATE(),'INACTIVE',208,'22:36:11');
INSERT INTO parking VALUES(1009,'car', 'lisa','233 YU 075', SYSDATE(),'INACTIVE',209,'23:45:14');
INSERT INTO parking VALUES(1010,'bike', 'tae','345 GH 527', SYSDATE(),'INACTIVE',210,'21:15:18');
INSERT INTO parking VALUES(1011,'bike', 'jk','TM 56 AO 675', SYSDATE(),'INACTIVE',211,'20:26:13');
INSERT INTO parking VALUES(1012,'bike', 'rm','TY 78 RG 789', SYSDATE(),'ACTIVE',212,null);
INSERT INTO parking VALUES(1013,'car', 'Jhope','RQ 45 7868', SYSDATE(),'INACTIVE',213,'20:37:10');
INSERT INTO parking VALUES(1014,'bike', 'suga','OR 567 92 U', SYSDATE(),'INACTIVE',214,'21:28:20');
INSERT INTO parking VALUES(1015,'car', 'Jimin','TD 65 Y 88', SYSDATE(),'INACTIVE',215,'23:52:30');
INSERT INTO parking VALUES(1016,'car', 'Jin','56 YU 78 S', SYSDATE(),'INACTIVE',216,'22:41:40');
INSERT INTO parking VALUES(1017,'bike', 'rose','VF 67 I 89', SYSDATE(),'INACTIVE',217,'22:12:50');
INSERT INTO parking VALUES(1018,'bike', 'tom','78 RY 7 H 78', SYSDATE(),'INACTIVE',218,'21:46:10');
INSERT INTO parking VALUES(1019,'car', 'lizy','56 HSJ 78', SYSDATE(),'INACTIVE',219,'23:14:43');
INSERT INTO parking VALUES(1020,'bike', 'kat','HS 95 41BJ', SYSDATE(),'INACTIVE',220,'20:26:52');


select * from parking;
select * from details; 

commit;

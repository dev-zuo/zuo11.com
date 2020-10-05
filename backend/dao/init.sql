
# docker ps 查到 mysql 镜像对应的id为2611，向镜像内部写入数据
# docker exec -i 2611 sh -c 'exec mysql -h127.0.0.1 -uroot -p1234567Abc,.' < ./init.sql

# 允许远程连接
use mysql
select Host,User from user;
update user set host='%' where user='root' and host='localhost';

# 创建数据库
CREATE DATABASE ibd;

# 切换到该数据库
USE ibd;

# 创建表
CREATE TABLE IF NOT EXISTS `ibd_config` (`id` INTEGER AUTO_INCREMENT PRIMARY KEY  , `auditMark` INTEGER NOT NULL) ENGINE=InnoDB;

# 写入初始化数据
insert into ibd_config (auditMark) values (0);
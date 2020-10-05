
# 初次运行部署

数据库
```bash
# 登录到数据库
mysql -uroot -p
# 创建 ibd 数据库
create database ibd


# 再开一个终端运行项目 
npm install
nodemon index.js  # 自动创建 ibd_config 表
 
# 数据库操作，插入一条数据
insert into ibd_config (id, auditMark) values (1, 1);

# 再次运行项目，即可正常运行
nodemon index.js
```
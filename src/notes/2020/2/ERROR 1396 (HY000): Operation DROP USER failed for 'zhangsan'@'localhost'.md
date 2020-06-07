
# ERROR 1396 (HY000): Operation DROP USER failed for 'zhangsan'@'localhost'

在看mysql账号相关内容时，发现在root用户下，更新、删除用户均报错。后面发现居然是localhost的字母拼错了，但新建user时居然没报错。下面来复盘整个记录：

```bash
# 1. 先创建一个账号，用来测试修改用户名
CREATE USER zhangsan@localost IDENTIFIED BY '123';

# 2. 在使用 RENAME USER ... TO ... 时，发现更改不了名字，一直报错
# mysql> RENAME USER 'zhangsan'@'localhost' TO 'wangwu'@'localhost';
ERROR 1396 (HY000): Operation RENAME USER failed for 'zhangsan'@'localhost'

# 3. 于是我试了下删除，发现还是错误
# mysql> DROP USER zhangsan@localhost;
ERROR 1396 (HY000): Operation DROP USER failed for 'zhangsan'@'localhost'

# 4. 于是搜索了下，偶然看到一个测试的命令，仔细看发现host拼写错误，而我之前修改删除时host的localhost都是拼写正确的，所以没匹配到
select user,host from mysql.user where user = 'zhangsan';
+----------+----------+
| user     | host     |
+----------+----------+
| zhangsan | localost |
+----------+----------+
1 row in set (0.00 sec)

# 5. 于是我将host改了下，再删除，就成功了。
mysql> DROP USER zhangsan@localost;
Query OK, 0 rows affected (0.01 sec)
```
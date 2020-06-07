
# 为什么书上SQL语句一般都是大写

一般我比较喜欢小写的sql语句，比如：
```bash
select * from tb_user; # 一般习惯用法
SELECT * FROM tb_user; # 教材或书上的写法
```

为什么小写更直观，而不使用小写呢？今天在看语法时，有了一个答案，来看一个例子

```bash
# select ... from 内连接语法
# 先来看全小写的写法
select some_colums from tb1 inner join tb2 on some_conditions;
# 教科书上的写法
SELECT some_colums FROM tb1 INNER JOIN tb2 ON some_confitions;
```

**你会发现可变动的内容一般是小写（比如：列名，表名，一些条件），而SQL语法相关的单词都是大写，这样更好理解**。全小写描述语法时，对于初学者来看分不清哪些是SQL语句中必须的，哪些是可变动的。以后还是要习惯大写，更规范。
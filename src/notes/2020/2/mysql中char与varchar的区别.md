---
{
  "title": "mysql中char与varchar的区别",
  "staticFileName": "char_varchar.html",
  "author": "guoqzuo",
  "createDate": "2020/02/12",
  "description": "在创建表，指定字段数据类型时，如果是字符串数据类型可以是varchar(50)，也可以是char(50)。这两种有什么区别呢？",
  "keywords": "char和varchar的区别,char varchar区别",
  "category": "后端数据库等"
}
---

# mysql中char与varchar的区别

在创建表，指定字段数据类型时，如果是字符串数据类型可以是varchar(50)，也可以是char(50)。这两种有什么区别呢？

1. 它们都是用来储存字符数值小于255的字符, mysql5.0之前是varchar支持最大255。
2. varchar(40)存入"Bill Gates"，取出数据时字符串长度为10；char(40)存入"Bill Gates"，取出数据时字符串长度为40, 后面会被加多余的空格。
3. varchar使用可能会更方便、所占用内存空间更小，特别是当数据库比较大时，内存和磁盘空间的节省会非常重要。
4. 从系统性能讲，char处理速度更快，有时可以超出varchar处理速度的50%。
5. 在设计数据库时应综合考虑各方面因素，来达到一个平衡。
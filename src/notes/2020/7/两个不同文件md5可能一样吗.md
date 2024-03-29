---
{
  "title": "两个不同文件md5可能一样吗",
  "staticFileName": "file_md5.html",
  "author": "guoqzuo",
  "createDate": "2020/07/06",
  "description": "我们先来看看什么是md5？md5 是 messge digest [daɪˈdʒest] 5 的缩写，意思是信息摘要算法，两个不同文件md5是有可能相同的，因为md5最多只能表示2的128次方种情况，而不同的文件绝对大于这个数。虽然两个文件的md5可能一致，但给定一个文件的md5值，想伪造另一个文件的md5值与该值一样，相对还是比较困难的，因此可用于判断文件完整性",
  "keywords": "两个不同文件md5可能一样吗,md5一样的文件存在吗,md5一样的文件",
  "category": "计算机基础与开发工具"
}
---

# 两个不同文件md5可能一样吗?

我们先来看看什么是md5？md5 是 messge digest [daɪˈdʒest] 5 的缩写，意思是信息摘要算法

linux下，在terminal中执行man md5，可以查看对应的文档

md5 -- calculate a message-digest fingerprint (checksum) for a file 

md5 -- 为一个文件计算信息摘要指纹('校验和'或'校验码')

```bash
md5 -s '123456'
# MD5 ("123456") = e10adc3949ba59abbe56e057f20f883e

md5 1.txt
# MD5 (1.txt) = 6f74626e0749e5353cc7e11767418d43
```
从上面的例子中我们可以看到，将文件或字符串进行 md5校验 会生成一个 32位 的校验码。问题来了，网上看到 md5加密后一般是128位，而这里只有32位为什么呢？我们要分清16进制与2进制，**标准说法是，md5加密后的字符为 128bit(16字节)，而一个我们看到的32位是16进制，每一位都可以转为4bit，也就是4个二进制位。1 - f 分别对应 0000 - 1111，所以128bit**

一个二进制位(bit)只能表示0或1两种情况，128bit可以表示 Math.pow(2, 128) 2的128次方种情况，定死了，最多只能表示这么多种情况，不同内容的文件实在是太多了，理论上绝对是会超过2的128次方的。

综上：**两个不同文件md5是有可能相同的，因为md5最多只能表示2的128次方种情况，而不同的文件绝对大于这个数**

**虽然两个文件的md5可能一致，但给定一个文件的md5值，想伪造另一个文件的md5值与该值一样，相对还是比较困难的，因此可用于判断文件完整性**

参考: [有没有两个完全不一样的文件，但是他们的md5值是一样的？](https://www.zhihu.com/question/29406619)

# markdown里怎么加引用注释或脚注

一般我们只是在markdown添加链接，但怎么在markdown里加脚注呢？下面来看看

```markdown
这里有一个注脚[^1]，这段话的还有其他意思[^2]在里面
[^1]:这里是注脚内容
[^2]:这里是其他意思的注脚
```

注脚放到中间也可以，下面是具体效果

![md_footnote.png](../../../images/blog/web/md_footnote.png)

## md中链接的另一种写法

```markdown
我是一段文字，[baidu][1]、[qq][2]里面有链接
[1]: http://baidu.com "baidu"
[2]: http://qq.com "qq"
```
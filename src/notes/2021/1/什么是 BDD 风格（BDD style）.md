---
{
  "title": "什么是 BDD 风格（BDD style）",
  "staticFileName": "bdd-style.html",
  "author": "guoqzuo",
  "createDate": "2021/01/12",
  "description": "在 Mocha 官网的中，介绍 should.js 时，说它是一种 BDD 风格的断言库。而且在 mocha 的源码中，有很多都是以 bdd 命名的。那什么是 BDD 呢？BDD 是 Behavior Driven Development 的简写，行为驱动开发，是在测试驱动开发（Test-Driven Development，TDD）基础上发展而来的一种软件开发方法。",
  "keywords": "BDD,TDD,BDD Style",
  "category": "计算机基础与开发工具"
}
---
# 什么是 BDD 风格（BDD style）
> should.js - BDD style shown throughout these docs

在 Mocha 官网的中，介绍 should.js 时，说它是一种 BDD 风格的断言库。而且在 mocha 的源码中，有很多都是以 bdd 命名的。那什么是 BDD 呢？

BDD 是 Behavior Driven Development 的简写，行为驱动开发，是在测试驱动开发（Test-Driven Development，TDD）基础上发展而来的一种软件开发方法。

TDD 测试驱动开发只关心代码要怎么写，有如下特点
- 写代码的时候要先写测试，反之测试不了的代码就不能写。测试是多种多样的，单元测试是最常见的，还有 UI 自动化测试
- 先写测试也有助于你理清代码的调用关系，写出来的逻辑更严谨
- 只要你写的每一次代码都有测试可以运行，那你的测试就非常全面了

BDD 行为驱动开发的本质在于 **尽可能避免在需求描述、用例撰写、代码实现、测试等各环节衔接、转译过程中发生的信息丢失**。和 TDD 不是一个概念。BDD使用 "用户故事" 来描述需求，然后开发人员将这些故事带入具体应用，通过不断迭代添加入真正的业务本质。

**BDD 风格强调使用完整的、描述性的、便于业务用户理解的名称或术语，避免使用技术术语**。BDD 希望类、方法和变量的名称尽可能地反映日常用语。在编写单元测试的时候，尽量使用 BDD 风格为测试命名。

参考：
- [行为驱动开发BDD概要 - 没头脑的老毕 - 博客园](https://www.cnblogs.com/Abbey/p/4999634.html)
- [TDD 与 BDD 仅仅是语言描述上的区别么？- 知乎](https://www.zhihu.com/question/20161970/answer/1341811526)
- [行为驱动开发（BDD） - HackerVirus - 博客园](https://www.cnblogs.com/Leo_wl/p/5300368.html)
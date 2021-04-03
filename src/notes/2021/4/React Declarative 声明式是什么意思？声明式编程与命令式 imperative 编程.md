# React Declarative 声明式是什么意思？声明式编程与命令式 imperative 编程

React 的 Declarative 特性是什么意思？在 React github 的 README.md 中，介绍 react 的特点时，第一个是 Declarative，翻译成中文是声明式，具体要怎么理解呢？下面来看看

React is a JavaScript library for building user interfaces.
- **Declarative**: React makes it painless to create interactive UIs. Design simple views for each state in your application, and React will efficiently update and render just the right components when your data changes. Declarative views make your code more predictable, simpler to understand, and easier to debug.
- **Component-Based**: ...
- **Learn Once, Write Anywhere**: ...

React 是一个用于构建用户界面的 JS 库
- 声明式：React 使创建交互式 UI 变得很轻松。 为应用程序中的每个状态设计简单的视图，当数据更改时，React 将有效地更新和渲染正确的组件。声明式视图使您的代码更具可预测性，更易于理解且易于调试。

在计算机术语中有 **声明式编程 declarative** 和 **命令式编程 imperative** 两种编程模式
- 声明式编程：告诉机器，我要做什么（what），具体怎么做（how）由机器自己决定。
- 命令式编程：告诉机器，具体怎么做（how），机器不会管你具体要做什么（what）。

了解上面的两个概念后，我们再来看 React 的 Declarative 声明式渲染就很好理解了。**使用 React 时，我们只需要修改数据，表达我们想要在网页上修改对应内容的意图即可，具体怎么做（修改 dom），React 内部会帮我们以最优的方式完成。**


参考：[声明式编程declarative和命令式编程imperative的比较](https://blog.csdn.net/feicongcong/article/details/79915273)
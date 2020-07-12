
# web前端BFC，什么是BFC

虽然做前端好几年了，但只是听说个这个名词，一直不清楚具体是什么意思，今天来研究下

## BFC相关示例
BFC是 **Block Formatting Context** 的缩写，字面意思是 **块格式化上下文** 字面意思很难理解，我们先来看几个例子

### 1. margin塌陷问题

下面的例子中A、B两个元素的margin都为10px，理论上A、B上下间的距离为 20px，但实际却是 10px
```html
<div>
  <div class="elementA" style="margin: 10px">123</div>
  <div class="elementB" style="margin: 10px">456</div>
</div> 
```
利用BFC解决塌陷的问题，用父元素包裹并设置overflow为hidden，这样间隔就是20px了
```html
<div>
  <div class="elementA" style="margin: 10px">123</div>
  <div style="overflow:hidden">
    <div class="elementB" style="margin: 10px;">456</div>
  </div>
</div> 
```

### 2. float父级元素高度为0的问题

wrapper的子元素使用了float，其高度为100px，但他的父级元素wrapper高度为0
```html
<div class="wrapper">
  <div style="float:left;height:100px">123</div>
</div>
```
解决方案如下,给wrapper添加一个BFC属性，这时wrapper的高度就是子元素的高度
```html
<div class="wrapper" style="overflow:hidden">
  <div style="float:left;height:100px">123</div>
</div>
```

### 3. float高度超出父元素容器区域的问题

box元素为父元素，float元素高度为150，此时，float会超出父元素范围
```html
<div class="box" style="background: blue;border:1px solid red;">
  <div class="float" style="float: left;width: 200px;height: 150px;border: 1px solid #ccc;background: white;">
    I am a floated box!
  </div>
  <p>I am content inside the container.</p>
</div>
```
利用BFC，使浮动内容和周围的内容等高，给box元素加一个overflow:hidden即可
```html
<div class="box" style="background: blue;border:1px solid red;overflow:hidden">
  <div class="float" style="float: left;width: 200px;height: 150px;border: 1px solid #ccc;background: white;">
    I am a floated box!
  </div>
  <p>I am content inside the container.</p>
</div>
```

## BFC是什么
通过上面两个例子，我们会很好奇，为什么加个overlfow:hidden就能解决问题，BFC 块级格式化上下文到底是什么？

**BFC 块级格式化上下文主要和float、clear、margin塌陷问题有关联**

一般情况下BFC只存在于根级元素(html)，但设置某些CSS属性时也会让产生BFC。但是前提是必须是块级元素。

以下属性声明会产生BFC：
- 浮动元素（元素的 float 不是 none）
- 绝对定位元素（元素的 position 为 absolute 或 fixed）
- 行内块元素（元素的 display 为 inline-block）
- 表格单元格（元素的 display为 table-cell，HTML表格单元格默认为该值）
- 表格标题（元素的 display 为 table-caption，HTML表格标题默认为该值）
- 匿名表格单元格元素（元素的 display为 table、table-row、 table-row-group、table-header-group、table-footer-group（分别是HTML table、row、tbody、thead、tfoot的默认属性）或 inline-table）
- overflow 值不为 visible 的块元素
- display 值为 flow-root 的元素（该属性safari不支持）
- contain 值为 layout、content或 paint 的元素
- 弹性元素（display为 flex 或 inline-flex元素的直接子元素）
- 网格元素（display为 grid 或 inline-grid 元素的直接子元素）
- 多列容器（元素的 column-count 或 column-width 不为 auto，包括 column-count 为 1）
- column-span 为 all 的元素始终会创建一个新的BFC，即使该元素没有包裹在一个多列容器中（标准变更，Chrome bug）。

BFC布局规则
- 垂直方向的间隔由margin决定，同一个BFC里同级别的两个元素之间的margin会产生坍塌（问题1）
- BFC计算高度时，float元素的高度也参与计算 （问题 2/3）
- 每个BFC区域是隔离的，它里面元素不会影响外层，外层的各种变化也不会影响BFC区域。

Block formatting contexts are important for the positioning (see float) and clearing (see clear) of floats. The rules for positioning and clearing of floats apply only to things within the same block formatting context. Floats don't affect the layout of the content inside other block formatting contexts, and clear only clears past floats in the same block formatting context. Margin collapsing also occurs only between blocks that belong to the same block formatting context.

块格式化上下文对浮动定位（参见 float）与清除浮动（参见 clear）都很重要。浮动定位和清除浮动时只会应用于同一个BFC内的元素。浮动不会影响其它BFC中元素的布局，而清除浮动只能清除同一BFC中在它前面的元素的浮动。外边距折叠（Margin collapsing）也只会发生在属于同一BFC的块级元素之间。

## 参考
- [BFC深入理解](https://www.cnblogs.com/homehtml/articles/11960651.html)
- [Block formatting context - MDN](https://developer.mozilla.org/en-US/docs/Web/Guide/CSS/Block_formatting_context)
- [css clear - MDN](https://developer.mozilla.org/zh-CN/docs/Web/CSS/clear)
- [css float - MDN]()
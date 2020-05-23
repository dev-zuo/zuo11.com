
# -- css变量的使用，var() 与变量 --

在less或sass中，有直接的变量定义方法，而css原生其实也是可以定义变量的，使用--和var即可

```html
<style>
  /* 最大高度为三行，将line-height定义为变量lh */
  .module {
    --lh: 1.2rem;
    line-height: var(--lh);
    max-height: calc(var(--lh) * 3);
    overflow: hidden;
  } 
  :root {
    --main-bg-color: brown;
  }
</style>
```

**注意：IE不支持**

参考

- [CSS变量 | MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties)
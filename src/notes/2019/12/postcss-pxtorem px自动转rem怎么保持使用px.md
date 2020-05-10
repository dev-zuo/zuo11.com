
# postcss-pxtorem px自动转rem怎么保持使用px

如果vue-cli3中配置了postcass-pxtorem，css中写的px单位都会自动转为rem，如果需要固定px，而不是转为rem，有两种方法

```css
/* 使用Px 或 PX */
 .ignore {
   border: 1Px solid;
   border-width: 2PX;
 }
```
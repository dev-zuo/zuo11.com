---
{
  "title": "transform 两个动作怎么写？scale缩小后，依旧占用空间的问题",
  "staticFileName": "transform.html",
  "author": "guoqzuo",
  "createDate": "2019/12/25",
  "description": "transform对某个元素使用两个及以上变换时，用空格分隔，scale缩小0.5倍后，dom占用依旧，可以用translate移动下，矫正位置。",
  "keywords": "transform 两个动作怎么写？scale缩小后，依旧占用空间的问题",
  "category": "CSS"
}
---
# transform 两个动作怎么写？scale缩小后，依旧占用空间的问题

transform对某个元素使用两个及以上变换时，用空格分隔，scale缩小0.5倍后，dom占用依旧，可以用translate移动下，矫正位置。

```css
/* 两个transform */
div {
  transform: scale(0.5) translate(-50%, -50%)
}
```

参考: [transform | MDN](https://developer.mozilla.org/zh-CN/docs/Web/CSS/transform)
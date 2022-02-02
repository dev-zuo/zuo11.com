---
{
  "title": "输入法组合文字事件compositionstart等不能用on监听",
  "staticFileName": "oncompositionstart_issue.html",
  "author": "guoqzuo",
  "createDate": "2020/09/12",
  "description": "今天用原生的js来写demo时发现使用oncompositoinstart无法监听到输入法组合文件的过程，后面替换为addEventListener就可以了。因此对于输入法组合文字过程事件必须要使用DOM2级事件监听",
  "keywords": "compositionstart等输入法组合文字过程的事件不能使用on监听",
  "category": "JavaScript"
}
---
# 输入法组合文字事件compositionstart等不能用on监听

今天用原生的js来写demo时发现使用oncompositoinstart无法监听到输入法组合文件的过程，后面替换为addEventListener就可以了。因此对于输入法组合文字过程事件必须要使用DOM2级事件监听

```html
<body>
  <input id="input"></input>
  <script>
    let input = document.querySelector('#input')
    console.log('input', input)
    let composition = false

    // input.addEventListener('compositionstart', (e) => {
    //   console.log('oncompositionstart')
    //   composition = true
    // });
    // input.addEventListener('compositionend', (e) => {
    //   console.log('oncompositionend')
    //   composition = false
    // });

    input.oncompositionstart = (e) => {
      // 换了大小写也不行
      // console.log('onCompositionstart', composition)
      console.log('oncompositionstart', composition)
      composition = true
    }

    input.oncompositionend = (e) => {
      console.log('oncompositionend', composition)
      composition = false
    }
  </script>
</body>
```
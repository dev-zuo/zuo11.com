
# JSON数据转Blob后，怎么还原？怎么将Blob数据转JSON

在axios请求下载文件接口时，一般设置responseType: 'blob'，文件返回正常就没问题，但后台如果处理文件或鉴权有问题，接口返回了包含错误信息的json格式数据，那样json数据也会被转为Blob对象，而前端有必要将错误信息展示，那怎么将Blob数据转JSON呢？下面来看看

```js
let fileType = blobData.type
if (fileType.startsWith('application/json')) {
  let reader = new FileReader();
  reader.addEventListener("loadend", function() {
    let data = JSON.parse(reader.result)
    console.log(data);
  });
  reader.readAsText(res.data, "UTF-8") // 加UTF-8防止中文乱码
  return
}
```
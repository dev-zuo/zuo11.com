
# 原生ajax上传图片，php后台处理总结

> 开始做图片上传，发现之前的处理方式基本忘光了。看了下原来的源码才有了解，还是要总结经验，不然忘的太快。之前是用jQuery来处理的，也是ajax方式。现在改为用原生的ajax来处理，不依赖jQuery，整体还算是比较简单的。

## 前端表单提交
两种方式，一种是有form元素的，一种是没form元素的
``` html
<!-- 有form的方式 -->
<form name="form">
    <input type="file" name="editorImg"  onchange="uploadImg(this)" accept="image/*">
    <input type="hidden" name="id" value="testttt">
</form>

<!-- 没form的方式 -->
<input type="file" name="editorImg"  onchange="uploadImg(this)" accept="image/*">

<script>
     // 当input元素触发onchange事件，如果选择了图片，上传图片
     function uploadImg(obj) {
        // 获取文件对象，信息包括: 文件名、文件大小、文件类型
	console.log(obj.files[0]);
	if (!obj.files[0]) {
            console.log("打开的文件，点击了取消.");
            return;
        }
        
        // 传值 - 有form的情况
        // var form = document.getElementsByTagName('form')[0];
        // var formData = new FormData(form);

        // 传值 - 没有form的情况
	var formData = new FormData();
	formData.append("id", "123");
	formData.append("name", "test");
	formData.append("editorImg", obj.files[0]);
	console.log(formData);

         // ajax上传文件，及表单数据
	var xhr = new XMLHttpRequest();
	xhr.open("post", "./server/post_info.php", false);
        // 这里不用设置请求头等，默认为multipart/form-data; 
	xhr.send(formData);

	var status = xhr.status;
	if ((status >= 200 && status < 300) || status == 304) {
	    // xhr.responseText;
	    var res = JSON.parse(xhr.responseText);  
            // 上传图片成功后，进行后续逻辑，省略了错误处理等          
	    var result = document.execCommand('insertImage', false, res.filePath);
            if (!result) {
		// 获得焦点，防止可编辑div无焦点时，无效的问题
		document.getElementsByClassName("editor")[0].focus();
		document.execCommand('insertImage', false, res.filePath);
	    }
	} else {
	    alert(xhr.status);
	}
}
</script>
```
## 后端php处理
./server/post_info.php 处理逻辑如下
``` php
<?php
header("Content-type:application/json;charset=utf-8");
# 添加响应头，防止中文乱码

$result = move_uploaded_file($_FILES['editorImg']['tmp_name'],"../uploads/".$_FILES["editorImg"]["name"]);
// echo "result".$k."result";
if ($result) { 
    echo json_encode(array(
        "error_code" => 0,
        "error_msg" => "上传成功",
        "filePath" => "./uploads/".$_FILES["editorImg"]["name"]
    ));
} else {
    echo json_encode(array(
        "error_code" => -1,
        "error_msg" => "上传失败",
        "filePath" => "./uploads/".$_FILES["editorImg"]["name"]
    ));
}
```
## 遇到的问题及处理过程
乍一看，so easy，但功能跑通纠结了好一会儿
### 问题一 后端接收不到传值，乱码问题
以下三种都试了，除了不设置直接用系统的，以下三个请求头都会导致后台php获取文件数据异常
``` js
xhr.setRequestHeader("Content-type","text/plain;charset=UTF-8");
xhr.setRequestHeader("Content-type","multipart/form-data;charset=UTF-8");
xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded;charset=UTF-8");
```
乱码的情况，添加了请求头没反应, header("Content-type:application/json;charset=utf-8");
后来又突然好了，可能是我直接在apache上面跑的，有缓存。

### 问题二 文件保存失败, 无任何错误提示
最开始move_uploaded_file函数执行一点反应的没有，看了文档会返回 true or false，后来我测试，每次返回的是空字符串，也就是 ""，而且还不报任何错误。于是把前段时间弄文件上传的demo拿出来跑了跑居然是可以的，对比了下，发现应该是目录权限的问题，upload默认权限为 744(drwxr--r--)，一般用户没有写的权限，于是改成了777(drwxrwxrwx)的权限，然后就成功了。发现move_uploaded_file函数执行成功返回1。也就是这个函数返回""或"1"，如果说返回 true / false 也行，但有误导的意思。定位不到错误时，让人怀疑人生。
``` shell
chmod 777 upload
```
然后我就郁闷了，怎么让move_uploaded_file这个函数在遇到问题时报错。由于没有用任何框架，直接将php放到apache的根目录直接跑项目，重新看了下php错误处理，搜了对应的内容。发现php默认提示错误居然是关闭的。举个最简单的例子，下面是页面1.php的代码，直接运行会显示空白页，什么都没有，但test是未定义的，且x=4明显语法错误都没提示。
```php
<?php
x=4;
echo $test;
?>
```
有两种方法可以让系统提示错误
- 自己捕获错误，加入如下代码，出现上面test未定义的情况，会提示错误，而非空白页，但x=4的语法错误还是不会提示。
``` js
<?php
function customError($errno, $errstr)
{
    echo "<b>Error:</b> [$errno] $errstr<br>";
    echo "脚本结束";
    die();
}
set_error_handler("customError");
x=4;
echo $test;
?>
```
- 将系统的错误提示打开，都会有提示
php.ini配置文件里面 display_errors = Off 默认设置是关闭的，改为On后重启apache服务即可生效。
```
display_errors = On
```



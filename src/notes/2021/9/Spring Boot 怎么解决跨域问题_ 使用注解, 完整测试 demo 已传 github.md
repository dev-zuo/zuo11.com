---
{
  "title": "Spring Boot 怎么解决跨域问题: 使用注解, 完整测试 demo 已传 github",
  "staticFileName": "spring_boot_allow_cross.html",
  "author": "guoqzuo",
  "createDate": "2021/09/09",
  "description": "根据 Spring 官网 Building a RESTful Web Service (opens new window) 写了一个测试接口，在使用时，需要让该接口支持跨域，理论上只要设置好对应的响应头、处理好 Options 请求预检就可以，但发现貌似没有处理 OPTIONS 请求的注解。需要一些特殊设置处理。后面发现有一个非常简单的方法来允许跨域，就是使用 @CrossOrigin 注解，使用方法如下",
  "keywords": "spring boot 解决跨域, spring boot 允许跨域, spring boot 通过注解允许跨域",
  "category": "后端数据库等"
}
---
# Spring Boot 怎么解决跨域问题: 使用注解, 完整测试 demo 已传 github

根据 Spring 官网 [Building a RESTful Web Service](https://spring.io/guides/gs/rest-service/) 写了一个测试接口，在使用时，需要让该接口支持跨域，理论上只要设置好对应的响应头、处理好 Options 请求预检就可以，但发现貌似没有处理 OPTIONS 请求的注解。需要一些特殊设置处理。

后面发现有一个非常简单的方法来允许跨域，就是使用  `@CrossOrigin` 注解，使用方法如下

```java
package com.zuo11.demo;

import java.util.concurrent.atomic.AtomicLong;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;

@RestController
public class GreetingController {

	private static final String template = "Hello, %s!";
  private static final String templatePost = "Post, %s!";
	private final AtomicLong counter = new AtomicLong();

	@GetMapping("/greeting")
	public Greeting greeting(@RequestParam(value = "name", defaultValue = "World") String name) {
		return new Greeting(counter.incrementAndGet(), String.format(template, name));
	} 

  // @PostMapping("/greeting") // @RequestBody 
	// public Greeting greetingPost(@RequestBody Greeting newGreeting) {
	// 	return new Greeting(counter.incrementAndGet(), String.format(templatePost, newGreeting.getContent()));
	// }

  @CrossOrigin(origins = "*",maxAge = 3600) // 跨域注解
  @PostMapping("/greeting") // @RequestBody 
	public ResponseEntity<Greeting> greetingPost(@RequestBody Greeting newGreeting) {
		Greeting greeting = new Greeting(counter.incrementAndGet(), String.format(templatePost, newGreeting.getContent()));
    
    HttpHeaders responseHeaders = new HttpHeaders();
    // responseHeaders.set("Access-Control-Allow-Origin", "*");
    // responseHeaders.set("Access-Control-Allow-Methods", "*");
    // responseHeaders.set("Access-Control-Allow-Headers", "*");

    return new ResponseEntity<>(greeting, responseHeaders, HttpStatus.OK);
	}
}
```

## 接口
- GET `http://localhost:9900/greeting`
  - query 参数: name=string
  - response JSON: { id: 自增id,  "content": "Hello, ${name}!" }
- POST `http://localhost:9900/greeting`
  - 参数 application/json，{ id: '',  "content": "kevin" }
  - response JSON: { id: 自增id,  "content": "Hello, ${content}!" }

允许跨域、前端请求
```html
<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
<script>
  axios.post('http://localhost:9900/greeting', {
    "id": 1,
    "content": "测试"
  }).then((res) => {
    console.log('请求成功，', res)
  }, (err) => {
    console.log('请求发生了错误,', err)
  })
</script>
```

完整 demo 参见：[springboot-demo | github](https://github.com/dev-zuo/springboot-demo)

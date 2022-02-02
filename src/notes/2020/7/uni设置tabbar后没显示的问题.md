---
{
  "title": "uni设置tabbar后没显示的问题",
  "staticFileName": "uni_tabbar_issue.html",
  "author": "guoqzuo",
  "createDate": "2020/07/12",
  "description": "在pages.json里设置了tabbar配置，但设置成功后，在chrome运行却没效果，需要注意两点：1. pages.json配置中tabBar参数设置的页面同时也需要在pages参数里设置 2. pages数组中的第一项，必须是tabBar配置里的页面",
  "keywords": "uni设置tabbar不生效,uni tabbar不生效",
  "category": "移动端混合开发"
}
---

# uni设置tabbar后没显示的问题

在pages.json里设置了tabbar配置，但设置成功后，在chrome运行却没效果，需要注意两点

1. pages.json配置中tabBar参数设置的页面同时也需要在pages参数里设置
2. pages数组中的第一项，必须是tabBar配置里的页面
---
{
  "title": "echarts动态改变option里dataZoom的值没有实时生效的问题",
  "staticFileName": "echarts_resize.html",
  "author": "guoqzuo",
  "createDate": "2020/10/01",
  "description": "这里我们虽然修改了options的值，但不会实时生效，需要手动调用下echarts实例的resize()方法，另外在做echarts时，对于自适应缩放的图表，一定要注意在窗口缩放时，重新调用resize()",
  "keywords": "echart修改options后没有实时生效的问题",
  "category": "图表可视化"
}
---
# echarts动态改变option里dataZoom的值没有实时生效的问题

这里我们虽然修改了options的值，但不会实时生效，需要手动调用下echarts实例的resize()方法

另外在做echarts时，对于自适应缩放的图表，一定要注意在窗口缩放时，重新调用resize()
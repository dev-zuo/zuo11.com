# element v-loading在IE下可能会溢出到全屏的问题

在IE下，有可能出现v-loading指令在loading时不是作用在添加 v-loading 指令的元素区域里，而是溢出到全屏了。

这种情况我查了下dom，了解到v-loading是position: absolute布局，而v-loading position不是relatvie 导致溢出到全屏了。这种情况给使用v-loading指令的元素手动加一个 position: relative就可以了。


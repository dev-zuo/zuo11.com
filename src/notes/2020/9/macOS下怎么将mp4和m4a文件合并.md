# macOS下怎么将mp4和m4a文件合并

可以使用ffmpeg命令行工具，输入如下命令进行合并，注意这个合并时间非常长，要等很久

```bash
# 下载ffmpeg解压后会有一个ffmpeg-4.2.3-macos64-static文件夹，然后进入这个目录的bin目录下，执行
./ffmpeg -i /Users/kevin/Desktop/17下.mp4 -i /Users/kevin/Desktop/17下.m4a out2.mp4
```

其实合并视频和音频可以使用mac下的imovie或者一些其他的视频剪辑软件，比这个要快很多
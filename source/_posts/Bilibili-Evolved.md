---
title: Bilibili-Evolved
top: false
cover: false
toc: true
mathjax: false
date: 2019-09-21 00:40:43
password:
summary: A powerful script in Bilibili.com
tags:
- Bilibili.com
- Script

categories:
- 教程

---

## Bilibili-Evolved

![](1.png)
![](2.png)
![](3.png)
![](4.png)

### 1. Install

- You should install [Tampermonkey](https://www.tampermonkey.net) first.

- [Bilibili-Evolved](https://greasyfork.org/en/scripts/373563-bilibili-evolved)

Please access [GitHub](https://github.com/the1812/Bilibili-Evolved) to view how to use it.

### 2. Download videos

#### 2.1 Download single video.

![](5.png)
![](6.png)

#### 2.2 Batch export(with aria2).

- Install aria2.

```bash
sudo pacman -S aria2
```
- export aria2(a txt file)

![](7.png)

- Download videos in current directory.

```bash
aria2c -i Download.txt
```

### 3. Convert video files.

The default video files format is `flv`. 
I recommend using [ffmpeg](http://ffmpeg.org/) to convert video files format on Linux.

```bash
ffmpeg -i input.flv output.mp4
```


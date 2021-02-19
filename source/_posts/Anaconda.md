---
title: Anaconda
top: false
cover: false
toc: true
hide: true
mathjax: false
img: https://cdn.jsdelivr.net/gh/liuyaanng/Blog_source@master/blog_images/Anaconda/img.jpg
date: 2019-09-18 10:27:45
updatedate: 2019-09-18 10:27:45
password:
summary: Install Anaconda3 and use conda to manage python environment
tags:
- Python
- Anaconda3

categories:
- 教程
---

## Install Guide

You probably need proxy: [About Proxy](https://godliuyang.wang/2020/02/04/about-proxy/) 
### 1. Download `Anaconda`

Click here to download [Anaconda](https://www.anaconda.com/distribution/)

### 2. Install `Anaconda`

```bash
bash ~/Downloads/Anaconda3-2019.07-Linux-x86_64.sh
```

![](https://cdn.jsdelivr.net/gh/liuyaanng/Blog_source@master/blog_images/Anaconda/3.png)

Press ENTER

![](https://cdn.jsdelivr.net/gh/liuyaanng/Blog_source@master/blog_images/Anaconda/4.png)

input yes 

![](https://cdn.jsdelivr.net/gh/liuyaanng/Blog_source@master/blog_images/Anaconda/5.png)

Press ENTER    
A few minutes later.......

![](https://cdn.jsdelivr.net/gh/liuyaanng/Blog_source@master/blog_images/Anaconda/6.png)

input yes

![](https://cdn.jsdelivr.net/gh/liuyaanng/Blog_source@master/blog_images/Anaconda/7.png)

successful installation.

You can use `conda -V` to check the version of anaconda.

### 3. Bash user

```bash
vim ~/.bashrc
```
add the following line to your ~/.bashrc.

```bash
export PATH="/home/xupp/anaconda3/bin:$PATH"
```
Reboot your terminal.

### 4. Fish user

If your shell is **fish**, you probably need to configure your environment variable.

![](https://cdn.jsdelivr.net/gh/liuyaanng/Blog_source@master/blog_images/Anaconda/8.png)

I use `set` command to do this.

```bash
set -xg
```

Prints all global, exported variables.

![](https://cdn.jsdelivr.net/gh/liuyaanng/Blog_source@master/blog_images/Anaconda/1.png)

I find the user name of anaconda path in PATH is wrong.
I don't know why it is, but i know i should correct it.

```bash
set PATH[1] /home/kevin/anaconda3/bin
```
it works.

![](https://cdn.jsdelivr.net/gh/liuyaanng/Blog_source@master/blog_images/Anaconda/9.png)

![](https://cdn.jsdelivr.net/gh/liuyaanng/Blog_source@master/blog_images/Anaconda/10.png)

## conda 

### 1. Create Python environment

```bash
conda create --name python37 python=3.7
```

### 2. Check Python Environment you have created.

```bash
conda info --envs
```

![](https://cdn.jsdelivr.net/gh/liuyaanng/Blog_source@master/blog_images/Anaconda/11.png) 

Where * indicates the current Python environment

### 3. Modify Python environment

```bash
source activate python37
```

and modify default Python environment

```bash
source deactivate
```

### 4. Delate Python environment

```bash
conda remove --name python37 --all
```




---
title: Anaconda
top: false
cover: false
toc: true
mathjax: false
img: https://i.loli.net/2019/09/19/PLeZNEwcsvzlUSn.jpg
date: 2019-09-18 10:27:45
password:
summary:
tags:
- Python
- Anaconda3

categories:
- 教程
---

## Install Anaconda and use it to manage your python.

### 1. Download `Anaconda`

Click here to download [Anaconda](https://www.anaconda.com/distribution/)

### 2. Install `Anaconda`

```bash
bash ~/Downloads/Anaconda3-2019.07-Linux-x86_64.sh
```

![](3.png)

Press ENTER

![](4.png)

input yes 

![](5.png)

Press ENTER    
A few minutes later.......

![](6.png)

input yes

![](7.png)

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

![](8.png)

I use `set` command to do this.

```bash
set -xg
```

Prints all global, exported variables.

![](1.png)

I find the user name of anaconda path in PATH is wrong.
I don't know why it is, but i know i should correct it.

```bash
set PATH[1] /home/kevin/anaconda3/bin
```
it works.

![](9.png)

![](10.png)

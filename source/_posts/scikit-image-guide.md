---
title: scikit-image guide
top: false
cover: false
toc: true
mathjax: false
date: 2020-03-30 23:26:25
updatedate: 2020-03-30 23:26:25
img: https://i.loli.net/2020/03/30/fMqoUgeTm3zPJNu.jpg
password:
summary: Image processing in python
tags:
- python
categories:
---

# Python的数字图片处理包。比如 PIL, pillow, opencv, scikit-image

PIL和pillow只提供最基础的数字图像处理，功能有限；opencv实际上是一个c++库，只提供了python借口，更新速度非常慢。scikit-image是基于scipy的一款图像处理包，它将图片作为numpy数组进行处理，与matlab一样，所以我选择了是scikit-image进行图像处理

## 1. Install 

```bash
conda install -c conda-forge scikit-image
```



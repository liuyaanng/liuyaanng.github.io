---
title: Digital Image Processing
top: false
cover: false
toc: true
mathjax: true
date: 2019-07-15 09:25:32
password:
summary: Digital Image Processing Notes.
img: https://i.loli.net/2019/07/17/5d2e73bb14bd344648.png
tags:
- 图像处理
- Matlab
categories:
- Digital Image Processing
---

## Digital Image Processing notes:
- 图像处理的步骤：
    1. 图像获取 包括图像预处理
    2. 图像滤波与增强 使之适用于 **特定应用**
    3. 图像复原 倾向于以图像退化的数学或概率模型为基础
    4. 彩色图像处理
    5. 压缩 减少图像存储量或降低传输图像带宽 
    6. 形态学处理
    7. 图像分割
    8. 目标识别
### 数字图像基础
- 灰度概念
    灰度是表明图像明暗的数值，即黑白图像中点的颜色深度，范围一般是0-255,白色为255,黑色为0,归一化处理之后[0,1],0代表黑色，1代表白色。
- 图像取样与量化
  
    - 对坐标值数字化称为取样，对幅度值数字化称为量化
- 数字的图像表示       
    将连续图像取样表示为一个二维阵列 $f(x,y)$
    1. 函数图表示：用x和y两个坐标轴来表示空间位置，第三个坐标为f(灰度)值，即 $f(x,y,z)$，
    2. 一般的表示：显示的是 $f(x,y)$在监视器或照片上的情况，每个点的灰度与该点处的f值成正比，例如归一化[0,1],三个等间隔点分别为0,0.5,1
    3. 矩阵： 将 $f(x,y)$的值打印成矩阵     
    注意坐标为右手笛卡尔系
- 对比度： 最高和最低的灰度级的差
- 典型灰度级：
$$2^k$$
称为一副'k bit图像'

- 图像内插
    - 最邻近内插
    - 双线性内插
    - 双三次内插
- 图像处理的算术操作
    - 图片相加  平均 -> 降噪
    - 图片相减  增强图像差别
    - 图片想乘除  校正阴影
- 灰度变换
    - s = T(r)
    - Matlab中的灰度变换函数     
      `imadjust(f,[LOW_IN,HIGH_IN],[LOW_OUT,HIGH_OUT],grmma)`
- 直方图的处理和函数绘图
    - 生成图像的直方图
    
      ```matlab
        >> h = imhist(f)
      ```
    - 也可以用条形图来表示
    
        ```matlab
        >> h = imhist(f,25);
        >> horz = linespace(0,255,25);
        >> bar(horz,h)
        >> axis(0 255 0 60000);
        >> set(gca, 'xtick', 0:50:255)
        >> set(gca, 'ytick', 0:20000:60000)
        ```
    - 杆状图    
    `stem(horz, z , 'LineSpec', 'fill')`
    - plot函数    
    `plot(horz, z, 'LineSpec')`
    - 当处理函数句柄时     
    `fplot(fhandle, limits, 'LineSpec')`


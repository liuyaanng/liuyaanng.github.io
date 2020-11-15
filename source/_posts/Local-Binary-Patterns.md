---
title: Local Binary Patterns
top: false
cover: false
toc: true
mathjax: true
date: 2019-08-01 14:05:20
updatedate: 2019-08-01 14:05:20
password:
summary: LBP算法原理、LBP特征实现(c++)
tags:
- 图像处理
- LBP
- c++
categories:
- 算法
---

# LBP算法

LBP（Local Binary Patterns，局部二值模式）是一种能够有效地度量和提取图像局部纹理信息的算子，具有旋转不变性和灰度不变性等显著的优点。它是人脸识别中一种提取特征的重要方法，具有对光照不敏感的特性，但是对姿态和表情的鲁棒性不强。
## 纹理

纹理是由于物体表面物理属性不同所引起的能够表示某个特定表面特征的灰度或颜色信息。纹理反映了图像灰度模式的空间分布，包含了图像的表面信息及其周围环境的关系。

## 基本的LBP算子

局部二值模式是一种灰度范围内的纹理描述方式。最初的LBP算子定义在一个3×3的窗口，以窗口中心像素点为阈值，将相邻的像素的灰度值与其进行比较，若周围的像素值大于中心点的值，则将该像素位置标记为1,否则为0.这样一个3×3邻域内的8个点可产生一个8-bit的无符号数，再按其位置赋予不同权重求和得一整数，即可得到该窗口的 **LBP** 值，并用这个数反映该区域的纹理信息。    
对比度分量C是邻域中所有大于和等于中心点像素的均值与所有小于中心点像素的均值之差。    
![](https://i.loli.net/2019/07/31/5d415779ca87257597.jpg)

基本的LBP算子最大的缺陷是只覆盖了一个固定半径范围内的小区域，改进的LBP算子，将3×3邻域扩展到任意邻域，用圆形邻域代替了正方形邻域，该算子允许在半径为R的圆形邻域内有任意多个像素点。
- 一个局部区域的纹理分布可假设为局部区域内像素灰度的联合分布密度
$$T = t(g_c,g_0, ....,g_{p-1})$$
$g_c$表示局部区域的中心点的灰度值,$g_p(p=0,1,...,p)$对应中心点周围等距分布的P个点
- 采用 **双线性插算法** 对没有完全落在像素位置的点计算灰度值。邻域内的$g_p$点的坐标可以表示为:
$$(x_p,y_p) = (x_c + Rcos(\frac{2\pi}{P}),y_c - Rsin(\frac{2\pi}{P}))$$
$(x_c,y_c)$表示中心点的坐标
- 将中心点$g_c$的值从邻域像素的灰度值$g_p$中减去，则局部区域的纹理可以用中心点和中心点与周边像素值之差的联合分布来表示:
$$T = t(g_c,g_0-g_c,....,g_{p-1}-g_c)$$
- 假设中心像素点$g_c$与周边点像素$g_p$的差值$g_p-g_c(p=0,1,...P)$独立于中心点$g_c$，则
$$T\approx t(g_c)(g_0-g_c,...,g_{p-1}-g_c)$$
- 实际上，$t(g_c)$只是描述了整个图像的亮度分布情况，而和图像的局部纹理无关，它不能为纹理分析提供任何有价值的信息
$$T\approx t(g_0-g_c,...,g_{p-1}-g_c)$$
- 差值的联合分布具有灰度平移不变性，即邻域中所有P+1个像素同时加上或减去某个值，其表征的纹理不变。
- 为了达到尺度不变的目的，只考虑差值的符号
$$T\approx t(s(g_0-g_c),...,s(g_p-g_c))$$

$$s(x)=\begin{cases}
1 , \quad &x > 0  \\\\
0 , &x \geqslant 0
\end{cases}
$$

上式得到了一个8位的二进制数，再对像素按不同位置用$2^p$进行加权求和，这样得到了一个与邻域像素点相关的唯一的 **LBP** 值，这个值称为 **模式**。这个值描述的是以$(x_c,y_c)$为中心的局部区域的纹理，可以表示为
$$LBP(x_c,y_c) = \sum_{p=0}^{P-1}s(g_p - g_c)2^P$$
上式意味着差值的符号转化成一个P-bit的二进制数，进而转化成为一个取值范围为0-$2^p$的离散的LBP值，或者说转化为一种LBP模式。
- 局部区域的灰度分布或纹理，可以用这个LBP值或LBP模式近似描述为:
$$T\approx t(LBP(x_c,y_c))$$
LBP算子对于任何单调的灰度变化具有鲁棒性，用符号$LBP_P^R$表示在半径为R的圆形邻域内有P个像素点$g_p(p=0,1,...,P)$的LBP算子
![](https://i.loli.net/2019/07/31/5d415779b84ac47631.jpg)

## LBP等价模式
### 定义
当某个局部二进制模式所对应的循环二进制数从０到１或从１到０最多有两次跳变时，该局部二进制模式所对应的二进制就称为一个等价模式类。比如00000000,11111111,10001111都是等价类。
### 检验方法
检验某种模式是否是等价模式的简单办法是将其和其移动一位后的二进制模式按位相减的绝对值求和
$$U(G_p) = |s(g_{p-1}-g_c)-s(g_0-g_c)|+\sum_{p=1}^{P-1}|s(g_p-g_c)-s(g_{p-1}-g_c)$$
若某种模式计算得到的 $U(G_p)$小于或等于２，则将其归于等价模式
![](https://i.loli.net/2019/07/31/5d415779c949196019.jpg)

## 旋转不变的LBP算子
### 定义
不断旋转圆形邻域得到一系列的初始定义的LBP值，取其最小值作为该邻域的LBP值，用公式表示为:
$$LBP_{P,R}^{ri} = min(ROR(LBP_{P,R}^{ri},i)|i=0,1,...,P-1)$$
$LBP^{ri}$表示旋转不变的LBP算子，$ROR(x,i)$函数为旋转函数，表示将x循环右移i(i<P)位。

### 性质
- 对于图像旋转，表现的更为鲁棒，并且LBP模式的种类进一步减少，使纹理识别更加容易。
- 丢失了方向信息
![](https://i.loli.net/2019/07/31/5d415779b8fed91298.jpg)

## 旋转不变的的等价模式
### 定义
将等价模式类进行旋转得到旋转不变的等价模式

$$LBP_{P,R}^{riu2} = \begin{cases}
\sum_{P=0}^{P-1}s(g_p-g_c), & U(G_p) \leq 2 \\\\
P + 1, & U(G_p) >2
\end{cases}
$$

其中$U(G_p)$表示0到1或1到0跳变的次数，$LBP^{riu2}$被称为旋转不变的等价模式

## 几种LBP算子的维数比较

 LBP  | 原始模式数 | 等价模式 | 旋转不变等价模式
:---: | :---: | :---: | :---:
$LBP_P^R$ | $2^P$ | $P(P-1) + 2$ | $P+1$
$LBP_8^1$ | 256 | 58(+1) | 9
$LBP_{16}^2$ | 65536 | 242(+1) | 17
$LBP_{24}^3$ | 16777216 | 554(+1) | 25


# LBP特征实现

## 原始LBP特征

```cpp
//Original_LBP
Mat get_original_LBP_feature(Mat img){
  Mat result;
  result.create(img.rows - 2, img.cols -2, img.type());
  result.setTo(0);
  for (int i = 1; i < img.rows - 1; i++){
    for (int j = 1; j < img.cols -1; j++){
      uchar center = img.at<uchar>(i, j);
      uchar lbpcode = 0;
      lbpcode |= (img.at<uchar>(i - 1, j - 1) >= center) << 7;
      lbpcode |= (img.at<uchar>(i - 1, j) >= center) << 6;
      lbpcode |= (img.at<uchar>(i - 1, j + 1) >= center) << 5;
      lbpcode |= (img.at<uchar>(i, j -1) >= center) << 4;
      lbpcode |= (img.at<uchar>(i, j + 1) >= center) << 3;
      lbpcode |= (img.at<uchar>(i + 1, j - 1) >= center) << 2;
      lbpcode |= (img.at<uchar>(i + 1, j) >= center) << 1;
      lbpcode |= (img.at<uchar>(i + 1, j + 1) >= center) << 0;
      result.at<uchar>(i - 1, j - 1) = lbpcode;
    }
  }
  return result;
}
```

![](https://i.loli.net/2019/07/31/5d4161dac5f0b23887.png)


## 圆形LBP特征

``` cpp
//Circular_LBP_feature
Mat get_circular_LBP_feature(Mat img, int radius, int neighbors)
{
  Mat result;
  result.create(img.rows - radius * 2, img.cols - radius * 2, img.type());
  result.setTo(0);
  //循环处理每个像素
  for(int i=radius;i<img.rows-radius;i++)
  {
      for(int j=radius;j<img.cols-radius;j++)
      {
          //获得中心像素点的灰度值
          uchar center = img.at<uchar>(i,j);
          uchar lbpCode = 0;
          for(int k=0;k<neighbors;k++)
          {
              //根据公式计算第k个采样点的坐标，这个地方可以优化，不必每次都进行计算radius*cos，radius*sin
              float x = i + static_cast<float>(radius * \
                  cos(2.0 * CV_PI * k / neighbors));
              float y = j - static_cast<float>(radius * \
                  sin(2.0 * CV_PI * k / neighbors));
                //根据取整结果进行双线性插值，得到第k个采样点的灰度值
                //1.分别对x，y进行上下取整
                int x1 = static_cast<int>(floor(x));
                int x2 = static_cast<int>(ceil(x));
                int y1 = static_cast<int>(floor(y));
                int y2 = static_cast<int>(ceil(y));

                //将坐标映射到0-1之间
                float tx = x - x1;
                float ty = y - y1;
                //根据0-1之间的x，y的权重计算公式计算权重
                float w1 = (1-tx) * (1-ty);
                float w2 =    tx  * (1-ty);
                float w3 = (1-tx) *    ty;
                float w4 =    tx  *    ty;
                //3.根据双线性插值公式计算第k个采样点的灰度值
                float neighbor = img.at<uchar>(x1,y1) * w1 + img.at<uchar>(x1,y2) *w2 + img.at<uchar>(x2,y1) * w3 +img.at<uchar>(x2,y2) *w4;
                //通过比较获得LBP值，并按顺序排列起来
                lbpCode |= (neighbor>center) <<(neighbors-k-1);
            }
            result.at<uchar>(i-radius,j-radius) = lbpCode;
        }
    }
  return result;
}
```

结果:
![](https://i.loli.net/2019/08/01/5d42b5d2e345026549.png)

第一幅图设置半径为4,第二幅图设置半径为1,可以看到半径越小处理的越精细。

## 旋转不变LBP特征

``` cpp
//Rotation_Invariant_LBP_feature
Mat get_rotation_invariant_LBP_feature(Mat img, int radius, int neighbors)
{
  Mat result;
  result.create(img.rows - radius * 2, img.cols - radius * 2, img.type());
  result.setTo(0);
  for(int k=0;k<neighbors;k++)
    {
        //计算采样点对于中心点坐标的偏移量rx，ry
        float rx = static_cast<float>(radius * cos(2.0 * CV_PI * k / neighbors));
        float ry = -static_cast<float>(radius * sin(2.0 * CV_PI * k / neighbors));
        //为双线性插值做准备
        //对采样点偏移量分别进行上下取整
        int x1 = static_cast<int>(floor(rx));
        int x2 = static_cast<int>(ceil(rx));
        int y1 = static_cast<int>(floor(ry));
        int y2 = static_cast<int>(ceil(ry));
        //将坐标偏移量映射到0-1之间
        float tx = rx - x1;
        float ty = ry - y1;
        //根据0-1之间的x，y的权重计算公式计算权重，权重与坐标具体位置无关，与坐标间的差值有关
        float w1 = (1-tx) * (1-ty);
        float w2 =    tx  * (1-ty);
        float w3 = (1-tx) *    ty;
        float w4 =    tx  *    ty;
        //循环处理每个像素
        for(int i=radius;i<img.rows-radius;i++)
        {
            for(int j=radius;j<img.cols-radius;j++)
            {
                //获得中心像素点的灰度值
                uchar center = img.at<uchar>(i,j);
                //根据双线性插值公式计算第k个采样点的灰度值
                float neighbor = img.at<uchar>(i+x1,j+y1) * w1 + img.at<uchar>(i+x1,j+y2) *w2 + img.at<uchar>(i+x2,j+y1) * w3 +img.at<uchar>(i+x2,j+y2) *w4;
                //LBP特征图像的每个邻居的LBP值累加，累加通过与操作完成，对应的LBP值通过移位取得
                result.at<uchar>(i-radius,j-radius) |= (neighbor>center) <<(neighbors-k-1);
            }
        }
    }
    //进行旋转不变处理
    for(int i=0;i<result.rows;i++)
    {
        for(int j=0;j<result.cols;j++)
        {
            uchar currentValue = result.at<uchar>(i,j);
            uchar minValue = currentValue;
            for(int k=1;k<neighbors;k++)		//循环左移
            {
                uchar temp = (currentValue>>(neighbors-k)) | (currentValue<<k);
                if(temp < minValue)
                {
                    minValue = temp;
                }
            }
            result.at<uchar>(i,j) = minValue;
        }
    }
    return result;
}

```

结果:
![](https://i.loli.net/2019/08/01/5d42b5d30749958722.png)

第一幅图neighbors值设置为8,第二幅设置为6,可以看出neighbors值越大，得到的LBP特征亮度越高。

## 完整代码如下

``` cpp
#include <opencv2/highgui/highgui.hpp>

using namespace cv;

//Original_LBP
Mat get_original_LBP_feature(Mat img){
  Mat result;
  result.create(img.rows - 2, img.cols -2, img.type());
  result.setTo(0);
  for (int i = 1; i < img.rows - 1; i++){
    for (int j = 1; j < img.cols -1; j++){
      uchar center = img.at<uchar>(i, j);
      uchar lbpcode = 0;
      lbpcode |= (img.at<uchar>(i - 1, j - 1) >= center) << 7;
      lbpcode |= (img.at<uchar>(i - 1, j) >= center) << 6;
      lbpcode |= (img.at<uchar>(i - 1, j + 1) >= center) << 5;
      lbpcode |= (img.at<uchar>(i, j -1) >= center) << 4;
      lbpcode |= (img.at<uchar>(i, j + 1) >= center) << 3;
      lbpcode |= (img.at<uchar>(i + 1, j - 1) >= center) << 2;
      lbpcode |= (img.at<uchar>(i + 1, j) >= center) << 1;
      lbpcode |= (img.at<uchar>(i + 1, j + 1) >= center) << 0;
      result.at<uchar>(i - 1, j - 1) = lbpcode;
    }
  }
  return result;
}

//Circular_LBP_feature
Mat get_circular_LBP_feature(Mat img, int radius, int neighbors)
{
  Mat result;
  result.create(img.rows - radius * 2, img.cols - radius * 2, img.type());
  result.setTo(0);
  //循环处理每个像素
  for(int i=radius;i<img.rows-radius;i++)
  {
      for(int j=radius;j<img.cols-radius;j++)
      {
          //获得中心像素点的灰度值
          uchar center = img.at<uchar>(i,j);
          uchar lbpCode = 0;
          for(int k=0;k<neighbors;k++)
          {
              //根据公式计算第k个采样点的坐标，这个地方可以优化，不必每次都进行计算radius*cos，radius*sin
              float x = i + static_cast<float>(radius * \
                  cos(2.0 * CV_PI * k / neighbors));
              float y = j - static_cast<float>(radius * \
                  sin(2.0 * CV_PI * k / neighbors));
                //根据取整结果进行双线性插值，得到第k个采样点的灰度值
                //1.分别对x，y进行上下取整
                int x1 = static_cast<int>(floor(x));
                int x2 = static_cast<int>(ceil(x));
                int y1 = static_cast<int>(floor(y));
                int y2 = static_cast<int>(ceil(y));

                //将坐标映射到0-1之间
                float tx = x - x1;
                float ty = y - y1;
                //根据0-1之间的x，y的权重计算公式计算权重
                float w1 = (1-tx) * (1-ty);
                float w2 =    tx  * (1-ty);
                float w3 = (1-tx) *    ty;
                float w4 =    tx  *    ty;
                //3.根据双线性插值公式计算第k个采样点的灰度值
                float neighbor = img.at<uchar>(x1,y1) * w1 + img.at<uchar>(x1,y2) *w2 + img.at<uchar>(x2,y1) * w3 +img.at<uchar>(x2,y2) *w4;
                //通过比较获得LBP值，并按顺序排列起来
                lbpCode |= (neighbor>center) <<(neighbors-k-1);
            }
            result.at<uchar>(i-radius,j-radius) = lbpCode;
        }
    }
  return result;
}

//Rotation_Invariant_LBP_feature
Mat get_rotation_invariant_LBP_feature(Mat img, int radius, int neighbors)
{
  Mat result;
  result.create(img.rows - radius * 2, img.cols - radius * 2, img.type());
  result.setTo(0);
  for(int k=0;k<neighbors;k++)
    {
        //计算采样点对于中心点坐标的偏移量rx，ry
        float rx = static_cast<float>(radius * cos(2.0 * CV_PI * k / neighbors));
        float ry = -static_cast<float>(radius * sin(2.0 * CV_PI * k / neighbors));
        //为双线性插值做准备
        //对采样点偏移量分别进行上下取整
        int x1 = static_cast<int>(floor(rx));
        int x2 = static_cast<int>(ceil(rx));
        int y1 = static_cast<int>(floor(ry));
        int y2 = static_cast<int>(ceil(ry));
        //将坐标偏移量映射到0-1之间
        float tx = rx - x1;
        float ty = ry - y1;
        //根据0-1之间的x，y的权重计算公式计算权重，权重与坐标具体位置无关，与坐标间的差值有关
        float w1 = (1-tx) * (1-ty);
        float w2 =    tx  * (1-ty);
        float w3 = (1-tx) *    ty;
        float w4 =    tx  *    ty;
        //循环处理每个像素
        for(int i=radius;i<img.rows-radius;i++)
        {
            for(int j=radius;j<img.cols-radius;j++)
            {
                //获得中心像素点的灰度值
                uchar center = img.at<uchar>(i,j);
                //根据双线性插值公式计算第k个采样点的灰度值
                float neighbor = img.at<uchar>(i+x1,j+y1) * w1 + img.at<uchar>(i+x1,j+y2) *w2 + img.at<uchar>(i+x2,j+y1) * w3 +img.at<uchar>(i+x2,j+y2) *w4;
                //LBP特征图像的每个邻居的LBP值累加，累加通过与操作完成，对应的LBP值通过移位取得
                result.at<uchar>(i-radius,j-radius) |= (neighbor>center) <<(neighbors-k-1);
            }
        }
    }
    //进行旋转不变处理
    for(int i=0;i<result.rows;i++)
    {
        for(int j=0;j<result.cols;j++)
        {
            uchar currentValue = result.at<uchar>(i,j);
            uchar minValue = currentValue;
            for(int k=1;k<neighbors;k++)		//循环左移
            {
                uchar temp = (currentValue>>(neighbors-k)) | (currentValue<<k);
                if(temp < minValue)
                {
                    minValue = temp;
                }
            }
            result.at<uchar>(i,j) = minValue;
        }
    }
    return result;
}

int main(int argc, char* argv[])
{
  Mat src = imread(argv[1], 0);
  Mat dst = get_original_LBP_feature(src);
  Mat odst1 = get_circular_LBP_feature(src, 1, 8);
  //Mat odst4 = get_circular_LBP_feature(src, 4, 8);
  Mat rif8 = get_rotation_invariant_LBP_feature(src, 1, 8);
  Mat rif6 = get_rotation_invariant_LBP_feature(src, 1, 6);


  imshow("原始图片", src);
  imshow("原始LBP", dst);
  imshow("圆形LBP", odst1);
  //imshow("圆形LBP4", odst4);
  imshow("旋转不变LBP", rif8);
  //imshow("旋转不变LBP6", rif6);

  waitKey(0);
  return 0;
}
```

---
title: Day18
date: 2019-08-01 16:50:05
tags: 实习
categories: 
  - OpenCV 
  - C++
cover: https://i.loli.net/2019/07/17/5d2e73bb14bd344648.png
---
# LBP算法实现及人脸检测

## OpenCV模块
- core：简洁核心模块，基本函数，基本数据结构
- imgproc：图像处理模块，线性和非线性图像滤波，几何图像转换，颜色空间转换，直方图等。
- video：视频分析模块，运动估计，背景消除，物体跟踪算法
- calib3d：基本多视角几何算法，单体和立体相机的标定，对象姿势估计，双目立体匹配算法和元素的三维重建
- features2d：包含了显著特征检测算法，描述算子和算子匹配算法
- objdetect：物体检测和一些预定义的物体的检测（如人脸，眼睛，杯子，人，汽车等)
- ml：多种机器学习算法，如K均值，支持向量机和神经网络
- highgui：简单易用接口，有视频捕捉，图像和视频编码功能，简单UI接口，iOS的是其中一个子集
- gpu：GPU加速算法，iOS不可用
- ocl：OpenCL通用算法，iOS不可用
- 其它辅助模块，如用户贡献的算法

## 原始LBP特征
``` c++
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

``` c++
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

``` c++
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
``` c++
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
## 人脸检测

在OpenCV中，主要使用两种特征进行人脸检测，Haar特征和LBP特征，下面使用的是LBP特征。    
实现人脸检测主要依赖于detectMultiScale()函数
``` c++
CV_WRAP virtual void detectMultiScale
( const Mat& image,
  CV_OUT vector<Rect>& objects,
  double scaleFactor=1.1,
  int minNeighbors=3, int flags=0,
  Size minSize=Size(),
  Size maxSize=Size() );
```
各参数含义如下：
**const Mat& image**: 需要被检测的图像（灰度图）。
**vector<Rect>& objects**: 保存被检测出的人脸位置坐标序列。
**double scaleFactor**: 每次图片缩放的比例。
**int minNeighbors**: 每一个人脸至少要检测到多少次才算是真的人脸。
**doubleint flags**： 决定是缩放分类器来检测，还是缩放图像。
**Size()**: 表示人脸的最大最小尺寸。

具体实现代码如下:
``` c++
#include<opencv2/highgui/highgui.hpp>
#include<opencv2/imgproc/imgproc.hpp>
#include<opencv2/objdetect/objdetect.hpp>
#include<iostream>
#include<opencv2/core.hpp>
 

using namespace std;
using namespace cv;
 
#define CV_COLOR_GREEN cv::Scalar(0, 255, 0)
CascadeClassifier faceCascade;
int main(int argc, char* argv[])
{
 Mat img;

 CascadeClassifier faceDetector("lbpcascade_frontalface.xml");//读取分类器
 img = imread(argv[1]);  //读取检测的图片原图
 vector<Rect> objects;  //存放检测的对象
 faceDetector.detectMultiScale(img, objects);  //执行检测
 for (int i = 0; i < objects.size(); i++) //遍历检测到的脸
 {
  rectangle(img, objects[i], CV_COLOR_RED);  //画出检测到的脸
 }
 imshow("result", img);  //显示结果
 waitKey(0);

 return 0;
}
```
检测结果:
![](https://i.loli.net/2019/08/01/5d42b5d26727057681.png)
![](https://i.loli.net/2019/08/01/5d42b5d26fea564434.png)
![](https://i.loli.net/2019/08/01/5d42b5d2b360c81753.png)

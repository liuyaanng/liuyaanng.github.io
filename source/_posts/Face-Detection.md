---
title: Face Detection
top: false
cover: false
img: https://cdn.jsdelivr.net/gh/liuyaanng/Blog_source@master/blog_images/Face-Detection/img.jpg
toc: true
mathjax: false
date: 2019-08-03 14:15:02
updatedate: 2019-08-03 14:15:02
password:
summary: 基于LBP的人脸检测
tags:
- Face_Detection
- OpenCV
- c++
categories:
- 实习
- 人脸检测
---
# 人脸检测

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

## 人脸检测

## 检测图片中的人脸
在OpenCV中，主要使用两种特征进行人脸检测，Haar特征和LBP特征，下面使用的是LBP特征。    
实现人脸检测主要依赖于detectMultiScale()函数

``` cpp
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

``` cpp
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
![](https://cdn.jsdelivr.net/gh/liuyaanng/Blog_source@master/blog_images/Face-Detection/1.png)
![](https://cdn.jsdelivr.net/gh/liuyaanng/Blog_source@master/blog_images/Face-Detection/2.png)
![](https://cdn.jsdelivr.net/gh/liuyaanng/Blog_source@master/blog_images/Face-Detection/3.png)

### 检测视频中的人脸
原理就是对视频逐帧处理，1s大约分为30帧。

```cpp
#include <opencv2/highgui/highgui.hpp>
#include <opencv2/imgproc/imgproc.hpp>
#include <opencv2/core/core.hpp>
#include <opencv2/objdetect/objdetect.hpp>
#include <iostream>

using namespace std;
using namespace cv;

#define CV_COLOR_GREEN cv::Scalar(0, 255, 0)
CascadeClassifier faceCascade;


int main(int argc, char** argv)
{
  //打开摄像头
  VideoCapture cap(0);
  if(!cap.isOpened())
  {
    return -1;
  }
  //读取分类器
  CascadeClassifier faceDetector("lbpcascade_frontalface.xml");
  vector<Rect> objects;
  Mat frame;
  Mat edges;
  bool stop = false;
  while(!stop){
    cap >> frame;
    if (frame.empty())
      stop = true;
    double scaleFactor=1.1;
    int minNeighbors = 3;
    //int flags = 1;
    //cvtColor(frame, edges, CV_BGR2GRAY);
    //GaussianBlur(edges, edges, Size(7,7), 1.5, 1.5);
    faceDetector.detectMultiScale(frame, objects,scaleFactor, minNeighbors);
    for(int i = 0; i < objects.size(); i++){
      rectangle(frame, objects[i], CV_COLOR_GREEN);
      rectangle(edges, objects[i], CV_COLOR_GREEN);
    }
    //imshow("edge", edges);
    imshow("frame", frame);
    if (waitKey(30) >= 0)
      stop = true;
  }
  return 0;
}
```

识别结果:

![](https://cdn.jsdelivr.net/gh/liuyaanng/Blog_source@master/blog_images/Face-Detection/4.png)
![](https://cdn.jsdelivr.net/gh/liuyaanng/Blog_source@master/blog_images/Face-Detection/5.png)


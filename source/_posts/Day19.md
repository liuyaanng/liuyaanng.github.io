---
title: Day19
date: 2019-08-02 10:10:42
tags: 实习
categories:
  - OpenCV
  - C++
cover: https://i.loli.net/2019/07/17/5d2e73bb14bd344648.png
---

# 基于LBP的人脸检测

在图片人脸检测的基础上加上视频流。    
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

![](https://i.loli.net/2019/08/02/5d43e017d9e1227148.png)
![](https://i.loli.net/2019/08/02/5d43e017f281538470.png)

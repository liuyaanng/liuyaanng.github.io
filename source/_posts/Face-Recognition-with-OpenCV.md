---
title: Face Recognition with OpenCV
top: false
cover: false
toc: true
mathjax: false
date: 2019-08-09 12:00:00
password:
summary:
tags:
categories:
---

# Face Recognition with OpenCV

## Image Acquisition and Face Database Creation

### Image Acquisition

#### Steps and methods
1. Open the camera and capture images;
2. Loading the face classifier;
3. Start face detection, frame the face part and display;
4. Under the condition that the face is detected, take a picture with one button;
5. For the face part, resize and write the image file in the specified directory;

#### Code
```cpp
#include <opencv2/highgui/highgui.hpp>
#include <opencv2/imgproc/imgproc.hpp>
#include <opencv2/core/core.hpp>
#include <opencv2/objdetect/objdetect.hpp>
#include <stdio.h>
#include <opencv2/face.hpp>
#include <iostream>
#include <fstream>
#include <sstream> 
using namespace cv;
using namespace std;
using namespace cv::face;

#define CV_COLOR_GREEN cv::Scalar(0, 255, 0)

int resize_save(Mat& faceIn, char* path, int  faceseq);
//Input: current image, the path of file, the name or faceseq of images.
//Output: None
//Function: resize the current image to (92, 122), which is same to the train data.
int get_face(char* path);
//Input: the path of file.
//Output: None
//Function: Use face_cascade to detect if there are faces in the window, and save the faces through function reszie_save.


int resize_save(Mat& faceIn, char* path, int  faceseq){
  string strname;
  Mat faceOut;
  bool ret;
  if(faceIn.empty()){
    printf("FaceIn is empty.\n");
    return -1;
  }

  if(faceIn.cols > 100){
    resize(faceIn, faceOut, Size(92, 122));
    //Resize and Keep a match with the train database.
    strname = format("%s/%d.jpg", path, faceseq); //mkdir
    ret = imwrite(strname, faceOut); //save image. Note the file suffix.
    if(ret == false){
      printf("Image write failed!\n");
      printf("Please check filename[%s] is legal!\n", strname.c_str());
      return -1;
    }
    imshow(strname, faceOut);
  }
  waitKey(20);
  return 0;
}

int get_face(char* path){
  CascadeClassifier face_cascade;
  VideoCapture camera;
  int ret;
  Mat frame;  //camera frame
  vector<Rect> objects; //The faces coordinates.
  Mat img_gary; //Gradation pictures.
  Mat faceImg;
  int faceNum = 1; //
  char key;
  camera.open(0);
  if(!camera.isOpened()){
    cout << "Open camera failed." << endl;
    return -1;
  }
  cout << "Open camera succeed. " << endl;

  //Load the face cascadeclassifier.
  ret = face_cascade.load("haarcascade_frontalface_alt2.xml");
  if(!ret){
    cout << "Load xml failed." << endl;
    return -1;
  }
  cout << "Load xml succeed." << endl;
  
  while(1){
    camera >> frame;
    if(frame.empty()){
      continue;
    }
    cvtColor(frame, img_gary, COLOR_BGR2GRAY); //Transform frame as the gradation picture, note imshow is still the original frame.
    equalizeHist(img_gary, img_gary); //Histogram equalization, which is helpful to improve the quality of pictures.

    //Face detection
    face_cascade.detectMultiScale(img_gary, objects, 1.1,3 , 0, Size(50,50));
    for(size_t i = 0; i < objects.size(); i++){
      rectangle(frame, objects[i], CV_COLOR_GREEN);
    }
    imshow("Camera", frame);
    key = waitKey(1);
    switch (key){
      case 'p': //tap 'P' to save.
        if(objects.size() == 1){
          faceImg = frame(objects[0]);
          ret = resize_save(faceImg, path, faceNum);
          if(ret == 0){
            cout << "resize_save succeed.\n" << endl;
            faceNum++;
          }
        }
        break;
      case 27:   //switch to ESC
        cout << "Esc ..." << endl;
        return 0;
      default:
        break;
    }
  }
}



int main(int argc, char* argv[]){
  if(argc != 2)
  	{
		printf("usage: %s <path>\n", argv[0]);
		return -1;
  	}
  get_face(argv[1]);
  return 0;
}
```
![](4.jpg)
Note:    
1. After the compilation is successful, the execution executable file must provide parameters, which are the directories for storing the face image, and it must be an existing directory.(E.g: ./program_name Img/s41)    
2. Press the “P” button to take a photo and save the face. Press the “Esc” button to exit.
### Face Database Creation
The official document provides a download of the face database, and i use the [AT&T Facedatabase](http://www.cl.cam.ac.uk/research/dtg/attarchive/facedatabase.html) to creat my face databse. I have updated this zip file to my github, you can download it from [here](att_faces.zip) faster.
AT&T Face Database is also konwn as the OCR face database, 40 people, 10 photos per person. The photos are token at different times, different lighting, different expressions(closed eyes, laughing or not laughing), diffenent face details(with or without glasses). All images were captured on a dark , eveb background with a vertical face o the front(some with a slight rotation).    
You can download the compressed package from the website, and first extract the att_faces folder. There are 40 folders under the foder, which named from "s1" to "s40". Each folder has the same person's photos with different expressions, and there are 10 face photos.    
The format of these images is ".pgm"
![](1.png)
![](2.png)

Note:    
If you want to add your own photos to the face database through the program, the number of added pictures must be no less than 2.



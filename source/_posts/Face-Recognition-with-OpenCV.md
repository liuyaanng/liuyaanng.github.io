---
title: Face Recognition
top: false
cover: false
img: https://cdn.jsdelivr.net/gh/liuyaanng/Blog_source@master/blog_images/Face-Recognition-with-OpenCV/img.jpg
toc: true
mathjax: false
date: 2019-08-10 12:00:00
password:
summary: Face Recognition
tags: 
- OpenCV
- Face Recongnition
- c++
- python
categories: 
- Face Recognition
---

# Face Recognition with OpenCV

# Preface
My Particular Environment:    
Ubuntu16.04 + OpenCV3.3.0 + OpenCV_contrib3.3.0

## 1. Image Acquisition and Face Database Creation

### 1.1 Image Acquisition

#### 1.1.1 Steps and methods
1. Open the camera and capture images;
2. Loading the face classifier;
3. Start face detection, frame the face part and display;
4. Under the condition that the face is detected, take a picture with one button;
5. For the face part, resize and write the image file in the specified directory;

#### 1.1.2 Code

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
//Function: resize the current image to (92, 112), which is same to the train data.
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
    resize(faceIn, faceOut, Size(92, 112));
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

![](https://cdn.jsdelivr.net/gh/liuyaanng/Blog_source@master/blog_images/Face-Recognition-with-OpenCV/4.jpg)
Note:    

1. After the compilation is successful, the execution executable file must provide parameters, which are the directories for storing the face image, and it must be an existing directory.(E.g: ./program_name Img/s41)    
2. Press the “P” button to take a photo and save the face. Press the “Esc” button to exit.


### 1.2 Face Database Creation
The official document provides a download of the face database, and i use the [AT&T Facedatabase](http://www.cl.cam.ac.uk/research/dtg/attarchive/facedatabase.html) to create my face database. I have updated this zip file to my github, you can download it from [here](att_faces.zip) faster.
AT&T Face Database is also known as the OCR face database, 40 people, 10 photos per person. The photos are token at different times, different lighting, different expressions(closed eyes, laughing or not laughing), different face details(with or without glasses). All images were captured on a dark , even background with a vertical face o the front(some with a slight rotation).    
You can download the compressed package from the website, and first extract the att_faces folder. There are 40 folders under the folder, which named from "s1" to "s40". Each folder has the same person's photos with different expressions, and there are 10 face photos.    
The format of these images is ".pgm"
![](https://cdn.jsdelivr.net/gh/liuyaanng/Blog_source@master/blog_images/Face-Recognition-with-OpenCV/1.png)
![](https://cdn.jsdelivr.net/gh/liuyaanng/Blog_source@master/blog_images/Face-Recognition-with-OpenCV/2.png)

Note:    
If you want to add your own photos to the face database through the program, the number of added pictures must be no less than 2.

## 2. Face Recognition Model training

### 2.1 Create a label file CSV
With the face database data, we need to read it in the program, here we need to use csv file to read the image data in the face database.    
The format of a csv file: image path name + label, such as /Img/s1/image.jpg;1    
Assume the face image path is: /Img/s1/01..jpg    
And we give this face image a label "1", this label represents the person's name. One person's face image label must be the same.    
You can create a csv file manually and then enter the data one by one. But if you use python, you don't have to do this tedious and boring work.    
The following is a piece of code which can write data in the CSV file automatically.

```python
#!/usr/bin/env python
 
import sys
import os.path
 
# This is a tiny script to help you creating a CSV file from a face
# database with a similar hierarchie:
#
#  
#  
#  |-- s1
#  |   |-- 1.pgm
#  |   |-- ...
#  |   |-- 10.pgm
#  |-- s2
#  |   |-- 1.pgm
#  |   |-- ...
#  |   |-- 10.pgm
#  ...
#  |-- s40
#  |   |-- 1.pgm
#  |   |-- ...
#  |   |-- 10.pgm
#
 
if __name__ == "__main__":
 
    if len(sys.argv) != 2:
        print "usage: create_csv <base_path>"
        sys.exit(1)
 
    BASE_PATH=sys.argv[1]        
    SEPARATOR=";"
    # This is output csv file.
    fh = open("../at.csv",'w')
 
    for dirname, dirnames, filenames in os.walk(BASE_PATH):
        for subdirname in dirnames:
            subject_path = os.path.join(dirname, subdirname)
            for filename in os.listdir(subject_path):
                abs_path = "%s/%s" % (subject_path, filename)
                print("%s%s%s" % (abs_path, SEPARATOR, subdirname[1:]))
                fh.write(abs_path)
                fh.write(SEPARATOR)
                fh.write(subdirname[1:])
                fh.write("\n")
    fh.close()
```

You should set the image path parameter (absolute path) when running.(E.g: **python filename.py /home/kevin/OpenCV/face_rec/Img** ) and you can get a CSV file like this:
![](https://cdn.jsdelivr.net/gh/liuyaanng/Blog_source@master/blog_images/Face-Recognition-with-OpenCV/5.png)
This CSV file is created.

### 2.2 Model training
This is the official example of OpenCV: [Click here](https://docs.opencv.org/3.2.0/da/d60/tutorial_face_main.html)
They offer three models: Eigenfaces, Fisherfaces and Local Binary Patterns Histograms(LBPH)    

Then I will train my own face database based on these models on the first step.

```cpp
static Mat norm_0_255(InputArray _src){
  Mat src = _src.getMat();
  Mat dst; //Create and return a normalized image matrix:
  switch(src.channels()) {
    case 1:
        cv::normalize(_src, dst, 0, 255, NORM_MINMAX, CV_8UC1);
        break;
    case 3:
        cv::normalize(_src, dst, 0, 255, NORM_MINMAX, CV_8UC3);
        break;
    default:
        src.copyTo(dst);
        break;
  }
  return dst;
}
//load CSV file
static void read_csv(const string& filename, vector<Mat>& images, vector<int>& labels, char separator = ';'){
  std::ifstream file(filename.c_str(), ifstream::in);
    if (!file) {
        string error_message = "No valid input file was given, please check the given filename.";
        CV_Error(Error::StsBadArg, error_message);
    }
    string line, path, classlabel;
    while (getline(file, line)) {
        stringstream liness(line);
        getline(liness, path, separator);
        getline(liness, classlabel);
        if(!path.empty() && !classlabel.empty()) {
            images.push_back(imread(path, 0));
            labels.push_back(atoi(classlabel.c_str()));
        }
    }
}

void train_model(const string& fn_csv){
  // 2 containers to store image data and corresponding labels
    vector<Mat> images;
    vector<int> labels;
    // load data
    try
    {
        read_csv(fn_csv, images, labels);
    }
    catch (cv::Exception& e)
    {
        cerr << "Error opening file \"" << fn_csv << "\". Reason: " << e.msg << endl;
        exit(1);
    }
    if (images.size() <= 1) {
        string error_message = "This demo needs at least 2 images to work. Please add more images to your data set!";
        CV_Error(CV_StsError, error_message);
    }

    Mat testSample = images[images.size() - 1];
    int testLabel = labels[labels.size() - 1];
    images.pop_back();
    labels.pop_back();
    // The following lines create a feature face model for face recognition.
     // Train it with images and tags read from a CSV file.
     // Here is a complete PCA transform
     //If you only want to keep 10 principal components, use the following code
     // cv::EigenFaceRecognizer::create(10);
     // cv::FisherFaceRecognizer::create(10);
     //
     // If you also want to initialize with a confidence threshold, use the following statement:
     // cv::EigenFaceRecognizer::create(10, 123.0);
     //
     // If you use all features and use a threshold, use the following statement:
     // cv::EigenFaceRecognizer::create(0, 123.0);
     // cv::FisherFaceRecognizer::create(0, 123.0);

    Ptr<BasicFaceRecognizer> model0 = EigenFaceRecognizer::create();
    model0->train(images, labels);
    model0->write("MyFacePCAModel.xml");

    Ptr<BasicFaceRecognizer> model1 = FisherFaceRecognizer::create();
    model1->train(images, labels);
    model1->write("MyFaceFisherModel.xml");

     Ptr<LBPHFaceRecognizer> model2 = LBPHFaceRecognizer::create();
    model2->train(images, labels);
    model2->write("MyFaceLBPHModel.xml");


    // The test image is predicted below, predictedLabel is the predicted label result
    int predictedLabel0 = model0->predict(testSample);
    int predictedLabel1 = model1->predict(testSample);
    int predictedLabel2 = model2->predict(testSample);

    // There is also a way to get the result and get the threshold:
    //      int predictedLabel = -1;
    //      double confidence = 0.0;
    //      model->predict(testSample, predictedLabel, confidence);

    string result_message0 = format("Predicted class = %d / Actual class = %d.", predictedLabel0, testLabel);
    string result_message1 = format("Predicted class = %d / Actual class = %d.", predictedLabel1, testLabel);
    string result_message2 = format("Predicted class = %d / Actual class = %d.", predictedLabel2, testLabel);
    cout << result_message0 << endl;
    cout << result_message1 << endl;
    cout << result_message2 << endl;

    waitKey(0);
}

int main(int argc, char* argv[]){
  if(argc != 2)
  	{
		printf("usage: %s <csv_file>\n", argv[0]);
		return -1;
  	}
  string fn_csv = string(argv[1]);
  train_model(fn_csv);
  return 0;
}
```

At this point, we have completed the training of the face model. And we get three files:     

`MyFaceFisherModel.xml、MyFaceLBPHModel.xml、MyFacePCAModel.xml`

![](https://cdn.jsdelivr.net/gh/liuyaanng/Blog_source@master/blog_images/Face-Recognition-with-OpenCV/6.png)
Note:    

1. Changes to the API of the OpenCV3.3 Face Recognition Module

   a. Facerec.hpp before opencv3.3

   ```cpp
   #ifndef __OPENCV_FACEREC_HPP__
   #define __OPENCV_FACEREC_HPP__
   
   #include "opencv2/face.hpp"
   #include "opencv2/core.hpp"
   
   namespace cv { namespace face {
   
   // base for two classes
   class CV_EXPORTS_W BasicFaceRecognizer : public FaceRecognizer
   {
   public:
       /** @see setNumComponents */
       CV_WRAP virtual int getNumComponents() const = 0;
       // ----------- ...... -----------
   
       CV_WRAP virtual cv::Mat getEigenValues() const = 0;
       CV_WRAP virtual cv::Mat getEigenVectors() const = 0;
       CV_WRAP virtual cv::Mat getMean() const = 0;
   };
   
   CV_EXPORTS_W Ptr<BasicFaceRecognizer> createEigenFaceRecognizer(int num_components = 0, double threshold = DBL_MAX);
   
   CV_EXPORTS_W Ptr<BasicFaceRecognizer> createFisherFaceRecognizer(int num_components = 0, double threshold = DBL_MAX);
   
   class CV_EXPORTS_W LBPHFaceRecognizer : public FaceRecognizer
   {
   public:
       /** @see setGridX */
       CV_WRAP virtual int getGridX() const = 0;
       /** @copybrief getGridX @see getGridX */
       CV_WRAP virtual void setGridX(int val) = 0;
       // ----------- ...... -----------
       CV_WRAP virtual cv::Mat getLabels() const = 0;
   };
   
   CV_EXPORTS_W Ptr<LBPHFaceRecognizer> createLBPHFaceRecognizer(int radius=1, int neighbors=8, int grid_x=8, int grid_y=8, double threshold = DBL_MAX);
   
   }} //namespace cv::face
   
   #endif //__OPENCV_FACEREC_HPP__
   ```

   - Comment section of the ninth line: `// base for two classes`,  This shows that BasicFaceRecognizer is the base class of two classes: EigenFaceRecognizer and FisherFaceRecognizer. With LBPHFaceRecognizer is irrelevant. Even the new API is still the case.

   - Method of creating three face recognizers.

     ```cpp
     Ptr<BasicFaceRecognizer> model =  createEigenFaceRecognizer();
     Ptr<BasicFaceRecognizer> model =  createFisherFaceRecognizer();
     Ptr<LBPHFaceRecognizer> model  =  createLBPHFaceRecognizer();
     ```

   b. Facerec.hpp after opencv3.3
	
```cpp
#ifndef __OPENCV_FACEREC_HPP__
#define __OPENCV_FACEREC_HPP__
	
#include "opencv2/face.hpp"
#include "opencv2/core.hpp"
	
namespace cv { namespace face {
	
// base for two classes
class CV_EXPORTS_W BasicFaceRecognizer : public FaceRecognizer
{
public:
	/** @see setNumComponents */
	CV_WRAP int getNumComponents() const;
	// ----------- ...... -----------
	CV_WRAP cv::Mat getEigenValues() const;
	CV_WRAP cv::Mat getEigenVectors() const;
	CV_WRAP cv::Mat getMean() const;
	
	virtual void read(const FileNode& fn);
	virtual void write(FileStorage& fs) const;
	virtual bool empty() const;
	
	using FaceRecognizer::read;
	using FaceRecognizer::write;

protected:
	int _num_components;
	double _threshold;
	std::vector<Mat> _projections;
	Mat _labels;
	Mat _eigenvectors;
	Mat _eigenvalues;
	Mat _mean;
};
class CV_EXPORTS_W EigenFaceRecognizer : public BasicFaceRecognizer
{
public:
	CV_WRAP static Ptr<EigenFaceRecognizer> create(int num_components = 0, double threshold = DBL_MAX);
};

class CV_EXPORTS_W FisherFaceRecognizer : public BasicFaceRecognizer
{
public:
	CV_WRAP static Ptr<FisherFaceRecognizer> create(int num_components = 0, double threshold = DBL_MAX);
};
class CV_EXPORTS_W LBPHFaceRecognizer : public FaceRecognizer
{
public:
	/** @see setGridX */
	CV_WRAP virtual int getGridX() const = 0;
	// ----------- ...... -----------
	CV_WRAP virtual cv::Mat getLabels() const = 0;
	CV_WRAP static Ptr<LBPHFaceRecognizer> create(int radius=1, int neighbors=8, int grid_x=8, int grid_y=8, double threshold = DBL_MAX);
};
}} //namespace cv::face
	
#endif //__OPENCV_FACEREC_HPP__
```

   - Both EigenFaceRecognizer and FisherFaceRecognizer are inherited from BasicFaceRecognizer. However, the LBFPHaceRecognizer, like the BasicFaceRecognizer, inherits from FaceRecognizer.	
   - Method of creating three face recognizer

```cpp
Ptr<EigenFaceRecognizer> model  = EigenFaceRecognizer::create();
Ptr<FisherFaceRecognizer> model = FisherFaceRecognizer::create();
Ptr<LBPHFaceRecognizer> model   = LBPHFaceRecognizer::create();
```

## 3. Identify faces in the video stream (camera)

### 3.1 Ready to work.
#### 3.1.1 Copy the training file obtained in the second step to the current folder.
#### 3.1.2 The process or method of Face Recognition 
This step has a similar part to the creation of a face recognition database.
   - Open the camera
   - Loading face detector, face model
   - Scale the image (for efficiency)
   - Face recognition (compare to face model)
   - Label faces with rectangular wireframes and add text labels

#### 3.2 Code

```cpp
#include <opencv2/opencv.hpp>  
#include "opencv2/core.hpp"
#include "opencv2/face.hpp"
#include "opencv2/highgui.hpp"
#include "opencv2/imgproc.hpp"
#include <iostream>
#include <fstream>
#include <sstream>
 
using namespace cv;
using namespace cv::face;
using namespace std;
 
#define ROW_MIN		45
 
int exitFlag = 0;

int Recognition_And_Draw();

int Recognition_And_Draw(){
  int ret = 0; //
  double scale = 4; //Zoom factor
  double fx = 1 / scale;
  Mat frame;  //Video frame
  VideoCapture cap(0);    //Open the camera
  if(!cap.isOpened()){
    cout << "Open camera failed.\n" << endl;
    return -1;
  }

  //Load cascade classifier
  CascadeClassifier cascade;
  ret = cascade.load("haarcascade_frontalface_alt2.xml");

  if(!ret){
    printf("Load xml failed[ret = %d]. \n", ret);
    return -1;
  }
  cout << "Load xml succeed." << endl;

  // Loading trained face models
  Ptr<BasicFaceRecognizer> modelPCA = EigenFaceRecognizer::create();  
  modelPCA->read("MyFacePCAModel.xml");  
  Ptr<BasicFaceRecognizer> modelFisher = FisherFaceRecognizer::create();
  modelFisher->read("MyFaceFisherModel.xml");  
  Ptr<LBPHFaceRecognizer> modelLBPH = LBPHFaceRecognizer::create();  
  modelLBPH->read("MyFaceLBPHModel.xml");  

  while(!exitFlag){
    cap >> frame;
    if(frame.empty())
      continue;
  
    Mat facesImg;  //
    vector<Rect> faces;  //Create a vector container for storing faces
    Mat gary_img; //grayscale image
    Mat scl_gary_img; //Scaled grayscale image
  
    cvtColor(frame, gary_img, COLOR_BGR2GRAY); //Convert the original image to a grayscale image
    resize(gary_img, scl_gary_img, Size(), fx, fx, INTER_LINEAR); //resize img
    equalizeHist( scl_gary_img, scl_gary_img );

  //face detection
    cascade.detectMultiScale(scl_gary_img, faces, 1.1, 2, 0|CASCADE_SCALE_IMAGE,Size(30, 30));
    printf("Face.size = %ld\n", faces.size());
  //facesImg = scl_gary_img(faces[0]);
  
    Mat face_resize;  //To prevent the picture is too small (that is, people too far away from the camera)
    int predictPCA = 0;  
    int predictFisher = 0;  
    int predictLBPH = 0;
    for(size_t i = 0; i < faces.size(); i++){
      
      Rect rectFace = faces[i];
      facesImg = scl_gary_img(faces[i]);
      if(facesImg.rows >= ROW_MIN){
        resize(facesImg, face_resize, Size(92, 112));
      }
      else{
        printf("faceImg.rows[%d] < %d \n", facesImg.rows, ROW_MIN);
        continue;
      }
      if(!face_resize.empty()){
        predictPCA = modelPCA->predict(face_resize);  
        predictFisher = modelFisher->predict(face_resize);  
        predictLBPH = modelLBPH->predict(face_resize); 
      }
      cout << "predictPCA   : " << predictPCA    << endl;
      cout << "predictFisher: " << predictFisher << endl;
      cout << "predictLBPH  : " << predictLBPH   << endl;
      rectangle(frame, Point(rectFace.x, rectFace.y) * scale, Point(rectFace.x + rectFace.width, rectFace.y + rectFace.height) * scale, Scalar(0, 255, 0), 2, 8);
      if (predictPCA == 41){
        putText(frame, "Liuyang", Point(faces[i].x, faces[i].y) * scale, FONT_HERSHEY_SIMPLEX, 1, Scalar(0, 0, 255), 2);
      }
      else{
        putText(frame, "X", Point(faces[i].x, faces[i].y) * scale, FONT_HERSHEY_SIMPLEX, 1.5, Scalar(0, 0, 255), 2);
      }
      
  // if(faces.size() <= 0){
  //  cout << "There are no faces in the camera.\n" << endl;
 // }
    }
    imshow("frame", frame);
      if (waitKey(1) == 27){
			    exitFlag = 1;
			    cout << "Esc..." << endl;
			    break;
      }
  }
}

int main(){
  Recognition_And_Draw();
  return 0;
}
```

![](https://cdn.jsdelivr.net/gh/liuyaanng/Blog_source@master/blog_images/Face-Recognition-with-OpenCV/7.jpg)

Note:    
1. This program supports multiple face recognition at the same time
2. Face recognition accuracy is not high, and it is susceptible to environmental factors such as light.

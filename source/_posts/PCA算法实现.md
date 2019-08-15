---
title: PCA算法实现
top: false
cover: false
toc: true
mathjax: true
date: 2019-08-07 09:48:10
password:
summary: PCA算法实例及C++实现
tags:
- 图像处理
- PCA
- OpenCV
- c++
categories:
- 算法
---
# PCA算法实例及C++实现

## PCA算法
总结一下PCA的算法步骤：

设有m条n维数据。

1. 将原始数据按列组成n行m列矩阵X
2. 将X的每一行（代表一个属性字段）进行零均值化，即减去这一行的均值
3. 求出协方差矩阵 $C=\frac{1}{m}XX^\mathsf{T}$
4. 求出协方差矩阵的特征值及对应的特征向量
5. 将特征向量按对应特征值大小从上到下按行排列成矩阵，取前k行组成矩阵P
6. $Y = PX$即为降维到k维后的数据

## 实例

以
$$ \begin{pmatrix}
  -1 & -1 & 0 & 2 & 0 \\\\
  -2 & 0 & 0 & 1 & 1 \\
\end{pmatrix} $$
为例，我们用PCA方法将这组二维数据其降到一维。

因为这个矩阵的每行已经是零均值，这里我们直接求协方差矩阵：
$$ C=\frac{1}{5}\begin{pmatrix}
  -1 & -1 & 0 & 2 & 0 \\\\
  -2 & 0 & 0 & 1 & 1 \\
\end{pmatrix}\begin{pmatrix}
  -1 & -2 \\\\
  -1 & 0  \\\\
  0  & 0  \\\\
  2  & 1  \\\\
  0  & 1 \\
\end{pmatrix}=\begin{pmatrix}
  \frac{6}{5} & \frac{4}{5} \\\\
  \frac{4}{5} & \frac{6}{5} \\
\end{pmatrix}$$
然后求其特征值和特征向量，具体求解方法不再详述，可以参考相关资料。求解后特征值为：
$$\lambda_1=2,\lambda_2=2/5$$
其对应的特征向量分别是：
$$c_1\begin{pmatrix}
  1 \\\\
  1
\end{pmatrix},c_2\begin{pmatrix}
  -1 \\\\
  1
\end{pmatrix}$$
其中对应的特征向量分别是一个通解， $c_1$和 $c_2$ 可取任意实数。那么标准化后的特征向量为：
$$\begin{pmatrix}
  1/\sqrt{2} \\\\
  1/\sqrt{2}
\end{pmatrix},\begin{pmatrix}
  -1/\sqrt{2} \\\\
  1/\sqrt{2}
\end{pmatrix}$$
因此我们的矩阵P是：
$$P=\begin{pmatrix}
  1/\sqrt{2}  & 1/\sqrt{2}  \\\\
  -1/\sqrt{2} & 1/\sqrt{2}
\end{pmatrix}$$
最后我们用P的第一行乘以数据矩阵，就得到了降维后的表示：
$$Y=\begin{pmatrix}
  1/\sqrt{2} & 1/\sqrt{2}
\end{pmatrix}\begin{pmatrix}
  -1 & -1 & 0 & 2 & 0 \\\\
  -2 & 0 & 0 & 1 & 1
\end{pmatrix}=\begin{pmatrix}
  -3/\sqrt{2} & -1/\sqrt{2} & 0 & 3/\sqrt{2} & -1/\sqrt{2}
\end{pmatrix}$$
可以验证协方差矩阵C的对角化：
$$PCP^\mathsf{T}=\begin{pmatrix}
  1/\sqrt{2}  & 1/\sqrt{2}  \\\\
  -1/\sqrt{2} & 1/\sqrt{2}
\end{pmatrix}\begin{pmatrix}
  6/5 & 4/5 \\\\
  4/5 & 6/5
\end{pmatrix}\begin{pmatrix}
  1/\sqrt{2} & -1/\sqrt{2}  \\\\
  1/\sqrt{2} & 1/\sqrt{2}
\end{pmatrix}=\begin{pmatrix}
  2 & 0  \\\\
  0 & 2/5
\end{pmatrix}$$
![](02.png)

## C++实现
因为要对一组图片信息进行训练，所以我写了一部分通过摄像头截取图片帧的代码，`get_img()`函数。这里提取了5个特征脸和一个均值脸

```cpp
#include <opencv2/core/core.hpp>
#include <opencv2/highgui/highgui.hpp>
#include <opencv2/imgproc/imgproc.hpp>
#include <opencv2/objdetect/objdetect.hpp>

#include <iostream>
#include <fstream>
#include <sstream>
#define img_num 300 //训练图片的张数
using namespace cv;
using namespace std;
//通过摄像头保存要训练的图片

//打开摄像头
int get_img(){
  VideoCapture cap(0);
  if(!cap.isOpened())
  {
    return -1;
  }
  Mat frame;
  bool stop = false;
  int i = 1;
  while(!stop){
    cap >> frame;
    printf("%d\n", i);
    if (frame.empty())
      stop = true;
    //string filename = format("%d.jpg", i);
    char filename[20];
    sprintf(filename, "Img/%d.jpg", i);
    imwrite(filename, frame);
    i++;
    imshow("frame", frame);
    waitKey(30);
    if(i > img_num)
      break;
    
  }
return -1;

}
//把图像归一化为0-255
Mat norm_0_255(const Mat& src){
  Mat dst;
  switch(src.channels()){
    case 1:
        cv::normalize(src, dst, 0, 255, NORM_MINMAX, CV_8UC1);
        break;
    case 3:
        cv::normalize(src, dst, 0, 255, NORM_MINMAX, CV_8UC3);
        break;
    default:
        src.copyTo(dst);
        break;
  }
  return dst;
}

//将给定的图像转化为行矩阵
Mat asRowMatrix(const vector<Mat>& src, int rtype, double alpha = 1, double beta = 0){
  // 样本数量
  size_t n = src.size();
  //没有样本，返回空矩阵
  if (n == 0)
    return Mat();

  //样本的维数
  size_t d = src[0].total();

  Mat data(n, d, rtype);

  //拷贝数据
  for (int i = 0; i < n; i++){
    if(src[i].empty()){
      string error_message = format("Image number %d was empty, please check your input data.", i);
      CV_Error(CV_StsBadArg, error_message);
    }

    //确保数据能被reshape
    if(src[i].total() != d){
      string error_message = format("Wrong number of elements in matrix #%d! Expected %d was %d.", i, d, src[i].total());
      CV_Error(CV_StsBadArg, error_message);
    }
    Mat xi = data.row(i);
    //转化为1行，n列的格式
    if(src[i].isContinuous()){
      src[i].reshape(1, 1).convertTo(xi, rtype, alpha, beta);
    }
    else {
      src[i].clone().reshape(1, 1).convertTo(xi, rtype, alpha, beta);
    }
  }
  return data;
}

int main(int argc, const char* argv[]){
  vector<Mat> db;
  //get_img();
  for(int i=1; i<img_num;i++){

    string filename = format("Img/%d.jpg", i);
    db.push_back(imread(filename, IMREAD_GRAYSCALE));
  }
  // Build a matrix with the observations in row:
    Mat data = asRowMatrix(db, CV_32FC1);

    // PCA算法保持5主成分分量
    int num_components = 5;

    //执行pca算法
    PCA pca(data, Mat(), CV_PCA_DATA_AS_ROW, num_components);

    //copy  pca算法结果
    Mat mean = pca.mean.clone();
    Mat eigenvalues = pca.eigenvalues.clone();
    Mat eigenvectors = pca.eigenvectors.clone();
        //均值脸
    imshow("avg", norm_0_255(mean.reshape(1, db[0].rows)));

    //五个特征脸
    imshow("pc1", norm_0_255(pca.eigenvectors.row(0)).reshape(1, db[0].rows));
    imshow("pc2", norm_0_255(pca.eigenvectors.row(1)).reshape(1, db[0].rows));
    imshow("pc3", norm_0_255(pca.eigenvectors.row(2)).reshape(1, db[0].rows));
    imshow("pc4", norm_0_255(pca.eigenvectors.row(3)).reshape(1, db[0].rows));
    imshow("pc5", norm_0_255(pca.eigenvectors.row(4)).reshape(1, db[0].rows));

    while(1)
        waitKey(0);

    // Success!
    return 0;

}
```
![](01.png)

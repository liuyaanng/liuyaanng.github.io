---
title: Use Tensorflow in AI Studio
top: false
cover: false
toc: true
mathjax: true
date: 2020-05-09 00:04:38
img:
password: 
summary: 
tags:
- Tensorflow
- GPU
categories:
- 教程
---


[How to install tensorflow-gpu in PaddlePaddle](https://www.zhihu.com/question/336485090) 

## Tensorflow-gpu 1.13.1

![](cuda-cudnn.png) 

### 1. Install [cuda10.0](https://developer.nvidia.com/cuda-10.0-download-archive?target_os=Linux&target_arch=x86_64&target_distro=Ubuntu&target_version=1804&target_type=runfilelocal) 

- Base Installer

```bash
wget https://developer.nvidia.com/compute/cuda/10.0/Prod/local_installers/cuda_10.0.130_410.48_linux
```

- Patch

```bash 
wget https://developer.download.nvidia.cn/compute/cuda/10.0/Prod/patches/1/cuda_10.0.130.1_linux.run
```

- Install 

```bash
sh cuda_10.0.130_410.48_linux --silent --toolkit --toolkitpath=$HOME/cuda_10.0
sh cuda_10.0.130.1_linux.run --silent --installdir=$HOME/cuda_10.0 --accept-eula
```

### 2. [cuDNN](https://developer.nvidia.com/rdp/cudnn-archive) 

- Choose v7.4

```bash
wget https://developer.nvidia.com/compute/machine-learning/cudnn/secure/v7.4.2/prod/10.0_20181213/cudnn-10.0-linux-x64-v7.4.2.24.tgz
```

- Next:

```bash
tar -zxvf cudnn-10.0-linux-x64-v7.4.2.24.tgz
cp cuda/include/cudnn.h cuda_10.0/include/
cp cuda/lib64/libcudnn* cuda_10.0/lib64/
```

- The following code are needed to run when you reboot your servers. We can write it into a shell file to autorun. 

```bash
chmod a+r cuda_10.0/include/cudnn.h
chmod a+r cuda_10.0/lib64/libcudnn*
```

- Then create a file named 'environment' /(whatever you like /)

```bash
echo -e 'export PATH=$HOME/cuda_10.0/bin:$PATH\nexport LD_LIBRARY_PATH=$LD_LIBRARY_PATH:$HOME/cuda_10.0/lib64'>~/environment
source ~/environment
```

### 3. Install Tensotflow-gpu

```bash
pip install tensorflow-gpu==1.13.1 
```

OR 

[tensorflow-gpu](https://pypi.tuna.tsinghua.edu.cn/simple/tensorflow-gpu/) 
```bash
wget https://pypi.tuna.tsinghua.edu.cn/packages/2c/65/8dc8fc4a263a24f7ad935b72ad35e72ba381cb9e175b6a5fe086c85f17a7/tensorflow_gpu-1.13.1-cp37-cp37m-manylinux1_x86_64.whl#sha256=931c7d49b1757a0a6f3c577ab465cc53d0c4984ef766122f4f48159f5acdec81
pip install tensorflow_gpu-1.13.1-cp37-cp37m-manylinux1_x86_64.whl
```

### 4. Autostart shell

Create a file named `chmod_cuda100.sh`

```bash
#!/bin/bash

chmod a+r ~/cuda_10.0/include/cudnn.h

chmod a+r ~/cuda_10.0/lib64/libcudnn*

source ~/environment

```

Every time the environment starts, just run the following code

```bash
source chmod_cuda100.sh
```


### 5. Test

```python
import tensorflow as tf

sess = tf.Session()

a = tf.constant(1)

b = tf.constant(2)

print(sess.run(a+b))
```

Result: 3

```python
from tensorflow.python.client import device_lib 
local_device_protos = device_lib.list_local_devices() 
print([x.name for x in local_device_protos if x.device_type == 'GPU'])
```

Result: ['/device:GPU:0']

![](GPU.png) 






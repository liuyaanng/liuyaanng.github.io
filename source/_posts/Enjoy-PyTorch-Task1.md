---
title: Enjoy PyTorch-Task1
top: false
cover: false
toc: true
mathjax: false
date: 2019-08-07 13:11:13
password:
summary: My notes of PyTorch
tags:
- PyTorch
- Deep Learning
categories:
- PyTorch Notes
---

# Installing PyTorch with Anaconda and Conda

My Particular Environment:
- OS: Ubuntu 16.04
- Package Manager: conda
- Python: 3.6
- CUDA: None

Getting started with PyTorch is very easy. The recommended best option is to use the Anaconda Pythob package manager.

1. [Download and install Anaconda](https://www.anaconda.com/distribution/)(Go with the latest Python version)    
You can download the `.sh` package from the Anaconda website, but it's very slowly for me. So i find another choice.    
You can find it in [Tsinghua university open source mirror station](https://mirrors.tuna.tsinghua.edu.cn/anaconda/archive/), which i download is `Anaconda3-5.2.0-Linux-x86_64.sh`. Or if you already get the "wget", you can run this command in the terminal.
```bash
wget https://mirrors.tuna.tsinghua.edu.cn/anaconda/archive/Anaconda3-5.2.0-Linux-x86_64.sh
```
Use `conda -V` to check the Version of Anaconda after open a new terminal.
If it isn't work, try,
```bash
echo 'export PATH="~/anaconda3/bin:$PATH"' >> ~/.bashrc
source ./bashrc
```
2. Go to the Getting Started section on the [Pytorch website](https://pytorch.org/).
3. Specify the appropriate configuration options for your particular environment.
![](https://cdn.jsdelivr.net/gh/liuyaanng/Blog_source@master/blog_images/Enjoy-PyTorch-Task1/1.png)
4. Run the presented command in the terminal to install Pytorch.
```bash
conda install pytorch-cpu torchvision-cpu -c pytorch
```

```python
import torch
import torch.nn as nn
import torchvision
import torch.utils.data as Data

# Hyper Parameters
EPOCH = 1  
BATCH_SIZE = 50
LR = 0.001  
DOWNLOAD_MNIST = True  

# Mnist
train_data = torchvision.datasets.MNIST(
    root='./mnist/',  
    train=True,  # this is training data
    transform=torchvision.transforms.ToTensor(),  # exchange PIL.Image or numpy.ndarray to torch.FloatTensor (C x H x W)
    download=DOWNLOAD_MNIST,  
)

test_data = torchvision.datasets.MNIST(
    root='./mnist/',
    train=False
)

# BATCH_SIZE
train_loader = Data.DataLoader(
    dataset=train_data,
    batch_size=BATCH_SIZE,
    shuffle=True  
)

# test_data
test_x = torch.unsqueeze(test_data.test_data, dim=1).type(torch.FloatTensor)
test_y = test_data.test_labels


# cnn

class CNN(nn.Module):
    def __init__(self):
        super(CNN, self).__init__()
        self.layer1 = nn.Sequential(
            # (1, 28, 28)
            nn.Conv2d(
                in_channels=1,
                out_channels=16,
                kernel_size=5,  
                stride=1,  
                padding=2,
                groups=1
            ),
            # (16, 28, 38)
            nn.ReLU(),
            nn.MaxPool2d(kernel_size=2)
            # (16, 14, 14)
        )
        self.layer2 = nn.Sequential(

            nn.Conv2d(
                in_channels=16,
                out_channels=32,
                kernel_size=5,
                stride=1,
                padding=2
            ),
            nn.ReLU(),
            nn.MaxPool2d(kernel_size=2)
        )
        self.layer3 = nn.Linear(32 * 7 * 7, 10)

    def forward(self, x):
        # print(x.shape)
        x = self.layer1(x)
        # print(x.shape)
        x = self.layer2(x)
        # print(x.shape)
        x = x.view(x.size(0), -1)
        # print(x.shape)
        x = self.layer3(x)
        # print(x.shape)
        return x


cnn = CNN()

optimizer = torch.optim.Adam(cnn.parameters(), lr=LR)
loss_function = nn.CrossEntropyLoss()
for epoch in range(EPOCH):
    for step, (b_x, b_y) in enumerate(train_loader):
        output = cnn(b_x)
        loss = loss_function(output, b_y)
        optimizer.zero_grad()
        loss.backward()
        optimizer.step()

print('finished training')
test_out = cnn(test_x)
predict_y = torch.argmax(test_out, 1).data.numpy()
print('Accuracy in Test : %.4f%%' % (sum(predict_y == test_y.data.numpy()) * 100/ len(predict_y)))
```


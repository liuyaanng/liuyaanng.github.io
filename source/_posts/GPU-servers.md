---
title: GPU servers
top: false
cover: false
toc: true
mathjax: False
date: 2020-04-21 18:01:15
updatedate: 2020-04-21 18:01:15
img: https://cdn.jsdelivr.net/gh/liuyaanng/Blog_source@master/blog_images/GPU-servers/img.jpg
summary: 记录一下我在使用GPU服务器做深度强化学习训练的过程
tags:
- GPU
- Deep Learning
categories:
- 教程
---
## 前言

我的任务是在GPU服务器上使用深度强化学习训练Amazing Brick，Amazing Brick使用Python的[Arcade](https://arcade.academy/index.html) 库来写的。    

我在考虑在GPU服务器上训练之前，没有注意到Arcade是使用**OpenGL** 和**Pyglet** 来进行渲染的

![Arcade VS Pygame](https://cdn.jsdelivr.net/gh/liuyaanng/Blog_source@master/blog_images/GPU-servers/ArcadeVSPygame.png)

而服务器大多都以ssh登陆，而OpenGL就更不要说了，所以在我寻找服务器和准备环境的过程中就遇到了很多问题，这个在下面会说到。



## GPU servers

  [知乎:目前哪里可以租用到GPU服务器？](https://www.zhihu.com/question/51707286) 

----
- [AI Studio](https://aistudio.baidu.com/aistudio/index)

非常良心，用算力可以获得算力，不怕你用，用得多送的多。    
这里有一位同学写的攻略[薅薅国产免费GPU计算资源](https://zhuanlan.zhihu.com/p/73361554?utm_source=wechat_session&utm_medium=social&utm_oi=28323023421440)      
登陆方式有 **notebook** ,可使用 **Terminal** ,但没有root权限，这就意味着有很多限制，最重要的是预装框架为 **PaddlePaddle** .  不能用 `TensorFlow`, 总不能为了嫖GPU服务器再去学一种框架吧，别担心, 这里有[百度paddlepaddle平台如何配置tensorflow-gpu](https://www.zhihu.com/question/336485090). 这个我没有尝试，有兴趣的可以尝试一下（有空了我会来填这个坑）

- [易学智能](https://www.easyaiforum.cn/) 

我现在使用的就是这个

感谢[并行超算](https://www.paratera.com/liveInterface.html) 给我提供的50算力的试用，我就是靠着这50算力把环境给搭明白了哈哈哈。

- ...

## 环境搭建

### 1. Ubuntu

GPU 配置可根据自己的需要调整     
我选择的是：
```
OS: Ubuntu
GPU: RTX 2080TI
CPU: E5 4CORE
MEMARY: 15G
ENVIROMENT: Python 3.6 + TF 2.0
```
这里的环境使开箱即用的，不需要激活
1. 基本包安装

```bash
pip install arcade dataclasses scikit-image
```

2. 测试arcade环境

- Arcade 官方的一个小demo

```python
"""
Drawing an example happy face

If Python and Arcade are installed, this example can be run from the command line with:
python -m arcade.examples.happy_face
"""

import arcade

# Set constants for the screen size
SCREEN_WIDTH = 600
SCREEN_HEIGHT = 600
SCREEN_TITLE = "Happy Face Example"

# Open the window. Set the window title and dimensions
arcade.open_window(SCREEN_WIDTH, SCREEN_HEIGHT, SCREEN_TITLE)

# Set the background color
arcade.set_background_color(arcade.color.WHITE)

# Clear screen and start render process
arcade.start_render()

# --- Drawing Commands Will Go Here ---

# Draw the face
x = 300
y = 300
radius = 200
arcade.draw_circle_filled(x, y, radius, arcade.color.YELLOW)

# Draw the right eye
x = 370
y = 350
radius = 20
arcade.draw_circle_filled(x, y, radius, arcade.color.BLACK)

# Draw the left eye
x = 230
y = 350
radius = 20
arcade.draw_circle_filled(x, y, radius, arcade.color.BLACK)

# Draw the smile
x = 300
y = 280
width = 120
height = 100
start_angle = 190
end_angle = 350
arcade.draw_arc_outline(x, y, width, height, arcade.color.BLACK,
                        start_angle, end_angle, 10)

# Finish drawing and display the result
arcade.finish_render()

# Keep the window open until the user hits the 'close' button
arcade.run()
```

- ->运行发现报错：`ImportError: Library “GLU” not found`

  解决办法：[`sudo apt-get install freeglut3-dev`](https://stackoverflow.com/questions/50446867/importerror-library-glu-not-found) 

- ->再次运行报错：`pyglet.canvas.xlib.NoSuchDisplayException: Cannot connect to "None"`

  原因大概是arcade调用`pyglet`绘制窗口需要图形界面（就是弹出来的那个框框），而当你使用ssh连接server时是没有图形界面的。    
因此我们需要一个虚拟的图形界面，而[`xvfb-run`](https://linux.die.net/man/1/xvfb)就是一个提供虚拟图形界面的工具。    
  这里有一篇文章是介绍如何使用`xvfb`来创建一个虚拟桌面来进行服务器端的图形测试的。

  [How To Run Your Tests Headlessly with Xvfb](http://elementalselenium.com/tips/38-headless)

  安装`xvfb`之前要先更新一下 `sudo apt update`, 如果遇到密钥不可用可以`sudo apt-key adv --keyserver keyserver.ubuntu.com --recv-keys 密钥`

- ->使用`xvfb-run -a python xxx.py` 来继续测试报错：`arcade.application.NoOpenGLException:  Unable to create an OpenGL 3.3+ context. Check to make sure your system supports OpenGL 3.3 or higher.`     

  意思是OpenCV版本太低

- 接下来查看服务器端的OpenGL版本，使用`glxinfo | grep "OpenGL"`

  ![opencv_version](https://cdn.jsdelivr.net/gh/liuyaanng/Blog_source@master/blog_images/GPU-servers/opencv_version.png) 

  还是没有图形界面的问题，继续使用`xvfb-run -a glxinfo | grep "OpenGL"`

  ![opencv_version](https://cdn.jsdelivr.net/gh/liuyaanng/Blog_source@master/blog_images/GPU-servers/opencv_version2.png) 

  显示OpenGL的版本为3.1, 依旧无法满足arcade需要的OpenGL3+。

- 会不会是由于服务端原机器上的低版本OpenGL造成`xvfb`虚拟后的OpenCV版本较低？

  我在本地的Ubuntu系统上分别运行`glxinfo | grep "OpenGL"`, 发现原机器版本为4.6，但`xvfb`虚拟后的版本为3.1，推测为`Xvfb`虚拟图形界面的原因。

  ![](https://cdn.jsdelivr.net/gh/liuyaanng/Blog_source@master/blog_images/GPU-servers/glxinfo.png)

  此问题没有找到解决办法

- ⚠️ 如果你是一个`pygame`用户，或者你对OpenGL的版本要求不高（3.1），你完全可以使用`xvfb-run`来进行要求图形化的测试。经测试，pygame在GPU服务器上可以运行。


既然Ubuntu无法完成我的工作，故我开始使用Windows

### 2. Windows 10

系统配置

```
OS: Windows 10
GPU: RTX 2080TI
CPU: I5
```

- 进入系统要先激活环境,详细信息见[帮助文档](https://www.easyaiforum.cn/helpDocument?manual_id=136) 

```bash
conda activate py36h
```

- 安装基本包和Ubuntu一样，测试的时候发现依旧存在`OpenGL`的问题,查看OpenGL版本为1.1

  这里给几个查看OpenGL的工具：
  - GPU_Caps_Viewer: 链接: https://pan.baidu.com/s/1_YisKqKJY_2Uml2MQXKnNQ 提取码: use7
  - GLViewer: 链接: https://pan.baidu.com/s/1G2GR5S9oSqatMmBqv5YLdA 提取码: 27s2

- 更新OpenGL

  更新显卡驱动即可: [NVIDIA Driver Downloads](https://www.nvidia.com/Download/index.aspx#) , 下载对应版本的驱动安装。

  我在网上找到很多说用 驱动精灵， 鲁大师等软件更新驱动，我试了一下，完全不起作用。官网驱动亲测可行，就是有点耗时间。

- 更新完OpenGL之后代码就可以快乐地训练啦











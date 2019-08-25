

---
title: Manjaro i3wm 高效率环境配置篇(持续更新)
top: false
cover: false
img: https://i.loli.net/2019/08/24/bx7Ky4DUoWQXzdq.jpg
toc: true
mathjax: false
date: 2019-08-24 15:45:27
password:
summary: Manjaro i3wm配置教程
tags:
- Manjaro
- i3wm
categories:
- 教程
---
![](4.png)
Manjaro是一款基于Arch Linux、对用户友好、全球排名第1的Linux发行版     
使用它是因为 AUR软件仓库有着世界上最齐全的Linux软件，万物皆可 pacman ,arch的wiki绝对是我见过的最详细的linux发行版的"说明书", 在这里基本能解决我所有的问题, 另，作为基于Arch的发行版，每日一 `sudo pacman -Syu`简直不要太爽啊！    
有时间一定要尝试一下 原生Arch(有生之年系列，趁还折腾的动)

## 1. 系统安装

### 1.1 ISO文件下载

[Manjaro官网](https://www.manjaro.org/)

Manjaro i3属于社区版本    
[Download manjaro-i3-18.0.4-stable-x86_64.iso](https://osdn.net/projects/manjaro-community/storage/i3/18.0.4/manjaro-i3-18.0.4-stable-x86_64.iso/)

### 1.2 U盘启动盘制作

首先准备一个容量大于4G的U盘，在制作启动盘之前请先把里面的资料转存到别处，因为此项操作会格式化U盘且不可恢复。    
刻录工具有很多，
- [UltralISO](http://cn.ezbsystems.com/dl2.php?file=uiso9_cn.exe)
- [深度启动盘制作工具](http://cdimage.deepin.com/applications/deepin-boot-maker/windows/deepin-boot-maker.exe) 深度科技，很简洁的一个工具
- [Rufus](https://github.com/pbatard/rufus/releases/download/v3.6/rufus-3.6.exe)

按照软件的操作步骤制作启动盘    
注：若遇到启动盘系统安装的过程中遇到启动盘不可用则使用 **Rufus** 使用DD镜像模式制作
![](1.png)

### 1.3 系统安装
安装过程很简单，参考下面这篇博客
[Manjaro Linux i3 安装笔记](https://www.jianshu.com/p/e555a079f78a)

安装时语言选择  **简体中文**即可
## 2. 中文环境配置

### 2.1 更换Linux国内源

Manjaro 默认的更新源在国外，没翻墙的宝宝无法更新，这里先换一下更新源
#### 2.1.1 更新镜像排名

```bash
sudo pacman-mirrors -i -c China -m rank //更新镜像排名
```
之后自己选择几个镜像，推荐ustc和tuna的镜像源

```bash
sudo vim /etc/pacman.d/mirrorlist //查看选择的源
sudo pacman -Syy  //更新数据源
```

#### 2.1.2 设置Archlinuxcn源

```bash
sudo vim /etc/pacman.conf
```

在文件末尾添加如下:

```bash
[archlinuxcn]
SigLevel = Optional TrustedOnly
#中科大源
Server = https://mirrors.ustc.edu.cn/archlinuxcn/$arch
#清华源
Server = http://mirrors.tuna.tsinghua.edu.cn/archlinuxcn/$arch

[antergos]
SigLevel = TrustAll
Server = https://mirrors.ustc.edu.cn/antergos/$repo/$arch
Server = http://mirrors.tuna.tsinghua.edu.cn/antergos/$repo/$arch

[arch4edu]
SigLevel = TrustAll
Server = http://mirrors.tuna.tsinghua.edu.cn/arch4edu/$arch
```

#### 2.1.3 导入GPG key

```bash
sudo pacman -Syy //更新数据源
sudo pacman -S archlinuxcn-keyring //安装导入GPG key
sudo pacman -S antergos-keyrin
```

#### 2.1.4 更新系统

```bash
sudo pacman -Syu
```

### 2.2 解决桌面中文显示方块问题

若遇到桌面时间中文部分显示为 **方块**     

```bash
sudo vim /usr/share/conky/conky_maia
```

将 **conky.text** 的前四行字体改为 **anti** 即可

### 2.3 中文输入法
先安装fcitx

```bash
sudo pacman -S fcitx fcitx-im fcitx-configtool
```

安装完fcitx之后，创建.xprofile文件

```bash
vim ~/.xprofile
```
在里面添加如下内容:

```bash
#fcitx
export GTK_IM_MODULE=fcitx 
export QT_IM_MODULE=fcitx 
export XMODIFIERS="@im=fcitx"
```
之后安装中文输入法，搜狗拼音貌似对arch的支持不太好，所以我们选择谷歌拼音

```bash
sudo pacman -S fcitx-googlepinyin
```
之后在终端运行 `$ fcitx` 在图形化界面的配置文件中配置输入法即可，配置快捷键
![](2.png)
![](3.png)

若中文输入法开机无法自启动，则执行如下操作

```bash
vim ~/.i3/config
```

添加如下内容:

`exec_always fcitx`


### 杂项

#### 彻底解决蜂鸣问题
由于蜂鸣是由主板发出来的声音，故不能通过调节音量来消除此声音，要从源头上解决
- 关闭终端下Tab键的蜂鸣提示

```bash
sudo vim /etc/inputrc
```
将 `set bell-style none` 前的注释去掉

- 关闭vim中错误提示蜂鸣声

```bash
vim .vim/vimrc
```
在里面加入  `set vb t_vb= `





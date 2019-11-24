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

## 3. 高效率软件以及配置

### 3.1 软件

#### 3.1.1 Alacritty 

Alacritty 是一个免费的开源，快速，跨平台的终端仿真器，它使用GPU进行渲染，我使用tree命令跑了一下，确实速度快。kitty也是一款优秀的终端，不过它的配置稍麻烦，感兴趣的可以自行Google.

```bash
sudo pacman -S alacritty
```
#### 3.1.2 fish & oh-my-fish(omf)

- fish是一个智能且用户友好的命令行shell，适用于macOS，Linux和其他家族。fish包含语法突出显示，自动提示类型和精美的选项卡完成等功能，无需配置。    
Terminal下默认的SHELL是bash, 但bash作为你经常使用的工具来说一点都不便捷,相信有很多人都用过另一款shell,它的名字是**zsh**，以及**oh-my-zsh**，我也用了一段时间的zsh，在用的过程中我发现它有时候运行贼慢，忍不了，而且配置虽说有oh-my-zsh管理，但终归不是傻瓜式工具，直到有一天我发现了 **fish**,官网号称是一个专为90后设计的shell。   
安装很简单:

```bash
sudo pacman -S fish
```
终端输入`fish`即可进入
- 查看已经安装的shell

```bash
cat /etc/shells
```

![](12.png)
- 修改默认shell

看一下上一步输出的`fish`的位置，然后执行

```bash
chsh -s usr/bin/fish
```
![](13.png)
之后重启终端,shell就默认为fish了
![](14.png)

配置文件的位置是`/home/kevin/.config/fish/functions/fish_prompt.fish`，可以在这里设置替换命令，提高效率，举个例子:
![](18.png)

- oh-my-fish是一个 Fishshell 框架，允许你安装扩展或更改你的 shell 外观的软件包。它简单易用，快速可扩展。使用 omf，你可以根据你的想法，很容易地安装主题，丰富你的外观和安装插件来调整你的 Fish shell。    
- 安装omf
在fish shell里执行

```bash
curl -L https://get.oh-my.fish | fish
```
- 列出所有的安装包

```bash
omf list
```

这条命令会列出一安装的主题和插件

![](15.png)
- 列出已安装主题

```bash
omf theme
```
- 安装一个新主题
我现在用的主题叫 ays
```bash
omf install ays
```
- 改变主题

```bash 
omf theme ays
```
- 卸载oh-my-fish

```bash
omf destroy
```

- Fish 运行Bash commands    
例如 在fish 不能运行 time 命令，以下是解决办法    
   - 在 `fish/functions/` 目录下创建 `time.fish` 文件，在里面输入    

    ```
    function time --description "alias time bash -c time"
      bash -c "time $argv";
    end
    ```

其他具体功能见[oh-my-fish](https://github.com/oh-my-fish/oh-my-fish)

#### 3.1.3 Chromium

安装方式:

```bash
sudo pacman -S chromium
```
#### 3.1.4 nitrogen 
一款可视化换壁纸的软件,当然**feh**也是一款优秀的壁纸切换软件，教程很多，这里不再说了

```bash
sudo pacman -S nitrogen
```
![](5.png)

#### 3.1.5 neofetch

neofetch是一个个性化显示Linux系统信息的工具

```bash
sudo pacman -S neofetch
```
![](19.png)
#### 3.1.6 vim 

![](6.png)

文本/代码编辑中最最最为优秀经典的上古神器,之后我会写一个调教Vim的教程

```bash
sudo pacman -S vim 
```

#### 3.1.7 albert

![](7.png)
一款软件/文件/搜索 启动器

```bash
sudo pacman -S albert
```
第一次运行会提示你设置一下

![](8.png)
![](9.png)

#### 3.1.8 iease-music

网易云音乐最漂亮的第三方客户端！

```bash
sudo pacman -S iease-music
```
![](10.png)

#### 3.1.9 deepin-screenshot

深度截图

```bash
sudo pacman -S deepin-screenshot
```

#### 3.1.10 shadowsocks-qt5

```bash
sudo pacman -S shadowsocks-qt5
```

#### 3.1.11 thefuck

自从用了"Thefuck",妈妈再也不用担心我敲错命令了。   
有了它，万物皆可fffffffffuck!

```bash
sudo pacman -S thefuck
```
![](11.png)

#### 3.1.12 compton

设置窗口半透明+毛玻璃效果

![](16.png)

Manjaro i3 自带的有compton，不过这个只能做到半透明而没有毛玻璃效果，我使用的是[Compton](https://github.com/tryone144/compton),下面详细介绍一下安装过程

1. 卸载原有的compton

```bash
sudo pacman -R compton
```
若遇到依赖问题无法卸载，则

```bash
sudo pacman -Rc compton
```

2. clone仓库

```bash
git clone git@github.com:liuyaanng/compton.git
```

3. 安装

具体内容参考[README](https://github.com/liuyaanng/compton/blob/dual_kawase/README.md)    
安装前要确保下列依赖已经安装。    
其实大部分都已经安装,只有个别没有，若下面安装不成功，则按提示把依赖装上即可，有问题也可以在issues上查看

![](17.png)

```bash
cd compton
# Make the main program
make
# Make the man page
make docs
# Install
make install
```

4. 配置

配置信息在[.config]()

#### 3.1.13 deepin-file-manager

默认的 `pcmanfm` 竟然没有搜索功能，这不能忍啊    
我使用 `deepin-file-manager` 来代替默认的 `pcmanfm`

```bash
sudo pacman -S deepin-file-manager
```
在配置文件里

![](20.png)


### 3.2 i3的配置

i3的配置文件在 `~/.i3/config`

里面的配置信息介绍的很详细,需要更详细的信息你可以阅读官方[userguide](https://i3wm.org/docs/userguide.html)

 首先在`Autoapplications`处添加自启动的应用

```bash
exec_always fcitx
exec_always albert
```
- 把系统默认terminal换成`alacritty`
在 `start a terminal`处将原来的代码注释掉，加上以下语句

```bash
bindsym $mod+Return exec alacritty
```
- 设置软件启动快捷键

在配置文件中添加

```bash
set $mod Mod4
set $mod1 Mod1
```

mod在这里设置的是键盘的`Super`键
mod1在这里设置的是`Alt`键

```bash 
bindsym $mod+c exec chromium
bindsym $mod+p exec nitrogen
bindsym $mod1+m exec iease-music
bindsym $mod1+Shift+a exec deepin-screenshot
```
- 窗口之间的间距通过i3-gaps来设置，若没有安装，则

```bash
sudo pacman -S i3-gaps
```
在配置文件中加入

```bash
gaps inner 16
gaps outer 0
```
可以根据自己喜好调整数值

- xbacklight config

install `xorg-xbacklight` first

```bash
sudo pacman -S xorg-xbacklight 
```




## 杂项

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





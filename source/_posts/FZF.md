---
title: FZF
top: false
hidden: false
cover: false
toc: true
mathjax: false
date: 2021-02-28 21:59:09
updatedate: 2021-02-28 21:59:09
img: https://cdn.jsdelivr.net/gh/liuyaanng/Blog_source/blog_images/img/20210301100558.png
password:
summary: Fuzzy File Finder
tags:
categories:
---
[fzf](https://github.com/junegunn/fzf) 是一个非常强大的终端文件模糊查找神器,在mac下也有许多优秀的工具,比如mac自带的	`spotlight` , [Alfred](https://www.alfredapp.com/) ,这些工具在桌面环境下非常好用,也十分漂亮,但我的工作一般都在终端下, fzf解决了我的问题. fzf有很多优点,可移植,速度超快,最重要的是,当fzf与 **zsh, ranger, vim** 碰撞在一起,极大的提高了我的工作效率.    
## FZF
- fzf的安装非常简单,在mac下,可以使用`Homebrew`来安装:

```bash
brew install fzf
```

现在就可以通过 `fzf` 命令来使用fzf了

![](https://cdn.jsdelivr.net/gh/liuyaanng/Blog_source@master/blog_images/img/20210301101707.png)

如果你刚安装完成,你的界面跟上图不一样,没有右侧的预览窗口,别着急,这些是可以在配置文件中修改的.

- 如果要安装	` key bindings` 和 `fuzzy completion` :

```bash
$(brew --prefix)/opt/fzf/install
```

一路y,则会在你的根目录下生成 `.fzf.bash` 和 `.fzf.zsh` 文件,想要配置fzf,则只需修改相应的文件即可.

## FZF + ZSH = AMAZING

fzf的配置文件写在 `.fzf.zsh` 中, 由于我的 `zsh` 配置文件在 `.config/zsh` 目录下, 所以我将fzf的配置文件也移到此处

```bash
mv ~/.fzf.zsh ~/.config/zsh/fzf.zsh
```

下面开始配置 `fzf.zsh` 文件

- fzf的默认搜索工具: ag

```bash
export FZF_DEFAULT_COMMAND='ag'
export FZF_DEFAULT_COMMAND='ag --hidden --ignore .git -g ""'
```
上面两条任选其一, 第二条表示搜索到的文件包含隐藏文件,忽略 `.git` 文件

- 模糊查找补全

fzf的默认键位为 `**` ,太麻烦了,换成 `\` 就舒服多了

```bash
export FZF_COMPLETION_TRIGGER='\'
```

- 预览窗口的实现

```bash
export FZF_DEFAULT_OPTS='--bind ctrl-k:down,ctrl-i:up --preview "[[ $(file --mime {}) =~ binary ]] && echo {} is a binary file || (ccat --color=always {} || highlight -O ansi -l {} || cat {}) 2> /dev/null | head -500"'
```

结合我的vim使用习惯,我将 `ctrl + i` 设置为向上, `ctrl + k` 设置为向下

当然,还有一些其他的配置,这些都可以在fzf的文档里找到.

## FZF + RANGER = EXCELLENT

![](https://cdn.jsdelivr.net/gh/liuyaanng/Blog_source@master/blog_images/img/ranger.gif)

fzf 和ranger 结合可直接在ranger下进行文件搜索,直接跳转到文件所在目录

- 首先在ranger的配置文件中设置打开fzf搜索的快捷键( `ctrl+f` )

```bash
vim ~/.config/ranger/rc.conf

// add the following line
map <C-f> fzf_select
```

- 在 `commands.py` 中添加	`fzf_select` 函数

```python
class fzf_select(Command):
    """
    :fzf_select

    Find a file using fzf.

    With a prefix argument select only directories.

    See: https://github.com/junegunn/fzf
    """
    def execute(self):
        import subprocess
        import os.path
        if self.quantifier:
            # match only directories
            command="find -L . \( -path '*/\.*' -o -fstype 'dev' -o -fstype 'proc' \) -prune \
            -o -type d -print 2> /dev/null | sed 1d | cut -b3- | fzf +m"
        else:
            # match files and directories
            command="find -L . \( -path '*/\.*' -o -fstype 'dev' -o -fstype 'proc' \) -prune \
            -o -print 2> /dev/null | sed 1d | cut -b3- | fzf +m"
        fzf = self.fm.execute_command(command, universal_newlines=True, stdout=subprocess.PIPE)
        stdout, stderr = fzf.communicate()
        if fzf.returncode == 0:
            fzf_file = os.path.abspath(stdout.rstrip('\n'))
            if os.path.isdir(fzf_file):
                self.fm.cd(fzf_file)
            else:
                self.fm.select_file(fzf_file)
```

## FZF + VIM = UNBELIVABLE

[fzf.vim](https://github.com/junegunn/fzf.vim) 是fzf为vim玩家编写的插件

![](https://cdn.jsdelivr.net/gh/liuyaanng/Blog_source@master/blog_images/img/20210301113521.png)

`fzf.vim` 的 [详细配置与快捷键设置](https://godliuyang.wang/2021/02/20/neovim/#toc-heading-8) 






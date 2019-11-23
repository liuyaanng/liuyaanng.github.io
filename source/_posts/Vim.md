---
title: Vim
top: false
img: https://i.loli.net/2019/11/23/EKUi4P2qMnZoktG.jpg
cover: false
toc: true
mathjax: false
date: 2019-11-23 22:10:56
password:
summary: Vim is a highly configurable text editor for efficiently creating and changing any kind of text.
tags:
- Vim
- Linux
categories:
- 教程
---

## - My Vim(Neovim) Config
- Todos
  - 146
  - 224

[GitHub Link](https://github.com/liuyaanng/NeoVim-Config)

### Basic Mappings

![Vim-cheat-sheet](vim_cheat_sheet.png)
![Colemak Keyboard](colemak.png)

- **set &lt; LEADER &gt; as &lt;SPACE &gt;**

- The Keyboard i use is **Colemak**, so i change some keys.

- Cursor Movement
  - Up: u
  - Down: e
  - Left: n
  - Right: i

After | Before | Function
:---: | :---: | :---:
l | u | Undo operations
L |   | Undotree
Ctrl + l | Ctrl + u | Undo in Insert mode
k | i | Insert key
K | I | Insert key
H | J | Joining (two) to one line
h | e | end of word
&lt; | &lt;&lt; | Indentation(left)
 &gt; |  &gt; &gt; | Indentation(right)
&lt;LEADER &gt;&lt;CR &gt; | :nohlstarch&lt;CR &gt; | Eliminate the yellow shadow after the search
= | nzz | Down the search(zz:center cursor line in window)
- | Nzz | Up the search
&lt;LEADER &gt;dw |
&lt;LEADER &gt;o | za | Folding
u | k | Up
e | j | Down
n | h | Left
i | l | Right
U | 5e | Up(faster)
E | 5j | Down(faster)
N | 0 | Go to the start of the line
I | $ | Go to the end of the line
W | 5w | Next word(Faster in-line navigation)
B | 5b | Prev word(Faster in-line navigation)
Ctrl + U | 5Ctrl + y | Move up the view port without moving the cursor
Ctrl + E | 5Ctrl + e | Move down the view port without moving the cursor
s | &lt;nop &gt; | Nothing
&lt;LEADER &gt;w | Ctrl + w w | Moving the cursor to the next windows
&lt;LEADER &gt;u | Ctrl + w j | Moving the cursor to the up windows
&lt;LEADER &gt;e | Ctrl + w k | Moving the cursor to the down windows
&lt;LEADER &gt;n | Ctrl + w h | Moving the cursor to the left windows
&lt;LEADER &gt;i | Ctrl + w l | Moving the cursor to the right windows


| Shortcuts | Function |
:----:   | :----:
Q | quit
S | save
&lt;LEADER &gt;rc | Open the vimrc file anytime
&lt;LEADER &gt;st | Open Startify
su | split the screens to up
se | split the screens to down
sn | split the screens to left
si | split the screens to right
&lt;UP &gt; | Horizontal +5
&lt;Down &gt; | Horizontal -5
&lt;LEFT &gt; | Vertical -5
&lt;RIGHT &gt; | Vertical +5
sh | Place the two screens up and down
sv | Place the two screens side by side
srh | Rotate the screens in horizontal direction
srv | Rotate the screens in vertical direction
&lt;LEADER &gt;/ | Opening a terminal window
&lt;LEADER &gt;&lt;LEADER &gt; | Jump to the next '&lt; ++ &gt;' and edit it



---
title: Neovim
top: true
cover: false
toc: true
mathjax: false
date: 2021-02-20
updatedate: 2021-03-02
img: https://cdn.jsdelivr.net/gh/liuyaanng/Blog_source@master/blog_images/img/20210301120656.png
password:
summary: 手把手把vim打造成最舒适的写代码神器
tags:
- vim
- neovim
categories:
---

本文是为了方便记忆vim插件的一些快捷键。这是我的配置地址：[nvim](https://github.com/liuyaanng/nvim), 该配置在你装完neovim之后，打开neovim后会自动安装插件，你需要修改的地方是下图中python位置以及markdown预览插件中的默认浏览器。
![](https://cdn.jsdelivr.net/gh/liuyaanng/Blog_source@master/blog_images/Neovim/1.jpg) 

我的vim插件大部分来自于一位大佬[theniceboy](https://github.com/theniceboy), 他在B站上出了很多包括vim, ranger, i3, dwm等等教程, 这是他的B站地址：[theCW](https://space.bilibili.com/13081489?from=search&seid=4240676561582012103) 

## 1. Install Neovim

[Install Guide](https://github.com/neovim/neovim/wiki/Installing-Neovim) 

## 2. 有用的工具
- figlet

```bash
brew install figlet
```


## 3. Vim基础快捷键
这里`<LEADER>`就是空格键
- 基础快捷键


```vim
- ';' :

Save & quit
- 'Q' quit
- 'ctrl_q' Exit Vim, unless there are some buffers 
which have been changed.
- 'S' save

- '<LEADER>rc' open vimrc

Undo 
-	`l` undo

- 'Y' Visual Mode : copy to system clipboard
      Normal Mode : copy till the end of the line.

- '>' right indent
- '<' left indent

Search
- '<LEADER><CR>' highlight off
- '=' next
- '-' last

- '<LEADER>dw' adjacent duplicate words

Space to Tab
- '<LEADER>tt' turn space to tab

Folding
- '<LEADER>o' folding

LazyGit
- '\g' :Git
- 'ctrl_g' open lazygit

Cursor Movement
"     ^
"     u
" < n   i >
"     e
"     v
- 'u' up
- 'e' down
- 'n' left
- 'i' right
- 'N' go to the start of the line
- 'I' go to the end of the line
- '\v' choose current line
- 'w' go to the next word or sign
- 'b' go to the last word or sign
- 'h' go to the next end of word
- 'ctrl_U' move up the view port without moving the cursor
- 'ctrl_E' move down the view port without moving the cursor

- 'ctrl_a' Insert Mode: move to the end of current line
           Command Mode: move to the start of command line

Command Mode Cursor Movement 
- 'ctrl_a' move to the start of command line
- 'ctrl_e' move to the end of command line
- 'ctrl_p' move up
- 'ctrl_n' move down 
- 'ctrl_b' move left
- 'ctrl_f' move right
- 'alt_b' move to last word
- 'alt_w' move to next word

Split the screen
- 'su' to up
- 'se' to down
- 'sn' to left
- 'si' to right


Window management
- '<LEADER>w' go to last window
- '<LEADER>u' up
- '<LEADER>e' down
- '<LEADER>n' left
- '<LEADER>i' right
- 'sh' place the two windows up and down
- 'sv' place the two windows left and right
- '<LEADER>q' close the window below the current window
- 'qf' close current window

Rotate screen
- 'srh' horizontal rotate
- 'srv' vertical rotate

Resize splits
- '<up>' increase horizontal size
- '<down>' decrease horizontal size
- '<left>' decrease vertical size
- '<right>' increase vertical size

Tab management
- 'tu' create a new tab
- 'tn' move to left tab
- 'ti' move to right tab
- 'tmn' move current tab to left
- 'tmi' move current tab to right

- '<LEADER>/' open a terminal window
- 'tx' use 'figlet' to generate words
- '\s' find and replace
```


## 4. Vim 插件


### Pretty Dress
- [vim-bufferline](https://github.com/bling/vim-bufferline) 
- [vim-bolt](https://github.com/bpietravalle/vim-bolt) 
- [vim-deus](https://github.com/ajmwagar/vim-deus) 

### Status line
- [lelline](https://github.com/theniceboy/eleline.vim) 
- [vim-scrollstatus](https://github.com/ojroques/vim-scrollstatus) 

### General Highlight
- [vim-hexokinase](https://github.com/RRethy/vim-hexokinase) 
- [vim-illuminate](https://github.com/RRethy/vim-illuminate) 

### File navigation
- [LeaderF](https://github.com/Yggdroot/LeaderF) 
- [fzf.vim](https://github.com/junegunn/fzf.vim)
![](https://cdn.jsdelivr.net/gh/liuyaanng/Blog_source@master/blog_images/img/20210301113521.png)
	- [fzf.vim README](https://github.com/junegunn/fzf/blob/master/README-VIM.md) 
	- 安装
	
	```vim
	Plug 'junegunn/fzf.vim'
	```
	
	配置

	```vim
	" ===
	" === FZF
	" ===
	set rtp+=/usr/local/opt/fzf
	" set rtp+=/home/linuxbrew/.linuxbrew/opt/fzf
	" noremap <silent> <C-p> :Files<CR>
	noremap <silent> <C-p> :Leaderf file<CR>
	noremap <silent> <C-f> :Rg<CR>
	noremap <silent> <C-h> :History<CR>
	"noremap <C-t> :BTags<CR>
	noremap <silent> <C-l> :Lines<CR>
	noremap <silent> <C-w> :Buffers<CR>
	noremap <leader>; :History:<CR>

	let g:fzf_preview_window = 'right:60%'
	let g:fzf_commits_log_options = '--graph --color=always --format="%C(auto)%h%d %s %C(black)%C(bold)%cr"'

	function! s:list_buffers()
		redir => list
		silent ls
		redir END
		return split(list, "\n")
	endfunction

	function! s:delete_buffers(lines)
		execute 'bwipeout' join(map(a:lines, {_, line -> split(line)[0]}))
	endfunction

	command! BD call fzf#run(fzf#wrap({
		\ 'source': s:list_buffers(),
		\ 'sink*': { lines -> s:delete_buffers(lines) },
		\ 'options': '--multi --reverse --bind ctrl-a:select-all+accept'
	\ }))

	noremap <c-d> :BD<CR>

	let g:fzf_layout = { 'window': { 'width': 0.9, 'height': 0.8 } }
	```

	快捷键:    
	- `ctrl_f` 查找文件
	- `ctrl_p` 使用 `LeaderF` 查找当前目录下的文件
	- `ctrl_l` 查找当前文件的行
	- `ctrl_h` 打开文件浏览历史
	- `ctrl_w` 打开buffer
	- `ctrl_d` 选择关闭指定的buffer

- [rnvimr](https://github.com/kevinhwang91/rnvimr) 在vim下使用ranger

	配置 

	```vim
	" ===
	" === rnvimr
	" ===
	let g:rnvimr_ex_enable = 1
	let g:rnvimr_pick_enable = 1
	let g:rnvimr_draw_border = 0
	" Change the border's color
	let g:rnvimr_border_attr = {'fg': 14, 'bg': -1}
	" Add a shadow window, value is equal to 100 will disable shadow
	let g:rnvimr_shadow_winblend = 70
	" let g:rnvimr_bw_enable = 1
	highlight link RnvimrNormal CursorLine
	nnoremap <silent> R :RnvimrToggle<CR><C-\><C-n>:RnvimrResize 0<CR>
	let g:rnvimr_action = {
							\ '<C-t>': 'NvimEdit tabedit',
							\ '<C-x>': 'NvimEdit split',
							\ '<C-v>': 'NvimEdit vsplit',
							\ 'gw': 'JumpNvimCwd',
							\ 'yw': 'EmitRangerCwd'
							\ }
	let g:rnvimr_layout = { 'relative': 'editor',
							\ 'width': &columns,
							\ 'height': &lines,
							\ 'col': 0,
							\ 'row': 0,
							\ 'style': 'minimal' }
	let g:rnvimr_presets = [{'width': 0.8, 'height': 0.8}]
	```

	快捷键
	- `R` 打开ranger

- [vim-rooter](https://github.com/airblade/vim-rooter) :自动将vim的工作目录到项目的根目录.

	`Rooter changes the working directory to the project root when you open a file or directory.`

	对比:    
	原文件目录:

	![](https://cdn.jsdelivr.net/gh/liuyaanng/Blog_source@master/blog_images/img/20210302121823.png)

	关闭rooter: 在vim里打开一个文件,此时vim的工作目录依旧是原文件所在目录

	![](https://cdn.jsdelivr.net/gh/liuyaanng/Blog_source@master/blog_images/img/20210302122402.png)

	启用rooter: 打开文件,vim的工作目录会切换到文件的根目录

	![](https://cdn.jsdelivr.net/gh/liuyaanng/Blog_source@master/blog_images/img/20210302122752.png)

	配置
	
	```vim
	" ===
	" === vim-rooter
	" ===
	let g:rooter_patterns = ['__vim_project_root', '.git/']
	let g:rooter_silent_chdir = 1
	```
	默认打开 `rooter`
	
- [any-jump](https://github.com/pechorin/any-jump.vim) 

	用法: 在 `normal` 和 `visual` 模式下都可用. 只需要将光标放到想要查找的单词上,这个单词可以是 `变量`, `类`, `常量`, `名称`, `符号` ( `variable/class/constant/name/symbol` ) 然后按下 `<LEADER>j` 即可.

	![](https://cdn.jsdelivr.net/gh/liuyaanng/Blog_source@master/blog_images/img/20210302124051.png)

	配置

	```vim
	" ===
	" === any-jump
	" ===
	nnoremap <LEADER>j :AnyJump<CR>
	let g:any_jump_window_width_ratio  = 0.8
	let g:any_jump_window_height_ratio = 0.9
	```

	快捷键

	- `<LEADER>j` search 

### Taglist

- [Vista.vim](https://github.com/liuchengxu/vista.vim)  

	这是一款查看LSP符号,标签的插件,可配合多个vim插件使用

	![](https://cdn.jsdelivr.net/gh/liuyaanng/Blog_source@master/blog_images/img/20210302125525.png)

	配置:

	```vim
	" ===
	" === Vista.vim
	" ===
	noremap <LEADER>v :Vista coc<CR>
	noremap <c-t> :silent! Vista finder coc<CR>
	let g:vista_icon_indent = ["╰─▸ ", "├─▸ "]
	let g:vista_default_executive = 'ctags'
	let g:vista_fzf_preview = ['right:50%']
	let g:vista#renderer#enable_icon = 1
	let g:vista#renderer#icons = {
	\   "function": "\uf794",
	\   "variable": "\uf71b",
	\  }
	let g:scrollstatus_size = 15
	```

	快捷键:

	- `<LEADER>v` 打开vista面板
	- `<ctrl-t>`  使用fzf查找名称

	![](https://cdn.jsdelivr.net/gh/liuyaanng/Blog_source@master/blog_images/img/20210302133944.png)

### Auto Complete

- [coc](https://github.com/neoclide/coc.nvim) 

	[详细配置教程](   ) 
- [tmux-complete.vim](https://github.com/wellle/tmux-complete.vim) 

	在临近的tmux窗格中启动单词的自动补全
### Snippets

- [vim-snippets](https://github.com/honza/vim-snippets)     

	快速补全工具,非常强大

### Ubdo Tree 

- [undotree](https://github.com/mbbill/undotree)

	![](https://cdn.jsdelivr.net/gh/liuyaanng/Blog_source@master/blog_images/img/20210302154803.png)

	配置: 

	```vim
	" ===
	" === Undotree
	" ===
	noremap L :UndotreeToggle<CR>
	let g:undotree_DiffAutoOpen = 1
	let g:undotree_SetFocusWhenToggle = 1
	let g:undotree_ShortIndicators = 1
	let g:undotree_WindowLayout = 2
	let g:undotree_DiffpanelHeight = 8
	let g:undotree_SplitWidth = 24
	function g:Undotree_CustomMap()
		nmap <buffer> u <plug>UndotreeNextState
		nmap <buffer> e <plug>UndotreePreviousState
		nmap <buffer> U 5<plug>UndotreeNextState
		nmap <buffer> E 5<plug>UndotreePreviousState
	endfunc
	```

	快捷键:

	- `L`  打开undotree 面板

### Git 

- [vim-gitignore](https://github.com/gisphm/vim-gitignore): 
	提供 `.gitignore` 文件高亮显示

- [fzf-gitignore](https://github.com/fszymanski/fzf-gitignore):  生成 `.gitignore` 文件

	配置:

	```vim
	noremap <LEADER>gi :FzfGitignore<CR>
	```

	快捷键:

	- `<LEADER>gi` 生成 `.gitignore` 文件

- [vim-gitgutter](https://github.com/akiomik/git-gutter-vim): 
	一个保存文件后能看到状态的插件

	![](https://cdn.jsdelivr.net/gh/liuyaanng/Blog_source@master/blog_images/img/20210302164010.png)

	配置:

	```vim 
	" ==
	" == GitGutter
	" ==
	" let g:gitgutter_signs = 0
	let g:gitgutter_sign_allow_clobber = 0
	let g:gitgutter_map_keys = 0
	let g:gitgutter_override_sign_column_highlight = 0
	let g:gitgutter_preview_win_floating = 1
	let g:gitgutter_sign_added = '▎'
	let g:gitgutter_sign_modified = '░'
	let g:gitgutter_sign_removed = '▏'
	let g:gitgutter_sign_removed_first_line = '▔'
	let g:gitgutter_sign_modified_removed = '▒'
	" autocmd BufWritePost * GitGutter
	nnoremap <LEADER>gf :GitGutterFold<CR>
	nnoremap H :GitGutterPreviewHunk<CR>
	nnoremap <LEADER>g- :GitGutterPrevHunk<CR>
	nnoremap <LEADER>g= :GitGutterNextHunk<CR>
	```

	快捷键:

	- `<LEADER>gf` 折叠
	- `H` 预览当前文件块

	![](https://cdn.jsdelivr.net/gh/liuyaanng/Blog_source@master/blog_images/img/20210302164503.png)

	- `<LEADER>g-` 上一块
	- `<LEADER>g+` 下一块

- [agit](https://github.com/cohama/agit.vim): 轻松查看git提交记录以及做出的更改

	![](https://cdn.jsdelivr.net/gh/liuyaanng/Blog_source@master/blog_images/img/20210302164810.png)
	
	配置:

	```vim
	" ===
	" === Agit
	" ===
	nnoremap <LEADER>gl :Agit<CR>
	let g:agit_no_default_mappings = 1
	```

	快捷键:

	- `<LEADER>gl` 查看git提交记录

### Autoformat

- [vim-autoformat](https://github.com/Chiel92/vim-autoformat): 一键格式化代码
	
	配置:

	```vim
	" ===
	" === AutoFormatr
	" ===
	nnoremap \f :Autoformat<CR>
	let g:formatdef_custom_js = '"js-beautify -t"'
	let g:formatters_javascript = ['custom_js']
	au BufWrite *.js :Autoformat
	```

	快捷键:

	- `\f` 一键格式化代码

### HTML CSS JS TypeScript JSON, etc

- [vim-json](https://github.com/leshill/vim-json): 提供json数据的高亮显示
- [jsonc.vim](https://github.com/neoclide/jsonc.vim) : 支持 `jsonc` 语法
- [html5.vim](https://github.com/othree/html5.vim) : 提供H5高亮和补全
- [vim-closetag](https://github.com/alvan/vim-closetag) : 快速书写 `html` 的标签

	![](https://cdn.jsdelivr.net/gh/liuyaanng/Blog_source@master/blog_images/img/vim-colsetag.gif)

	注意: 下面的标签不适用

	```html
	<area>, <base>, <br>, <col>, <command>, <embed>, <hr>, <img>,
	<input>, <keygen>, <link>, <meta>, <param>, <source>, <track>, <wbr>,<menuitem>
	```

	快捷键: 
	- `>` 
	- `>>` 

- [vim-js](https://github.com/coolwanglu/vim.js) : 支持JS语法
- [yats.vim](https://github.com/HerringtonDarkholme/yats.vim) : 支持 `TypeScript` 语法
- [vim-vue](https://github.com/posva/vim-vue) : 支持vue

### GO

- [vim-go](https://github.com/fatih/vim-go) 支持Go语言

### Python 

- [vim-python-pep8-indent](https://github.com/Vimjas/vim-python-pep8-indent) : 调整vim的缩进以符合 [pep8](https://www.python.org/dev/peps/pep-0008/) 规范

- [braceless.vim](https://github.com/tweekmonster/braceless.vim) : 包含一些有用的快捷键, 在这里只配置函数主体高亮

	配置:

	```vim
	autocmd FileType python BracelessEnable +highlight-cc2
	```
	
	快捷键:

	- Moving to recognized blocks is done with `[[` and `]]`. In Python, `[m` and `]m` moves to def and class blocks, while `[M` and `]M` moves to the end of those blocks.
	- `zc` 折叠
	- `zR` 取消折叠
	
### Markdown

- [markdown-preview](https://github.com/iamcco/markdown-preview.nvim) 这是一个实时预览markdown文件的插件, markdown 文件按`r`即可实时预览
- [vim-table-mode](https://github.com/dhruvasagar/vim-table-mode) : md文件快速创建表格

	![](https://cdn.jsdelivr.net/gh/liuyaanng/Blog_source@master/blog_images/img/vim-table-mode.gif)
	配置:

	```vim
	"let g:table_mode_disable_mappings = 1
	let g:table_mode_cell_text_object_i_map = 'k<Bar>'
	```

	快捷键: 

	- `<LEADER>tm`:  打开/关闭	`table-mode`

- [vim-markdown-toc](https://github.com/mzlogin/vim-markdown-toc) : 一键生成TOC

- [bullets.vim](https://github.com/dkarter/bullets.vim) 

### Editor Enhancement

- [auto-pairs](https://github.com/jiangmiao/auto-pairs) : 成对添加或删除括号, 引号
- [vim-visual-multi](https://github.com/mg979/vim-visual-multi)
- [tcomment_vim](https://github.com/tomtom/tcomment_vim) :快速注释内容

	配置:

	```vim
	let g:tcomment_textobject_inlinecomment = ''
	nmap <LEADER>cn g>c
	vmap <LEADER>cn g>
	nmap <LEADER>cu g<c
	vmap <LEADER>cu g<
	```

	快捷键:

	-  `<leader>cn` 注释
	-  `<leader>cu` 取消注释

- [ANTOVIM](HTTPS://GITHUB.COM/LIUYAANNG/ANTOVIM) : 一键改变 `TRUE` 和 `FALSE`

	快捷键:

	- `gs` 切换

- [vim-surround](https://github.com/tpope/vim-surround) 

	快捷键:

	-	`yskw'` 在所选单词两边添加 `'` : `word` to `'word'`
	- `cd'"` 将单词两边的 `''` 变成	`""` : `'word'` to `"word"`

- [wildfire.vim](https://github.com/gcmt/wildfire.vim) : 选中特殊符号包裹的文字

	快捷键:
	
	- 在 `Visual Mode` 下, 使用 `k'` 会选中被 `''`包裹的文字, 同样的	`k), k}, k]` 也适用

	注意: 仓库wiki中快捷键是 `i'`, 因为我做了按键映射, 将 `i` 映射到 `k` 上了

- [tabular](https://github.com/godlygeek/tabular) : 快速对齐文本

	![](https://cdn.jsdelivr.net/gh/liuyaanng/Blog_source@master/blog_images/img/vim-tabular.gif)

	快捷键:

	- `ga` + 对齐的参照物, 如: `:`, `=`

- [vim-capslock](https://github.com/tpope/vim-capslock) : 大写锁定

	快捷键:

	- `Insert Mode` : `ctrl_C` 
	- `Normal Mode` : `gC`

- [vim-easymotion](https://github.com/easymotion/vim-easymotion)  待完善
- [vim-subversive](https://github.com/svermeulen/vim-subversive)  
	![](https://cdn.jsdelivr.net/gh/liuyaanng/Blog_source@master/blog_images/img/vim-subversive.gif)

- 

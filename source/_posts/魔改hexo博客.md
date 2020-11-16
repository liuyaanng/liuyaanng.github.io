---
title: 魔改hexo博客
top: false
cover: false
toc: true
mathjax: false
date: 2020-09-18 21:12:34
updatedate: 2020-11-16
img:
password:
summary:
tags:
- hexo
categories:
---


## 魔改hexo博客

本次魔改主要包括以下几个方面

## 1. 添加一言插件
## 2. 添加动态线条背景
## 3. 添加Dplayer视频播放器
## 4. 添加Aplayer播放器
## 5. 添加看板娘（live2d-widget插件）
## 6. 添加黑夜模式
## 7. 添加文章更新日期
## 8. 添加访客地图统计
## 9. 添加valine评论邮件提醒
## 10. 添加网站背景
## 11. 添加腾讯兔小巢
## 12. Mac样式的代码块的添加
### 12.1 代码高亮
#### 12.1.1 禁用highlight
	
打开根目录下的`_config.yml`文件,修改配置

```yml
highlight:
enable: false
line_number: false
auto_detect: false
tab_replace:
```

#### 12.1.2 获取prism配置文件

在[https://prismjs.com/download.html](https://prismjs.com/download.html)选择喜欢的theme, 需要的language和plug\(不推荐选太多,需要的选上即可\), 将文件下载到本地后分别重命名为`prism.css`, `prism.js`, 将其放入到`/theme/matery/source/js/prism`目录下\(prism文件夹自己创建\) 

#### 12.1.3 配置prism
- 在`themes/matery/layout/_partial/head.ejs` 添加以下代码:

```javascript
<link rel="stylesheet" href="/js/prism/prism.css">
```

- 在`themes/matery/layout/_partial/footer.ejs` 添加以下代码:

```javascript
<script src="/js/prism/prism.js" async></script>
```

#### 12.1.4 添加配置
	
在根目录的 `_config.yml` 文件中添加以下代码:

```yml
prism_plugin:
	mode: 'preprocess'    # realtime/preprocess
	theme: 'tomorrow'
	line_number: false   # default false
	custom_css:

marked:
	langPrefix: line-numbers language-

```

此时测试效果如下图所示:

![](https://cdn.jsdelivr.net/gh/liuyaanng/blog_source/blog_images/魔改hexo博客/1.png) 

### 12.2 添加mac样式

#### 12.2.1 创建codeblock的js文件

在目录`theme/source/libs/codeBlock/`下创建`codeBlock.js`文件, 在里面添加如下代码:

```javascript
// 代码块

$(function () {
	$('pre').wrap('<div class="code-area" style="position: relative"></div>');
});
```
#### 12.2.2 添加css样式

在`theme/source/css/matery.css`文件中添加:

```css
pre {
	padding: 2.5rem 1.5rem 1.5rem 1.5rem !important;
	margin: 1rem 0 !important;
	background: #272822;
	overflow: auto;
	border-radius: 0.35rem;
	tab-size: 4;
}

.code-area::after {
	content: " ";
	position: absolute;
	border-radius: 50%;
	background: #ff5f56;
	width: 12px;
	height: 12px;
	top: 0;
	left: 12px;
	margin-top: 12px;
	-webkit-box-shadow: 20px 0 #ffbd2e, 40px 0 #27c93f;
	box-shadow: 20px 0 #ffbd2e, 40px 0 #27c93f;
}

code {
	padding: 1px 5px;
	top: 13px !important;
	font-family: Inconsolata, Monaco, Consolas, "Courier New", Courier, monospace;
	font-size: 0.91rem;
	color: #e96900;
	background-color: #f8f8f8;
	border-radius: 2px;
}

pre code {
	padding: 0;
	color: #e8eaf6;
	background-color: #272822;
}

pre[class*="language-"] {
	padding: 1.2em;
	margin: 0.5em 0;
}

code[class*="language-"],
pre[class*="language-"] {
	color: #e8eaf6;
	white-space: pre-wrap !important;
}

```

#### 12.2.3 调用js文件

在`theme/layout/_partial/post-detail.ejs`文件中添加

```javascript
<!-- 代码块 -->
<script type="text/javascript" src="/libs/codeBlock/codeBlockFuction.js"></script>
```

### 12.3 测试

执行`hexo clean && hexo g && hexo s`, 效果如下:

![](https://cdn.jsdelivr.net/gh/liuyaanng/blog_source/blog_images/魔改hexo博客/2.png) 



## 更新日志

### 2020.11.16
- 添加网站背景图, 添加腾讯兔小巢
- 添加Mac样式的代码块

### 2020.11.15
- 删除冗余脚本, 模块化插件
- 使用[valine-admin](https://deserts.io/valine-admin-document/)实现评论邮件提醒
- 修复黑夜模式bug, 现已完美运行

### 2020.11.14
- 加入文章更新日期
- 添加[ClustrMaps](https://clustrmaps.com)访客地图统计(从即日起)
	- 可通过config文件切换地图的样式
	- 目前在pc端访问globe样式无法加载, 移动端则正常(bug)

### 2020.09.25 
- 加入黑夜模式
- 试运行黑夜模式


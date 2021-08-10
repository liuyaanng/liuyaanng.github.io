---
title: 魔改hexo博客
top: true
cover: false
toc: true
mathjax: false
date: 2020-09-18 21:12:34
updatedate: 2020-12-07
img:
password:
summary: 记录hexo-matery主题的个人个性化设置
tags:
- hexo
- linux
categories:
- 教程
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

```ejs
<link rel="stylesheet" href="/js/prism/prism.css">
```

- 在`themes/matery/layout/_partial/footer.ejs` 添加以下代码:

```ejs
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

```ejs
<!-- 代码块 -->
<script type="text/javascript" src="/libs/codeBlock/codeBlockFuction.js"></script>
```

### 12.3 测试

执行`hexo clean && hexo g && hexo s`, 效果如下:

![](https://cdn.jsdelivr.net/gh/liuyaanng/blog_source/blog_images/魔改hexo博客/2.png) 

## 13. 访问速度优化
### 13.1 静态资源优化
#### 13.1.1 图片压缩
[WebP](https://developers.google.com/speed/webp?hl=zh-cn) 是Google开发的新图像格式,旨在以可接受的视觉质量为无损和有损压缩提供较小的文件大小。有损模式下比 JPEG 小 25% - 34%，无损模式下较 PNG 小 26%,很显然,在相同的用户体验下,使用WebP格式可以提高网站的访问速度.    
如果你想详细了解这其中的技术细节，可以阅读 Google 开发者文章[WebP压缩技术](https://developers.google.com/speed/webp/docs/compression?hl=zh-cn) 

##### 13.1.1.1 优化目标
使用WebP固然可以优化图像资源,提高访问速度,但截止到目前为止,即便浏览器对WebP的[支持情况](https://caniuse.com/#search=webp) 已经接近80%, 却依然有些主流浏览器如 Safari、IE 仍不支持，所以不能直接转用 WebP.    
由于目前精力有限,故先设定一个优化目标如下:    
- 由于压缩图像这项工作重复且繁琐，图像优化应自动化完成,初次配置完成，日后使用无需任何操作便可全自动切换 WebP 图片格式.
- 对于不支持的浏览器，会自动回退到 JPEG/PNG 等传统格式
- 提前生成好两份文件而非请求时计算，节省算力且响应更迅速

##### 13.1.1.2 目前已完成(网站首页轮播图)

这里使用一个开源工具: [Webp Converter and Analytics](https://github.com/Jacksgong/webp-converter), 具体使用方法在项目介绍页,这里不再赘述.    
只是暂时使用这个工具,因为我的博客目前图片资源大的就是首页轮播图,这只是一个暂时的解决方案,因为需要手动(懒)...

#### 13.1.2 HTML压缩
待定

#### 13.1.3 CSS压缩
待定

### 13.2 静态资源加载优化
#### 13.2.1 使用CDN
参考[CDN for Blog](https://godliuyang.wang/2020/09/15/cdn-for-blog/) 

## 14. 添加推荐文章插件([hexo-recommended-posts](https://github.com/huiwang/hexo-recommended-posts))
推荐文章的插件有很多, [hexo-related-popular-posts](https://github.com/tea3/hexo-related-popular-posts) 是一个很棒的插件, 安装也很简单,不过我这里使用的是`hexo-recommended-posts`
### 14.1 安装
```bash
npm install hexo-recommended-posts --save
```

### 14.2 下载推荐文章列表
```bash
hexo recommend
```

### 14.3 自定义配置
在博客根目录添加以下默认配置,根据个人情况修改
```yml
recommended_posts:
  server: https://api.truelaurel.com #后端推荐服务器地址
  timeoutInMillis: 10000 #服务时长，超过此时长，则使用离线推荐模式
  internalLinks: 3 #内部文章数量
  externalLinks: 1 #外部文章数量
  fixedNumber: false #控制是否返回固定数量的推荐文章, 如果默认推荐文章不够的话会填充当前文章的前后文章作为推荐文章.
  autoDisplay: true #自动在文章底部显示推荐文章
  excludePattern: [] #添加想要被过滤的链接的正则表达式, 如配置为 ["example.com"], 则所有包含 example.com 的链接都会从推荐文章中过滤掉.
  titleHtml: <h1>推荐文章<span style="font-size:0.45em; color:gray">（由<a href="https://github.com/huiwang/hexo-recommended-posts">hexo文章推荐插件</a>驱动）</span></h1> #自定义标题
```
### 14.4 一点小改动
插件虽然有`autoDisplay`选项来控制是否在文章底部显示文章,但在配置文件中竟然没有一个选项来控制是否启用插件,这不能忍,于是我修改了一点插件的代码,实现了这个功能,具体实现如下:
- 编辑`hexo-recommended-posts/lib/recommend.js`文件,第二行修改为
```javascript
var posts = filterPosts(recommended_posts, post, config.excludePattern, config.enable)
```
第九行修改为
```javascript
function filterPosts(recommended_posts, post, excludePattern, enable) {
	if (recommended_posts === undefined || !enable ||
		recommended_posts[post.permalink] === undefined) {
		return [];
	}
```

- 在根目录config中添加`enable`选项,具体如下:
```yml
recommended_posts:
	enable: true
  server: https://api.truelaurel.com #后端推荐服务器地址
  timeoutInMillis: 10000 #服务时长，超过此时长，则使用离线推荐模式
  internalLinks: 3 #内部文章数量
  externalLinks: 1 #外部文章数量
  fixedNumber: false #控制是否返回固定数量的推荐文章, 如果默认推荐文章不够的话会填充当前文章的前后文章作为推荐文章.
  autoDisplay: true #自动在文章底部显示推荐文章
  excludePattern: [] #添加想要被过滤的链接的正则表达式, 如配置为 ["example.com"], 则所有包含 example.com 的链接都会从推荐文章中过滤掉.
  titleHtml: <h1>推荐文章<span style="font-size:0.45em; color:gray">（由<a href="https://github.com/huiwang/hexo-recommended-posts">hexo文章推荐插件</a>驱动）</span></h1> #自定义标题
```

## 更新日志

### 2020.12.07
- 添加`hexo-recommended-posts`插件
 
### 2020.12.06
- 优化图片资源(首页轮播图)

### 2020.12.05
- 修复了一个 `ClustrMaps` 未统计访客的bug
- 默认不开启看板娘(太占用cpu内存,影响用户体验)

### 2020.11.22
- 使用[hexo-native-lazy-load](https://github.com/fengkx/hexo-native-lazy-load) 代替[hexo-lazyload-image](https://github.com/Troy-Yang/hexo-lazyload-image) 

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


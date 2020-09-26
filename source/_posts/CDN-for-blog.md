---
title: CDN_for_blog
top: false
cover: false
toc: true
mathjax: true
date: 2020-09-15 17:45:39
img: https://cdn.jsdelivr.net/gh/liuyaanng/Blog_source@master/blog_images/CDN_for_blog/img.png
password:
summary: Jsdelivr + Github = hexo🥰
tags:
- hexo 
- jsdelivr
categories:
- 教程
---

## Why CND?
放在Github的资源在国内加载速度比较慢，因此需要使用CDN加速来优化网站打开速度，jsDelivr + Github便是免费且好用的CDN，非常适合博客网站使用。


## USE CDN

1. 创建一个名为CDN的github仓库
2. 把仓库clone到本地
3. 将图片文件存储到仓库中并上传     
注：jsDelivr不支持加载超过20M的资源
4. 发布仓库
- 点击release发布仓库
![](https://cdn.jsdelivr.net/gh/liuyaanng/Blog_source@master/blog_images/CDN_for_blog/release.jpg)  
- 注明版本号后发布
![](https://cdn.jsdelivr.net/gh/liuyaanng/Blog_source@master/blog_images/CDN_for_blog/release_number.jpg) 
5. 通过如下形式来使用

```
// load any GitHub release, commit, or branch

// note: we recommend using npm for projects that support it

https://cdn.jsdelivr.net/gh/user/repo@version/file
```

例如：在我的github仓库中有这么一个文件

[https://github.com/liuyaanng/CDN/blob/1.02/blog_images/CDN_for_blog/release.jpg](https://github.com/liuyaanng/CDN/blob/1.02/blog_images/CDN_for_blog/release.jpg)

使用jsdelivr加速访问就是：

[https://cdn.jsdelivr.net/gh/liuyaanng/CDN@1.02/blog_images/CDN_for_blog/release.jpg](https://cdn.jsdelivr.net/gh/liuyaanng/CDN@1.02/blog_images/CDN_for_blog/release.jpg) 

其中**1.02**是我发布的版本号，当然也可以使用模糊版本号的方法进行访问，无论哪种形式，都可以明显的感觉到访问速度快了很多。

另外，在我使用的过程中，发现在第一次发布之后，以后在使用图片可将版本号换成`master`直接访问。


## Generate Jsdelivr Link

- 我写博客的截图均是由[Xnip](https://zh.xnipapp.com/) 生成，截图文件存储目录`Pictures/Xnip`,故我写了一个小脚本来实现

```bash
#!/bin/bash
# @author:liuyaanng

rep_path=~/Github/Myrep/CDN/
blog_photo_folder=blog_images
path=~/Pictures/Xnip
prefix=https://cdn.jsdelivr.net/gh/liuyaanng/CDN@
files=$(ls $path)
check_v=0
check_f=0
help_text="This is a script for move the picture files to github, and get the jsdelivr link quickly. This scripts run with 2 arguments.\n
1. cdn_server.sh -v version -f folder. version is the release version
,folder is the pictures's file folder. \n
for example: cdn_server.sh -v 1.0 -f cdn_for_blog, it will get\n
https://cdn.jsdelivr.net/gh/liuyaanng/CDN@1.0/blog_images/cdn_for_blog/filename\n
if you do not use version, please use:cdn_server.sh -v master -f foldername.
2. cdn_server.sh -h    Show help content."

while getopts :v:f:h opt
do
	case "$opt" in
		v) version=$OPTARG
			 check_v=1;;
		f) folder=$OPTARG
			 check_f=1;;
		h) echo -e $help_text
			 exit 1;;
		?) echo "sync error. Use 'cdn_server.sh -h' for help.";;
	esac
done
print_link(){
if [ ! -n "$files" ]; then
	echo "There is no file in Xnip folder."
else
	for filename in $files
	do
		echo $prefix$version/$blog_photo_folder/$folder/$filename
		mv $path/* $rep_path$blog_photo_folder/$folder
		echo "move file $filename success"
	done
	cd $rep_path
	git add .
	git commit -m "upload $folder"
	git push
fi
}

if [ $check_v -eq $check_f ]; then
	print_link
else
	echo "need 2 args but given 1."
fi
```


该脚本有以下功能：

1. 将截图转到github仓库中并提交
2. 自动生成jsdelivr链接

如果你想使用的话只需修改上面的路径信息就行了。

脚本有两个参数，你可以用`cdn_server.sh -h` 来查看帮助信息。

1. `-a version`. `-a`参数后跟发布的版本号
2. `-f folder`. `-f`参数后跟仓库中文件夹名

注意：版本号不是必需的，是为了区分新旧资源，如果不使用版本号，将会直接引用最新资源. 若不想指定版本号（第一次发布之后可用），可以直接使用 `-a master`.

例如：

```bash
cdn_server.sh -a master -f CDN_for_blog
```

生成链接为: [https://cdn.jsdelivr.net/gh/liuyaanng/CDN@master/blog_images/CDN_for_blog/result.jpg](https://cdn.jsdelivr.net/gh/liuyaanng/CDN@master/blog_images/CDN_for_blog/result.jpg) 
![](https://cdn.jsdelivr.net/gh/liuyaanng/CDN@master/blog_images/CDN_for_blog/result.jpg) 

为了写博客更（l）方（a）便（n）, 我在`hexo new`的同时在github的CDN仓库创建了一个同名的文件夹用于存储博客图片：

```bash
# hexo and CDN
alias hn='f() {hexo new $1;mkdir ~/Github/Myrep/CND/$1;echo Created folder ~/Github/Myrep/CND/$1};f'
```





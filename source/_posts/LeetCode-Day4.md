---
title: LeetCode_Day4
top: false
hidden: false
cover: false
toc: true
mathjax: false
date: 2021-03-09 10:10:38
updatedate: 2021-03-09 10:10:38
img:
password:
summary: 136->只出现一次的数字
tags:
- LeetCode
- c++
categories:
- 算法
---

[136] 只出现一次的数字

https://leetcode-cn.com/problems/single-number/description/

* algorithms
* Easy (70.80%)
* Likes:    1743
* Dislikes: -
* Total Accepted:    348.9K
* Total Submissions: 491.3K
* Testcase Example:  '[2,2,1]'
* Source Code:       136.single-number.cpp

<p>给定一个<strong>非空</strong>整数数组，除了某个元素只出现一次以外，其余每个元素均出现两次。找出那个只出现了一次的元素。</p>

<p><strong>说明：</strong></p>

<p>你的算法应该具有线性时间复杂度。 你可以不使用额外空间来实现吗？</p>

<p><strong>示例 1:</strong></p>

<pre><strong>输入:</strong> [2,2,1]
<strong>输出:</strong> 1
</pre>

<p><strong>示例&nbsp;2:</strong></p>

<pre><strong>输入:</strong> [4,1,2,1,2]
<strong>输出:</strong> 4</pre>


方法一: 位运算

异或运算性质:

![](https://cdn.jsdelivr.net/gh/liuyaanng/Blog_source@master/blog_images/img/20210311101301.png)

故将数组内元素依次进行异或运算, 最终的结果即为出现一次的数.

```cpp
class Solution {
public:
    int singleNumber(vector<int>& nums) {
			int res = 0;
			for(auto e: nums){
				res ^= e;
			}
			return res;
    }
};
```

![](https://cdn.jsdelivr.net/gh/liuyaanng/Blog_source@master/blog_images/img/20210311101604.png)

复杂度分析: 
- 时间复杂度: `O(n)`, 与nums的大小有关, 相当于遍历一遍数组
- 空间复杂度: `O(1)`, 除输出数组外,无额外空间


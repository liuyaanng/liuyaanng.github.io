---
title: LeetCode_Day20
top: false
hidden: false
cover: false
toc: true
mathjax: false
date: 2021-03-25 09:57:56
updatedate: 2021-03-25 09:57:56
img:
password:
summary: 633 -> 平方数之和 680 -> 验证回文字符串 Ⅱ
tags:
- c++
- LeetCode
- 双指针
categories:
- 算法
---

## [633] 平方数之和

https://leetcode-cn.com/problems/sum-of-square-numbers/description/

* algorithms
* Medium (34.98%)
* Likes:    169
* Dislikes: -
* Total Accepted:    40.4K
* Total Submissions: 114.8K
* Testcase Example:  '5'
* Source Code:       633.sum-of-square-numbers.cpp

<p>给定一个非负整数&nbsp;<code>c</code>&nbsp;，你要判断是否存在两个整数 <code>a</code> 和 <code>b</code>，使得&nbsp;<code>a<sup>2</sup> + b<sup>2</sup> = c</code> 。</p>

<p>&nbsp;</p>

<p><strong>示例 1：</strong></p>

<pre><strong>输入：</strong>c = 5
<strong>输出：</strong>true
<strong>解释：</strong>1 * 1 + 2 * 2 = 5
</pre>

<p><strong>示例 2：</strong></p>

<pre><strong>输入：</strong>c = 3
<strong>输出：</strong>false
</pre>

<p><strong>示例 3：</strong></p>

<pre><strong>输入：</strong>c = 4
<strong>输出：</strong>true
</pre>

<p><strong>示例 4：</strong></p>

<pre><strong>输入：</strong>c = 2
<strong>输出：</strong>true
</pre>

<p><strong>示例 5：</strong></p>

<pre><strong>输入：</strong>c = 1
<strong>输出：</strong>true</pre>

<p>&nbsp;</p>

<p><strong>提示：</strong></p>

<ul>
	<li><code>0 &lt;= c &lt;= 2<sup>31</sup> - 1</code></li>
</ul>

### 方法1: 双指针

本题可以使用双指针快速找到答案, 思想还是等同于遇到有序数组, 只不过数组范围为 `0, sqrt(c)`     
唯一需要注意的是 `c` 的取值范围 , 最好用 `long` 来创建双指针

```cpp
class Solution {
public:
    bool judgeSquareSum(int c) {
			if(c<=2){
				return true;
			}
			long a = 0, b = sqrt(c);
			while(a<=b){
				if(b*b == c - a*a){
					return true;
				}else if(b*b < c - a*a){
					++a;
				}else{
					--b;
				}
			}
			return false;
    }
};
```

![](https://cdn.jsdelivr.net/gh/liuyaanng/Blog_source@master/blog_images/img/20210325100329.png)

复杂度分析: 
- 时间复杂度: `O(sqrt(n))`
- 空间复杂度: `O(1)`

### 方法2: 二分查找

待完善

## [680] 验证回文字符串 Ⅱ

https://leetcode-cn.com/problems/valid-palindrome-ii/description/

* algorithms
* Easy (39.95%)
* Likes:    336
* Dislikes: -
* Total Accepted:    67.2K
* Total Submissions: 167.6K
* Testcase Example:  '"aba"'

<p>给定一个非空字符串&nbsp;<code>s</code>，<strong>最多</strong>删除一个字符。判断是否能成为回文字符串。</p>

<p><strong>示例 1:</strong></p>

<pre>
<strong>输入:</strong> &quot;aba&quot;
<strong>输出:</strong> True
</pre>

<p><strong>示例 2:</strong></p>

<pre>
<strong>输入:</strong> &quot;abca&quot;
<strong>输出:</strong> True
<strong>解释:</strong> 你可以删除c字符。
</pre>

<p><strong>注意:</strong></p>

<ol>
	<li>字符串只包含从 a-z 的小写字母。字符串的最大长度是50000。</li>
</ol>

### 方法1: 双指针

在数组首尾分别设置左右指针, 两指针朝中间靠拢, 两指针对应元素相等则继续靠拢, 需要注意的是, 当元素不等, 只要 区间为 `[left+1, right)` 或 `[left, right-1)` 的子数组满足回文即可

```cpp
class Solution {
public:
    bool validPalindrome(string s) {
			int count=1, left = 0, right = s.size() - 1;
			while(left < right){
				if(s[left] == s[right]){
					++left;
					--right;
				} else return (isvailed(s, left + 1, right) || isvailed(s, left, right - 1));
			}
			return true;
		}
		bool isvailed(string s, int left, int right){
			while(left < right){
				if(s[left] == s[right]){
					++left;
					--right;
				}else return false;
				return true;
			}
		}
};
```

![](https://cdn.jsdelivr.net/gh/liuyaanng/Blog_source@master/blog_images/img/20210325121718.png)

复杂度分析: 
- 时间复杂度: `O(n)` , 判断s与判断s的子字符都是 `O(n)`
- 空间复杂度:  `O(1)`, 常量空间


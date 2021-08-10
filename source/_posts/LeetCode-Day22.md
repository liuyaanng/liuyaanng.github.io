---
title: LeetCode_Day22
top: false
hidden: false
cover: false
toc: true
mathjax: true
date: 2021-03-27 17:07:49
updatedate: 2021-03-27 17:07:49
img:
password:
summary: 居合斩! 二分查找
tags:
- c++
- LeetCode
- 二分法
categories:
- 算法
---
## 二分查找

- 二分查找也常被称为二分法或者折半查找，每次查找时通过将待查找区间分成两部分并只取 一部分继续查找，将查找的复杂度大大减少。对于一个长度为 $O(n)$ 的数组，二分查找的时间复 杂度为 $O(log n)$ 
- 数学定义: 给定一个在 `[a, b]` 区间内的单调函数 $f(x)$ ，若
$f(a)$ 和 $f(b)$ 正负性相反，那么必定存在一个解 $c$ ，使得 $f(c) = 0$


## [69] x 的平方根

https://leetcode-cn.com/problems/sqrtx/description/

* algorithms
* Easy (39.23%)
* Likes:    632
* Dislikes: -
* Total Accepted:    280.6K
* Total Submissions: 715.3K
* Testcase Example:  '4'
* Source Code:       69.sqrtx.cpp

<p>实现&nbsp;<code>int sqrt(int x)</code>&nbsp;函数。</p>

<p>计算并返回&nbsp;<em>x</em>&nbsp;的平方根，其中&nbsp;<em>x </em>是非负整数。</p>

<p>由于返回类型是整数，结果只保留整数的部分，小数部分将被舍去。</p>

<p><strong>示例 1:</strong></p>

<pre><strong>输入:</strong> 4
<strong>输出:</strong> 2
</pre>

<p><strong>示例 2:</strong></p>

<pre><strong>输入:</strong> 8
<strong>输出:</strong> 2
<strong>说明:</strong> 8 的平方根是 2.82842...,
&nbsp;    由于返回类型是整数，小数部分将被舍去。
</pre>

### 方法1: 二分查找

思路: 设置两个指针, 代表区间 `[a, b]` 的首尾(注意这里双指针算法不太同, 双指针是一次移动一位, 这里一次移动半个区间) , 取中位数 `mid` 与 `x/mid` 进行计算对比, 若 `mid` 大, 则取 `mid` 左边区间继续计算, 反之则取右边区间

```cpp
class Solution {
public:
    int mySqrt(int x) {
			if(x==0) return x;

			int left=1, right=x, mid=0, sqrt=0;
			while(left <= right){
				mid = (right - left) / 2 + left;
				// cout << mid << endl;
				sqrt = x / mid;
				if(sqrt == mid){
					return mid;
				}else if(sqrt > mid){
					left = mid + 1;
				}else{
					right = mid - 1;
				}
			}
			return right;
    }
};
```

![](https://cdn.jsdelivr.net/gh/liuyaanng/Blog_source@master/blog_images/img/20210328171929.png)

复杂度分析: 
- 时间复杂度: `O(logn)`
- 空间复杂度: `O(1)`

### 方法2: 牛顿迭代法

也就比第一种方法快 **亿** 点点

#### 牛顿迭代 原理
待完善

迭代公式: $x_{n+1} = x_n - f(x_n) / f'(x_n)$    
求平方根, 等价于给定 $f(x) = x^2 - a = 0$, 代入上式, 可🉐️迭代公式: $x_{n+1} = (x_n + a / x_n) / 2$

```cpp
class Solution {
public:
    int mySqrt(int x) {
			long n = x;
			while( n * n > x ){
				n = (n + x / n) / 2;
			}
			return n;
    }
};
```

![](https://cdn.jsdelivr.net/gh/liuyaanng/Blog_source@master/blog_images/img/20210328172546.png)



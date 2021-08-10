---
title: LeetCode_Day11
top: false
hidden: false
cover: false
toc: true
mathjax: false
date: 2021-03-16 17:52:45
updatedate: 2021-03-16 17:52:45
img:
password:
summary: 605 -> 种花问题
tags:
- c++
- LeetCode
- 贪心算法
categories:
- 算法
---

## [605] 种花问题

https://leetcode-cn.com/problems/can-place-flowers/description/

* algorithms
* Easy (34.14%)
* Likes:    322
* Dislikes: -
* Total Accepted:    84.3K
* Total Submissions: 249.4K
* Testcase Example:  '[1,0,0,0,1]\n1'
* Source Code:       605.can-place-flowers.cpp

<p>假设有一个很长的花坛，一部分地块种植了花，另一部分却没有。可是，花不能种植在相邻的地块上，它们会争夺水源，两者都会死去。</p>

<p>给你一个整数数组  <code>flowerbed</code> 表示花坛，由若干 <code>0</code> 和 <code>1</code> 组成，其中 <code>0</code> 表示没种植花，<code>1</code> 表示种植了花。另有一个数 <code>n</code><strong> </strong>，能否在不打破种植规则的情况下种入 <code>n</code><strong> </strong>朵花？能则返回 <code>true</code> ，不能则返回 <code>false</code>。</p>

<p> </p>

<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>flowerbed = [1,0,0,0,1], n = 1
<strong>输出：</strong>true
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>flowerbed = [1,0,0,0,1], n = 2
<strong>输出：</strong>false
</pre>

<p> </p>

<p><strong>提示：</strong></p>

<ul>
	<li><code>1 <= flowerbed.length <= 2 * 10<sup>4</sup></code></li>
	<li><code>flowerbed[i]</code> 为 <code>0</code> 或 <code>1</code></li>
	<li><code>flowerbed</code> 中不存在相邻的两朵花</li>
	<li><code>0 <= n <= flowerbed.length</code></li>
</ul>

### 方法1: 跳格法

该方法仅需一次遍历, 可在不遍历完的情况下得出答案

思路如下:
- 遍历数组, 若 `index` 为1, 则往后跳两格
- 若 `index` 为0, 由于上一条操作可得, `index-1` 一定为0, 则需要判断 `index+1` 的值
	- 当 `index` 为最后一位, 可直接种花, 无需其他判断
	- `index+1` 为0, 则可以种花, 可以将 `index` 置为1, 后续按照第一条进行处理
	- `index+1` 为1, 不可种花, 向后跳三格

```cpp
class Solution {
public:
    bool canPlaceFlowers(vector<int>& flowerbed, int n) {
			if(n == 0){
				return true;
			}
			int size = flowerbed.size();
			for(int i=0; i<size;){
				if(flowerbed[i] == 1){
					i += 2;
				}else if(i == size - 1 || flowerbed[i+1] == 0){
					// 若在最后一个则直接可以种
					n--;
					if(n == 0){
						return n == 0;
					}
					i+=2;
				}else{
					i+=3;
				}
			}
			return n == 0;
    }
};
```

![](https://cdn.jsdelivr.net/gh/liuyaanng/Blog_source@master/blog_images/img/20210323180355.png)

复杂度分析: 
- 时间复杂度: `O(n)`, 仅需一次遍历
- 空间复杂度: `O(1)`

### 方法2:前后种花，瞬间秒杀

**如果存在连续的3个0, 则一定能种花**

若直接进行讨论, 需要进行复杂的边界问题讨论, 如

`[0, 0, 1, 0, 0, 1, 0, 0]` 虽然首尾都只有2个0, 但首尾是可以种花的
,所以需要对首尾进行讨论

其实不用这样, 可以直接在数组两端添加一个 `0` 来解决这个问题    
`[0, 0, 1, 0, 0, 1, 0, 0]` -> `[0, 0, 0, 1, 0, 0, 1, 0, 0, 0]` 

这样就可以统一讨论

```cpp
class Solution {
public:
    bool canPlaceFlowers(vector<int>& flowerbed, int n) {
			if(n == 0){
				return true;
			}
			flowerbed.insert(flowerbed.begin(), 0);
			flowerbed.insert(flowerbed.end(), 0);
			for(int i = 1; i < flowerbed.size() - 1; i++){
				if(flowerbed[i-1] == 0 && flowerbed[i] == 0 && flowerbed[i+1] == 0){
					n--;
					flowerbed[i] = 1;
					if(n == 0){
						return n == 0;
					}
				}
			}
			return n == 0;
    }
};
```

![](https://cdn.jsdelivr.net/gh/liuyaanng/Blog_source@master/blog_images/img/20210323183030.png)

复杂度分析: 
- 时间复杂度: `O(n)`, 仅需一次遍历
- 空间复杂度: `O(1)`


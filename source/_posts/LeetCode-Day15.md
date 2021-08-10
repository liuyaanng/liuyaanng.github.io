---
title: LeetCode_Day15
top: false
hidden: false
cover: false
toc: true
mathjax: false
date: 2021-03-20 13:33:51
updatedate: 2021-03-20 13:33:51
img:
password:
summary: 665 -> 非递减数列
tags:
- c++
- LeetCode
- 贪心算法
categories:
- 算法
---

### [665] 非递减数列

https://leetcode-cn.com/problems/non-decreasing-array/description/

* algorithms
* Easy (26.42%)
* Likes:    549
* Dislikes: -
* Total Accepted:    62.8K
* Total Submissions: 236.8K
* Testcase Example:  '[4,2,3]'

<p>给你一个长度为 <code>n</code> 的整数数组，请你判断在 <strong>最多 </strong>改变 <code>1</code> 个元素的情况下，该数组能否变成一个非递减数列。</p>

<p>我们是这样定义一个非递减数列的： 对于数组中任意的 <code>i</code> <code>(0 <= i <= n-2)</code>，总满足 <code>nums[i] <= nums[i + 1]</code>。</p>

<p> </p>

<p><strong>示例 1:</strong></p>

<pre>
<strong>输入:</strong> nums = [4,2,3]
<strong>输出:</strong> true
<strong>解释:</strong> 你可以通过把第一个4变成1来使得它成为一个非递减数列。
</pre>

<p><strong>示例 2:</strong></p>

<pre>
<strong>输入:</strong> nums = [4,2,1]
<strong>输出:</strong> false
<strong>解释:</strong> 你不能在只改变一个元素的情况下将其变为非递减数列。
</pre>

<p> </p>

<p><strong>提示：</strong></p>

<ul>
	<li><code>1 <= n <= 10 ^ 4</code></li>
	<li><code>- 10 ^ 5 <= nums[i] <= 10 ^ 5</code></li>
</ul>

### 方法1: 贪心算法

思路:     
当出现递减时, 如何选择放缩是问题的关键, 有两种修改方式:

- 扩大后者, 可能会造成后续不连增
- 缩小前者, 可能会导致前面不连增

所以要采取贪心的策略，在遍历时，每次需要看连续的三个元素，也就是瞻前顾后，遵循以下两个原则：
- 尽量不扩大后者的值, 因为这会使后面递增困难
- 若缩小前者, 则要保证缩小后依然满足递增

实现步骤:

- 遍历数组, 若 `i+1` 出现递减, 则判断 `i-1` 与 `i+1` 的大小关系, 前者大则只可执行放大后者操作, 后者大则放大 `i+1` 和缩小 `i` 皆可, 遵循贪心策略, 应缩小 `i`


```cpp
class Solution {
public:
	bool checkPossibility(vector<int>& nums) {
		int size = nums.size();
		bool flag = nums[0] <= nums[1] ? true : false;
		for(int i = 1; i < size - 1; ++i){
			if(nums[i] > nums[i+1]){
				if(flag){
					if(nums[i-1] > nums[i+1]){
						nums[i+1] = nums[i];
					}else{
						nums[i] = nums[i+1];
					}
					flag = false;
				}
				else{
					return false;
				}
			}
		}
		return true;
	}
};
```

![](https://cdn.jsdelivr.net/gh/liuyaanng/Blog_source@master/blog_images/img/20210324135254.png)

复杂度分析: 
- 时间复杂度: `O(n)`, 仅遍历一次数组
- 空间复杂度: `O(1)`


---
title: LeetCode_Day16
top: false
hidden: false
cover: false
toc: true
mathjax: false
date: 2021-03-21 17:06:59
updatedate: 2021-03-21 17:06:59
img:
password:
summary: 双指针 
tags:
- c++
- LeetCode
- 双指针
categories:
- 算法
---

## 双指针 

- 双指针主要用于遍历数组，两个指针指向不同的元素，从而协同完成任务。也可以延伸到多 个数组的多个指针。

- 若两个指针指向同一数组，遍历方向相同且不会相交，则也称为 **滑动窗口** (两个指针包围的 区域即为当前的窗口)，经常用于区间搜索。

- 若两个指针指向同一数组，但是遍历方向相反，则可以用来进行搜索，待搜索的数组往往是 排好序的。


## [167] 两数之和 II - 输入有序数组

https://leetcode-cn.com/problems/two-sum-ii-input-array-is-sorted/description/

* algorithms
* Easy (57.40%)
* Likes:    490
* Dislikes: -
* Total Accepted:    201.7K
* Total Submissions: 349.6K
* Testcase Example:  '[2,7,11,15]\n9'
* Source Code:       167.two-sum-ii-input-array-is-sorted.cpp

<p>给定一个已按照<strong><em> </em>升序排列  </strong>的整数数组 <code>numbers</code> ，请你从数组中找出两个数满足相加之和等于目标数 <code>target</code> 。</p>

<p>函数应该以长度为 <code>2</code> 的整数数组的形式返回这两个数的下标值<em>。</em><code>numbers</code> 的下标 <strong>从 1 开始计数</strong> ，所以答案数组应当满足 <code>1 <= answer[0] < answer[1] <= numbers.length</code> 。</p>

<p>你可以假设每个输入只对应唯一的答案，而且你不可以重复使用相同的元素。</p>


<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>numbers = [2,7,11,15], target = 9
<strong>输出：</strong>[1,2]
<strong>解释：</strong>2 与 7 之和等于目标数 9 。因此 index1 = 1, index2 = 2 。
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>numbers = [2,3,4], target = 6
<strong>输出：</strong>[1,3]
</pre>

<p><strong>示例 3：</strong></p>

<pre>
<strong>输入：</strong>numbers = [-1,0], target = -1
<strong>输出：</strong>[1,2]
</pre>

<p> </p>

<p><strong>提示：</strong></p>

<ul>
	<li><code>2 <= numbers.length <= 3 * 10<sup>4</sup></code></li>
	<li><code>-1000 <= numbers[i] <= 1000</code></li>
	<li><code>numbers</code> 按 <strong>递增顺序</strong> 排列</li>
	<li><code>-1000 <= target <= 1000</code></li>
	<li>仅存在一个有效答案</li>
</ul>

### 方法1: 双指针

这是一个简单的双指针应用, 通过在数组首尾设置左右指针, 将其和与 `target` 进行对比, 若 `sum > target` ,则将右指针左移, 若 `sum < target` , 则将左指针右移

```cpp
class Solution {
public:
    vector<int> twoSum(vector<int>& numbers, int target) {
			int left = 0, right = numbers.size() - 1, sum;
			while(left < right){
				sum = numbers[left] + numbers[right];
				if(target == sum) break;
				if(target > sum) left++;
				else right--;
			}
			return vector<int>{left+1, right+1};
    }
};
```

![](https://cdn.jsdelivr.net/gh/liuyaanng/Blog_source@master/blog_images/img/20210324171452.png)

复杂度分析: 
- 时间复杂度: `O(n)`, 双指针移动总数最多为 n
- 空间复杂度: `O(1)`

关于双指针为什么不会漏掉答案的详细解释:

[一张图告诉你 O(n) 的双指针解法的本质原理（C++/Java）](https://leetcode-cn.com/problems/two-sum-ii-input-array-is-sorted/solution/yi-zhang-tu-gao-su-ni-on-de-shuang-zhi-zhen-jie-fa/) 


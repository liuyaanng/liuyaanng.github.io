---
title: LeetCode_Day17
top: false
hidden: false
cover: false
toc: true
mathjax: false
date: 2021-03-22 17:44:52
updatedate: 2021-03-22 17:44:52
img:
password:
summary: 88 -> 合并两个有序数组
tags:
- c++
- LeetCode
- 双指针
categories:
- 算法
---

## [88] 合并两个有序数组

https://leetcode-cn.com/problems/merge-sorted-array/description/

* algorithms
* Easy (49.33%)
* Likes:    808
* Dislikes: -
* Total Accepted:    291.8K
* Total Submissions: 589.2K
* Testcase Example:  '[1,2,3,0,0,0]\n3\n[2,5,6]\n3'
* Source Code:       88.merge-sorted-array.cpp

<p>给你两个有序整数数组 <code>nums1</code><em> </em>和 <code>nums2</code>，请你将 <code>nums2</code><em> </em>合并到 <code>nums1</code><em> </em>中<em>，</em>使 <code>nums1</code><em> </em>成为一个有序数组。</p>

<p>初始化 <code>nums1</code> 和 <code>nums2</code> 的元素数量分别为 <code>m</code> 和 <code>n</code><em> </em>。你可以假设 <code>nums1</code><em> </em>的空间大小等于 <code>m + n</code>，这样它就有足够的空间保存来自 <code>nums2</code> 的元素。</p>

<p> </p>

<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>nums1 = [1,2,3,0,0,0], m = 3, nums2 = [2,5,6], n = 3
<strong>输出：</strong>[1,2,2,3,5,6]
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>nums1 = [1], m = 1, nums2 = [], n = 0
<strong>输出：</strong>[1]
</pre>

<p> </p>

<p><strong>提示：</strong></p>

<ul>
	<li><code>nums1.length == m + n</code></li>
	<li><code>nums2.length == n</code></li>
	<li><code>0 <= m, n <= 200</code></li>
	<li><code>1 <= m + n <= 200</code></li>
	<li><code>-10<sup>9</sup> <= nums1[i], nums2[i] <= 10<sup>9</sup></code></li>
</ul>

### 方法1: 优美的双指针! 

由于两个数组是有序的, 所以可以分别在两个数组末尾设置指针, 比较他们的值, 较大的直接写入 `nums1` 数组的末尾, 为了写入, 还需设置一个 `pos` 指针来记录位置

![](https://cdn.jsdelivr.net/gh/liuyaanng/Blog_source@master/blog_images/img/20210324175252.png)

当 `nums1` 完成重写, 那么可直接将 `nums2` 中的数写入 `nums1` 即可; 若 `nums2` 先完成, 因为 `nums1` 中本就有序, 则完成重排

```cpp
class Solution {
public:
    void merge(vector<int>& nums1, int m, vector<int>& nums2, int n) {
			int pos = (m--) + (n--) -1;
			while(m>=0 && n>=0){
				nums1[pos--] = nums1[m] > nums2[n] ? nums1[m--] : nums2[n--]; 
			}
			while(n>=0){
				nums1[pos--] = nums2[n--];
			}
    }
};
```

![](https://cdn.jsdelivr.net/gh/liuyaanng/Blog_source@master/blog_images/img/20210324180346.png)

复杂度分析: 
- 时间复杂度: `O(m+n)` ,  最多移动 `m+n` 次
- 空间复杂度: `O(1)` , 直接在 `nums1` 上操作, 无需额外空间

注意: 这里用到了 `a++, ++a` 的一些小技巧. 
- `a++` , 将a加1, 返回值为 `a`
- `++a` , 将a加1, 返回值为 `a+1`
- 若只希望增加a的值, 不需要返回值, 则推荐 `++a` , 运行速度快

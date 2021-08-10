---
title: LeetCode_Day26
top: false
hidden: false
cover: false
toc: true
mathjax: false
date: 2021-04-12 21:59:38
updatedate: 2021-04-12 21:59:38
img:
password:
summary: 215 -> 数组中的第K个最大元素
tags:
- c++
- LeetCode
categories:
- 算法
---

### [215] 数组中的第K个最大元素

https://leetcode-cn.com/problems/kth-largest-element-in-an-array/description/

* algorithms
* Medium (64.59%)
* Likes:    992
* Dislikes: -
* Total Accepted:    298.5K
* Total Submissions: 462.1K
* Testcase Example:  '[3,2,1,5,6,4]\n2'

<p>在未排序的数组中找到第 <strong>k</strong> 个最大的元素。请注意，你需要找的是数组排序后的第 k 个最大的元素，而不是第 k 个不同的元素。</p>

<p><strong>示例 1:</strong></p>

<pre><strong>输入:</strong> <code>[3,2,1,5,6,4] 和</code> k = 2
<strong>输出:</strong> 5
</pre>

<p><strong>示例&nbsp;2:</strong></p>

<pre><strong>输入:</strong> <code>[3,2,3,1,2,4,5,5,6] 和</code> k = 4
<strong>输出:</strong> 4</pre>

<p><strong>说明: </strong></p>

<p>你可以假设 k 总是有效的，且 1 &le; k &le; 数组的长度。</p>

### 方法1: 快速查找算法

第K问题, 可以使用快速查找算法

#### 1. 我的算法

```
class Solution {
public:
	int quick_select(vector<int> & nums, int left, int right){
		int pivotkey = rand() % (right - left) + left; //随机选择
		swap(nums[pivotkey], nums[left]);
		int pivot = nums[left];
		while(left < right){
			while(left < right && nums[right] <= pivot) --right;
			nums[left] = nums[right];
			while(left < right && nums[left] >= pivot) ++left;
			nums[right] = nums[left];
		}
		nums[left] = pivot;
		return left;
	}
		int findKthLargest(vector<int>& nums, int k) {
			int left = 0, right = nums.size() - 1, mid = 0, target = k - 1; // target 指第k大的数的索引
			while(left < right){
				mid = quick_select(nums, left, right);
				if(mid == target){
					return nums[mid];
				} else if (mid < target){
					left = mid + 1;
				} else {
					right = mid - 1;
				}
			}
			return nums[left];
		}
};
```

经测试, 随机选取 `pivotkey` 会极大的提高效率

- 随机选择前: 

	![](https://cdn.jsdelivr.net/gh/liuyaanng/Blog_source@master/blog_images/img/20210412220406.png)

- 随机选择后: 

	![](https://cdn.jsdelivr.net/gh/liuyaanng/Blog_source@master/blog_images/img/20210412220509.png)

复杂度分析: 
- 时间复杂度: `O(n)` , 由于随机选择 `pivotkey` , 故不会出现 $O(n^2)$ 的最坏情况
- 空间复杂度:  `O(1)`


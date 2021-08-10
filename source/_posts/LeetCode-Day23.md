---
title: LeetCode_Day23
top: false
hidden: false
cover: false
toc: true
mathjax: false
date: 2021-03-28 18:10:21
updatedate: 2021-03-28 18:10:21
img:
password:
summary: 34 -> 在排序数组中查找元素的第一个和最后一个位置 81 -> 搜索旋转排序数组 II
tags:
- c++
- LeetCode
- 二分法
categories:
- 算法
---

## [34] 在排序数组中查找元素的第一个和最后一个位置

https://leetcode-cn.com/problems/find-first-and-last-position-of-element-in-sorted-array/description/

* algorithms
* Medium (42.33%)
* Likes:    917
* Dislikes: -
* Total Accepted:    227.9K
* Total Submissions: 538.3K
* Testcase Example:  '[5,7,7,8,8,10]\n8'
* Source Code:       34.find-first-and-last-position-of-element-in-sorted-array.cpp

<p>给定一个按照升序排列的整数数组 <code>nums</code>，和一个目标值 <code>target</code>。找出给定目标值在数组中的开始位置和结束位置。</p>

<p>如果数组中不存在目标值 <code>target</code>，返回 <code>[-1, -1]</code>。</p>

<p><strong>进阶：</strong></p>

<ul>
	<li>你可以设计并实现时间复杂度为 <code>O(log n)</code> 的算法解决此问题吗？</li>
</ul>

<p> </p>

<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>nums = [<code>5,7,7,8,8,10]</code>, target = 8
<strong>输出：</strong>[3,4]</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>nums = [<code>5,7,7,8,8,10]</code>, target = 6
<strong>输出：</strong>[-1,-1]</pre>

<p><strong>示例 3：</strong></p>

<pre>
<strong>输入：</strong>nums = [], target = 0
<strong>输出：</strong>[-1,-1]</pre>

<p> </p>

<p><strong>提示：</strong></p>

<ul>
	<li><code>0 <= nums.length <= 10<sup>5</sup></code></li>
	<li><code>-10<sup>9</sup> <= nums[i] <= 10<sup>9</sup></code></li>
	<li><code>nums</code> 是一个非递减数组</li>
	<li><code>-10<sup>9</sup> <= target <= 10<sup>9</sup></code></li>
</ul>

### 方法1: 二分法查找

思路: 通过二分法查找到 `nums` 数组中是否存在等于 `target` 元素. 若存在, 向前查找可推出第一次出现的位置, 向后查找可推出最后一次出现的位置

```cpp
class Solution {
public:
    vector<int> searchRange(vector<int>& nums, int target) {
			if(nums.empty()) return vector<int> {-1, -1};
			int l = 0, r = nums.size() - 1, mid;
			int first_pos = -1, last_pos = -1;
			bool is_exist = false;
			while(l <= r){
				mid = l + (r - l) / 2;
				if(target == nums[mid]){
					first_pos = last_pos = mid;
					is_exist = true;
					break;
				} else if(target > nums[mid]){
					l = mid + 1;
				} else{
					r = mid - 1;
				}
			}

			if(is_exist){
				while(first_pos >= 1 && nums[first_pos - 1] == nums[first_pos]) --first_pos; 
				while(last_pos < nums.size() - 1 && nums[last_pos + 1] == nums[last_pos]) ++last_pos;
			}
			return vector<int> {first_pos, last_pos};

    }
};
```

![](https://cdn.jsdelivr.net/gh/liuyaanng/Blog_source@master/blog_images/img/20210328182500.png)

复杂度分析: 
- 时间复杂度: `O(logn)`
- 空间复杂度: `O(1)`

### 方法2: 构建c++中 `lower_bound` 和 `upper_bound` 函数

此方法原理仍是二分法, 仅做练习

```cpp
class Solution {
public:
    vector<int> searchRange(vector<int>& nums, int target) {
			if(nums.empty()) return vector<int> {-1, -1};
			int lower = lower_bound(nums, target);
			int upper = upper_bound(nums, target) - 1; // 左闭右开

			if(lower == nums.size() || nums[lower] != target) return vector<int> {-1, -1};

			return vector <int> {lower, upper};

    }
		int lower_bound(vector<int>& nums, int target){
			int l = 0, r = nums.size(), mid;

			while(l < r){
				mid = l + (r - l) / 2;
				if(nums[mid] >= target){
					r = mid;
				} else{
					l = mid + 1;
				}
			}
			return l;
		}
		int upper_bound(vector<int>& nums, int target){
			int l = 0, r = nums.size(), mid;
			while(l < r){
				mid = l + (r - l) / 2;
				if(nums[mid] > target){
					r = mid;
				} else{
					l = mid + 1;
				}
			}
			return l;
		}
};
```

![](https://cdn.jsdelivr.net/gh/liuyaanng/Blog_source@master/blog_images/img/20210328184732.png)

复杂度分析: 
- 时间复杂度: `O(logn)`
- 空间复杂度: `O(1)`

## [81] 搜索旋转排序数组 II

https://leetcode-cn.com/problems/search-in-rotated-sorted-array-ii/description/

* algorithms
* Medium (37.28%)
* Likes:    308
* Dislikes: -
* Total Accepted:    59.6K
* Total Submissions: 159.7K
* Testcase Example:  '[2,5,6,0,0,1,2]\n0'
* Source Code:       81.search-in-rotated-sorted-array-ii.cpp

<p>假设按照升序排序的数组在预先未知的某个点上进行了旋转。</p>

<p>( 例如，数组&nbsp;<code>[0,0,1,2,2,5,6]</code>&nbsp;可能变为&nbsp;<code>[2,5,6,0,0,1,2]</code>&nbsp;)。</p>

<p>编写一个函数来判断给定的目标值是否存在于数组中。若存在返回&nbsp;<code>true</code>，否则返回&nbsp;<code>false</code>。</p>

<p><strong>示例&nbsp;1:</strong></p>

<pre><strong>输入:</strong> nums = [2<code>,5,6,0,0,1,2]</code>, target = 0
<strong>输出:</strong> true
</pre>

<p><strong>示例&nbsp;2:</strong></p>

<pre><strong>输入:</strong> nums = [2<code>,5,6,0,0,1,2]</code>, target = 3
<strong>输出:</strong> false</pre>

<p><strong>进阶:</strong></p>

<ul>
	<li>这是 <a href="https://leetcode-cn.com/problems/search-in-rotated-sorted-array/description/">搜索旋转排序数组</a>&nbsp;的延伸题目，本题中的&nbsp;<code>nums</code>&nbsp; 可能包含重复元素。</li>
	<li>这会影响到程序的时间复杂度吗？会有怎样的影响，为什么？</li>
</ul>

### 方法1: 二分查找

思路: 虽然数组经过旋转, 但这不会影响二分查找在有序数组中使用, 只需先判断是否有序, 再进行二分查找即可

步骤: 
- 仅对出现的情况作说明
- 注意我使用的二分查找范围为 **左闭右闭**
- 若 `nums[left] == nums[mid]` , 由于有重复元素的存在, 此时无法判断 `mid` 左右的有序性, 如: 

	```
	[1, 1, 1, 2, 1] mid = 3
	```

	此时只需将 `left` 往右移一位, 根据下一位的情况再来判断

- 若 `nums[left]` 与 `nums[mid]` 不等, 如果 `nums[mid] <= nums[right]`, 则 `mid` 右侧一定是单调递增的, 这时根据 `target` 的值再进行二分查找即可
- 若以上条件都不满足, 则左侧单调递增

```cpp
class Solution {
public:
    bool search(vector<int>& nums, int target) {
			int left = 0, right = nums.size() - 1;
			while(left <= right){
				int mid = left + right >> 1;
				if(nums[mid] == target) return true;
				if(nums[left] == nums[mid])
				{
					++left;
				}else if(nums[mid] <= nums[right])
				{
					if(target > nums[mid] && target <= nums[right]){
						left = mid + 1;
					} else {
						right = mid - 1;
					}
				} else {
					if(target < nums[mid] && target >= nums[left]){
						right = mid - 1;
					} else {
						left = mid + 1;
					}
				}
			}
			return false;
    }
};
```

![](https://cdn.jsdelivr.net/gh/liuyaanng/Blog_source@master/blog_images/img/20210328223315.png)

复杂度分析: 
- 时间复杂度: `O(logn)`
- 空间复杂度:	`O(1)`




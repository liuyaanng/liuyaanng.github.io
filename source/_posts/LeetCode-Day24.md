---
title: LeetCode_Day24
top: false
hidden: false
cover: false
toc: true
mathjax: false
date: 2021-03-29 20:59:28
updatedate: 2021-03-29 20:59:28
img:
password:
summary: 540 -> 有序数组中的单一元素
tags:
- c++
- LeetCode
- 二分法
categories:
- 算法
---

## [540] 有序数组中的单一元素

https://leetcode-cn.com/problems/single-element-in-a-sorted-array/description/

* algorithms
* Medium (58.50%)
* Likes:    214
* Dislikes: -
* Total Accepted:    26.1K
* Total Submissions: 44.7K
* Testcase Example:  '[1,1,2,3,3,4,4,8,8]'

<p>给定一个只包含整数的有序数组，每个元素都会出现两次，唯有一个数只会出现一次，找出这个数。</p>

<p><strong>示例 1:</strong></p>

<pre>
<strong>输入:</strong> [1,1,2,3,3,4,4,8,8]
<strong>输出:</strong> 2
</pre>

<p><strong>示例 2:</strong></p>

<pre>
<strong>输入:</strong> [3,3,7,7,10,11,11]
<strong>输出:</strong> 10
</pre>

<p><strong>注意:</strong> 您的方案应该在 O(log n)时间复杂度和 O(1)空间复杂度中运行。</p>

### 方法1: 暴力搜索

思路: 遍历数组, 比较第 `nums[i]` 与 `nums[i+1]`, 相等则往后跳两格继续比较

```cpp
class Solution {
public:
    int singleNonDuplicate(vector<int>& nums) {
			int i = 0;
			while(i<nums.size() - 1){
				if(nums[i] == nums[i+1]){
					i+=2;
				}else{
					return nums[i];
				}
			}
			return nums[i];
    }
};
```
![](https://cdn.jsdelivr.net/gh/liuyaanng/Blog_source@master/blog_images/img/20210330210930.png)

复杂度分析: 
- 时间复杂度: `O(n)`
- 空间复杂度: `O(1)`

### 方法2: 二分查找

思路: 在出现单一元素之前, 数字是重复出现的, 若此时在中间去掉一组数, 其左右两侧仍然是偶数, 在出现单一元素后, 若在中间去掉一组数, 那么必然一侧偶数, 一侧单数, 分开讨论即可

步骤: 关于 `mid` 的情况, 总共有三种
- 首先判断一侧是否为偶数: `are_even = (right - mid) % 2 == 0`
- `nums[mid] == nums[mid+1]` 如果 `are_even` 为真, 则证明去掉 `mid` 和 `mid+1` 项, 右侧共有奇数项, 则左侧一定为偶数项, 此时将		`left` 移到 `mid+2` 位置继续探索; 反之将 `right` 移到 `mid-1`

| 1 | 1 | 2 | 2 | 3   | 3     | 4 | ··· | 8 | 8 |
|---|---|---|---|-----|-------|---|-----|---|---|
|   |   |   |   | mid | mid+1 |   |     |   |   |

- `nums[mid] == nums[mid-1]` 如果	`are_even` 为真, 则证明去掉 `mid` 和 `mid-1` 项, 右侧为共有偶数项, 则左侧一定为奇数项, 单一元素在左侧, 此时将 `right` 移到 `mid-2` 位置继续探索; 反之将 `lfet` 移到 `mid+2` 

| 1 | 1 | 2 | 2 | 3     | 3   | 4 | ··· | 8 | 8 |
|---|---|---|---|-------|-----|---|-----|---|---|
|   |   |   |   | mid-1 | mid |   |     |   |   |

- 若以上条件都不满足, 则 `mid` 所在位置即为单一元素


| 1 | 1 | 2 | 2     | 3   | 4     | 4 | ··· | 8 | 8 |
|---|---|---|-------|-----|-------|---|-----|---|---|
|   |   |   | mid-1 | mid | mid+1 |   |     |   |   |

```cpp
class Solution {
public:
    int singleNonDuplicate(vector<int>& nums) {
			int left=0, right = nums.size() -1, mid;
			while(left < right){
				mid = left + right >> 1;
				bool are_even = (right - mid) % 2 == 0; 
				if(nums[mid] == nums[mid + 1]){

					if(are_even){
						left = mid + 2;
					} else {
						right = mid - 1;
					}
				}else if(nums[mid] == nums[mid - 1]){
					if(are_even){
						right = right - 2;
					} else{
						left = left + 1;
					}
				}else{
					return nums[mid];
				}
			}

			return nums[right];
    }
};
```

![](https://cdn.jsdelivr.net/gh/liuyaanng/Blog_source@master/blog_images/img/20210330221349.png)

复杂度分析: 
- 时间复杂度: `O(logn)`
- 空间复杂度: `O(1)`


---
title: LeetCode_Day10
top: false
hidden: false
cover: false
toc: true
mathjax: false
date: 2021-03-15 16:43:02
updatedate: 2021-03-15 16:43:02
img:
password:
summary: 435 -> 无重叠区间
tags:
- c++
- LeetCode
- 贪心算法
categories:
- 贪心算法
---

## [435] 无重叠区间

https://leetcode-cn.com/problems/non-overlapping-intervals/description/

* algorithms
* Medium (49.21%)
* Likes:    378
* Dislikes: -
* Total Accepted:    61.4K
* Total Submissions: 124.8K
* Testcase Example:  '[[1,2]]'
* Source Code:       435.non-overlapping-intervals.cpp

<p>给定一个区间的集合，找到需要移除区间的最小数量，使剩余区间互不重叠。</p>

<p><strong>注意:</strong></p>

<ol>
	<li>可以认为区间的终点总是大于它的起点。</li>
	<li>区间 [1,2] 和 [2,3] 的边界相互&ldquo;接触&rdquo;，但没有相互重叠。</li>
</ol>

<p><strong>示例 1:</strong></p>

<pre>
<strong>输入:</strong> [ [1,2], [2,3], [3,4], [1,3] ]

<strong>输出:</strong> 1

<strong>解释:</strong> 移除 [1,3] 后，剩下的区间没有重叠。
</pre>

<p><strong>示例 2:</strong></p>

<pre>
<strong>输入:</strong> [ [1,2], [1,2], [1,2] ]

<strong>输出:</strong> 2

<strong>解释:</strong> 你需要移除两个 [1,2] 来使剩下的区间没有重叠。
</pre>

<p><strong>示例 3:</strong></p>

<pre>
<strong>输入:</strong> [ [1,2], [2,3] ]

<strong>输出:</strong> 0

<strong>解释:</strong> 你不需要移除任何区间，因为它们已经是无重叠的了。
</pre>

### 方法1: 贪心算法

要选择保留区间, 区间的结尾十分重要. 相同的起始空间, 选择的区间结尾越小, 余留给其他区间的空间就越大, 则可保留更多的空间. 首先确定最左侧区间, 再选择与之不相交的区间中右区间最小的区间, 将该区间当作余下空间的最左侧空间, 重复此操作即可. 所以贪心策略为: 优先保留 **结尾小** 且 **不相交** 的区间. 

- 首先按照右区间增序排序(使用Lambda)
- 每次选择结尾小且和前一区间不相交的区间

注意: 
- 排序后最左侧出现 `[[1, 4], [2, 4], [3, 4]...]` 该如何选择?

	任选一个即可, 我选择的是第一项, 后面与其相交的会被舍去

```cpp
class Solution {
public:
    int eraseOverlapIntervals(vector<vector<int>>& intervals) {
			if(intervals.empty()){
				return 0;
			}
			int size = intervals.size();
			sort(intervals.begin(), intervals.end(), [](vector<int>& a, vector<int>& b){
					return a[1] < b[1];
					});
			int total = 0, prev = intervals[0][1];
			for(int i = 1; i < size; ++i){
				if(intervals[i][0] < prev){
					++total;
				}
				else{
					prev = intervals[i][1];
				}
			}
			return total;
    }
};
```

![](https://cdn.jsdelivr.net/gh/liuyaanng/Blog_source@master/blog_images/img/20210323170045.png)

复杂度分析: 
- 时间复杂度: `O(nlogn)`, 需要 `O(nlogn)` 进行排序, 再需要 `O(n)` 进行遍历
- 空间复杂度: `O(logn)`, 排序所需要的栈空间

### 方法2: 动态规划

待完成


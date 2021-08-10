---
title: LeetCode_每日一题3
top: false
hidden: false
cover: false
toc: true
mathjax: false
date: 2021-03-30 12:46:07
updatedate: 2021-03-30 12:46:07
img:
password:
summary: 74 -> 搜索二维矩阵
tags:
- c++
- LeetCode
- 每日一题
categories:
- 算法
---
## [74] 搜索二维矩阵

https://leetcode-cn.com/problems/search-a-2d-matrix/description/

* algorithms
* Medium (41.11%)
* Likes:    372
* Dislikes: -
* Total Accepted:    104.3K
* Total Submissions: 243.2K
* Testcase Example:  '[[1,3,5,7],[10,11,16,20],[23,30,34,60]]\n3'

<p>编写一个高效的算法来判断 <code>m x n</code> 矩阵中，是否存在一个目标值。该矩阵具有如下特性：</p>

<ul>
	<li>每行中的整数从左到右按升序排列。</li>
	<li>每行的第一个整数大于前一行的最后一个整数。</li>
</ul>

<p> </p>

<p><strong>示例 1：</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2020/10/05/mat.jpg" style="width: 322px; height: 242px;" />
<pre>
<strong>输入：</strong>matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 3
<strong>输出：</strong>true
</pre>

<p><strong>示例 2：</strong></p>
<img alt="" src="https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2020/11/25/mat2.jpg" style="width: 322px; height: 242px;" />
<pre>
<strong>输入：</strong>matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 13
<strong>输出：</strong>false
</pre>

<p> </p>

<p><strong>提示：</strong></p>

<ul>
	<li><code>m == matrix.length</code></li>
	<li><code>n == matrix[i].length</code></li>
	<li><code>1 <= m, n <= 100</code></li>
	<li><code>-10<sup>4</sup> <= matrix[i][j], target <= 10<sup>4</sup></code></li>
</ul>

### 方法1: 两次二分查找

思路: 看到有序, 直接二分整起来, 两次二分, 第一次查找是否存在满足条件的行, 第二次查找是否存在 `target`

```cpp
class Solution {
public:
    bool searchMatrix(vector<vector<int>>& matrix, int target) {
			if(matrix.empty()) return false;
			int left = 0, right = matrix.size() - 1, mid, i; 
			while(left <= right){
				mid = right + left >> 1;
				if(matrix[mid][0] == target){
					return true;
				} else if(matrix[mid][matrix[mid].size() - 1] < target){
					left = mid + 1;
				}else{
					right = mid - 1;
				}
			}
			i = left;
			if(i >= matrix.size()) return false;
			left = 0;
			right = matrix[i].size() - 1;
			while(left <= right){
				mid = left + right >> 1;
				if(matrix[i][mid] == target){
					return true;
				}else if(matrix[i][mid] < target){
					left = mid + 1;
				}else{
					right = mid - 1;
				}
			}

			return false;
    }
};
```

![](https://cdn.jsdelivr.net/gh/liuyaanng/Blog_source@master/blog_images/img/20210330124735.png)

复杂度分析: 
- 时间复杂度: `O(logm + logn = logmn)`, m是行数, n是列数
- 空间复杂度: `O(1)`

### 方法2: 一次二分

思路: 将矩阵看作是一个有序数组, 一次二分即可

```cpp
class Solution {
public:
    bool searchMatrix(vector<vector<int>>& matrix, int target) {
			if(matrix.empty()) return false;
			int m = matrix.size(), n = matrix[0].size();
			int left = 0, right = m * n - 1, mid;

			while(left <= right){
				mid = right + left >> 1;
				int x = matrix[mid / n][mid % n];
				if(x == target){
					return true;
				}else if(x < target){
					left = mid + 1;
				}else{
					right = mid - 1;
				}
			}
			return false;
    }
};
```

![](https://cdn.jsdelivr.net/gh/liuyaanng/Blog_source@master/blog_images/img/20210330131450.png)

复杂度分析: 
- 时间复杂度: `O(logmn)`
- 空间复杂度: `O(1)`


---
title: LeetCode_Day9
top: false
hidden: false
cover: false
toc: true
mathjax: false
date: 2021-03-14 12:09:37
updatedate: 2021-03-14 12:09:37
img:
password:
summary: 贪心算法
tags:
- c++
- LeetCode
- 贪心算法
categories:
- 算法
---
### 贪心算法: 
- 采用贪心的策略, 保证每次操作都是局部最优的, 从而使最后得到的结果是全局最优的
- 全局结果是局部结果的简单求和, 且局部结果互不相干, 因此局部最优策略也是全局最优策略


### [135] 分发糖果

https://leetcode-cn.com/problems/candy/description/

* algorithms
* Hard (48.16%)
* Likes:    508
* Dislikes: -
* Total Accepted:    68.3K
* Total Submissions: 141.8K
* Testcase Example:  '[1,0,2]'
* Source Code:       135.candy.cpp

<p>老师想给孩子们分发糖果，有 <em>N</em> 个孩子站成了一条直线，老师会根据每个孩子的表现，预先给他们评分。</p>

<p>你需要按照以下要求，帮助老师给这些孩子分发糖果：</p>

<ul>
	<li>每个孩子至少分配到 1 个糖果。</li>
	<li>评分更高的孩子必须比他两侧的邻位孩子获得更多的糖果。</li>
</ul>

<p>那么这样下来，老师至少需要准备多少颗糖果呢？</p>

<p> </p>

<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>[1,0,2]
<strong>输出：</strong>5
<strong>解释：</strong>你可以分别给这三个孩子分发 2、1、2 颗糖果。
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>[1,2,2]
<strong>输出：</strong>4
<strong>解释：</strong>你可以分别给这三个孩子分发 1、2、1 颗糖果。
     第三个孩子只得到 1 颗糖果，这已满足上述两个条件。</pre>

### 思路: 
- 将所有孩子的糖果数量置为1
- 从左至右遍历评分数组, 如果左侧评分小于右侧, 则将  **右侧糖果数量改为左侧糖果数量+1** 
- 从右往左遍历评分数组, 如果左侧评分大于右侧, 则 **选择左侧评分与右侧评分+1的最大值**

	| 1 | 2 | 3   | 1 | 1 |
	|---|---|-----|---|---|
	|   |   | j-1 | j |   |

	若出现以上情况, 直接对 `j-1` 项 +1 或等于  `j` 项+1, 会造成错误

```cpp
class Solution {
public:
    int candy(vector<int>& ratings) {
		int size = ratings.size();
		if(size < 2){
			return size;
		}
		vector<int> num(size, 1);
		for(int i = 0; i < size - 1; ++i){
			if(ratings[i] < ratings[i+1]){
				num[i+1] = num[i] + 1;
			}
		}
		for(int j = size - 1; j > 0; --j){
			if(ratings[j] < ratings[j-1]){
				num[j-1] = max(num[j-1], num[j] + 1);
			}
		}
		return accumulate(num.begin(), num.end(), 0);
    }
};
```

![](https://cdn.jsdelivr.net/gh/liuyaanng/Blog_source@master/blog_images/img/20210323125046.png)

复杂度分析: 
- 时间复杂度: `O(n)` , 只需遍历两次
- 空间复杂度: `O(n)`



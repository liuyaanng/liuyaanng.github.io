---
title: LeetCode_Day14
top: false
hidden: false
cover: false
toc: true
mathjax: false
date: 2021-03-19 10:38:40
updatedate: 2021-03-19 10:38:40
img:
password:
summary: 122 -> 买卖股票的最佳时机 II
tags:
- c++
- LeetCode
- 贪心算法
categories:
- 算法
---

### [122] 买卖股票的最佳时机 II

https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock-ii/description/

* algorithms
* Easy (66.44%)
* Likes:    1153
* Dislikes: -
* Total Accepted:    326.7K
* Total Submissions: 487.3K
* Testcase Example:  '[7,1,5,3,6,4]'
* Source Code:       122.best-time-to-buy-and-sell-stock-ii.cpp

<p>给定一个数组，它的第&nbsp;<em>i</em> 个元素是一支给定股票第 <em>i</em> 天的价格。</p>

<p>设计一个算法来计算你所能获取的最大利润。你可以尽可能地完成更多的交易（多次买卖一支股票）。</p>

<p><strong>注意：</strong>你不能同时参与多笔交易（你必须在再次购买前出售掉之前的股票）。</p>

<p>&nbsp;</p>

<p><strong>示例 1:</strong></p>

<pre><strong>输入:</strong> [7,1,5,3,6,4]
<strong>输出:</strong> 7
<strong>解释:</strong> 在第 2 天（股票价格 = 1）的时候买入，在第 3 天（股票价格 = 5）的时候卖出, 这笔交易所能获得利润 = 5-1 = 4 。
&nbsp;    随后，在第 4 天（股票价格 = 3）的时候买入，在第 5 天（股票价格 = 6）的时候卖出, 这笔交易所能获得利润 = 6-3 = 3 。
</pre>

<p><strong>示例 2:</strong></p>

<pre><strong>输入:</strong> [1,2,3,4,5]
<strong>输出:</strong> 4
<strong>解释:</strong> 在第 1 天（股票价格 = 1）的时候买入，在第 5 天 （股票价格 = 5）的时候卖出, 这笔交易所能获得利润 = 5-1 = 4 。
&nbsp;    注意你不能在第 1 天和第 2 天接连购买股票，之后再将它们卖出。
&nbsp;    因为这样属于同时参与了多笔交易，你必须在再次购买前出售掉之前的股票。
</pre>

<p><strong>示例&nbsp;3:</strong></p>

<pre><strong>输入:</strong> [7,6,4,3,1]
<strong>输出:</strong> 0
<strong>解释:</strong> 在这种情况下, 没有交易完成, 所以最大利润为 0。</pre>

<p>&nbsp;</p>

<p><strong>提示：</strong></p>

<ul>
	<li><code>1 &lt;= prices.length &lt;= 3 * 10 ^ 4</code></li>
	<li><code>0 &lt;= prices[i]&nbsp;&lt;= 10 ^ 4</code></li>
</ul>

### 方法1: 贪心算法

由于同一天可以进行多次买卖, 那么如果把所有的上坡全部买下, 那么获得的利益一定最大

注意: 此种方法仅可获得最大利润, 并非真实的买卖情况

```cpp
class Solution {
public:
    int maxProfit(vector<int>& prices) {
			int res = 0;
			int size = prices.size();
			for(int i = 1; i < size; ++i){
				if(prices[i] > prices[i-1]){
					res += prices[i] - prices[i-1];
				}
			}
			return res;
    }
};
```

![](https://cdn.jsdelivr.net/gh/liuyaanng/Blog_source@master/blog_images/img/20210324104701.png)


官方解法:

```cpp
class Solution {
public:
    int maxProfit(vector<int>& prices) {
			int res = 0;
			int size = prices.size();
			for(int i = 1; i < size; ++i){
					res += max(0, prices[i] - prices[i-1]);
			}
			return res;
    }
};
```

![](https://cdn.jsdelivr.net/gh/liuyaanng/Blog_source@master/blog_images/img/20210324104833.png)

复杂度分析: 
- 时间复杂度: `O(n)`, 仅需一次遍历
- 空间复杂度: `O(1)`, 常数空间

### 方法2: 动态规划

待完善

---
title: LeetCode_Day12
top: false
hidden: false
cover: false
toc: true
mathjax: false
date: 2021-03-17 20:54:29
updatedate: 2021-03-17 20:54:29
img:
password:
summary: 452 -> 用最少数量的箭引爆气球
tags:
- c++
- LeetCode
- 贪心算法
categories:
- 算法
---

### [452] 用最少数量的箭引爆气球

https://leetcode-cn.com/problems/minimum-number-of-arrows-to-burst-balloons/description/

* algorithms
* Medium (50.95%)
* Likes:    366
* Dislikes: -
* Total Accepted:    67.6K
* Total Submissions: 133.8K
* Testcase Example:  '[[10,16],[2,8],[1,6],[7,12]]'

<p>在二维空间中有许多球形的气球。对于每个气球，提供的输入是水平方向上，气球直径的开始和结束坐标。由于它是水平的，所以纵坐标并不重要，因此只要知道开始和结束的横坐标就足够了。开始坐标总是小于结束坐标。</p>

<p>一支弓箭可以沿着 x 轴从不同点完全垂直地射出。在坐标 x 处射出一支箭，若有一个气球的直径的开始和结束坐标为 <code>x</code><sub><code>start</code>，</sub><code>x</code><sub><code>end</code>，</sub> 且满足  <code>x<sub>start</sub> ≤ x ≤ x</code><sub><code>end</code>，</sub>则该气球会被引爆<sub>。</sub>可以射出的弓箭的数量没有限制。 弓箭一旦被射出之后，可以无限地前进。我们想找到使得所有气球全部被引爆，所需的弓箭的最小数量。</p>

<p>给你一个数组 <code>points</code> ，其中 <code>points [i] = [x<sub>start</sub>,x<sub>end</sub>]</code> ，返回引爆所有气球所必须射出的最小弓箭数。</p>


<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>points = [[10,16],[2,8],[1,6],[7,12]]
<strong>输出：</strong>2
<strong>解释：</strong>对于该样例，x = 6 可以射爆 [2,8],[1,6] 两个气球，以及 x = 11 射爆另外两个气球</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>points = [[1,2],[3,4],[5,6],[7,8]]
<strong>输出：</strong>4
</pre>

<p><strong>示例 3：</strong></p>

<pre>
<strong>输入：</strong>points = [[1,2],[2,3],[3,4],[4,5]]
<strong>输出：</strong>2
</pre>

<p><strong>示例 4：</strong></p>

<pre>
<strong>输入：</strong>points = [[1,2]]
<strong>输出：</strong>1
</pre>

<p><strong>示例 5：</strong></p>

<pre>
<strong>输入：</strong>points = [[2,3],[2,3]]
<strong>输出：</strong>1
</pre>

<p> </p>

<p><strong>提示：</strong></p>

<ul>
	<li><code>0 <= points.length <= 10<sup>4</sup></code></li>
	<li><code>points[i].length == 2</code></li>
	<li><code>-2<sup>31</sup> <= x<sub>start</sub> < x<sub>end</sub> <= 2<sup>31</sup> - 1</code></li>
</ul>

### 方法1: 排序 + 贪心算法

![](https://cdn.jsdelivr.net/gh/liuyaanng/Blog_source@master/blog_images/img/20210323210413.png)

该箭可一直向右移动, 直至蓝色气球右边界, 因此箭能移动的前提是 **保证原本被引爆的气球仍会被引爆** , 所以 **一定存在一种最优（射出的箭数最小）的方法，使得每一支箭的射出位置都恰好对应着某一个气球的右边界。** , 而这只箭的位置, 一定在 **蓝色气球右边界** , 这是局部最优解, 去除掉已经射爆的气球, 重复此方法, 则可找到最优解. 

思路:    
- 将数组按右侧区间升序排列
- 将最左侧气球设置为标志气球, 取其右侧位置 `y[i]` 与后面的气球的左侧位置 `x[j]` 做对比, 若 `y[i] >= x[j]` , 则气球可被射爆; 若出现 `y[i] < x[j]` 表示当前箭射不到该气球, 则将该气球设置为标志气球, 进行下一轮比较即可

```cpp
class Solution {
public:
    int findMinArrowShots(vector<vector<int>>& points) {
			if(points.empty()){
				return 0;
			}
			sort(points.begin(), points.end(), [](vector<int>& a, vector<int>& b){
					return a[1] < b[1];
					});
			vector<int> point = points[0];
			int count = 1;
			for(int i=1; i < points.size(); ++i){
				if(point[1] < points[i][0]){
					point = points[i];
					count++;
				}
			}
			return count;
    }
};
```

![](https://cdn.jsdelivr.net/gh/liuyaanng/Blog_source@master/blog_images/img/20210323212043.png)

复杂度分析: 
- 时间复杂度: `O(nlogn)`, 排序为 `O(nlogn)` , 再进行一次遍历 `O(n)`
- 空间复杂度: `O(logn)`, 排序所使用的栈空间


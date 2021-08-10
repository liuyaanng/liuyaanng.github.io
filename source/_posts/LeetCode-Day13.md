---
title: LeetCode_Day13
top: false
hidden: false
cover: false
toc: true
mathjax: false
date: 2021-03-18 09:21:47
updatedate: 2021-03-18 09:21:47
img:
password:
summary: 763 -> 划分字母区间
tags:
- c++
- LeetCode
- 贪心算法
categories:
- 算法
---

### [763] 划分字母区间

https://leetcode-cn.com/problems/partition-labels/description/

* algorithms
* Medium (76.57%)
* Likes:    467
* Dislikes: -
* Total Accepted:    60.1K
* Total Submissions: 78.6K
* Testcase Example:  '"ababcbacadefegdehijhklij"'
* Source Code:       763.partition-labels.cpp

<p>字符串 <code>S</code> 由小写字母组成。我们要把这个字符串划分为尽可能多的片段，同一字母最多出现在一个片段中。返回一个表示每个字符串片段的长度的列表。</p>

<p> </p>

<p><strong>示例：</strong></p>

<pre>
<strong>输入：</strong>S = "ababcbacadefegdehijhklij"
<strong>输出：</strong>[9,7,8]
<strong>解释：</strong>
划分结果为 "ababcbaca", "defegde", "hijhklij"。
每个字母最多出现在一个片段中。
像 "ababcbacadefegde", "hijhklij" 的划分是错误的，因为划分的片段数较少。
</pre>

<p> </p>

<p><strong>提示：</strong></p>

<ul>
	<li><code>S</code>的长度在<code>[1, 500]</code>之间。</li>
	<li><code>S</code>只包含小写字母 <code>'a'</code> 到 <code>'z'</code> 。</li>
</ul>

### 方法1: 贪心算法

- 遍历数组, 得到每个字母最后出现的位置, 记录在 hashtable 中
- 再次遍历数组, 设置两个标志 `start = end = 0` , 分别代表一个当前片段的起始位置和当前字母最后出现的位置. 在遍历的过程中, 更新 `end = max(end, end_x)` , 其中 `end_x` 为hashtable中记录的字母位置(即最后出现的位置)
- 如果当前字母的位置等于 `end`, 那么将此片段长度 **`(end - start + 1)`** 添加到返回结果中, 同时更新start的值到下一个片段 `start = end + 1`

上述做法使用贪心的思想寻找每个片段可能的最小结束下标，因此可以保证每个片段的长度一定是符合要求的最短长度，如果取更短的片段，则一定会出现同一个字母出现在多个片段中的情况。由于每次取的片段都是符合要求的最短的片段，因此得到的片段数也是最多的。

```cpp
class Solution {
public:
    vector<int> partitionLabels(string S) {
			int last_position_array[26];
			for(int i=0;i<S.size();++i){
				last_position_array[S[i] - 'a'] = i;
			}
			int start =0, end = 0;
			vector<int> res;
			for(int i=0; i<S.size(); ++i){
				end = max(end, last_position_array[S[i] - 'a']);
				if(i == end){
					res.push_back(end - start + 1);
					start = end + 1;
				}
			}
			return res;
    }
};
```

![](https://cdn.jsdelivr.net/gh/liuyaanng/Blog_source@master/blog_images/img/20210324092412.png)

复杂度分析: 
- 时间复杂度: `O(n)` , 只需遍历两次数组
- 空间复杂度: `O()`


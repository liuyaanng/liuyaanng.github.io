---
title: LeetCode_Day1
top: false
hidden: false
cover: false
toc: true
mathjax: true
date: 2021-03-06 15:11:48
updatedate: 2021-03-06 22:11:48
img:
password:
summary: 1->Two Sum
tags:
- LeetCode
- c++
categories:
- 算法
---

[1] Two Sum  

https://leetcode.com/problems/two-sum/description/

* algorithms
* Easy (46.37%)
* Likes:    19171
* Dislikes: 682
* Total Accepted:    3.8M
* Total Submissions: 8.3M
* Testcase Example:  '[2,7,11,15]\n9'

<p>Given an array of integers <code>nums</code>&nbsp;and an integer <code>target</code>, return <em>indices of the two numbers such that they add up to <code>target</code></em>.</p>

<p>You may assume that each input would have <strong><em>exactly</em> one solution</strong>, and you may not use the <em>same</em> element twice.</p>

<p>You can return the answer in any order.</p>

<p>&nbsp;</p>
<p><strong>Example 1:</strong></p>

<pre>
<strong>Input:</strong> nums = [2,7,11,15], target = 9
<strong>Output:</strong> [0,1]
<strong>Output:</strong> Because nums[0] + nums[1] == 9, we return [0, 1].
</pre>

<p><strong>Example 2:</strong></p>

<pre>
<strong>Input:</strong> nums = [3,2,4], target = 6
<strong>Output:</strong> [1,2]
</pre>

<p><strong>Example 3:</strong></p>

<pre>
<strong>Input:</strong> nums = [3,3], target = 6
<strong>Output:</strong> [0,1]
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>2 &lt;= nums.length &lt;= 10<sup>3</sup></code></li>
	<li><code>-10<sup>9</sup> &lt;= nums[i] &lt;= 10<sup>9</sup></code></li>
	<li><code>-10<sup>9</sup> &lt;= target &lt;= 10<sup>9</sup></code></li>
	<li><strong>Only one valid answer exists.</strong></li>
</ul>

**Approach 1:** Brute Force

Loop through each element `x`  and find if there is another value that equals to `target - x` 

```c++
class Solution {
public:
		vector<int> twoSum(vector<int>& nums, int target) {
			vector<int> answer;
			int i, j;
			for(i = 0; i< nums.size() - 1; i++){
				for(j = i + 1; j < nums.size(); j++){
					int diff = target - nums[j];
					if(nums[i] == diff){
						answer.push_back(i);
						answer.push_back(j);
					}
				}
			}
			return answer;
    }
};
```
![](https://cdn.jsdelivr.net/gh/liuyaanng/Blog_source@master/blog_images/img/20210211230613.png)

**Complexity Analysis** 
- Time Complexity: $O(n^2)$
- Space Complexity: $O(1)$

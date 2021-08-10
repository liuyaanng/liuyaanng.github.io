---
title: LeetCode_Day19
top: false
hidden: false
cover: false
toc: true
mathjax: false
date: 2021-03-24 23:15:51
updatedate: 2021-03-24 23:15:51
img:
password:
summary: 76 -> 最小覆盖子串
tags:
- c++
- LeetCode
- 双指针
categories:
- 算法
---

### [76] 最小覆盖子串

https://leetcode-cn.com/problems/minimum-window-substring/description/

* algorithms
* Hard (40.57%)
* Likes:    1042
* Dislikes: -
* Total Accepted:    120.1K
* Total Submissions: 293.1K
* Testcase Example:  '"ADOBECODEBANC"\n"ABC"'

<p>给你一个字符串 <code>s</code> 、一个字符串 <code>t</code> 。返回 <code>s</code> 中涵盖 <code>t</code> 所有字符的最小子串。如果 <code>s</code> 中不存在涵盖 <code>t</code> 所有字符的子串，则返回空字符串 <code>""</code> 。</p>

<p><strong>注意：</strong>如果 <code>s</code> 中存在这样的子串，我们保证它是唯一的答案。</p>

<p> </p>

<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>s = "ADOBECODEBANC", t = "ABC"
<strong>输出：</strong>"BANC"
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>s = "a", t = "a"
<strong>输出：</strong>"a"
</pre>

<p> </p>

<p><strong>提示：</strong></p>

<ul>
	<li><code>1 <= s.length, t.length <= 10<sup>5</sup></code></li>
	<li><code>s</code> 和 <code>t</code> 由英文字母组成</li>
</ul>

<p> </p>
<strong>进阶：</strong>你能设计一个在 <code>o(n)</code> 时间内解决此问题的算法吗？

### 方法1: 双指针(滑动窗口)

![](https://cdn.jsdelivr.net/gh/liuyaanng/Blog_source@master/blog_images/img/76_fig.gif)

思路:
- 通过设置左右两个指针(left<=right), 在两指针之间形成一个窗口, 每次仅仅移动一侧的指针.
- 当前窗口未包含t中所需的所有字符串, 则右侧指针右移, 左侧指针不动, 直至满足条件; 
- 此时右侧指针保持不动, 左侧指针移动来获得能满足条件的最小滑动窗口

知道原理后, 需要解决的问题如下:

- 如何判断滑动窗口中是否包含t中全部字符
	1. 设置 `flag` 数组用来记录t中出现的字母
	2. 设置 `chars` 数组用来记录t中字母出现的次数, 也可当作滑动窗口中还需要相应字母的个数.  **(当个数为负值则代表该字母有多余)**
	3. 设置 `count` 变量来表示滑动窗口已包含t中字母的个数, 当 `count == t.size()` 时表示当前窗口已包含t中所有字母, 这也是滑动窗口左侧下标右移的条件
	4. `flag` , `chars` 也可用 `hashtable`
	5. 因为字母 `z` 对应的ASCII码是 `123` , 所以将数组长度设为123即可, 不过将其设置为2的整数幂128更好
	
- 如何设置滑动窗口的移动

	1. 具体设置见代码注释
	2. 注意: 这里设置的滑动窗口的区间为 `[left, right)` , 左闭右开, 所以区间长度为 `right - left + 1`

```cpp
class Solution {
public:
    string minWindow(string s, string t) {
			// chars 存储t中对应字母出现的次数
			// flag 记录t中出现的字母
			vector<int> chars(128, 0);
			vector<bool> flag(128, false);
			for(int i=0; i<t.size(); ++i){
				flag[t[i]] = true;
				++chars[t[i]];
			}
			int count=0, left=0, min_left = 0, min_size = s.size() + 1;
			// count 代表滑动窗口中已包含t中字符的个数
			// min_left用于记录最小滑动窗口的左侧下标
			// min_size 用于记录最小滑动窗口大小
			for(int right=0; right<s.size(); ++right ){
				if(flag[s[right]]){
					if(--chars[s[right]]>=0){
						++count;
					}
					while(count==t.size()){
						// 更新最小滑动窗口
						if(right - left + 1 < min_size){
							min_left = left;
							min_size = right -left + 1;
						}
						// 若左边待滑动元素是t中元素,并且若滑动, 当前滑动窗口不再包含t中所有字符
						// 待滑动
						if(flag[s[left]] && ++chars[s[left]] > 0){
							--count;
						}
						// 执行滑动 
						//左侧向右滑动
						++left;
					}
				}
			}
			return min_size > s.size() ? "" : s.substr(min_left, min_size);
    }
};
```

![](https://cdn.jsdelivr.net/gh/liuyaanng/Blog_source@master/blog_images/img/20210324234551.png)

复杂度分析: 
- 时间复杂度: `O(n)` , 注意这里虽然 `for` 循环里面有一个 `while` ,但 `while` 循环只负责 `left` 指针的移动, 且 `left` 指针只会从左向右移动1次, 故总的时间复杂度还是 `O(n)`
- 空间复杂度:  `O(1)`




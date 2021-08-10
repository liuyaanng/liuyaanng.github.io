---
title: LeetCode_Day21
top: false
hidden: false
cover: false
toc: true
mathjax: false
date: 2021-03-26 19:33:01
updatedate: 2021-03-26 19:33:01
img:
password:
summary: 524 -> 通过删除字母匹配到字典里最长单词 340 ->  至多包含 K 个不同字符的最长子串
tags:
- c++
- LeetCode
- 双指针
categories:
- 算法
---

## [524] 通过删除字母匹配到字典里最长单词

https://leetcode-cn.com/problems/longest-word-in-dictionary-through-deleting/description/

* algorithms
* Medium (47.15%)
* Likes:    136
* Dislikes: -
* Total Accepted:    28.6K
* Total Submissions: 60.7K
* Testcase Example:  '"abpcplea"\n["ale","apple","monkey","plea"]'

<p>给定一个字符串和一个字符串字典，找到字典里面最长的字符串，该字符串可以通过删除给定字符串的某些字符来得到。如果答案不止一个，返回长度最长且字典顺序最小的字符串。如果答案不存在，则返回空字符串。</p>

<p><strong>示例 1:</strong></p>

<pre>
<strong>输入:</strong>
s = &quot;abpcplea&quot;, d = [&quot;ale&quot;,&quot;apple&quot;,&quot;monkey&quot;,&quot;plea&quot;]

<strong>输出:</strong>
&quot;apple&quot;
</pre>

<p><strong>示例&nbsp;2:</strong></p>

<pre>
<strong>输入:</strong>
s = &quot;abpcplea&quot;, d = [&quot;a&quot;,&quot;b&quot;,&quot;c&quot;]

<strong>输出:</strong>
&quot;a&quot;
</pre>

<p><strong>说明:</strong></p>

<ol>
	<li>所有输入的字符串只包含小写字母。</li>
	<li>字典的大小不会超过 1000。</li>
	<li>所有输入的字符串长度不会超过 1000。</li>
</ol>

### 方法1: 双指针 + hashtable
这道题看着不复杂, 实际上真的不复杂!    

思路:   用双指针可以轻松对比出来符合条件的子串, 再将子串的长度存入hashtable中, 再按照要求返回长度最长, 字典序最小的子串即可. 

步骤: 

- 遍历字典 `dictionary` , 分别在字符串s和字典 `dictionary` 中字符串设置指针, 若当前指针下两字母相同, 则两指针分别向后移动一位, 继续进行对比, 若出现不同, 则仅将s中的指针后移一位, 继续进行对比. 
- 仅当s中指针在最后一位之前(包含最后一位), 且d中指针超过字符串长度时, 改字符串是满足条件的子串, 将子串长度记录在 `hashtable` 中
- 遍历完字典, 遍历 `hashtable` , 得到子串最长的字符串, 若长度相同, 则取字典序最小的一个. 

**注意字典序的概念, 我就是把他当成在字典中的顺序, 结果错都不知道咋错的**

- 字典序: 字典序（dictionary order），又称 字母序（alphabetical order），原意是表示英文单词在字典中的先后顺序，在计算机领域中扩展成两个任意字符串的大小关系。    
- 对于两个字符串，大小关系取决于两个字符串从左到右第一个不同字符的 ASCII 值的大小关系。若第一字母相同, 这往后移一位再进行比较
- c++中, 使用例如 `'a' < 'b'` 就可进行比较

```cpp
class Solution {
public:
    string findLongestWord(string s, vector<string>& dictionary) {
			int s_size = s.size(), d_size = dictionary.size();
			int s_index = 0, index = 0, longest_index = 0;
			bool isexit = false;
			vector<int> word_count(d_size, 0);


			for(int d_index = 0; d_index < d_size; ++d_index){
				string d_word = dictionary[d_index];
				while(index < d_word.size() && s_index < s_size){
					if(s[s_index] == d_word[index]){
						++s_index;
						++index;
					}else{
						++s_index;
					}
				}
				if(s_index <= s_size && index >= d_word.size()){
					word_count[d_index] = dictionary[d_index].size();
					isexit = true;
				}
				s_index = 0;
				index = 0;
			}
			for(int i=0; i<word_count.size();++i){
				if(word_count[longest_index] < word_count[i] || (word_count[longest_index] == word_count[i] && dictionary[longest_index] > dictionary[i])){
						longest_index = i;
				}
			}
			return isexit ? dictionary[longest_index] : "";
    }
};
```

![](https://cdn.jsdelivr.net/gh/liuyaanng/Blog_source@master/blog_images/img/20210326195612.png)

复杂度分析: 
- 时间复杂度: `O(n*s+nx)` , n 代表字典中子串个数, x代表子串平均长度, s代表字符串s长度
- 空间复杂度: `O(n)` , 需要额外hashtable

## [340] 至多包含 K 个不同字符的最长子串

https://leetcode-cn.com/problems/longest-substring-with-at-most-k-distinct-characters/

<p>给定一个字符串 s ，找出 至多 包含 k 个不同字符的最长子串 T。</p>

<p><strong>示例 1:</strong></p>

<pre>
<strong>输入:</strong>
s = "eceba", k = 2
<strong>输出:</strong>
3
<strong>解释:</strong>
 则 T 为 "ece"，所以长度为 3。
</pre>
<p><strong>示例 2:</strong></p>

<pre>
<strong>输入:</strong>
s = "aa", k = 1
<strong>输出:</strong>
2
<strong>解释:</strong>
 则 T 为 "aa"，所以长度为 2。
</pre>


### 方法1: 双指针(滑动窗口) + hashtable

思路: 使用双指针设置一个窗口, 保证窗口内的字符串满足题意即可

步骤: 

- 创建 `hashtable` 来存储字母出现的次数, `hashtable` 的长度为k, 创建 `count` 变量来统计窗口中不同字母的个数, 用于跟 `k` 做对比
- 设置 `left` 和 `right` 指针, 遍历字符串, 如果 `hashtable` 中没有该字母, 则将其加入 `hashtable`, 如果存在, 则次数 +1.
- 每次加入新字母时, `count` 要 +1.
- 如果 `count > k` 时, 要将滑动窗口最左侧的字母删掉, 即将 `left` 指针右移一位, 在移动指针之前, 要先判断如果将该字母移除, `hashtable` 中还是否存在该字母
- 若存在,	可直接执行 `left` 指针右移, 若不存在, 则将 `count` -1, 表示可以接受新字母
- 遍历过程中, 取滑动窗口的最大值, 即 `right - left + 1` 的最大值

```cpp
class Solution {
public:
    int lengthOfLongestSubstringKDistinct(string s, int k) {
        map<char, int> window;
        int left=0, count=0, res=0;
        for(int right=0;right<s.size(); ++right){
            if(window.count(s[right]) == 0) count += 1;
            window[s[right]] += 1;
            while(count > k){
                if(--window[s[left]] == 0){
                    window.erase(s[left]);
                    --count;
                }
                ++left;
            }
            res = max(res, right - left + 1);
        }
        return  res;
    }
};
```

![](https://cdn.jsdelivr.net/gh/liuyaanng/Blog_source@master/blog_images/img/20210326233359.png)

复杂度分析: 
- 时间复杂度: `O(n)`, 仅需遍历一次
- 空间复杂度: `O(k)`, hashtable




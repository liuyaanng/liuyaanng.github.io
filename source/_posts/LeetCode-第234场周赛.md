---
title: LeetCode_第234场周赛
top: false
hidden: false
cover: false
toc: true
mathjax: false
date: 2021-03-28 21:36:05
updatedate: 2021-03-28 21:36:05
img:
password:
summary: 第234场周赛
tags:
categories:
---

### 5713. 字符串中不同整数的数目

[https://leetcode-cn.com/problems/number-of-different-integers-in-a-string/](https://leetcode-cn.com/problems/number-of-different-integers-in-a-string/) 

思路: 双指针问题, 匹配数字, 保持字符串, 去除多余的0, 存入hash表, hash表的大小即为不同整数的数目

```cpp
class Solution {
public:
    int numDifferentIntegers(string word) {
        unordered_set <string> nums;
        for(int i = 0; i < word.size(); ++i){
            if(!isdigit(word[i])) continue;
            string s;
            int j = i;
            while(j < word.size() && isdigit(word[j])) s += word[j++];
            int k = 0;
            while(k<s.size() && s[k] == '0') ++k;
            nums.insert(s.substr(k));
            i = j;
        }
        return nums.size();
    }
};
```

![](https://cdn.jsdelivr.net/gh/liuyaanng/Blog_source@master/blog_images/img/20210328213952.png)



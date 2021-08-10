---
title: LeetCode_Day5
top: false
hidden: false
cover: false
toc: true
mathjax: false
date: 2021-03-10 11:39:08
updatedate: 2021-03-10 11:39:08
img:
password:
summary: 剑指 Offer 05. 替换空格
tags:
- 剑指Offer
- c++
categories:
- 算法
---

## 剑指 Offer 05. 替换空格

[https://leetcode-cn.com/problems/ti-huan-kong-ge-lcof/](https://leetcode-cn.com/problems/ti-huan-kong-ge-lcof/) 

请实现一个函数，把字符串 s 中的每个空格替换成"%20"。

示例 1：

```bash
输入：s = "We are happy."
输出："We%20are%20happy."
```

限制：

`0 <= s 的长度 <= 10000`

### 方法1:

设置一个新的数组, 将结果存到新数组上.

```cpp
class Solution {
public:
    string replaceSpace(string s) {
        string res;
        for(auto &e: s){
            if(e == ' '){
                res += "%20";
            }
            else{
                res += e;
            }
        }
        return res;
    }
};
```

![](https://cdn.jsdelivr.net/gh/liuyaanng/Blog_source@master/blog_images/img/20210311114319.png)

复杂度分析: 
- 时间复杂度: `O(n)`
- 空间复杂度: 'O(n)', 需要额外数组来存储


### 方法2: 

不创建新数组, 原地扩充

c++可以通过 `array.resize()` 来重置数组长度, 利用这一点, 则无需新建数组

- 首先遍历原始数组, 统计空格数
- 重置数组长度,  新长度为原始长度 + 2 * 空格数
- 倒序遍历数组, 遇到空格替换, 否则不变, 直接移到相应位置

```cpp
class Solution {
public:
    string replaceSpace(string s) {
        int count = 0, len = s.size();
        for(auto &e: s){
            if(e == ' '){
                count++;
            }
        }
        s.resize(len + 2 * count);
        for(int i = len - 1, j = s.size() - 1; i < j; i--,j--){
            if(s[i] == ' '){
                s[j-2] = '%';
                s[j-1] = '2';
                s[j] = '0';
                j -= 2;
            }
            else{
                s[j] = s[i];
            }   
        }  
        return s;   
    }
};
```

![](https://cdn.jsdelivr.net/gh/liuyaanng/Blog_source@master/blog_images/img/20210311120222.png)

复杂度分析: 
- 时间复杂度:  `O(n)`  两次遍历数组
- 空间复杂度:  `O(1)` 无额外空间


---
title: LeetCode_Day2
top: false
hidden: false
cover: false
toc: true
mathjax: true
date: 2021-03-07 21:46:47
updatedate: 2021-03-07 21:46:47
img:
password:
summary: 461->汉明距离 
tags:
- LeetCode
- c++
categories:
- 算法
---

## [461] 汉明距离

https://leetcode-cn.com/problems/hamming-distance/description/

* algorithms
* Easy (78.70%)
* Likes:    379
* Dislikes: -
* Total Accepted:    97.6K
* Total Submissions: 123.7K
* Testcase Example:  '1\n4'
* Source Code:       461.hamming-distance.cpp

<p>两个整数之间的<a href="https://baike.baidu.com/item/%E6%B1%89%E6%98%8E%E8%B7%9D%E7%A6%BB">汉明距离</a>指的是这两个数字对应二进制位不同的位置的数目。</p>

<p>给出两个整数 <code>x</code> 和 <code>y</code>，计算它们之间的汉明距离。</p>

<p><strong>注意：</strong><br />
0 &le; <code>x</code>, <code>y</code> &lt; 2<sup>31</sup>.</p>

<p><strong>示例:</strong></p>

<pre>
<strong>输入:</strong> x = 1, y = 4

<strong>输出:</strong> 2

<strong>解释:</strong>
1   (0 0 0 1)
4   (0 1 0 0)
       &uarr;   &uarr;

上面的箭头指出了对应二进制位不同的位置。
</pre>

方法1:

计算x与y的XOR值, 值与1进行 `&` 操作, 结果为1则x与y在此位值不同, 汉明距离+1, 再进行移位操作, 逐位计算即可.

![](https://cdn.jsdelivr.net/gh/liuyaanng/Blog_source@master/blog_images/img/20210307215223.png)

```cpp
class Solution {
public:
    int hammingDistance(int x, int y) {
			int z = x ^ y;
			int distance = 0;
			while(z){
				distance += z & 1;
				z = z >> 1;
			}
			return distance;


    }
};
```

![](https://cdn.jsdelivr.net/gh/liuyaanng/Blog_source@master/blog_images/img/20210307230112.png)

复杂度分析: 
- 时间复杂度: O(1), 整数长度固定, 最高32位 
- 空间复杂度: O(1), 恒定空间

方法2: 布赖恩·克尼根算法

逐位移动，逐位比较边缘位置是否为 1。利用布莱恩·克尼根算法, 遇到最右边的 1 后，如果可以跳过中间的 0，直接跳到下一个 1，效率会高很多. 

当 `num & (num - 1)` 运算时, 最右边等于1的一位会被抹除

![](https://cdn.jsdelivr.net/gh/liuyaanng/Blog_source@master/blog_images/img/20210307225134.png)
```cpp
class Solution {
public:
    int hammingDistance(int x, int y) {
			int z = x xor y;
			int distance = 0;
			while(z){
				distance += 1;
				z = z & (z - 1);
			}
			return distance;
    }
};
```

![](https://cdn.jsdelivr.net/gh/liuyaanng/Blog_source@master/blog_images/img/20210307230254.png)

复杂度分析: 
- 时间复杂度: `O(1)`, 实际进行了更少的迭代
- 空间复杂度:  `O(1)`, 恒定空间


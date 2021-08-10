---
title: LeetCode_Day3
top: false
hidden: false
cover: false
toc: true
mathjax: false
date: 2021-03-08 22:22:53
updatedate: 2021-03-08 22:22:53
img:
password:
summary: 338->比特位计数
tags:
- LeetCode
- c++
categories:
- 算法
---

## [338] 比特位计数

https://leetcode-cn.com/problems/counting-bits/description/

* algorithms
* Medium (76.57%)
* Likes:    664
* Dislikes: -
* Total Accepted:    115.6K
* Total Submissions: 146.3K
* Testcase Example:  '2'
* Source Code:       338.counting-bits.cpp

<p>给定一个非负整数&nbsp;<strong>num</strong>。对于&nbsp;<strong>0 &le; i &le; num </strong>范围中的每个数字&nbsp;<strong>i&nbsp;</strong>，计算其二进制数中的 1 的数目并将它们作为数组返回。</p>

<p><strong>示例 1:</strong></p>

<pre><strong>输入: </strong>2
<strong>输出: </strong>[0,1,1]</pre>

<p><strong>示例&nbsp;2:</strong></p>

<pre><strong>输入: </strong>5
<strong>输出: </strong><code>[0,1,1,2,1,2]</code></pre>

<p><strong>进阶:</strong></p>

<ul>
	<li>给出时间复杂度为<strong>O(n*sizeof(integer))</strong>的解答非常容易。但你可以在线性时间<strong>O(n)</strong>内用一趟扫描做到吗？</li>
	<li>要求算法的空间复杂度为<strong>O(n)</strong>。</li>
	<li>你能进一步完善解法吗？要求在C++或任何其他语言中不使用任何内置函数（如 C++ 中的&nbsp;<strong>__builtin_popcount</strong>）来执行此操作。</li>
</ul>

方法1: 

从0到num直接计算1的个数, 计算方法用到了上面的 布赖恩·克尼根算法

```cpp
class Solution {
public:
	int count_ones(int x){
		int count = 0;
		while(x > 0){
			x &= (x - 1);
			count++;
		}
		return count;
	}
    vector<int> countBits(int num) {
			vector<int> result(num + 1);
			for(int x=0; x <= num; x++){
				result[x] = count_ones(x);
			}
			return result;
    }
};
```

![](https://cdn.jsdelivr.net/gh/liuyaanng/Blog_source@master/blog_images/img/20210307234957.png)

复杂度分析: 
- 时间复杂度: `O(k*num)` , k 为int整型长度(32), 
- 空间复杂度: `O(1)` , 除了返回的数组以外，空间复杂度为常数。

方法2: 动态规划 最高有效位

对于整数x, 存在一个最大整数y, 且y是2的整数幂, 令 `z=y-x`, 用 `bits[x]` 来表示x的'一比特数', 则 `bit[x] = bit[z] + 1 `, 这里加的 `1` 是最高位的1.

| x     | 1 | 0 | 1 | 1 |
|-------|---|---|---|---|
| y     | 1 | 0 | 0 | 0 |
| z=x-y | 0 | 0 | 1 | 1 |

**正整数 `y` 是 `2` 的整数次幂，当且仅当 `y&(y-1)=0 `**

```cpp
class Solution {
public:
    vector<int> countBits(int num) {
			vector<int> result(num + 1);
			int highbit = 0;
			for(int x=1; x <= num; x++){
				if((x & (x - 1)) == 0){
					highbit = x;
				}
				result[x] = result[x - highbit] + 1;
			}
			return result;
    }
};
```

![](https://cdn.jsdelivr.net/gh/liuyaanng/Blog_source@master/blog_images/img/20210308113259.png)

复杂度分析: 
- 时间复杂度: `O(num)` , 只需要 `O(1)` 的时间计算
- 空间复杂度:  `O(1)`, 为常数

方法3: 动态规划 最低有效位

将x右移一位可得到 $\dfrac{x}{2}$ 的值,

| x   | 1 | 0 | 1 | 1 |
|-----|---|---|---|---|
| x/2 | 0 | 1 | 0 | 1 |

 反向考虑:

$$
bit[x] = bit[\dfrac{x}{2}] + bit[x]最低位
$$

据此, 合并奇偶情况:

$$
bit[x] = bit[\dfrac{x}{2}] + (x \& 1)
$$

```cpp
class Solution {
public:
    vector<int> countBits(int num) {
			vector<int> result(num + 1);
			int highbit = 0;
			for(int x=1; x <= num; x++){
				result[x] = result[x>>1] + (x & 1);
			}
			return result;
    }
};
```

![](https://cdn.jsdelivr.net/gh/liuyaanng/Blog_source@master/blog_images/img/20210308115024.png)

方法4: 动态规划 最低设置位

定义正整数 `x` 的「最低设置位」为 `x` 的二进制表示中的最低的 `1` 所在位。

| 1 | 0 | 1 | 0 |
|---|---|---|---|

 最低设置位是 `2`

 令 `y=x&(x-1)` , 则y是去除最低设置位后的数, 则 `bits[x]=bits[y]+1`

 | x       | 1 | 0 | 1 | 0 |
 |---------|---|---|---|---|
 | x-1     | 1 | 0 | 0 | 1 |
 | x&(x-1) | 1 | 0 | 0 | 0 |

```cpp
class Solution {
public:
    vector<int> countBits(int num) {
			vector<int> result(num + 1);
			int highbit = 0;
			for(int x=1; x <= num; x++){
				result[x] = result[x&(x-1)] +1;
			}
			return result;
    }
};
```

![](https://cdn.jsdelivr.net/gh/liuyaanng/Blog_source@master/blog_images/img/20210308120402.png)


---
title: LeetCode_每日一题2
top: false
hidden: false
cover: false
toc: true
mathjax: false
date: 2021-03-27 15:31:37
updatedate: 2021-03-27 15:31:37
img:
password:
summary: 61 -> 旋转链表
tags:
- c++
- LeetCode
- 每日一题
categories:
- 算法
---

## [61] 旋转链表

https://leetcode-cn.com/problems/rotate-list/description/

* algorithms
* Medium (40.61%)
* Likes:    496
* Dislikes: -
* Total Accepted:    139.3K
* Total Submissions: 337K
* Testcase Example:  '[1,2,3,4,5]\n2'
* Source Code:       61.rotate-list.cpp

<p>给你一个链表的头节点 <code>head</code> ，旋转链表，将链表每个节点向右移动 <code>k</code><em> </em>个位置。</p>

<p> </p>

<p><strong>示例 1：</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2020/11/13/rotate1.jpg" style="width: 600px; height: 254px;" />
<pre>
<strong>输入：</strong>head = [1,2,3,4,5], k = 2
<strong>输出：</strong>[4,5,1,2,3]
</pre>

<p><strong>示例 2：</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2020/11/13/roate2.jpg" style="width: 472px; height: 542px;" />
<pre>
<strong>输入：</strong>head = [0,1,2], k = 4
<strong>输出：</strong>[2,0,1]
</pre>

<p> </p>

<p><strong>提示：</strong></p>

<ul>
	<li>链表中节点的数目在范围 <code>[0, 500]</code> 内</li>
	<li><code>-100 <= Node.val <= 100</code></li>
	<li><code>0 <= k <= 2 * 10<sup>9</sup></code></li>
</ul>

### 方法1: 快慢指针, 首尾相连

思路: 旋转链表, 使节点移动, 可以将原链表转化为循环链表, 找到符合题意的头节点的位置即可

步骤: 
- 设置两指针 `fast` 和 `slow` , `fast` 指针用于探索链表尾部, 构建循环链表, `slow` 指针用于确定头节点的位置
- 遍历链表, 记录链表长度(`count`),  找到链表尾部, 将尾部指向 `head` , 构建循环链表
- 移动 `slow` 指针, 题目要求将节点向右移动 `k` 个位置, 等价于将头指针向左移动 `count - k` 个位置, 为了避免 `k > count` 时多余的移动, 所以应向左移动 `count - k % count` 个位置

#### 小Tips
- 遇到链表不要吝啬变量的使用, 比如本题, 使用双指针比使用单指针要快上不少

	- 单指针
	![](https://cdn.jsdelivr.net/gh/liuyaanng/Blog_source@master/blog_images/img/20210327154953.png)
	
	- 双指针
	![](https://cdn.jsdelivr.net/gh/liuyaanng/Blog_source@master/blog_images/img/20210327155034.png)

- 链表旋转, 移动 `k` 个位置, 向左移动等价于 **头指针向右移动 `k % count` 个位置** , 向右移动等价于 **头指针向右移动 `count - k % count` 个位置**. `count` 为链表长度

```cpp
class Solution {
public:
    ListNode* rotateRight(ListNode* head, int k) {
			if(!head || k == 0) return head;
			ListNode* fast = head;
			ListNode* slow = head;
			int count = 1;
			while(fast->next){
				fast = fast->next;
				++count;
			}
			fast->next = head;
			k = count - k % count;
			while(k-- > 1) slow = slow->next;
			head = slow->next;
			slow->next = nullptr;
			return head;
		}
};
```

![](https://cdn.jsdelivr.net/gh/liuyaanng/Blog_source@master/blog_images/img/20210327155034.png)

复杂度分析: 
- 时间复杂度: `O(n)` , 最多需要两次遍历
- 空间复杂度: `O(1)`


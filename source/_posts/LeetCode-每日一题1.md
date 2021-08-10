---
title: LeetCode_每日一题1
top: false
hidden: false
cover: false
toc: true
mathjax: false
date: 2021-03-25 16:03:25
updatedate: 2021-03-25 16:03:25
img:
password:
summary: 82 -> 删除排序链表中的重复元素 II
tags:
- c++
- LeetCode
- 每日一题
categories:
---

## [82] 删除排序链表中的重复元素 II

https://leetcode-cn.com/problems/remove-duplicates-from-sorted-list-ii/description/

* algorithms
* Medium (50.18%)
* Likes:    535
* Dislikes: -
* Total Accepted:    106.5K
* Total Submissions: 206.7K
* Testcase Example:  '[1,2,3,3,4,4,5]'

<p>存在一个按升序排列的链表，给你这个链表的头节点 <code>head</code> ，请你删除链表中所有存在数字重复情况的节点，只保留原始链表中 <strong>没有重复出现</strong><em> </em>的数字。</p>

<p>返回同样按升序排列的结果链表。</p>

<p> </p>

<p><strong>示例 1：</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2021/01/04/linkedlist1.jpg" style="width: 500px; height: 142px;" />
<pre>
<strong>输入：</strong>head = [1,2,3,3,4,4,5]
<strong>输出：</strong>[1,2,5]
</pre>

<p><strong>示例 2：</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2021/01/04/linkedlist2.jpg" style="width: 500px; height: 205px;" />
<pre>
<strong>输入：</strong>head = [1,1,1,2,3]
<strong>输出：</strong>[2,3]
</pre>

<p> </p>

<p><strong>提示：</strong></p>

<ul>
	<li>链表中节点数目在范围 <code>[0, 300]</code> 内</li>
	<li><code>-100 <= Node.val <= 100</code></li>
	<li>题目数据保证链表已经按升序排列</li>
</ul>

### 方法1:  迭代(一次遍历)

因为链表是排好序的, 所以重复的元素一定是连续的. 所以一次遍历即可删除重复元素. 在处理链表问题时, `head` 节点有可能被删除, 所以需要设置一个哑节点(dummy node) 使得	`dummy->next = head` ,这是重点.

具体迭代如下: 
- 设置 `pos` 节点指向链表的哑节点, 遍历链表, 遍历需要保证 `pos->next` 和 `pos->next->next` 存在, 若 `pos->next->val` 与 `pos->next->next->val` 相等, 代表该数字重复, 用一个变量 `x` 来记录这个重复的数字
- 继续遍历, 当 `pos->next` 存在 且 `pos->next->val` 与 `x` 相等, 则将指针继续后移, 忽略掉这个相等的数字, 重复此操作, 直到 `pos->next->val` 与 `x` 不等, 或 `pos->next` 不存在
- 返回值是 `dummy->next`
- 未将 `dummy node` 和被删除节点释放
```cpp
class Solution {
public:
    ListNode* deleteDuplicates(ListNode* head) {
			if(!head) return head;
			// 创建 dummy node , dummy->next = head
			ListNode* dummy = new ListNode(0, head);
			ListNode* pos = dummy;
			while(pos->next && pos->next->next){
				if(pos->next->val == pos->next->next->val){
					int x = pos->next->val;
					while(pos->next && pos->next->val == x){
						pos->next = pos->next->next;
					}
				}else{
					pos = pos->next;
				}
			}
			return dummy->next;
    }
};
```

![](https://cdn.jsdelivr.net/gh/liuyaanng/Blog_source@master/blog_images/img/20210325163437.png)

复杂度分析: 
- 时间复杂度: `O(n)` , 仅需一次遍历
- 空间复杂度:  `O(1)`

### 方法2: 递归

待完善

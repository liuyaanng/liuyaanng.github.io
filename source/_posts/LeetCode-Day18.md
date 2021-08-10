---
title: LeetCode_Day18
top: false
hidden: false
cover: false
toc: true
mathjax: true
date: 2021-03-23 19:26:15
updatedate: 2021-03-23 19:26:15
img:
password:
summary: 142 -> 环形链表 II
tags:
- c++
- LeetCode
- 双指针
categories:
- 算法
---

### [142] 环形链表 II

https://leetcode-cn.com/problems/linked-list-cycle-ii/description/

* algorithms
* Medium (54.35%)
* Likes:    923
* Dislikes: -
* Total Accepted:    201.4K
* Total Submissions: 369.7K
* Testcase Example:  '[3,2,0,-4]\n1'

<p>给定一个链表，返回链表开始入环的第一个节点。 如果链表无环，则返回 <code>null</code>。</p>

<p>为了表示给定链表中的环，我们使用整数 <code>pos</code> 来表示链表尾连接到链表中的位置（索引从 0 开始）。 如果 <code>pos</code> 是 <code>-1</code>，则在该链表中没有环。<strong>注意，<code>pos</code> 仅仅是用于标识环的情况，并不会作为参数传递到函数中。</strong></p>

<p><strong>说明：</strong>不允许修改给定的链表。</p>

<p><strong>进阶：</strong></p>

<ul>
	<li>你是否可以使用 <code>O(1)</code> 空间解决此题？</li>
</ul>

<p> </p>

<p><strong>示例 1：</strong></p>

<p><img alt="" src="https://cdn.jsdelivr.net/gh/liuyaanng/Blog_source@master/blog_images/img/20210324201825.png" style="height: 97px; width: 300px;" /></p>

<pre>
<strong>输入：</strong>head = [3,2,0,-4], pos = 1
<strong>输出：</strong>返回索引为 1 的链表节点
<strong>解释：</strong>链表中有一个环，其尾部连接到第二个节点。
</pre>

<p><strong>示例 2：</strong></p>

<p><img alt="" src="https://cdn.jsdelivr.net/gh/liuyaanng/Blog_source@master/blog_images/img/20210324201857.png" style="height: 74px; width: 141px;" /></p>

<pre>
<strong>输入：</strong>head = [1,2], pos = 0
<strong>输出：</strong>返回索引为 0 的链表节点
<strong>解释：</strong>链表中有一个环，其尾部连接到第一个节点。
</pre>

<p><strong>示例 3：</strong></p>

<p><img alt="" src="https://cdn.jsdelivr.net/gh/liuyaanng/Blog_source@master/blog_images/img/20210324201929.png" style="height: 45px; width: 45px;" /></p>

<pre>
<strong>输入：</strong>head = [1], pos = -1
<strong>输出：</strong>返回 null
<strong>解释：</strong>链表中没有环。
</pre>

<p> </p>

<p><strong>提示：</strong></p>

<ul>
	<li>链表中节点的数目范围在范围 <code>[0, 10<sup>4</sup>]</code> 内</li>
	<li><code>-10<sup>5</sup> <= Node.val <= 10<sup>5</sup></code></li>
	<li><code>pos</code> 的值为 <code>-1</code> 或者链表中的一个有效索引</li>
</ul>

### 方法1: 双指针(快慢指针)

对于链表找环路的问题, 有一种通用解法--快慢指针(Floyd判圈法).

给定两个指针， 分别命名为 slow 和 fast，起始位置在链表的开头。每次 fast 前进两步，slow 前进一步。如果 fast 可以走到尽头，那么说明没有环路;如果 fast 可以无限走下去，那么说明一定有环路，且一定存 在一个时刻 slow 和 fast 相遇。当 slow 和 fast 第一次相遇时，我们将 fast 重新移动到链表开头，并 让 slow 和 fast 每次都前进一步。当 slow 和 fast 第二次相遇时，相遇的节点即为环路的开始点。

原理解释如下:

![](https://cdn.jsdelivr.net/gh/liuyaanng/Blog_source@master/blog_images/img/20210324193621.png)

- 假设两指针在紫色点处相遇, 且此时slow指针一定是入环的第一圈, slow指针走的距离是 $a+b$ , fast指针走的距离是 $a+n(b+c)+b = a+(n+1)b+nc$ , 由于fast指针一次前进2步, slow指针一次前进1步, 故    
$a+(n+1)b+nc = 2(a+b)$ , 可得 $a=(n-1)(b+c)+c$
- 此时重新设置fast指向头节点, 两指针再以相同速度前进, 则一定能在环路起点相遇

- 为何两指针一定可以在slow指针入环第一圈相遇?
	- 当slow在环路起点时, fast一定在环路的某一位置, slow在环路前进1圈, fast可以前进2圈,所以slow和fast一定可以在slow前进一圈内相遇
- 为何要将fast速度设为2倍slow?
	- 事实上, fast速度可以是slow速度的任意倍, 任意倍数可能就没有一圈内相遇也没有相遇点加上环外节点长度刚好是入环点这些性质

```cpp
class Solution {
public:
    ListNode *detectCycle(ListNode *head) {
			ListNode *fast = head, *slow = head;
			do{
				if(!fast || !fast->next) return nullptr;
				fast = fast->next->next;
				slow = slow->next;
			}while(fast != slow);

			fast = head;
			while(fast!=slow){
				fast = fast->next;
				slow = slow->next;
			}
			return fast;
    }
};
```

![](https://cdn.jsdelivr.net/gh/liuyaanng/Blog_source@master/blog_images/img/20210324195636.png)

复杂度分析: 
- 时间复杂度: `O(N)` 判断是否为环路时, slow指针没有走完一圈, 判断环路起点时, slow走过的距离也不会超过链表的总长度. 因此, 时间复杂度为 `O(N) + O(N) = O(N)`
- 空间复杂度: `O(1)`

### 方法2: 哈希表

遍历整个链表, 记录每个节点, 若出现重复节点, 则该链表含有环路, 且该重复节点即为环路起始点

```cpp
class Solution {
public:
    ListNode *detectCycle(ListNode *head) {
			unordered_set<ListNode *> visited;
			while(head!=nullptr){
				if(visited.count(head)){
					return head;
				}
				visited.insert(head);
				head = head->next;
			}
			return nullptr;
		}
};
```

![](https://cdn.jsdelivr.net/gh/liuyaanng/Blog_source/blog_images/img/20210324201142.png)

复杂度分析: 
- 时间复杂度: `O(N)` , 只需遍历一次链表
- 空间复杂度:  `O(N)`, 需要建立额外的hash表, 表长为N


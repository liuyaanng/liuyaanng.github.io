---
title: LeetCode_Day6
top: false
hidden: false
cover: false
toc: true
mathjax: false
date: 2021-03-11 15:38:34
updatedate: 2021-03-11 15:38:34
img:
password:
summary: 剑指 Offer 06. 从尾到头打印链表
tags:
- 剑指Offer
- c++
categories:
- 算法
---

## 剑指 Offer 06. 从尾到头打印链表

输入一个链表的头节点，从尾到头反过来返回每个节点的值（用数组返回）。

示例 1：

```cpp
输入：head = [1,3,2]
输出：[2,3,1]
```

限制：

`0 <= 链表长度 <= 10000`

### 方法1: 递归

先进行递归至链表尾部, 在回溯的时候, 将值添加入数组, 即可实现逆序输出

- 终止条件: 指针 `head == None` , 代表在链表尾部
- 递归进行: `head = head->next`
- 回溯阶段: 将 `head->val` 添加至返回数组

```cpp
class Solution {
public:
    vector<int> reversePrint(ListNode* head) {
        reverse_array(head);
        return res;
    }
private:
    vector<int> res;
    void reverse_array(ListNode* head){
        if(head == nullptr) return;       
        reverse_array(head->next);
        res.push_back(head->val);    
    }
};
```

![](https://cdn.jsdelivr.net/gh/liuyaanng/Blog_source@master/blog_images/img/20210311120222.png)

复杂度分析: 
- 时间复杂度: `O(N)`,  遍历链表，递归N次。
- 空间复杂度:	`O(N)`, 递归需要 `O(N)` 的栈空间

### 方法2: 辅助栈法

链表只能从前向后, 而又需要倒序输出, 则可以使用栈来解决

- 遍历链表, 将链表值添加入栈中
- 将栈顶元素添加至输出数组, 执行出栈操作

```cpp
class Solution {
public:
    vector<int> reversePrint(ListNode* head) {
        stack<int> st;
        while(head != nullptr){
            st.push(head->val);
            head = head->next;
        }
        vector<int> res;
        while(!st.empty()){
            res.push_back(st.top());
            st.pop();
        }
        return res;
    }
};
```

![](https://cdn.jsdelivr.net/gh/liuyaanng/Blog_source@master/blog_images/img/20210311162411.png)

复杂度分析: 
- 时间复杂度: `O(N)`, 入栈出栈时间总和为 `O(N)`
- 空间复杂度:  `O(N)`, 



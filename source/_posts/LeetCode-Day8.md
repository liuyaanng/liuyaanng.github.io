---
title: LeetCode_Day8
top: false
hidden: false
cover: false
toc: true
mathjax: false
date: 2021-03-13 17:31:55
updatedate: 2021-03-13 17:31:55
img:
password:
summary: 剑指 Offer 09 ->  用两个栈实现队列
tags:
- 剑指Offer
- c++
categories:
- 算法
---

### 剑指 Offer 09. 用两个栈实现队列

用两个栈实现一个队列。队列的声明如下，请实现它的两个函数 `appendTail` 和 `deleteHead` ，分别完成在队列尾部插入整数和在队列头部删除整数的功能。(若队列中没有元素，`deleteHead` 操作返回 -1 )

示例 1：

```
输入：
["CQueue","appendTail","deleteHead","deleteHead"]
[[],[3],[],[]]
输出：[null,null,3,-1]
```

示例 2：

```
输入：
["CQueue","deleteHead","appendTail","appendTail","deleteHead","deleteHead"]
[[],[],[5],[2],[],[]]
输出：[null,-1,null,null,5,2]
```

提示：

-	`1 <= values <= 10000`
- `最多会对 appendTail、deleteHead 进行 10000 次调用`

解题思路:

- `appendTail` , 可直接执行栈的 `push` 操作
- `deleteHead` , 可将栈翻转, 再执行出栈 `pop` 操作

栈的翻转可利用两个栈来实现, 具体操作是: 对栈A执行出栈操作, 将出栈元素在栈B入栈, 直至栈A为空

```cpp
class CQueue {
public:
    stack<int> A, B;
    CQueue() {}
    
    void appendTail(int value) {
        A.push(value);
    }
    
    int deleteHead() {
        if(!B.empty()){
            int tmp = B.top();
            B.pop();
            return tmp;
        }
        if(A.empty()){
            return -1;
        }
        while(!A.empty()){
            int tmp = A.top();
            A.pop();
            B.push(tmp);
        }
        int tmp = B.top();
        B.pop();
        return tmp;
    }
};

/**
 * Your CQueue object will be instantiated and called as such:
 * CQueue* obj = new CQueue();
 * obj->appendTail(value);
 * int param_2 = obj->deleteHead();
 */
```

![](https://cdn.jsdelivr.net/gh/liuyaanng/Blog_source@master/blog_images/img/20210319174210.png)

复杂度分析: 
- 时间复杂度: `appendTail` 复杂度为 $O(1)$ , `deleteHead` 执行 N 次共需执行N个元素的翻转
- 空间复杂度: $O(N)$ , 最坏情况为栈A和栈B都有N个元素


---
title: LeetCode EASY_9
top: false
cover: false
toc: true
mathjax: true
date: 2020-08-17 21:26:14
img: https://i.loli.net/2020/08/17/dE57y8WIv1eflOX.png
password:
summary: 回文数
tags: 
- Python3
- LeetCode
categories:
- 算法
---

## 题目

- 判断一个整数是否是回文数。回文数是指正序（从左向右）和倒序（从右向左）读都是一样的整数。

示例：

```
输入：121
输出：True
```

```
输入：-121
输出：False
```

- 思路1：将数字转化为字符串形式，分别进行头尾判断数字是否一致。
实现需要3步：
  
  预判断：
  首先判断当输入数字为负数或其个位数字是0（排除0）时一定输出False

  ```python
  if (x < 0 or (x % 10 == 0 and x!= 0)):
      return False
  ```
  - 将输入转化为字符串
  ```python3
  x_str = str(x)
  ```

  - 分割字符串，不能用split方法。这里因为当输入为奇数时，数字中间的一位对结果无影响，故将这一位删掉。
  ```python3
  x_list = []
  for x_s in x_str:
      x_list.append(x_s)
  if num != num_i:
      x_list.pop(num_i)
  ```

  - 判断是否为回文数。采用循环判断，从中间往两边依次判断，注意这里只要有一位不相同就会输出False

程序完整代码如下：
```python
if (x < 0 or (x % 10 == 0 and x!= 0)):
    return False    
x_str = str(x)
num = len(x_str) / 2 
num_i = len(x_str) // 2
x_list = []
for x_s in x_str:
    x_list.append(x_s)
if num != num_i:
    x_list.pop(num_i)
i = 0
result = True
while i < num_i:
    if x_list[num_i + i] == x_list[num_i - (i + 1)]:
        result = True
    else:
        result = False
        return result
    i += 1
return result
```

在参考了LeetCode官网解法之后，发现了类似思路更简单的解法，代码如下：

```python
return (str(x) == str(x)[::-1])
```
只需判断输入数字的一半即可判断结果，故可改进如下：
```python
x_str = str(x)
x_len = len(x_str)
x_h = x_len // 2
return (x_str[:x_h] == x_str[-1:-x_h - 1:-1])
```

以上方法均将输入转化为字符串之后再进行判断

### 进阶:
你能不将整数转为字符串来解决这个问题吗？

- 思路2: 将数字反转，然后将反转得到的数字与原始数字进行比较，两者相同则是回文数。但这时要考虑到溢出问题，反转得到的数字可能会大于整数的最大值。为了避免这个问题，考虑只反转输入数字的一半，若后一半反转后与前一半相同则是回文数。算法考虑如下：
  - 预判断如上
  - 设置一个反转数，将输入数字除10求余，得到的数字是反转数的首位，依次循环，可得到一系列的反转数，x的值会越来越小，而反转数的值会越来越大。对于偶数来说，循环终止的条件很简单，就是当x等于反转数，对于奇数来说，循环终止的条件是x小于反转数，随后判断此时的x与反转数是否相同。注意：对于奇数来说，判断条件是x是否等于反转数除10取整的值，因为奇数多了一轮迭代。

完整代码如下：

```python
if (x < 0 or (x % 10 == 0 and x != 0)):
    return False
x_reversed = 0
while x_reversed < x:
    x_reversed = x_reversed * 10 + x % 10
    x = x // 10
return (x == x_reversed or x == x_reversed // 10)
```
C代码如下：
```C
bool isPalindrome(int x){
if (x<0 || (x%10 == 0 && x != 0)){
    return false;
}
int x_reversed = 0;
while (x_reversed < x){
    x_reversed = x_reversed * 10 + x % 10; 
    x = x / 10;
}
return (x == x_reversed || x == x_reversed / 10);
}
```


### 复杂度分析
- 时间复杂度：O(log n) ，对于每次迭代，都将输入除以n，故时间复杂度为O(log n)
- 空间复杂度： O(1). 只需在常数空间存储若干变量。

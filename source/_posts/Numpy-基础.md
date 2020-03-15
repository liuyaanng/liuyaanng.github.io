---
title: Numpy 基础
top: false
cover: false
toc: true
mathjax: false
date: 2020-03-15 17:36:01
img:
password:
summary: Numpy的快速入门教程
tags:

categories:
---

### 参考[Numpy](https://www.numpy.org.cn/user/quickstart.html) 

个人仓库：[Numpy & Pandas](https://github.com/liuyaanng/Numpy-Pandas) 
### 基础知识

注意Numpy的主要对象是**同构多维数组**, 在Numpy中维度成为**轴**

Numpy的数组类是`ndarray`, `ndarray`的属性有：

- **ndarray.ndim** - 数组轴的个数。
- **ndarray.shape** - 数组的维度。 `shape`的长度就是维度的个数`ndim`
- **ndarray.size** - 数组元素的总数
- **ndarray.dataType** - 数组中元素类型
- **ndarray.itemSize** - 数组中每个元素的字节大小
- **ndarray.dataType** - 该缓冲区包含数组的实际元素。通常不使用该属性，而使用索引访问数组中的元素

### 创建数组

- 使用`array`直接从python列表或元组中创建数组

```python
a = np.array([1, 2, 3])
```

`array`还可以将序列的序列转化为二维数组，将序列的序列的序列转化为三维数组

```python
b = np.array([(1, 2, 3, 4), (5, 6, 7, 8)])
```

也可以在创建数组的时候显示的指定数组的类型

```python
c = np.array([(1, 2), (3, 4)], dtype = complex)
```

- 创建具有初始站位符的数组
  - `zeros`创建一个由0组成的数组
  - `ones`创建一个完整的数组
  - `empty`创建一个内容随机的数组，内容取决于内存的状态
  
  默认情况下创建的数组类型为`float64`

  ```python
  a = np.zeros((3, 4))
  b = np.ones((3, 4))
  c = np.empty((3, 4))
  ```

- 创建数字组成的数组: `arange`

```python
a = np.arange(10, 20, 5)
```

当`arange`与浮点参数一起使用时，由于浮点数精度的限制，通常不能直接预测所获得元素的数量，故若需要通常使用`linspace`函数来接受想要元素数量的函数

```python
a = np.linspace(0, 0.2, 9)
```

### 打印数组

注意以下布局规则：

- 最后一个轴从左到右打印
- 倒数第二个从上到下打印
- 其余部分也从上到下打印，每个切片用空行分隔

```python
>>> a = np.arange(6)
>>> print(a)
   [0 1 2 3 4 5]
>>> b = np.arange(12).reshape(3,4)
>>> print(b)
   [[ 0  1  2  3]
    [ 4  5  6  7]
    [ 8  9 10 11]]
>>> c = np.arange(48).reshape(2,3,2,4)
>>> print(c)
  [[[[ 0  1  2  3]
     [ 4  5  6  7]]

    [[ 8  9 10 11]
     [12 13 14 15]]

    [[16 17 18 19]
     [20 21 22 23]]]


   [[[24 25 26 27]
     [28 29 30 31]]

    [[32 33 34 35]
     [36 37 38 39]]

    [[40 41 42 43]
     [44 45 46 47]]]] 
```

### 基本操作

- 数组上的算数运算符会应用到元素级别

- 乘积运算符`*`在Numpy数组中是按元素进行运算。     
矩阵乘积用`@`运算符或`dot`函数或方法执行

```python
>>> A = np.array([[1,1],[0,1]])
>>> B = np.array([[2,0],[3,4]])
>>> A*B
array([[2, 0],
       [0, 4]])
>>> A@B
array([[5, 4],
       [3, 4]])
>>> A.dot(B)
array([[5, 4],
       [3, 4]])
```

- 某些操作（`+=` 和 `*=`）会直接更改被操作的矩阵数组
- 当使用不同类型的数组进行操作时，结果数组的类型对应于更一般或更精确的数组（称为向上转换的行为）
- 通过`axis`参数，可以沿数组的指定轴应用操作, `axis`参数从0开始

```python
>>> a = np.arange(12).reshape((3,4))
>>> print(a)
[[ 0  1  2  3]
 [ 4  5  6  7]
 [ 8  9 10 11]]
>>> a.sum(axis = 0)
array([12, 15, 18, 21])
>>> a.sum(axis = 1)
array([ 6, 22, 38])
```

### 通函数

在Numpy中，通函数（`ufunc`）在数组上按元素进行运算，产生一个数组作为输出

### 索引，切片和迭代

- 一维数组的索引、切片和迭代操作，和Python序列类型一样
- 多维的数组每个轴可以有一个索引。这些索引以逗号分割的元组给出

```python
>>> def f(x,y):
    return 10*x + y
>>> a = np.fromfunction(f,(4,5), dtype = int)
>>> a
array([[ 0,  1,  2,  3,  4],
       [10, 11, 12, 13, 14],
       [20, 21, 22, 23, 24],
       [30, 31, 32, 33, 34]])
>>> a[:4, 1]
array([ 1, 11, 21, 31])
>>> a[1,:4]
array([10, 11, 12, 13])
```

当提供的索引少于轴的数量时，缺是的索引被认为是完整的切片

```python
>>> a[-1]
array([30, 31, 32, 33, 34])
```

- 三个点（`...`)表示产生完整索引元组所需的冒号。如`x`是rank为5的数组
  - `x[1, 2, ...]`相当于`x[1, 2, :, :, :]`
  - `x[..., 3]` 相当于`x[:, :, :, :, 3]`
- 对多维数组的迭代是相对于第一个轴完成的

```python
>>> for row in a:
        print(row)
[0 1 2 3 4]
[10 11 12 13 14]
[20 21 22 23 24]
[30 31 32 33 34]
```

如果想对数组中的每个元素执行操作，可以使用`flat`属性，该属性是数组的所有元素的迭代器
```python
>>> for element in a.flat:
        print(element)
0
1
2
3
4
10
11
12
13
14
20
21
22
23
24
30
31
32
33
34
```





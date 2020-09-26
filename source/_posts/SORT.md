---
title: SORT
top: false
cover: false
toc: true
mathjax: true
date: 2020-01-29 14:20:02
password:
summary: Sort algorithms with python
tags:
- python
categories:
- Algorithms
---

## SORT

### 1. BUBBLE SORT

```python
BUBBLE-SORT(A)
//A:sort array
for i = 1 to A.length - 1
  for j = A.length to i + 1
    if A[j] < A[j-1]
      swap(A[j], A[j-1]

```

![BUBBLE_SORT](BUBBLE_SORT.gif) 

$$ \Theta (n^2) $$

### 2. INSERTION SORT

```python
INSERTION-SORT(A)
//A:sort array

for j = 2 to A.length
  key = A[j]
  //Insert A[j] into the sorted sequence A[1..j-1]
  i = j - 1
  while i > 0 and A[i] > key
    A[i+1] = A[i]
    i = i - 1
  A[i+1] = key
```

![INSERTION_SORT](INSERTION_SORT.gif) 

$$ \Theta (n^2) $$

### 3. SELECT SORT

```python
SELECT-SORT(A)
//A:sort array
for i = 1 to range(i,A.length)
  min = A[i]
  for j = 1 to A.length
    if min > A[j]
      min = A[j]
      min_index = j
  swap(A[i],A[min_index])
```

![SELECT_SORT](SELECT_SORT.gif) 

$$ \Theta (n^2) $$

### 4. MERGE SORT

```python
MERGE-SORT(A, p, r)
//A:sort array
//p:begin index
//r:end index

if p < r
  q = [(p + r) / 2]
  MERGE-SORT(A, p, q)
  MERGE-SORT(A, q+1, r)
  MERGE(A, p, q, r)

MERGE(A, p, q, r)
//A:sort array
//p:begin index
//q:mid index
//r:end index

n1 = q - p + 1
n2 = r - q
Let L[1..n1 + 1] and R[1..n2 + 1] be new arrays
for i = 1 to n1
  L[i] = A[p + i - 1]
for j = 1 to n2
  R[j] = A[q + j]
L[n1 + 1] = infinity
R[n2 + 1] = infinity
i = 1
j = 1
for k = p to r
  if L[i] <= R[j]
    A[k] = L[i]
    i = i + 1
  else
    A[k] = R[j]
    j = j + 1
```

![MERGE_SORT](MERGE_SORT.gif) 

$$ \Theta (n) $$

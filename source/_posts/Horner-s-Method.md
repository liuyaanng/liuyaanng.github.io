---
title: Horner's Method
top: false
cover: false
toc: true
mathjax: true
date: 2020-02-02 19:54:55
img:
password:
summary: Horner's Method
tags:
categories:
---

### Function vs Polynomial

- f(x) means a function, any function
  - $$ f(x) = \sin (e^x) + \ln ( \frac{1}{x^2+1} ) $$
  - $$ f(x) = \alpha x^3 - \arctan(x) $$
- p(x) means a polynomial function
  - $$ p(x) = dx^3 + cx^2 + bx + a $$
  - $$ p(x) = a + bx + cx^2 + dx^3 $$
- evaluating p(x) can be slow
  - $$ p(x) = a + bx + cx^2 + dx^3 $$
  - $$ p(x) = a + b \times x + c \times x \times x + d \times x \times x \times x $$

It include **4 additions** and **6 multiplications**
### Horner's Method

- Rewrite p(x)
  - $$ p(x) = a + bx + cx^2 + dx^3 $$
  - $$ p(x) = a + bx + x(cx + dx^2) $$
  - $$ p(x) = a + x(b + x(cx + dx)) $$
  - $$ p(x) = a + x \times (b + x \times (c + d \times x)) $$


It include **3 additions** and **3 multiplications**

- In terms of $a_n$
  - $$ p(x) = a_0 + a_1x + a_2x^2 + a_3x^3 + \cdots + a_nx^n $$
  - $$ p(x) = a_0x^0 + a_1x + a_2x^2 + a_3x^3 + \cdots + a_nx^n  = \sum_{i=0}^{n} a_i x^i $$
  - $$ p(x) = a_0 +x(a_1 + x(a_2 + \cdots + x(a_{n-1} + xa_n    ) \cdots )) $$
  - $$p(x) = p_0(x) where p_i(x) = \begin{cases} a_i + x \times p_{i+1}(x), if i < n \\ a_n, if i = n \end{cases}$$

#### Pseudocode

Give the value of coefficient $a_0$, $a_1$, $\cdots$, $a_n$ and $x$.

```python
y = 0
for i = n downto 0
  y = a_i + xy
```

  




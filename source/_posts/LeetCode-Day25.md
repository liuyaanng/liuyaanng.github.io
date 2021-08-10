---
title: LeetCode_Day25
top: false
hidden: false
cover: false
toc: true
mathjax: false
date: 2021-03-30 22:16:56
updatedate: 2021-03-31 22:16:56
img:
password:
summary: 4 -> 寻找两个正序数组的中位数
tags:
- c++
- LeetCode
- 二分法
categories:
- 算法
---

## [4] 寻找两个正序数组的中位数

https://leetcode-cn.com/problems/median-of-two-sorted-arrays/description/

* algorithms
* Hard (39.83%)
* Likes:    3903
* Dislikes: -
* Total Accepted:    371.4K
* Total Submissions: 932.4K
* Testcase Example:  '[1,3]\n[2]'

<p>给定两个大小分别为 <code>m</code> 和 <code>n</code> 的正序（从小到大）数组 <code>nums1</code> 和 <code>nums2</code>。请你找出并返回这两个正序数组的 <strong>中位数</strong> 。</p>

<p> </p>

<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>nums1 = [1,3], nums2 = [2]
<strong>输出：</strong>2.00000
<strong>解释：</strong>合并数组 = [1,2,3] ，中位数 2
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>nums1 = [1,2], nums2 = [3,4]
<strong>输出：</strong>2.50000
<strong>解释：</strong>合并数组 = [1,2,3,4] ，中位数 (2 + 3) / 2 = 2.5
</pre>

<p><strong>示例 3：</strong></p>

<pre>
<strong>输入：</strong>nums1 = [0,0], nums2 = [0,0]
<strong>输出：</strong>0.00000
</pre>

<p><strong>示例 4：</strong></p>

<pre>
<strong>输入：</strong>nums1 = [], nums2 = [1]
<strong>输出：</strong>1.00000
</pre>

<p><strong>示例 5：</strong></p>

<pre>
<strong>输入：</strong>nums1 = [2], nums2 = []
<strong>输出：</strong>2.00000
</pre>

<p> </p>

<p><strong>提示：</strong></p>

<ul>
	<li><code>nums1.length == m</code></li>
	<li><code>nums2.length == n</code></li>
	<li><code>0 <= m <= 1000</code></li>
	<li><code>0 <= n <= 1000</code></li>
	<li><code>1 <= m + n <= 2000</code></li>
	<li><code>-10<sup>6</sup> <= nums1[i], nums2[i] <= 10<sup>6</sup></code></li>
</ul>

<p> </p>

<p><strong>进阶：</strong>你能设计一个时间复杂度为 <code>O(log (m+n))</code> 的算法解决此问题吗？</p>

### 方法1: 合并数组

思路: 将两个数组合并, 排序(sort函数), 再取中位数

#### 1. 不使用 `sort` 函数

思路: 使用双指针, 按顺序合并两数组, 再取中位数.

步骤: 
- 设置双指针, 分别指向两个数组, 对比两个指针对应位置的大小, 将较小的数添加到合并后的数组里, 移动指针, 继续对比
- 取中位数

```cpp
class Solution {
public:
    double findMedianSortedArrays(vector<int>& nums1, vector<int>& nums2) {
			int pos1 = 0, pos2 = 0, index = 0;
			int size = nums1.size() + nums2.size();
			vector <int> added_nums(size, 0);
			while(pos1<nums1.size() && pos2<nums2.size()){
				if(nums1[pos1] <= nums2[pos2]){
					added_nums[index] = nums1[pos1];
					++pos1;
				}else{
					added_nums[index] = nums2[pos2];
					++pos2;
				}
				++index;
			}

			if(pos1 >= nums1.size() && pos2 < nums2.size()){
				while(pos2<nums2.size()){
					added_nums[index] = nums2[pos2];
					++pos2;
					++index;
				}
			}

			if(pos2 >= nums2.size() && pos1 < nums1.size()){
				while(pos1 < nums1.size()){
					added_nums[index] = nums1[pos1];
					++pos1;
					++index;
				}
			}

			// for(int i=0; i<added_nums.size(); ++i) cout << added_nums[i] << endl;
			int mid = added_nums.size() >> 1;
			return added_nums.size() % 2 == 0 ? (double) (added_nums[mid] + added_nums[mid - 1]) / 2 : added_nums[mid];
    }
};
```

![](https://cdn.jsdelivr.net/gh/liuyaanng/Blog_source@master/blog_images/img/20210331100716.png)

复杂度分析: 
- 时间复杂度: `O(m+n)`
- 空间复杂度: `O(m+n)`

#### 2. 降低空间复杂度

思路: 由于两数组的大小已知, 只是要找到中位数的位置, 只需设置两个指针, 分别指向数组首位, 每次将较小数的指针向后移动一位, 若其中一个数组遍历完成, 则只需在另一个数组中移动即可. 直至指针移动到中位数项


#### 3. 使用 `sort` 函数, 小伙子不讲武德
步骤: 
- 先将两数组合并到一个数组里
- 利用 `sort` 函数排序
- 取中位数

```cpp
class Solution {
public:
    double findMedianSortedArrays(vector<int>& nums1, vector<int>& nums2) {
			int size = nums1.size() + nums2.size();
			int i, j;
			vector <int> added_nums(size, 0);
			for(i=0; i<nums1.size(); ++i){
				added_nums[i] = nums1[i];
			}
			for(j=0; j<nums2.size();++j){
				added_nums[i+j] = nums2[j];
			}
			sort(added_nums.begin(), added_nums.end());
			int mid = added_nums.size() >> 1;
			return added_nums.size() % 2 == 0 ? (double)(added_nums[mid] + added_nums[mid-1]) / 2 : added_nums[mid];

    }
};
```

![](https://cdn.jsdelivr.net/gh/liuyaanng/Blog_source@master/blog_images/img/20210330223006.png)

复杂度分析: 
- 时间复杂度: `O(m+n+log(m+n)) = O(log(m+n))`, m为`nums1`长度, n为`nums2` 长度
- 空间复杂度: `O(m+n)`

### 方法2: 二分法

思路: k取两数组长度和的一半, 将本题转化为求第k小的数, 两数组长度之和为奇数, 第k小的数即为其中位数, 长度和为偶数, 中位数就是第k小数和第k+1小数和的一半

- 对于求第k小的数, 可分别对两数组取第 $\dfrac{k}{2}$ 个数, 即数组中索引为 $\dfrac{k}{2}-1$ 的数, 因为数组是排好序的, 假如 `nums1[k/2-1]` 小于	`nums2[k/2-1]` , 那么在 `nums1` 中, `nums[k/2-1]` 之前的数都是比它小的数, 这样就可以排除这些数, 即排除	$\dfrac{k}{2}$ 项, 将这些数丢弃, 此时问题转化为求第 $\dfrac{k}{2}$ 小的数. 

![](https://cdn.jsdelivr.net/gh/liuyaanng/Blog_source@master/blog_images/img/20210331123356.png) 

- 更新k的值, 令 `k = k / 2`, 问题又转化为求第k小的数, 不过要注意此时两数组是舍弃更新后的数组.
- 当两个数相等时, 按以上处理即可
- k经过迭代更新, 当`k = 1`时, 问题变成了求最小的值, 取此时的两数组(舍弃掉较小的值后的数组)的首项, 取其最小值即可

在对比的过程中, 会出现以下特殊情况:     
1. 下标 `k/2-1` 超过其中一个数组长度.     

	此时应取该数组最后一个元素来做对比, 若它小, 在更新k值时不能再 `k=k-k/2` , 应当减去该数组的长度

2. 其中一个数组被完全舍弃.    

	此时剩余数组的第k项即为所求

3. `k = 0`    

	比较两数组首项, 较小的值即为所求

下面用一个具体的例子来说明

```
nums1 = [1, 3, 4, 9]
nums2 = [1, 2, 3, 4, 5, 6, 7, 8, 9]
```

两数组长度之和为 `13`, 中位数为第7个数, 即第 `7` 小的数, `k=7`, 分别取下标为 `k/2-1` 项进行比较, 即 `nums1[2]` `nums2[2]`

```
nums1: 1 3 4 9
           ↑
nums2: 1 2 3 4 5 6 7 8 9
           ↑
```

`nums1[2] > nums2[2]` , 将 nums2 中 `nums2[2]` 前的项舍去, `nums2` 的下标偏移量为3,  更新k的值为 `k = k - k/2 = 4` , 继续查找下标为 `k/2-1` 的项, 即 `nums1[1]` `nums2[1]`

```
nums1: 1 3 4 9
         ↑
nums2: [ 1 2 3 ] 4 5 6 7 8 9
                   ↑
```

`nums1[1] < nums2[1]` , 继续舍弃较小的项, `nums1` 的下标偏移量为1,更新k的值为 `k=k-k/2=2`, 继续查找下标为 `k/2-1` 的项, 即 `nums1[0]` `nums2[0]`

```
nums1: [ 1 3 ] 4 9
               ↑
nums2: [ 1 2 3 ] 4 5 6 7 8 9
                 ↑
```

`nums1[0] = nums2[0]` , 舍弃掉较小的项, `nums1` 的下标偏移量为3, 更新 `k = k - k/2=1`, 此时比较当前数组的首项, 小的那一项即为 `第k小项`

```
nums1: [ 1 3 4 ] 9
                 ↑
nums2: [ 1 2 3 ] 4 5 6 7 8 9
                 ↑
```
因此第k小项是4


```cpp
class Solution {
public:
		
	int get_kth_element(vector<int>& nums1, vector<int> nums2, int k){
		// 分别设置指针
		int index1 = 0, index2 = 0;
		int size1 = nums1.size(), size2 = nums2.size();
		while(true){
			// 处理边界情况
			// nums1数组空
			if(index1 >= size1){
				return nums2[index2 + k - 1];
			}
			// nums2数组空
			if(index2 >= size2){
				return nums1[index1 + k - 1];
			}
			// k = 1
			if(k == 1){
				return min(nums1[index1], nums2[index2]);
			}

			//处理一般情况
			//
			int newindex1 = min(index1 + k / 2 - 1, size1 - 1);
			int newindex2 = min(index2 + k / 2 - 1, size2 - 1);

			int value1 = nums1[newindex1];
			int value2 = nums2[newindex2];

			if(value1<=value2){
				k = k - (newindex1 - index1 + 1);
				index1 = newindex1 + 1;
			}else{
				k = k - (newindex2 - index2 + 1);
				index2 = newindex2 + 1;
			}
		}

	}
    double findMedianSortedArrays(vector<int>& nums1, vector<int>& nums2) {

			int length = nums1.size() + nums2.size();
			
			//奇数长
			if(length % 2 == 1){
				return (double)get_kth_element(nums1, nums2, (length + 1) / 2);
			}else{
				return (get_kth_element(nums1, nums2, length / 2) + get_kth_element(nums1, nums2, length / 2 + 1)) / 2.0;
			}
    }
};
```

![](https://cdn.jsdelivr.net/gh/liuyaanng/Blog_source@master/blog_images/img/20210331123507.png)

复杂度分析: 
- 时间复杂度: `O(log(m+n))` m, n分别为两数组长度
- 空间复杂度: `O(1)`

### 方法3: 划分数组

待完善

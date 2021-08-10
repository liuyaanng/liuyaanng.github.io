---
title: LeetCode_Day7
top: false
hidden: false
cover: false
toc: true
mathjax: true
date: 2021-03-12 10:30:29
updatedate: 2021-03-12 10:30:29
img:
password:
summary: 706 -> 设计哈希映射
tags:
- LeetCode
- c++
categories:
- 算法
---

## [706] 设计哈希映射

https://leetcode-cn.com/problems/design-hashmap/description/

* algorithms
* Easy (58.60%)
* Likes:    124
* Dislikes: -
* Total Accepted:    22.7K
* Total Submissions: 38.6K
* Testcase Example:  '["MyHashMap","put","put","get","get","put","get","remove","get"]\n' +
  '[[],[1,1],[2,2],[1],[3],[2,1],[2],[2],[2]]'

<p>不使用任何内建的哈希表库设计一个哈希映射（HashMap）。</p>

<p>实现 <code>MyHashMap</code> 类：</p>

<ul>
	<li><code>MyHashMap()</code> 用空映射初始化对象</li>
	<li><code>void put(int key, int value)</code> 向 HashMap 插入一个键值对 <code>(key, value)</code> 。如果 <code>key</code> 已经存在于映射中，则更新其对应的值 <code>value</code> 。</li>
	<li><code>int get(int key)</code> 返回特定的 <code>key</code> 所映射的 <code>value</code> ；如果映射中不包含 <code>key</code> 的映射，返回 <code>-1</code> 。</li>
	<li><code>void remove(key)</code> 如果映射中存在 <code>key</code> 的映射，则移除 <code>key</code> 和它所对应的 <code>value</code> 。</li>
</ul>

<p> </p>

<p><strong>示例：</strong></p>

<pre>
<strong>输入</strong>：
["MyHashMap", "put", "put", "get", "get", "put", "get", "remove", "get"]
[[], [1, 1], [2, 2], [1], [3], [2, 1], [2], [2], [2]]
<strong>输出</strong>：
[null, null, null, 1, -1, null, 1, null, -1]

<strong>解释</strong>：
MyHashMap myHashMap = new MyHashMap();
myHashMap.put(1, 1); // myHashMap 现在为 [[1,1]]
myHashMap.put(2, 2); // myHashMap 现在为 [[1,1], [2,2]]
myHashMap.get(1);    // 返回 1 ，myHashMap 现在为 [[1,1], [2,2]]
myHashMap.get(3);    // 返回 -1（未找到），myHashMap 现在为 [[1,1], [2,2]]
myHashMap.put(2, 1); // myHashMap 现在为 [[1,1], [2,1]]（更新已有的值）
myHashMap.get(2);    // 返回 1 ，myHashMap 现在为 [[1,1], [2,1]]
myHashMap.remove(2); // 删除键为 2 的数据，myHashMap 现在为 [[1,1]]
myHashMap.get(2);    // 返回 -1（未找到），myHashMap 现在为 [[1,1]]
</pre>

<p> </p>

<p><strong>提示：</strong></p>

<ul>
	<li><code>0 <= key, value <= 10<sup>6</sup></code></li>
	<li>最多调用 <code>10<sup>4</sup></code> 次 <code>put</code>、<code>get</code> 和 <code>remove</code> 方法</li>
</ul>

<p> </p>

<p><strong>进阶：</strong>你能否不使用内置的 HashMap 库解决此问题？</p>

### 方法1: 暴力一维数组

适用于key范围较小的情况

```cpp
class MyHashMap {
public:
    /** Initialize your data structure here. */
    MyHashMap() {
			const int N = 1000001;
			data = vector<int>(N, -1); //直接初始化为-1
    }
    
    /** value will always be non-negative. */
    void put(int key, int value) {
			data[key] = value;
    }
    
    /** Returns the value to which the specified key is mapped, or -1 if this map contains no mapping for the key */
    int get(int key) {
			return data[key];
    }
    
    /** Removes the mapping of the specified value key if this map contains a mapping for the key */
    void remove(int key) {
			data[key] = -1;
    }
private:
		vector<int> data;
};
```

![](https://cdn.jsdelivr.net/gh/liuyaanng/Blog_source@master/blog_images/img/20210319103752.png)

### 方法2: 二维数组, 稀疏数组节省空间

通过设置两个hash值来避免冲突
```cpp
class MyHashMap {
public:
    /** Initialize your data structure here. */
    MyHashMap() {
			data.resize(N);
    }
		auto getHashValue1(int key){
			return key % N;
		}
    
		auto getHashValue2(int key){
			return key / N;
		}
    /** value will always be non-negative. */
    void put(int key, int value) {
			auto hashkey1 = getHashValue1(key);
			auto hashkey2 = getHashValue2(key);
			if(data[hashkey1].empty()){
				data[hashkey1].resize(N, -1);
			}
			data[hashkey1][hashkey2] = value;
    }
    
    /** Returns the value to which the specified key is mapped, or -1 if this map contains no mapping for the key */
    int get(int key) {
			auto hashkey1 = getHashValue1(key);
			auto hashkey2 = getHashValue2(key);
			if(data[hashkey1].empty()){
				return -1;
			}
			return data[hashkey1][hashkey2];
    }
    
    /** Removes the mapping of the specified value key if this map contains a mapping for the key */
    void remove(int key) {
			auto hashkey1 = getHashValue1(key);
			auto hashkey2 = getHashValue2(key);
			if(!data[hashkey1].empty()){
				data[hashkey1][hashkey2] = -1;
			}
    }
private:
		const int N = 1001;
		vector<vector<int>> data;
};
```

![](https://cdn.jsdelivr.net/gh/liuyaanng/Blog_source@master/blog_images/img/20210319110154.png)

### 方法3: 链地址法 无头节点

这是一种处理冲突的方法, 具体原理如图:

![](https://cdn.jsdelivr.net/gh/liuyaanng/Blog_source@master/blog_images/img/IMG_3726.JPG)

此方法不使用头节点(dummy head node), 将所有关键字为同义词的记录存储在同一线性链表中, 减小空间开销, 但每次都需要判断是否为空节点

需注意当移除键值对时, 对于头节点与非头节点要分开讨论

```cpp
struct MyListNode{
	int key; 
	int val;
	MyListNode* next;
	MyListNode() : key(-1), val(-1), next(nullptr) {}
	MyListNode(int _key, int _val) : key(_key), val(_val), next(nullptr) {}
};
class MyHashMap {
public:
    /** Initialize your data structure here. */
    MyHashMap() {
			data.resize(N);
    }
		auto getHashValue(int key){
			return key % N;
		}

    /** value will always be non-negative. */
    void put(int key, int value) {
			auto hashkey = getHashValue(key);
			auto& head = data[hashkey];
			if(head==nullptr){
				head = new MyListNode(key, value);
				return;
			}
			auto p = head;
			auto tail = p;
			// add value which has been added
			while(p != nullptr){
				if(p->key == key){
					p->val = value;
					return;
				}
				tail = p;
				p = p->next;
			}
			// add new value
			tail->next = new MyListNode(key, value);
    }
    
    /** Returns the value to which the specified key is mapped, or -1 if this map contains no mapping for the key */
    int get(int key) {
			auto hashkey = getHashValue(key);
			auto& head = data[hashkey];
			if(head==nullptr){
				return -1;
			}
			auto p = head;
			while(p != nullptr){
				if(p->key == key){
					return p->val;
				}
				p = p->next;
			}
			return -1;
    }
    
    /** Removes the mapping of the specified value key if this map contains a mapping for the key */
    void remove(int key) {
			auto hashkey = getHashValue(key);
			auto& head = data[hashkey];
			if(head==nullptr){
				return;
			}
			auto p = head;
			MyListNode* prev = nullptr;
			while(p != nullptr){
				if(p->key == key){
					// remove head
					if(prev == nullptr){
						auto dummy = head;
						head = head->next; // nullptr
						dummy->next = nullptr;
						delete dummy;
					}
					else{
						prev->next = p->next;
						p->next = nullptr;
						delete p;
					}
					return;
				}
				prev = p;
				p = p->next;
			}
    }
private:
		const int N = 1001;
		vector<MyListNode*> data;
};
```

![](https://cdn.jsdelivr.net/gh/liuyaanng/Blog_source@master/blog_images/img/20210319120829.png)

### 方法4: 链地址法 有头节点

![](https://cdn.jsdelivr.net/gh/liuyaanng/Blog_source@master/blog_images/img/IMG_3726.JPG)

头节点一直存在, 省去了对头节点的判断, 但略占空间

```cpp
struct MyListNode{
	int key; 
	int val;
	MyListNode* next;
	MyListNode() : key(-1), val(-1), next(nullptr) {}
	MyListNode(int _key, int _val) : key(_key), val(_val), next(nullptr) {}
};
class MyHashMap {
public:
    /** Initialize your data structure here. */
    MyHashMap() {
			data.resize(N, new MyListNode());
    }
		auto getHashValue(int key){
			return key % N;
		}

    /** value will always be non-negative. */
    void put(int key, int value) {
			auto hashkey = getHashValue(key);
			auto& head = data[hashkey];
			auto p = head;
			auto tail = p;
			// add value which has been added
			while(p != nullptr){
				if(p->key == key){
					p->val = value;
					return;
				}
				tail = p;
				p = p->next;
			}
			// add new value
			tail->next = new MyListNode(key, value);
    }
    
    /** Returns the value to which the specified key is mapped, or -1 if this map contains no mapping for the key */
    int get(int key) {
			auto hashkey = getHashValue(key);
			auto& head = data[hashkey];
			auto p = head;
			while(p != nullptr){
				if(p->key == key){
					return p->val;
				}
				p = p->next;
			}
			return -1;
    }
    
    /** Removes the mapping of the specified value key if this map contains a mapping for the key */
    void remove(int key) {
			auto hashkey = getHashValue(key);
			auto& head = data[hashkey];
			auto p = head;
			MyListNode* prev = nullptr;
			while(p != nullptr){
				if(p->key == key){
					prev->next = p->next;
					p->next = nullptr;
					delete p;
					return;
				}
				prev = p;
				p = p->next;
			}
    }
private:
		const int N = 1001;
		vector<MyListNode*> data;
};
```

![](https://cdn.jsdelivr.net/gh/liuyaanng/Blog_source@master/blog_images/img/20210319154530.png)

### 方法5: 开放地址法 线性探测

算法原理: 

$$
H_i = (H(key) + d_i) \space MOD \space m  \quad i=1, 2, \cdots, k(k<=m-1)
$$

![](https://cdn.jsdelivr.net/gh/liuyaanng/Blog_source@master/blog_images/img/IMG_3729.JPG)

```cpp
class MyHashMap {
public:
    /** Initialize your data structure here. */
    MyHashMap() {
			hashtable = vector<pair<int, int>>(N, {-1, -1});
    }
		auto getHashValue(int key){
			int k = key % N;
			while(hashtable[k].first != key && hashtable[k].first != -1){
				k = (k + 1) % N;
			}
			return k; 
		}

    /** value will always be non-negative. */
    void put(int key, int value) {
			auto k = getHashValue(key);
			hashtable[k] = {key, value};
    }
    
    /** Returns the value to which the specified key is mapped, or -1 if this map contains no mapping for the key */
    int get(int key) {
			auto k = getHashValue(key);
			if(hashtable[k].first == -1){
				return -1;
			}
			return hashtable[k].second;
    }
    
    /** Removes the mapping of the specified value key if this map contains a mapping for the key */
    void remove(int key) {
			auto k = getHashValue(key);
			if(hashtable[k].first != -1){
				hashtable[k].first = -2;
			}
    }
private:
		const static int N = 20011;
		vector<pair<int, int>> hashtable;
};
```

![](https://cdn.jsdelivr.net/gh/liuyaanng/Blog_source@master/blog_images/img/20210319162846.png)

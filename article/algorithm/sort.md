---
title: 八大排序算法js实现
date: 2021-02-21
tags:
  - sort
categories:
  - algorithm
---

### 八大排序归纳

```javascript
// 数组元素位置交换函数
function swap(arr, i, j) {
  arr[i] = arr[i] ^ arr[j]
  arr[j] = arr[i] ^ arr[j]
  arr[i] = arr[i] ^ arr[j]
}
```

#### 稳定排序 Stable

- 若 arr[i] === arr[i +1]，排序后相对次序不改变

##### 冒泡排序 Bubble

- 时间复杂度 O(n^2)

```javascript
/** 冒泡排序
 * @param [Array] arr
 **/
function bubbleSort(arr) {
  if (arr === null || arr.length < 2) {
    return
  }
  for (let end = arr.length - 1; end > 0; end--) {
    for (let i = 0; i < len; i++) {
      if (arr[i] > arr[i + 1]) {
        // 顺序表元素交换位置
        swap(arr, i, i + 1)
      }
    }
  }
}
```

##### 选择排序

- 时间复杂度 O(n^2)

```javascript
/** 选择排序
 * @param [Array] arr
 **/
function selectionSort(arr) {
  if (arr === null || arr.length < 2) {
    return
  }
  for (let i = 0; i < arr.length - 1; i++) {
    let minIndex = i
    for (let j = i + 1; j < arr.length; j++) {
      // 找出第i小的元素的坐标
      minIndex = arr[j] < arr[minIndex] ? j : minIndex
    }
    swap(arr, i, minIndex)
  }
}
```

##### 插入排序

- 时间复杂度 最好 O(n) 最坏 O(n^2)

```javascript
/** 选择排序
 * @param [Array] arr
 **/
function insertionSort(arr) {
  if (arr === null || arr.length < 2) {
    return
  }
  // 保证数组坐标0 ~ i - 1已经有序
  for (let i = 1; i < arr.length; i++) {
    for (let j = i - 1; j >= 0 && arr[j] > arr[j + 1]; j--) {
      swap(arr, j, j + 1)
    }
  }
}
```

##### 归并排序

- 时间复杂度 O(nlogn) 辅助空间 O(n)

```javascript
/**
 * @param Array arr
 **/
function mergeSort(arr) {
  if (arr === null || arr.length < 2) {
    return
  }
  sortProcess(arr, 0, arr.length - 1)
}

/**
 * @param Array arr
 * @param Number L
 * @param NUmber R
 **/
function sortProcess(arr, L, R) {
  if (L === R) {
    return
  }
  let mid = L + ((R - L) >> 1) // (R - L) / 2
  sortProcess(arr, L, mid)
  sortProcess(arr, mid + 1, R)
  merge(arr, L, mid, R)
}

/**
 * @param Array arr
 * @param Number L
 * @param Number mid
 * @param Number R
 **/
function merge(arr, L, mid, R) {
  let help = new Array(R - L + 1)
  let i = 0
  let p1 = L
  let p2 = mid + 1

  while (p1 <= mid && p2 <= R) {
    help[i++] = arr[p1] < arr[p2] ? arr[p1++] : arr[p2++]
  }

  while (p1 <= mid) {
    help[i++] = arr[p1++]
  }

  while (p2 <= R) {
    help[i++] = arr[p2++]
  }

  // 将辅助数组help拷贝到排序数组
  for (i = 0; i < help.length; i++) {
    arr[L + i] = help[i]
  }
}
```

##### 快速排序

- 时间复杂度 O(nlogn) 额外空间复杂的 O(logn)

```javascript
/**
 * @param Array arr
 * @param Number L
 * @param NUmber R
 **/
function quickSort(arr, L, R) {
  if (arr === null || arr.length < 2) {
    return
  }

  if (L < R) {
    swap(arr, L + Math.floor((Math.random() + 1) * (R - L + 1)), R)
    let p = partition(arr, L, R)
    quickSort(arr, L, p[0] - 1)
    quickSort(arr, p[1] + 1, R)
  }
}

function partition(arr, L, R) {
  let less = L - 1
  let more = R + 1
  while (L < more) {
    if (arr[L] < arr[R]) {
      swap(arr, ++less, L++)
    } else if (arr[L] > arr[R]) {
      swap(arr, --more, L)
    } else {
      L++
    }
  }
  swap(arr, more, R)
  return new Array(less + 1, more)
}
```

##### 堆排序

- 时间复杂度 O(logn)

```javascript
/**
 * @param Array arr
 * @param Number L
 * @param NUmber R
 **/
function heapSort(arr, L, R) {
  if (!isArray(arr) || arr.length < 2) {
    return
  }

  // 使数组变为大根堆
  for (let i = 0; i < arr.length; i++) {
    heapInsert(arr, i)
  }
  let heapSize = arr.length
  while (heapSize > 0) {
    heapify(arr, 0, heapSize)
    swap(arr, 0, --heapSize)
  }
}

function heapInsert(arr, index) {
  while (arr[index] > arr[Math.floor((index - 1 < 0 ? 0 : index - 1) / 2)]) {
    swap(arr, index, Math.floor((index - 1 < 0 ? 0 : index - 1) / 2))
    index = Math.floor((index - 1 < 0 ? 0 : index - 1) / 2)
  }
}

function heapify(arr, index, heapSize) {
  let left = index * 2 + 1
  while (left < heapSize) {
    let largest = left + 1 < heapSize && arr[left + 1] > arr[left] ? left + 1 : left
    largest = arr[largest] > arr[index] ? largest : index
    if (largest === index) {
      break
    }
    swap(arr, largest, index) // largest !== index
    index = largest
    left = index * 2 + 1
  }
}
```

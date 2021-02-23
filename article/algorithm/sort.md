---
title: 常见排序算法js实现
date: 2021-02-21
tags:
  - sort
categories:
  - algorithm
---

```javascript
// 数组元素位置交换函数
function swap(arr, i, j) {
  arr[i] = arr[i] ^ arr[j]
  arr[j] = arr[i] ^ arr[j]
  arr[i] = arr[i] ^ arr[j]
}
```

### 稳定排序 Stable

- 若 arr[i] === arr[i +1]，排序后相对次序不改变

### 冒泡排序 Bubble

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

### 选择排序

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

### 插入排序

- 时间复杂度 最好 O(n) 最坏 O(n^2)

#### 简易版

```javascript
/** 选择排序
 * @param [Array] arr
 **/
function insertSort(arr) {
  const len = arr.length
  if (arr === null || len < 2) {
    return
  }

  let preIdx
  let cur
  for (let i = 1; i < len; i++) {
    preIdx = i - 1
    cur = arr[i]

    while (preIdx >= 0 && arr[preIdx] > cur) {
      arr[preIdx + 1] = arr[preIdx]
      preIdx--
    }

    arr[preIdx + 1] = cur
  }

  return arr
}
```

#### 二分法优化版

```javascript
const insertSort = arr.reduce(insert, [])

const insert = (sortedArr, val) => {
  const len = sortedArr.length

  if (!len) {
    sortedArr.push(val)
    return sortedArr
  }

  let i = 0
  let j = len
  let mid

  if (val < sortedArr[i]) {
    sortedArr.unshift(val)
    return sortedArr
  }

  if (val >= sortedArr[len - 1]) {
    sortedArr.push(val)
    return sortedArr
  }

  while (i < j) {
    mid = ((j + i) / 2) | 0

    if (i === mid) {
      break
    }

    if (val < sortedArr[mid]) {
      j = mid
    }

    if (val === sortedArr[mid]) {
      i = mid
      break
    }

    if (val > sortedArr[mid]) {
      i = mid
    }
  }

  let midArr = [val]
  let lastArr = srotedArr.slice(i + 1)

  sortedArr = sortedArr
    .slice(0, i + 1)
    .concat(midArr)
    .concat(lastArr)

  return sortedArr
}
```

### 归并排序

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

### 快速排序

- 时间复杂度 O(nlogn) 额外空间复杂的 O(logn)

- 特点：分治策略。在数组中选取一个基准点 pivot，小于基准点的放左边，大于放右边。

#### 最简单实现

> 空间可优化

```javascript
/**
 * @param {Array}arr
 * @return {Array}
 **/
const quickSort = arr => {
  if (arr.length < 2) {
    return arr.slice()
  }

  const pivot = arr[Math.floor(Math.random() * arr.length)]

  const left = []
  const middle = []
  const right = []

  for (let i = 0; i < arr.length; i++) {
    const curVal = arr[i]
    if (curVal < pivot) {
      left.push(curVal)
    } else if (curVal > pivot) {
      right.push(curVal)
    } else {
      middle.push(curVal)
    }
  }

  return quickSort(left).concat(middle, quickSort(right))
}
```

#### 原地(in-place)操作

```javascript
/**
 * @param {Array}arr
 * @param Number L
 * @param NUmber R
 * @return {Array}
 **/
const quickSort = (arr, L, R) => {
  L = L === void 0 ? 0 : L
  R = R === void 0 ? arr.length - 1 : R

  if (start >= end) {
    return
  }

  let val = arr[L]
  let i = L
  let j = R

  while (i < j) {
    // 找到右边第一个小于基准点的下标并记录
    while (i < j && arr[j] >= val) {
      j--
    }

    if (i < j) {
      arr[i++] = arr[j]
    }

    // 找到左边第一个大于基准点的下标并记录
    while (i < j && arr[i] < val) {
      i++
    }

    if (i < j) {
      arr[j--] = arr[i]
    }
  }

  // 确定val的位置
  arr[i] = val

  quickSort(arr, L, i - 1)
  quickSort(arr, i + 1, R)
}
```

### 堆排序

- 时间复杂度 O(logn)

```javascript
/**
 * @param Array arr
 * @param Number L
 * @param NUmber R
 **/
function heapS ort(arr, L, R) {
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

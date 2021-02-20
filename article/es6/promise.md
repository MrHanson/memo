---
title: ES6 Promise
date: 2021-02-14
categories:
  - ECMAScript
tags:
  - es6
  - promise
---

## What is Promise

Promise 是异步编程的一种解决方案，最早由社区提出，已被写入 ES6 写进语言标准

Promise 具有 pending（进行中）、resolved（已成功）和 rejected（已失败）三种状态，一旦状态改变，不会再变

链式调用（chaining）。then 和 catch 都会返回一个全新的 Promise 注意此时的[[PromiseStatus]]和[[PromiseValue]]默认均为 undefined，需要开发者在应用层进行自定义，可用于连续的请求，解决回调地狱的问题

## How to use

Promise 为 ES6 内置的构造函数，需要使用 new 关键字调用

```ts
// wrong way
let p = new Promise()
// TypeError: Promise resolver undefined is not a function
// 从报错信息可知，调用时需要传入一个函数作为参数，传入函数会被传入 js 引擎自带 `resolve` 和 `reject` 两个内置函数，用于将 Promise 实例的状态`[[PromiseStatus]]`转变为 `RESOLVED` 或 `REJECTED`

// right way
let p = new Promise((resolve, reject) => {
  // request...
  if (success) {
    resolve()
  } else {
    reject()
  }
})
```

## Try to realize

- [x] MyPromise.prototype.constructor
- [x] MyPromise.prototype.then
- [x] MyPromise.prototype.catch
- [x] MyPromise.resolve
- [x] MyPromise.reject
- [x] MyPromise.all
- [x] MyPromise.race

```js
// Talk is cheap, just try it
// constructor
const PENDING = 'pending'
const RESOLVED = 'resolved'
const REJECTED = 'rejected'

function MyPromise(exector) {
  this['[[PromiseStatus]]'] = PENDING
  this['[[PromiseValue]]'] = void 0

  function resolve(val) {
    if (this['[[PromiseStatus]]'] === PENDING) {
      this['[[PromiseStatus]]'] = RESOLVED
      this['[[PromiseValue]]'] = val
    }
  }

  function reject(err) {
    if (this['[[PromiseStatus]]'] === PENDING) {
      this['[[PromiseStatus]]'] = REJECTED
      this['[[PromiseValue]]'] = err
      throw err
    }
  }

  // must be called by 'new' operator
  if (!this instanceof MyPromise) {
    throw 'Vue is a constructor and should be called with the `new` keyword'
  }

  // exector
  if (!exector || typeof exector !== 'function') {
    throw `TypeError: ${exector.toString()} is not a function`
  }

  try {
    exector(resolve, reject)
  } catch (e) {
    reject(e)
  }
}

MyPromise.prototype.then = function(
  onResolved = value => value,
  onRejected = err => {
    throw err
  },
) {
  const that = this

  if (that['[[PromiseStatus]]'] === PENDING) {
    return new MyPromise((resolve, reject) => {
      try {
        setTimeout(onResolved, 0, that['[[PromiseValue]]'])
        resolve(that['[[PromiseValue]]'])
      } catch (e) {
        setTimeout(onRejected, 0, that['[[PromiseValue]]'])
        reject(e)
      }
    })
  }

  if (that['[[PromiseStatus]]'] === RESOLVED) {
    return new MyPromise((resolve, reject) => {
      try {
        setTimeout(onResolved, 0, that['[[PromiseValue]]'])
        resolve(that['[[PromiseValue]]'])
      } catch (e) {
        reject(e)
      }
    })
  }

  if (that['[[PromiseStatus]]'] === REJECTED) {
    return new MyPromise((resolve, reject) => {
      try {
        setTimeout(onRejected, 0, that['[[PromiseValue]]'])
        resolve(that['[[PromiseValue]]'])
      } catch (e) {
        reject(e)
      }
    })
  }
}

MyPromise.prototype.catch = function(onRejected) {
  return this.then(null, onRejected)
}

MyPromise.resolve = function(value) {
  return new MyPromise(resolve => {
    resolve(value)
  })
}

MyPromise.reject = function(value) {
  return new MyPromise((_, reject) => {
    reject(value)
  })
}

MyPromise.all = function(promises = []) {
  if (!Array.isArray(promises)) throw 'expected get Array'

  let count = 0
  let values = []
  return new Promise((resolve, reject) => {
    promises.forEach((promise, index) => {
      promise.then(value => {
        if (count === promises.length) {
          return resolve(values)
        }
        values[index] = value
        count++
      }, reject)
    })
  })
}

MyPromise.race = function(promises = []) {
  if (!Array.isArray(promises)) throw 'expected get Array'

  return new Promise((resolve, reject) => {
    promises.forEach((promise, index) => {
      promise.then(resolve, reject)
    })
  })
}
```

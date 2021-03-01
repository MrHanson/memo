---
title: 总结一下前端流程控制
date: 2021-03-01
tags:
  - progress_control
categories:
  - frontend
---

先来一道闻名各大论坛的面试题`LazyMan`作引子

### 请实现一个 LazyMan，使其按照以下方式调用时，得到相关输出

```javascript
LazyMan('Hank')
// Hi! This is Hank!

LazyMan('Hank')
  .sleep(10)
  .eat('dinner')
// Hi! This is Hank!
// 等待 10s
// Wake up after 10
// Eat dinner~

LazyMan('Hank')
  .eat('dinner')
  .eat('supper')
// Hi! This is Hank!
// Eat dinner
// Eat supper~

LazyMan('Hank')
  .sleepFirst(5)
  .eat('supper')
// 等待5s
// Wake up after 5
// Hi! This is Hank!
// Eat supper
```

简单分析一下题意，题目有如下几点的要求：

- 调用 LazyMan 会返回一个实例，且支持链式调用
- 实例内部维护一个队列，对链式调用的函数依次执行，且在初始化时已生成好完整队列
- `sleep`方法暂停链式调用一段时间，再继续执行
- 特定方法(`sleepFirst`)可优先插入队头

尝试实现

```javascript
class LazyManGennerator {
  tasks = []
  constructor(name) {
    this.tasks = []

    const task = () => {
      console.log(`Hi! This is${name}!`)
      this._next()
    }

    this.tasks.push(task)

    window.setTimeout(() => {
      this._next()
    }, 0)
  }

  _next() {
    const task = this.tasks.shift()
    task && task()
  }

  _sleepTask(time, piror) {
    const task = () => {
      window.setTimeout(() => {
        console.log(`Wake up after ${time}`)
        this._next()
      }, time)
    }
    if (piror) {
      this.tasks.unshift(task)
    } else {
      this.tasks.push(task)
    }
  }

  eat(name) {
    const task = () => {
      console.log(`Eat ${name}`)
      this._next()
    }

    this.tasks.push(task)

    return this
  }

  sleep(time) {
    this._sleepTask(time, false)
    return this
  }

  sleepFirst(time) {
    this._sleepTask(time, true)
    return this
  }
}
function LazyMan(name) {
  return new LazyManGennerator(name)
}
```

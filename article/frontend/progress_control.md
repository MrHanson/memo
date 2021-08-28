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

LazyMan('Hank').sleep(10).eat('dinner')
// Hi! This is Hank!
// 等待 10s
// Wake up after 10
// Eat dinner~

LazyMan('Hank').eat('dinner').eat('supper')
// Hi! This is Hank!
// Eat dinner
// Eat supper~

LazyMan('Hank').sleepFirst(5).eat('supper')
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

- 思路一：每个任务执行完当前任务操作后，调用内部方法`_next`出列下一个任务并执行

```javascript
class LazyManGennerator {
  tasks = []
  constructor(name) {
    this.tasks = []

    this._addTack(() => console.log(`Hi! This is${name}!`))

    window.setTimeout(() => {
      this._next()
    }, 0)
  }

  _addTask(callback, piror = false, async = false, delay = 0) {
    let task = () => {
      callback && callback()
      this._next()
    }

    if (async) {
      task = () => {
        window.setTime(task, delay)
      }
    }

    if (piror) {
      this.tasks.unshift(task)
    } else {
      this.tasks.push(task)
    }
  }

  _next() {
    const task = this.tasks.shift()
    task && task()
  }

  _sleepTask(time, piror) {
    this._addTask(
      () => {
        console.log(`Wake up after ${time}`)
      },
      piror,
      true,
      time,
    )
  }

  eat(name) {
    this._addTask(() => console.log(`Eat ${name}`))
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

- 思路二：巧用 Promise 进行链式调用

```javascript
class LazyManGennerator {
  queue: Array<Function> = []
  name: string
  constructor(name) {
    this.name = name
    this.sayName(name)
    Promise.resolve().then(() => {
      let sequence = Promise.resolve()
      this.queue.forEach(item => {
        sequence = sequence.then(item)
      })
    })
  }

  sayName(name) {
    this.queue.push(() => {
      console.log(`Hi! this is ${name}!`)
    })
    return this
  }

  eat(meal) {
    this.queue.push(() => {
      console.log(`eat ${meal}`)
    })
    return this
  }

  _holdOn(time) {
    return () =>
      new Promise(resolve => {
        setTimeout(() => {
          console.log(`Wake up after ${time} second`)
          resolve()
        }, time * 1000)
      })
  }

  sleep(time) {
    this.queue.push(this._holdOn(time))
    return this
  }

  sleepFirst(time) {
    this.queue.unshift(this._holdOn(time))
    return this
  }
}

const LazyMan = name => new LazyManGennerator(name)
```

### 流程控制在前端应用相当广泛，从日常业务到框架，库底层，无处不在

- Node.js http 请求类库[connect](https://github1s.com/senchalabs/connect/blob/master/index.js)

  - 内部维护一个队列`stacks`维护通过`app.use`添加的中间件
  - 然后依次递归调用`next`方法依次出栈

- [express](https://github1s.com/expressjs/express/blob/HEAD/lib/express.js) 则是`connect`的升级版

> 以上两种通过`stacks`维护中间件方式，在遇到异步中间件时会稍显无力。于是也遍有了 [Koa.js](https://github1s.com/koajs/compose/blob/HEAD/index.js) 以及其著名的`洋葱模型`

- 简单分析一下`Koa.js`的`洋葱模型`

下面是核心函数 compose 函数的源码

```javascript
function compose(middleware) {
  if (!Array.isArray(middleware)) throw new TypeError('Middleware stack must be an array!')
  for (const fn of middleware) {
    if (typeof fn !== 'function') throw new TypeError('Middleware must be composed of functions!')
  }

  /**
   * @param {Object} context
   * @return {Promise}
   * @api public
   */

  return function (context, next) {
    // last called middleware # 记录最后调用中间件的索引
    let index = -1
    // 执行第一个中间件
    return dispatch(0)
    function dispatch(i) {
      if (i <= index) return Promise.reject(new Error('next() called multiple times'))
      index = i
      // 取出当前中间件函数
      let fn = middleware[i]

      // 执行到圆心
      if (i === middleware.length) fn = next
      if (!fn) return Promise.resolve()
      try {
        // 传入dispatch作为next参展，以调用下一中间件
        return Promise.resolve(fn(context, dispatch.bind(null, i + 1)))
      } catch (err) {
        return Promise.reject(err)
      }
    }
  }
}
```

- 生成器自动执行类库 [co](https://github.com/tj/co)
- 状态管理类库 redux
- so on...

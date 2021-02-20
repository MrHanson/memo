---
title: 多进程 Chrome 浏览器
date: 2021-02-21
tags:
  - chrome
categories:
  - browser
---

## chrome 主要工作进程

- **浏览器进程**。主要负责界面显示、用户交互、子进程管理，同时提供存储等功能。

- **渲染进程**。

  > 核心任务是将 HTML、CSS 和 JavaScript 转换为用户可以与之交互的网页，排版引擎 Blink 和 JavaScript 引擎 V8 都是运行在该进程中，默认情况下，Chrome 会为每个 Tab 标签创建一个渲染进程。出于安全考虑，渲染进程都是运行在沙箱模式下。

  - 同一站点（**相同**的*协议*和*根域名*）会复用渲染进程

- **GPU 进程**。其实，Chrome 刚开始发布的时候是没有 GPU 进程的。而 GPU 的使用初衷是为了实现 3D CSS 的效果，只是随后网页、Chrome 的 UI 界面都选择采用 GPU 来绘制，这使得 GPU 成为浏览器普遍的需求。最后，Chrome 在其多进程架构上也引入了 GPU 进程。

- **网络进程**。主要负责页面的网络资源加载，之前是作为一个模块运行在浏览器进程里面的，直至最近才独立出来，成为一个单独的进程。插件进程。主要是负责插件的运行，因插件易崩溃，所以需要通过插件进程来隔离，以保证插件进程崩溃不会对浏览器和页面造成影响

- **插件进程**。主要是负责插件的运行，因插件易崩溃，所以需要通过插件进程来隔离，以保证插件进程崩溃不会对浏览器和页面造成影响。

## 浏览器请求&响应

![request & response](https://static001.geekbang.org/resource/image/1b/6c/1b49976aca2c700883d48d927f48986c.png)

### 浏览器发起 HTTP 请求流程

1. 构建请求

2. 查找缓存

   - [Http cache](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Caching_FAQ)

3. 准备 IP 地址和端口

   - DNS 域名映射
   - HTTP 默认端口 80

4. 等待 TCP 队列

   - Chrome 机制：同一域名最多建立 6 个 TCP 连接，超过限制的请求则会进入等待状态

5. TCP 连接

6. 发送 HTTP 请求
   - 请求行
     - URL
     - method
   - 请求头
     - Connection: keep-alive (_保持 TCP 连接可以省去下次请求时需要建立连接的时间，提升资源加载速度_)
     - Content-Type
     - method
     - [Http cache](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Caching_FAQ)
     - Cookie
     - User-Agent
     - ....
   - 请求体
     - payload/form-data
     - text
     - ....

### 服务端响应请求

- 响应头

  - Status Code
  - Cors-header
  - Set-Cookie 服务端对 cookie 进行写入操作

  - Content-Type
    > 告诉浏览器响应的数据格式，常见格式如下：
    - text/plain
    - application/json
    - ...

- 响应体（响应数据）

## Q&A

### 从输入 URL 到页面展示，中间发生了什么

1. 根据用户输入判断是信息搜索（调用搜索引擎进行搜索）或者是符合 URL 规则的内容

2. 用户敲击回车，触发浏览器的[`beforeunload`](https://developer.mozilla.org/en-US/docs/Web/API/Window/beforeunload_event)事件，没有监听该事件或同意后续流程，标签页进入加载状态

3. *浏览器进程*通过[进程间通信](https://zh.wikipedia.org/wiki/%E8%A1%8C%E7%A8%8B%E9%96%93%E9%80%9A%E8%A8%8A) IPC 把 URL 请求发送至*网络进程*，由*网络进程*发起网络请求。一般会先进行缓存资源查找，没有对应的资源再请求。若用户输入的是域名，则会进行 DNS 解析，获取 IP，然后利用 IP 和服务器建立 TCP 连接，默认发送 HTTP 请求

4. 浏览器会为每个页面分配一个渲染进程，根据响应头的`Content-Type`，做好准备。**同一站点（**相同**的*协议*和*根域名*）会服用同一个渲染进程**

5. *渲染进程*准备好后，会进行“**提交文档**”，即通知*浏览器进程*清理当前旧文档，然后*浏览器进程*发出“确认提交”的信息给*渲染进程*，*浏览器进程*更新界面状态如安全状态、地址栏 URL、前进后退历史状态，并更新 Web 界面

6. *渲染进程*开始页面解析和子资源加载

   1. 构建**DOM 树**
   2. 样式计算（Recalculate Style）；遵循[CSS 层叠上下文和属性继承](https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Cascade_and_inheritance)规则，合成**UserAgent 默认样式**和**自定义样式**为**ComputedStyle**，构建**CSS 树**
   3. 布局阶段。将**DOM 树**和**CSS 树**合成**布局树**(Layout Tree)

   ![chrome render](https://static001.geekbang.org/resource/image/8e/0e/8e48b77dd48bdc509958e73b9935710e.png)

   4. 对布局树进行分层，生成**分层树** (Layer)

   5. 为每个图层生成**绘制列表**（Paint），并将其提交到合成线程。

   6. 合成线程将图层分成**图块**（Tiles），并在**光栅化线程池**（Raster task）中将图块转换成位图。若栅格化操作使用了 GPU，则会使用**GPU 线程**进行跨进程操作

   7. 合成线程发送绘制图块命令**DrawQuad**给浏览器进程。

   8. 浏览器进程根据 DrawQuad 消息生成页面，并显示到显示器上。

### Reflow（重排） 与 Repaint（重绘）的区别

- Reflow

  ![Reflow](https://static001.geekbang.org/resource/image/b3/e5/b3ed565230fe4f5c1886304a8ff754e5.png)

- Repaint ![Repaint](https://static001.geekbang.org/resource/image/3c/03/3c1b7310648cccbf6aa4a42ad0202b03.png)

- 直接合成 ![Mix](https://static001.geekbang.org/resource/image/02/2c/024bf6c83b8146d267f476555d953a2c.png)

## 参考文献

- [浏览器工作原理与实践](https://time.geekbang.org/column/intro/216)
- MDN

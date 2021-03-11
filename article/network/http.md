---
title: 理解http
date: 2021-03-11
categories:
  - network
tag:
  - http
---

## HTTP/1

### HTTP/0.9

- 没有HTTP 请求头和请求体

- 没有HTTP 响应头和响应体

- 返回的文件内容是以 ASCII 字符流来传输

### HTTP/1.0

- 支持多种类型的文件下载

- 增加请求头和响应头

  - 请求头加入*用户代理*字段

- 引入*状态码*

- 提供Cache机制

### HTTP/1.1

- 持久连接 (request header: keep-alive)
 
  - 默认开启，可主动关闭`Connection: close`

  - 对于同一个域名，默认允许同时建立 6 个 TCP 持久连接

  - 能减少 TCP 的建立和断开次数，但是它需要等待前面的请求返回之后，才能进行下一次请求，引发**队头阻塞**
    > HTTP/1.1 中试图通过管线化的技术来解决队头阻塞的问题。HTTP/1.1 中的管线化是指将多个 HTTP 请求整批提交给服务器的技术，虽然可以整批发送请求，不过服务器依然需要根据请求顺序来回复浏览器的请求。

- 对动态生成的内容提供了完美支持
  
  - 不过随着服务器端的技术发展，很多页面的内容都是动态生成的，因此在传输数据之前并不知道最终的数据大小，这就导致了浏览器不知道何时会接收完所有的文件数据。

  - HTTP/1.1 通过引入 Chunk transfer 机制来解决这个问题，服务器会将数据分割成若干个任意大小的数据块，每个数据块发送时会附上上个数据块的长度，最后使用一个零长度的块作为发送数据完成的标志。这样就提供了对动态内容的支持。

- 引入了客户端 Cookie 机制和安全机制

## HTTP/2 (2015 年 5 月正式发布)

- 多路复用
  > 一个域名只使用一个 TCP 长连接和消除队头阻塞问题

  ![multi_reuse](https://static001.geekbang.org/resource/image/0a/00/0a990f86ad9c19fd7d7620b2ef7ee900.jpg)
  
  - 具体实现

  ![multi_realize](https://static001.geekbang.org/resource/image/86/6a/86cdf01a3af7f4f755d28917e58aae6a.png)

- 可以设置请求的优先级

- 服务器推送

- 头部压缩

## HTTP/3

- HTTP 2.0的局限性

  - HTTP/2 基于TCP协议，在 TCP 传输过程中，有几率因单个数据包的丢失而造成阻塞—— TCP 上的队头阻塞

  - TCP 建立连接的延时

  - TCP 协议僵化（太多中间设备与操作系统依赖该协议）

于是有了`QUIC`

![quic](https://static001.geekbang.org/resource/image/0b/c6/0bae470bb49747b9a59f9f4bb496a9c6.png)

- 实现了类似 TCP 的流量控制、传输可靠性的功能

- 集成了 TLS 加密功能

- 实现了 HTTP/2 中的多路复用功能

- 实现了快速握手功能

## 参考文献

- [浏览器工作原理与实践 - 浏览器中的网络](https://time.geekbang.org/column/article/147501)

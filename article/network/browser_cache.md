---
title: 浏览器缓存一问就发懵
date: 2021-03-07 20:00:00
tags:
  - cache
  - browser
categories:
  - network
---

## 浏览器缓存概念与分类

- 按位置分类

  - 内存缓存 (from memory cache)
    - 快速读取
    - 时效性
  - 硬盘缓存 (from disk cache)
  - service worker

- 按策略分类
  - 强缓存
    > **优先级高**，缓存有效期内不会因为资源的改动而发送请，适用于大型且不易修改的资源文件。可为文件名加入 hash 标识进行版本的区分
    - Expires（HTTP/1.0）
      > 使用客户端的时间与服务端返回的时间做对比
    - Cache-Control（HTTP/1.1，优先级高于 Expires）
      - no-cache
        > 客户端缓存内容，但是是否使用缓存则需要经过协商缓存来验证决定
      - max-age=xxx(xxx is numeric)
        > 缓存内容将在 xxx 秒后失效
      - no-store
        > 所有内容都不会被缓存，即不使用强制缓存，也不使用协商缓存
      - public
        > 所有内容都将被缓存（客户端和代理服务器都可缓存）
      - private
        > 所有内容只有客户端可以缓存，Cache-Control 的默认取值
  - 协商缓存
    > **灵活性高**，适用于数据缓存。生效返回`304`
    - Etag (优先级较高)
      - Etag
        > 响应头（response headers），返回当前资源文件的一个唯一标识(由服务器生成)
        - etag 的生成策略，参考中间件[koa-etag](https://github.com/koajs/etag)
      - If-None-Match
        > 请求头（request headers）字段，客户端再次发起该请求时，携带上次请求返回的唯一标识 Etag 值，通过此字段值告诉服务器该资源上次请求返回的唯一标识值。服务器收到该请求后，发现该请求头中含有 If-None-Match，则会根据 If-None-Match 的字段值与该资源在服务器的 Etag 值做对比，一致则返回 304，代表资源无更新，继续使用缓存文件；不一致则重新返回资源文件，状态码为 200。If-Modified-Since > 请求头（request headers）字段

## 缓存与浏览器操作

| 浏览器相关操作   | Expires/Cache-Control | Last-Modified/etag |
| ---------------- | --------------------- | ------------------ |
| 在地址栏中按回车 | 有效                  | 有效               |
| 页面跳转         | 有效                  | 有效               |
| 新开窗口         | 有效                  | 有效               |
| 浏览器前进、退后 | 有效                  | 有效               |
| 浏览器刷新       | 无效                  | 有效               |
| 强制刷新         | 无效                  | 无效               |

## 参考文献

[彻底理解浏览器缓存](https://juejin.cn/post/6844903593275817998) [浏览器缓存机制剖析](https://mp.weixin.qq.com/s?__biz=MjM5MTA1MjAxMQ==&mid=2651226347&idx=1&sn=6dbccc54406f0b075671884b738b1e88&chksm=bd49596f8a3ed079f79cda4b90ac3cb3b1dbdb5bfb8aade962a16a323563bf26a0c75b0a5d7b&scene=21#wechat_redirect)

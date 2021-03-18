---
title: web安全必知必会
date: 2021-03-17
tags:
  - csrf
  - xss
  - web-safe
categories:
  - network
---

## 跨域与同源策略

### 同源策略

> 两个URL的*协议*，*端口*，*域名*都相同，称这两个URL为同源

- Dom层面。非同源站点无法通过[`window.opener`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/opener)相互之间操作dom

- 数据层面。非同源站点无法读取该站点Cookie、IndexDB、LocalStorage

- 网络层面。限制通过ajax向非同源站点发送请求

### 解决跨域手段

- document.domain + iframe（只有在主域相同时，有效）

- jsonp（json with padding）

- 跨域资源共享（CORS）

- web sockets

## XSS（Cross Site Scripting）跨站脚本

### 危害

- 窃取 Cookie 信息

- 监听用户行为

- 修改 DOM

- 在页面内生成浮窗广告

### 恶意脚本如何注入

- 存储型 XSS 攻击

  - 利用站点漏洞将一段恶意 JavaScript 代码提交到网站的数据库

  - 用户向网站请求包含了恶意 JavaScript 脚本的页面

    ![xss](https://static001.geekbang.org/resource/image/2e/14/2ed3d8b93035df3c2bcfcc223dc47914.png)

  > 应对措施：站点对`script`等关键字进行过滤，可参考知名开源库[js-xss](https://github.com/leizongmin/js-xss)

- 反射型 XSS 攻击

  恶意 JavaScript 脚本通过url（路由）传参的方式，显示在页面

  `http://localhost:3000/?xss=<script>alert('xss')</script>`

  此时若页面直接显示`xss`的值，则会让恶意脚本有机可乘！


- 基于 DOM 的 XSS 攻击

  > 在 Web 资源传输过程或者在用户使用页面的过程中修改 Web 页面的数据

  - DNS劫持

  - Wifi劫持

  - 本地恶意软件

> 应对措施：Cookie HttpOnly，[内容安全策略( CSP )](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/CSP)

## CSRF（Cross-site request forgery）跨站请求伪造

> 黑客利用了用户的登录状态的跨站请求

### 如何防护

- Cookie 的 [SameSite](https://web.dev/samesite-cookies-explained/)

- 验证请求的来源站点
  
  - 请求头 Referer

  - 请求头 Origin

- Token
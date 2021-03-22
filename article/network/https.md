---
title: 了解HTTPS
date: 2021-03-18 23:31:00
categories:
  - network
tag:
  - http
---

## HTTPS诞生的缘由

> 由于*HTTP*(Hypertext Transfer Protocol)协议是明文传输超文本的, 因此在传输环节中数据有可能会被窃取或篡改

![why https](https://static001.geekbang.org/resource/image/11/e2/118ced11537bd1e257f8df09380f33e2.png)

## HTTPS如何加密

![how to encrypt](https://static001.geekbang.org/resource/image/9e/cf/9e99f797de30a15a11b0e4b4c8f810cf.png)

- 使用对称加密

> 缺点: 传输 client-random 和 service-random 的过程却是明文的

![symmetrical encryption](https://static001.geekbang.org/resource/image/d8/3b/d86648267d5504c7813b2d692620503b.png)

- 非对称加密

> 缺点: 无法保证服务器发送给浏览器的数据安全

![asymmetric encryption](https://static001.geekbang.org/resource/image/b2/50/b2b893921491c62b29aaddc1d4fa9550.png)

- 对称加密和非对称加密搭配使用

> 缺点: 黑客通过DNS劫持替换访问的IP地址, 在自己的服务器上实现公钥和私钥

![composite encryption](https://static001.geekbang.org/resource/image/d5/45/d5cd34dbf3636ebc0e809aa424c53845.png)

- 添加CA（Certificate Authority）颁发的数字证书（Digital Certificate)

作用:
  - 通过数字证书向浏览器证明服务器的身份

  - 数字证书里面包含了服务器公钥

![Certificate](https://static001.geekbang.org/resource/image/77/af/77c852ff2202b2b7bb3299a96a0f4aaf.png)

如何申请数字证书:

  1. 网站主办方准备公钥和私钥

  2. 向CA机构提交公钥、站点等信息, 该过程可能需要收费

  3. CA 通过线上、线下等多种渠道来验证极客时间所提供信息的真实性

  4. 信息审核通过，CA 会向网站主办方签发认证的数字证书(包含数字证书, 公钥, CA的有效信息, 有效时间等)以及 一个CA生成的签名

浏览器如何验证数字证书:

  1. 浏览器读取证书中相关的明文信息，采用 CA 签名时相同的 Hash 函数来计算并得到信息摘要 A

  2. 利用对应 CA 的公钥解密签名数据，得到信息摘要 B

  3. 对比信息摘要 A 和信息摘要 B，如果一致，则可以确认证书是合法的

## 参考文献

- [维基百科](https://en.wikipedia.org/wiki/HTTPS)

- [HTTPS：让数据传输更安全](https://time.geekbang.org/column/article/156181)
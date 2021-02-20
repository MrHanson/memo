---
title: TCP与UDP必知必会
date: 2021-02-14
categories:
  - network
tag:
  - tcp
  - upd
---

>

## TCP(Transmission Control Protocol)

### [What](https://zh.wikipedia.org/wiki/%E4%BC%A0%E8%BE%93%E6%8E%A7%E5%88%B6%E5%8D%8F%E8%AE%AE)

- 可靠，有状态
- 基于字节流的传输层通信协议

### How

![Detail](https://upload.wikimedia.org/wikipedia/commons/f/f6/Tcp_state_diagram_fixed_new.svg)

#### 连接创建(三次握手 three-way handshake)

> 一对终端同时初始化一个它们之间的连接是可能的。但通常是由一端打开一个套接字（socket）然后监听来自另一方的连接，这就是通常所指的被动打开（passive open）。服务器端被被动打开以后，用户端就能开始创建主动打开（active open）

![three-way handshake](https://upload.wikimedia.org/wikipedia/commons/3/3f/Connection_TCP.png)

1. *客户端*发送随机序列号为**A**的**SYN**给*服务端*
2. *服务端*接收成功后，将收到的序列号**A**设置为**A+1**，并将其设为**ACK**确认码，即**ACK=A+1**。同时产生一个随机序列号为**B**的**SYN**。两者组合成**SYN/ACK**包，回送给客户端
3. *客户端*收到**SYN/ACK**后，再发送一个**SYN/ACK**包，此时**SYN=A+1**，**ACK=B+1**

#### 数据传送

- 基于重复累计确认的重复
- 超时重传
- 流量控制
- [拥塞控制](https://zh.wikipedia.org/wiki/%E6%8B%A5%E5%A1%9E%E6%8E%A7%E5%88%B6)

#### 连接终止(四次挥手)

![four-way handshake](https://upload.wikimedia.org/wikipedia/commons/thumb/2/2d/Deconnection_TCP.png/220px-Deconnection_TCP.png)

- 连接可以工作在 TCP 半开状态。即一侧关闭了连接，不再发送数据；但另一侧没有关闭连接，仍可以发送数据。已关闭的一侧仍然应接收数据，直至对侧也关闭了连接。

- 也可以通过测三次握手关闭连接。主机 A 发出 FIN，主机 B 回复 FIN & ACK，然后主机 A 回复 ACK.

#### [Why do we need a 3-way handshake? Why not just 2-way?](https://networkengineering.stackexchange.com/questions/24068/why-do-we-need-a-3-way-handshake-why-not-just-2-way)

> 翻译自 stackoverflow 的高赞回复

- *TCP*协议中，通讯的两端跟踪他们已经发送的序列号。有效地。接收方通过发送方的序列号来确认他们所接受的数据。

- 但是序列号从*ISN（Initial Sequence Number 初始序列号：一个随机数）*非零开始递增。因为*TCP*是一个双向的通讯协议，通讯的两端都可以“发声”，所以两端都必须随机生成 ISN 作为他们的初始序列号。也就是意味着，两端都需要获悉另外一方的*ISN*

- 两次握手仅仅能让其中一端通过发送*ISN*建立连接，另一端确认（_ACK_），没有达到双向连接和确认的效果

### 应用

- Http

- DoS 攻击：伪造 TCP 报文

## UDP(User Datagram Protocol)

### [What](https://zh.wikipedia.org/wiki/%E7%94%A8%E6%88%B7%E6%95%B0%E6%8D%AE%E6%8A%A5%E5%8D%8F%E8%AE%AE)

- 不可靠，无连接
- 简单的面向数据报的通信协议

### 应用

- (公网/局域网)DNS 域名系统
- 本地 host

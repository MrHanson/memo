(window.webpackJsonp=window.webpackJsonp||[]).push([[19],{519:function(e,t,r){"use strict";r.r(t);var s=r(6),v=Object(s.a)({},(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[r("h2",{attrs:{id:"跨域与同源策略"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#跨域与同源策略"}},[e._v("#")]),e._v(" 跨域与同源策略")]),e._v(" "),r("h3",{attrs:{id:"同源策略"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#同源策略"}},[e._v("#")]),e._v(" 同源策略")]),e._v(" "),r("blockquote",[r("p",[e._v("两个URL的"),r("em",[e._v("协议")]),e._v("，"),r("em",[e._v("端口")]),e._v("，"),r("em",[e._v("域名")]),e._v("都相同，称这两个URL为同源")])]),e._v(" "),r("ul",[r("li",[r("p",[e._v("Dom层面。非同源站点无法通过"),r("a",{attrs:{href:"https://developer.mozilla.org/zh-CN/docs/Web/API/Window/opener",target:"_blank",rel:"noopener noreferrer"}},[r("code",[e._v("window.opener")]),r("OutboundLink")],1),e._v("相互之间操作dom")])]),e._v(" "),r("li",[r("p",[e._v("数据层面。非同源站点无法读取该站点Cookie、IndexDB、LocalStorage")])]),e._v(" "),r("li",[r("p",[e._v("网络层面。限制通过ajax向非同源站点发送请求")])])]),e._v(" "),r("h3",{attrs:{id:"解决跨域手段"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#解决跨域手段"}},[e._v("#")]),e._v(" 解决跨域手段")]),e._v(" "),r("ul",[r("li",[r("p",[e._v("document.domain + iframe（只有在主域相同时，有效）")])]),e._v(" "),r("li",[r("p",[e._v("jsonp（json with padding）")])]),e._v(" "),r("li",[r("p",[e._v("跨域资源共享（CORS）")])]),e._v(" "),r("li",[r("p",[e._v("web sockets")])])]),e._v(" "),r("h2",{attrs:{id:"xss-cross-site-scripting-跨站脚本"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#xss-cross-site-scripting-跨站脚本"}},[e._v("#")]),e._v(" XSS（Cross Site Scripting）跨站脚本")]),e._v(" "),r("h3",{attrs:{id:"危害"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#危害"}},[e._v("#")]),e._v(" 危害")]),e._v(" "),r("ul",[r("li",[r("p",[e._v("窃取 Cookie 信息")])]),e._v(" "),r("li",[r("p",[e._v("监听用户行为")])]),e._v(" "),r("li",[r("p",[e._v("修改 DOM")])]),e._v(" "),r("li",[r("p",[e._v("在页面内生成浮窗广告")])])]),e._v(" "),r("h3",{attrs:{id:"恶意脚本如何注入"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#恶意脚本如何注入"}},[e._v("#")]),e._v(" 恶意脚本如何注入")]),e._v(" "),r("ul",[r("li",[r("p",[e._v("存储型 XSS 攻击")]),e._v(" "),r("ul",[r("li",[r("p",[e._v("利用站点漏洞将一段恶意 JavaScript 代码提交到网站的数据库")])]),e._v(" "),r("li",[r("p",[e._v("用户向网站请求包含了恶意 JavaScript 脚本的页面")]),e._v(" "),r("p",[r("img",{attrs:{src:"https://static001.geekbang.org/resource/image/2e/14/2ed3d8b93035df3c2bcfcc223dc47914.png",alt:"xss"}})])])]),e._v(" "),r("blockquote",[r("p",[e._v("应对措施：站点对"),r("code",[e._v("script")]),e._v("等关键字进行过滤，可参考知名开源库"),r("a",{attrs:{href:"https://github.com/leizongmin/js-xss",target:"_blank",rel:"noopener noreferrer"}},[e._v("js-xss"),r("OutboundLink")],1)])])]),e._v(" "),r("li",[r("p",[e._v("反射型 XSS 攻击")]),e._v(" "),r("p",[e._v("恶意 JavaScript 脚本通过url（路由）传参的方式，显示在页面")]),e._v(" "),r("p",[r("code",[e._v("http://localhost:3000/?xss=<script>alert('xss')<\/script>")])]),e._v(" "),r("p",[e._v("此时若页面直接显示"),r("code",[e._v("xss")]),e._v("的值，则会让恶意脚本有机可乘！")])]),e._v(" "),r("li",[r("p",[e._v("基于 DOM 的 XSS 攻击")]),e._v(" "),r("blockquote",[r("p",[e._v("在 Web 资源传输过程或者在用户使用页面的过程中修改 Web 页面的数据")])]),e._v(" "),r("ul",[r("li",[r("p",[e._v("DNS劫持")])]),e._v(" "),r("li",[r("p",[e._v("Wifi劫持")])]),e._v(" "),r("li",[r("p",[e._v("本地恶意软件")])])])])]),e._v(" "),r("blockquote",[r("p",[e._v("应对措施：Cookie HttpOnly，"),r("a",{attrs:{href:"https://developer.mozilla.org/zh-CN/docs/Web/HTTP/CSP",target:"_blank",rel:"noopener noreferrer"}},[e._v("内容安全策略( CSP )"),r("OutboundLink")],1)])]),e._v(" "),r("h2",{attrs:{id:"csrf-cross-site-request-forgery-跨站请求伪造"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#csrf-cross-site-request-forgery-跨站请求伪造"}},[e._v("#")]),e._v(" CSRF（Cross-site request forgery）跨站请求伪造")]),e._v(" "),r("blockquote",[r("p",[e._v("黑客利用了用户的登录状态的跨站请求")])]),e._v(" "),r("h3",{attrs:{id:"如何防护"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#如何防护"}},[e._v("#")]),e._v(" 如何防护")]),e._v(" "),r("ul",[r("li",[r("p",[e._v("Cookie 的 "),r("a",{attrs:{href:"https://web.dev/samesite-cookies-explained/",target:"_blank",rel:"noopener noreferrer"}},[e._v("SameSite"),r("OutboundLink")],1)])]),e._v(" "),r("li",[r("p",[e._v("验证请求的来源站点")]),e._v(" "),r("ul",[r("li",[r("p",[e._v("请求头 Referer")])]),e._v(" "),r("li",[r("p",[e._v("请求头 Origin")])])])]),e._v(" "),r("li",[r("p",[e._v("Token")])])])])}),[],!1,null,null,null);t.default=v.exports}}]);
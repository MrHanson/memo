---
title: 入门webgl
date: 2021-02-23
tags:
  - webgl
categories:
  - graphic
---

> WebGL 基于 OpenGL ES2.0，提供了 3D 图形 API 用于实现交互式三维动画的制作

- WebGL 以 Canvas 作为载体，需要两种着色器来实现图形的各种渲染

  - 定点着色器（vertexShader）
  - 片元着色器（fragmentShader）

![shader](https://upload-images.jianshu.io/upload_images/1632709-709f62c5de514a34.png?imageMogr2/auto-orient/strip|imageView2/2/format/webp)

- 着色器由强类型语言 GLSL（openGL Shader Language）编写而成

### GLSL 内置属性及变量类型

#### 变量类型

- vec4：包含四个浮点元素的`容器类型`,类似的还有 vec2、vec3

#### 一般用于定点着色器

- gl_Position：所接收的坐标所在坐标系是`裁剪坐标系`，包含 X, Y, Z，W 四个坐标分量，顶点着色器接收到这个坐标之后，对它进行透视除法，即将各个分量同时除以 W，转换成 NDC 坐标，NDC 坐标每个分量的取值范围都在【-1, 1】之间

- gl_PointSize：绘制到屏幕的点的大小

#### 一般用于片元着色器

- gl_FragColor：片元颜色，包含 R, G, B, A 四个颜色分量，且每个分量的取值范围在【0,1】之间

### WebGL 应用创建流程

- 获取上下文

```javascript
function getContext(canvas) {
  return canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
}

let gl = getContext(canvasRef)
```

- 创建着色器

准备好着色器代码

```html
<script type="shader-source" id="vertexShader">
  //浮点数设置为中等精度
  precision mediump float;
  //接收 JavaScript 传递过来的点的坐标（X, Y）
  attribute vec2 a_Position;
  // 接收canvas的尺寸。
  attribute vec2 a_Screen_Size;
  void main(){
  	// 将 canvas 的坐标值 转换为 [-1.0, 1.0]的范围。
  	vec2 position = (a_Position / a_Screen_Size) * 2.0 - 1.0;
  	// canvas的 Y 轴坐标方向和 设备坐标系的相反。
  	position = position * vec2(1.0, -1.0);
  	// 最终的顶点坐标。
  	gl_Position = vec4(position, 0.0, 1.0);
  	// 点的大小。
  	gl_PointSize = 10.0;
  }
</script>
<script type="shader-source" id="fragmentShader">
  //浮点数设置为中等精度
  precision mediump float;
  //全局变量，用来接收 JavaScript传递过来的颜色。
  uniform vec4 u_Color;
  void main(){
  	// 将颜色处理成 GLSL 允许的范围[0， 1]。
  	vec4 color = u_Color / vec4(255, 255, 255, 1);
  	// 点的最终颜色。
  	gl_FragColor = color;
  }
</script>
```

编译着色器代码

```javascript
// 工具函数
function $$(str) {
  if (!str) return null
  if (str.startsWith('#')) {
    return document.querySelector(str)
  }
  let result = document.querySelectorAll(str)
  if (result.length == 1) {
    return result[0]
  }
  return result
}

function createShaderFromScript(gl, type, scriptId) {
  let sourceScript = $$('#' + scriptId)
  if (!sourceScript) {
    return null
  }
  return createShader(gl, type, sourceScript.innerHTML)
}

function createShader(gl, type, source) {
  let shader = gl.createShader(type)
  gl.shaderSource(shader, source)
  gl.compileShader(shader)
  //检测是否编译正常。
  let success = gl.getShaderParameter(shader, gl.COMPILE_STATUS)
  if (success) {
    return shader
  }
  console.error(gl.getShaderInfoLog(shader))
  gl.deleteShader(shader)
}

// 主代码
let vertexShader = createShaderFromScript(
  gl,
  gl.VERTEX_SHADER /* 片元着色器为 gl.FRAGMENT_SHADER */,
  'vertexShader',
)
```

- 创建着色器程序

```javascript
function createSimpleProgram(gl, vertexShader, fragmentShader) {
  if (!vertexShader || !fragmentShader) {
    console.warn('着色器不能为空')
    return
  }
  let program = gl.createProgram()
  gl.attachShader(program, vertexShader)
  gl.attachShader(program, fragmentShader)
  gl.linkProgram(program)
  let success = gl.getProgramParameter(program, gl.LINK_STATUS)
  if (success) {
    return program
  }
  console.error(gl.getProgramInfoLog(program))
  gl.deleteProgram(program)
}

//创建着色器程序
let program = createSimpleProgram(gl, vertexShader, fragmentShader)
//使用该着色器程序
gl.useProgram(program)
```

- 绘制图元

```javascript
//绘制函数
function render(gl) {
  //清除屏幕
  gl.clear(gl.COLOR_BUFFER_BIT)
  for (let i = 0; i < points.length; i++) {
    let color = points[i].color
    //向片元着色器传递颜色信息
    gl.uniform4f(u_Color, color.r, color.g, color.b, color.a)
    //向顶点着色器传递坐标信息。
    gl.vertexAttrib2f(a_Position, points[i].x, points[i].y)
    //绘制点。
    gl.drawArrays(gl.POINTS, 0, 1)
  }
}
//设置屏幕清除颜色为黑色。
gl.clearColor(0, 0, 0, 1.0)
//绘制
render(gl)
```

### 参考文献

[WebGL 入门](https://www.jianshu.com/p/9636fdd61937)

```

```

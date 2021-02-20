---
title: Webpack常用plugin与loader
date: 2021-02-21
tags:
  - webpack
categories:
  - frontend
---

## plugin

### 内置 Plugin

- [Webpack.DefinePlugin](https://webpack.js.org/plugins/define-plugin/#root) 声明全局变量

- [Webpack.BannerPlugin](https://webpack.js.org/plugins/banner-plugin/#root) 版权声明

- [Webpack.IgnorePlugin](https://webpack.js.org/plugins/ignore-plugin/#root) 优化构建体积，忽略引入包

- [Webpack.DllPlugin](https://webpack.js.org/plugins/dll-plugin/#dllplugin) 动态链接库，分离依赖包（在独立的 dll 配置文件内使用）

- [Webpack.DllReferencePlugin](https://webpack.js.org/plugins/dll-plugin/#dllreferenceplugin) 动态链接引入插件（在主配置文件内使用）

- [SplitChunksPlugin](https://webpack.js.org/plugins/split-chunks-plugin/) 用于多页应用，抽离公用代码

- [HotModuleReplacement](https://webpack.js.org/concepts/hot-module-replacement/) 热更新模块

## Webpack loader

> 用于将模块化

### 常用 Loader

- [babel-loader](https://github.com/babel/babel-loader) es6+转 es5

- [css-loader](https://github.com/webpack-contrib/css-loader) 解析 css

- [style-loader](https://github.com/webpack-contrib/style-loader) 生成 style 标签将其插入 html 文档

- [url-loader](https://github.com/webpack-contrib/url-loader) base64 图片压缩

- [file-loader](https://github.com/webpack-contrib/file-loader) 文件名配置

- [expose-loader](https://github.com/webpack-contrib/expose-loader) 用于暴露全局变量

---
id: pages
title: 写页面
date: 2018-01-10 00:11:50
---

## 介绍

对于网站的首页, 或者 about 页面来说, 他们需要的样式可能 markdown 满足不了. 为此我们开发了一些特定布局.

比如这个网站的首页就是下面的代码构造出来的.

<<< @/pages/home/index.md

注意在 features 的每个 item 中, 默认是一左一右的布局, 不过你也可以通过 `align` 属性来改变它, 可接受 `left` 和 `right` 两个值.

## 更灵活的布局

可能你会需要更加灵活, 完全自己控制的布局, 那么你可以写 React Component, 然后在页面中引用它.
比如, 在 components 文件夹下有一个 `Home` 组件, 那么你可以在 `pages/home/index.md` 中引用它:

````js
---
id: home
permalink: /
---

<Home></Home>
````

基于用户可以自己编写的 React Component 在 markdown 中引用的机制, 可以实现非常定制化的需求. 不过这个功能目前仍在 alpha 阶段.
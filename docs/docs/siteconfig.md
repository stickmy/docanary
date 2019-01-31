---
id: siteConfig
title: siteConfig.js
date: 2019-01-10 00:12:27
---

## 介绍

这个配置文件包含了网站几乎所有的配置. 它长成下面这样

<<< @/siteConfig.js

## title

<TodoTag>TODO</TodoTag>

这个值为 `document.title`, 这个值随着文档路径的变化会跟着改变

## baseUrl

网站的 baseUrl, 一般来说是域名后面的路径, 比如 `bloss.github.io/docanary`, 那么 baseUrl 就是 `/docanary`, 如果你不想设置任何子路径, 请把它设置为 `/`.

## docsUrl

这个配置指定了你的文档子路径, 默认值为 `docs`, 比如设置为 `docs`, 那么你的文档路径就应该为 `baseUrl/docs`.

::: tip TIP
文档生成的默认路径是: `baseUrl` + `docsUrl` + `文件名`
当然也可以指定给定的路径, 见 permalink
:::

## markdown

我们使用 [markdown-it](https://github.com/markdown-it/markdown-it) 作为我们的 markdown parser, 所以我们支持它的一些配置项, 目前支持的有:

```js
module.exports = {
	markdown: {
		breaks: true, // 是否开启换行
		lineNumbers: true // 是否显示行号
	}
}
```

## palette

顾名思义, 这是调色板, 用来调整主题相关的颜色. 我们使用 css3 变量来调整它.

目前支持的有:

```js
module.exports = {
	palette: {
		themeColor: '#373277',
		textColor: '#444',
		linkColor: '#0072be',
		codeBgColor: 'rgba(255,229,100,.2)'
	}
}
```

## docsDir

这个配置指定了你的文档目录, 默认值是 `docs`, 你也可以设置为其他值, 比如叫做 `documentation`, 那么就会扫描 `documentation` 文件夹下的文档.

## pagesDir

这个目录下放着一些除了主要的 docs 文档之外的页面, 比如说主页, about 页面, 默认值是 `pages`, 这些页面往往需要指定 `permalink`. 而且这些 markdown 文件也有一些特殊的语法. 它们往往也会通过自定义的 React component 来构造.

## componentsDir

<AlphaTag>alpha</AlphaTag>

这个目录下放着用户自定义的一些 React 组件, 默认值是 `components`. 没错, 他们可以在 markdown 文件中使用: 以 html tag 的方式引入, 不过不能是 `inline` 的方式. 它目前还不成熟, 有一些限制, 比如文件的组织结构只能为 `component/index.js` 这样的结构. 而且由于它们是用 `react-dom/server` 中的 `renderToString` 渲染出来的, 所以它们没法响应一些事件, 但是他们可以做一些样式的美化. 比如网站的首页完全可以用 React 组件来构造出更灵活的布局.

## navbarLinks

这些是 navbar 上的一些链接, 如果链接属性是 `link`, 那么这个是文档内部链接. 如果想用外部链接, 比如项目的 github 地址, 请使用 `href` 属性.

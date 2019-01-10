---
id: start
title: 启动
date: 2018-01-10 00:10:22
---

## 项目结构

你的项目结构应该是这样的, 具体每个文件夹的含义可以见 [siteConfig.js](https://wuwaki.me/docanary/docs/siteconfig)

```
.
├── components
│   ├── AlphaTag
│   │   ├── index.js
│   │   └── index.styl
│   └── TodoTag
│       ├── index.js
│       └── index.styl
├── docs
│   └── siteconfig.md
├── package-lock.json
├── package.json
├── pages
│   └── home
│       └── index.md
├── siteConfig.js
└── static
    ├── feature1.jpeg
    ├── feature2.png
    ├── feature3.png
    └── img
```

## 启动

```bash
docanary start
```

在项目根目录下运行这行命令, 即可启动项目. 它支持 `-p` 参数, 可以指定运行的端口号, 默认是 3000.

```bash
docanary start -p 8000
```
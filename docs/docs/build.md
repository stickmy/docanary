---
id: build
title: 打包
date: 2018-01-10 00:08:35
---

## 启动

```bash
docanary build
```

会在当前工程根目录下生产 `build` 文件夹. 打包后的文件都在其中, 只需要把这个文件夹部署, 即可上线你的静态网站.

## debug

```bash
docanary build --debug
```

开启调试功能, 会打印出打包过程中的一些 debug 信息, 便于调试.
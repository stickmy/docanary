---
id: eject
title: 定制主题
date: 2018-01-10 00:07:35
---

## eject

```bash
npx docanary eject
```

使用该命令可以把默认的主题导出到当前的 `theme` 文件夹, 然后你可以根据需要自己去修改他们.

::: warning
由于我们的 docanary 是全局安装的, 所以这里使用 npx 命令来保证操作的是当前项目下的 docanary.
:::

主题定制开发文档待完善...

## copy

```bash
npx docanary copy
```

在开发完自己的主题后, 需要执行上面的命令将主题应用到 docanary 中, 同样的, 使用 npx 命令来修改本项目下的 docanary, 而不影响全局的 docanary.

启动和打包项目也需要换成 `npx docanary start` 和 `npx docanary build`.
---
id: add-doc
title: 写文档
date: 2018-01-10 00:11:56
---

## metadata

这是文章的元信息, 它包含了一些文章的基础信息, 比如标题, 时间等等. 它应该在文章的开头以 `YAML` 的格式书写.

```md
---
id: add-doc
title: 写文档
date: 2018-01-10 00:22:56
---

## your doc
```

::: tip 建议
强烈建议在元信息中加上时间 `date` 属性, 因为我们根据这个属性来对文档进行排序, 最新发布的在前面.
:::

## snippet

在 markdown 文件中, 我们允许你使用 `<<< @/filepath{highlightLines}` 这样的语法来引入其他的文件.

::: tip 解释
这里的 `@` alias 是 `process.cwd()`, 如果你不熟悉 Node, 可以认为这是你项目的根目录, 与 `siteConfig.js` 同级. 因此引入文件的路径应该是相对于 `@` 这个路径的.
:::

## container

也可以使用如下的语法来创建一个 `container`:

__Input__

```md
::: tip TIP
这是提示
:::

::: warning 警告⚠️
这是警告
:::

::: danger DANGER
这是 danger
:::
```

__Ouput__

::: tip 提示
这是提示
:::

::: warning 警告⚠️
这是警告
:::

::: danger DANGER
这是 danger
:::

## 代码行高亮

**Input**

````
```js {4}
export default {
  render() {
    return {
      msg: 'Highlighted!'
    }
  }
}
```
````

**Output**

```js {4}
export default {
  render() {
    return {
      msg: 'Highlighted!'
    }
  }
}
```

## 在 markdown 文件中使用 React Component

<AlphaTag>目前处于 alpha 阶段</AlphaTag>

```
.
├── components
│   ├── AlphaTag
│   │   ├── index.js
│   │   └── index.styl
│   └── TodoTag
│       ├── index.js
│       └── index.styl
```

假如你在项目的根目录有以上文件. 那么你可以使用这些 component.

__Input__

```js
<TodoTag>TODO</TodoTag>
```

__Output__

<TodoTag>TODO</TodoTag>

# v-loading 指令

loading 加载指令

> **loading 区域取上级定位元素的宽高**

# 使用

```html
<template>
  <div v-loading="loading" loading-tip="加载中..." loading-background="" loading-theme="" loading-size=""></div>
</template>
```

# 指令元素说明

| 属性               | 类型                      | 默认值    | 可选值 | 说明                                   |
| ------------------ | ------------------------- | --------- | ------ | -------------------------------------- |
| loading-tip        | `string`                  | -         | -      | 加载文本                               |
| loading-size       | `default`,`small`,`large` | `default` | -      | 大小                                   |
| loading-background | `string`                  | -         | -      | 背景色                                 |
| loading-theme      | `dark` or `light`         | `light`   | -      | 背景色主题，当背景色不为空时使用背景色 |

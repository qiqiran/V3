# Loading 函数

代码位置: `@/components/Loading`

## 使用

```html
<template>
  <a-card title="函数方式">
    <a-button type="primary" @click="openFnWrapLoading" style="margin-right: 0.5rem;">容器内 loading</a-button>
    <a-button type="primary" @click="openFnFullLoading">全屏 loading</a-button>
    <div ref="wrapEl" class="background">s</div>
  </a-card>
</template>

<script lang="ts">
  import { defineComponent, ref, reactive, toRefs } from "vue";

  import { useLoading } from "@/components/Loading";

  export default defineComponent({
    components: { ScrollContainer },
    setup() {
      // 不指定容器 默认全屏
      const [openFullLoading, closeFullLoading] = useLoading({
        tip: "加载中..."
      });

      function openFnFullLoading() {
        openFullLoading();

        setTimeout(() => {
          closeFullLoading();
        }, 2000);
      }

      // 指定容器 容器内loading
      const wrapEl = ref<ElRef>(null);
      const [openWrapLoading, closeWrapLoading] = useLoading({
        target: wrapEl,
        props: {
          tip: "加载中...",
          absolute: true
        }
      });
      function openFnWrapLoading() {
        openWrapLoading();

        setTimeout(() => {
          closeWrapLoading();
        }, 2000);
      }

      return {
        wrapEl,
        openFnFullLoading,
        openFnWrapLoading
      };
    }
  });
</script>

<style lang="less" scoped>
  .background {
    position: relative;
    background-color: @primary-color;
    border-radius: 100px;
    margin: 1rem;
    height: 300px;
    width: calc(100% - 2rem);
    display: flex;
    justify-content: center;
    align-items: center;
    span {
      font-size: 50px;
      color: #fff;
    }
  }
</style>
```

## useLoading 说明

```js
import { useLoading } from "@/components/Loading";

const [open, close] = useLoading((opt: Partial<LoadingProps> | Partial<UseLoadingOptions>));
// open() // 打开 loading

// close() // 关闭 loading
```

## UseLoadingOptions

| 属性   | 类型                                | 默认值 | 可选值 | 说明             |
| ------ | ----------------------------------- | ------ | ------ | ---------------- |
| target | `HTMLElement` or `Ref<HTMLElement>` | -      | -      | 挂载的 dom 节点  |
| props  | `LoadingProps`                      | -      | -      | loading 组件参数 |

## LoadingProps

| 属性       | 类型                      | 默认值    | 可选值 | 说明                                              |
| ---------- | ------------------------- | --------- | ------ | ------------------------------------------------- |
| tip        | `string`                  | -         | -      | 加载文本                                          |
| size       | `default`,`small`,`large` | `default` | -      | 大小                                              |
| absolute   | `boolean`                 | `false`   | -      | 绝对定位，为 false 时可以全屏(挂载 target 时有效) |
| loading    | `boolean`                 | -         | -      | 当前加载状态                                      |
| background | `string`                  | -         | -      | 背景色，                                          |
| theme      | `dark`or`light`           | `light`   | -      | 背景色主题 ，当背景色不为空时使用背景色           |

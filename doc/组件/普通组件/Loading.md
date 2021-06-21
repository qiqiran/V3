# Loading 组件

## 使用

```html
<template>
  <a-card title="组件方式">
    <a-button type="primary" @click="openCompAbsolute" style="margin-right: 0.5rem;">容器内 loading</a-button>
    <a-button type="primary" @click="openCompFullLoading">全屏 loading</a-button>
    <div class="background">
      <Loading :loading="loading" :absolute="absolute" :tip="tip" />
    </div>
  </a-card>
</template>

<script lang="ts">
  import { defineComponent, ref, reactive, toRefs } from "vue";

  import { Loading, useLoading } from "@/components/Loading";

  export default defineComponent({
    components: { Loading },
    setup() {
      const compState = reactive({
        absolute: false,
        loading: false,
        tip: "加载中..."
      });

      function openLoading(absolute: boolean) {
        compState.absolute = absolute;
        compState.loading = true;
        setTimeout(() => {
          compState.loading = false;
        }, 2000);
      }

      function openCompFullLoading() {
        openLoading(false);
      }

      function openCompAbsolute() {
        openLoading(true);
      }
      return {
        ...toRefs(compState),
        openCompAbsolute,
        openCompFullLoading
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

## Props

| 属性       | 类型                      | 默认值    | 可选值 | 说明                                    |
| ---------- | ------------------------- | --------- | ------ | --------------------------------------- |
| tip        | `string`                  | -         | -      | 加载文本                                |
| size       | `default`,`small`,`large` | `default` | -      | 大小                                    |
| absolute   | `boolean`                 | `false`   | -      | 绝对定位，为 false 时可以全屏           |
| loading    | `boolean`                 | -         | -      | 当前加载状态                            |
| background | `string`                  | -         | -      | 背景色，                                |
| theme      | `dark`,`light`            | `light`   | -      | 背景色主题 ，当背景色不为空时使用背景色 |

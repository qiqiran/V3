# v-click-outside 指令

用于监听包裹的元素点击外部触发事件

代码路径 `src/framework/directives/clickOutside` or `#/directives/clickOutside`

# 使用

```html
<template>
  <div v-click-outside="handler"></div>
</template>
<script lang="ts">
  import { defineComponent } from "vue";
  import clickOutside from "#/directives/clickOutside";

  export default defineComponent({
    directives: {
      clickOutside
    },
    setup() {
      return {
        handler() {
          // xxxx
        }
      };
    }
  });
</script>
```

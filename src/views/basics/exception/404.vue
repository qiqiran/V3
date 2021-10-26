<template>
  <div>
    <p class="not-found">404</p>
    <p class="not-found-tip">系统中没有这个界面，回<a href="">首页</a>看看吧</p>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';

  export default defineComponent({
    name: 'Noname404',
  });
</script>

<style lang="less" scoped>
  .not-found {
    font-size: 500px;
    text-align: center;
    margin: 0;
  }
  .not-found-tip {
    font-size: 50px;
    text-align: center;
    a {
      transition: 0.3s;
      &:hover {
        color: @primary-color;

        text-shadow: 0px 8px 8px rgba(0, 0, 0, 20%);
      }
    }
  }
</style>

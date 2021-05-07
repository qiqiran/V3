<template>
  <div :class="$style.content">
    <button :class="$style.button">子按钮</button>
    <div :class="$style.button"></div>
  </div>
  <a-button type="primary">默认按钮</a-button>
  <a-button type="danger">危险按钮</a-button>
  <a-button type="warning">警告按钮</a-button>
  <br />
  <a-button style="background: #f5222d" @click="changeColor('#f5222d')">红色</a-button>
  <a-button style="background: #1890ff" @click="changeColor('#1890ff')">蓝色</a-button>
  <a-button style="background: #faad14" @click="changeColor('#faad14')">黄色</a-button>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import request, { get, post } from "src/framework/axios";
// const generate = require('@ant-design/colors/lib/generate').default
import { generate } from "@ant-design/colors";
import themeColor from "src/framework/ui/themePlugin/index.js";

import bus from "src/hooks/web/useBus";

export default defineComponent({
  name: "test",
  setup() {
    // 网络请求
    // 异步方法内调用同步请求get方法，（推荐使用）
    async function asyncRequestGet() {
      const res1 = await get("url", {});
      const res2 = request.get("url", {});
    }
    // 异步方法内调用同步请求post方法，（推荐使用）
    async function asyncRequestPost() {
      const res1 = await post("url", {});
      const res2 = request.post("url", {});
    }
    // promise.then方式内部执行回调
    function promiseRequestGet() {
      get("url", {}).then((res) => {});
      request.get("url", {}).then((res) => {});
    }
    // promise.then方式内部执行回调
    function promiseRequestPost() {
      post("url", {}).then((res) => {});
      request.post("url", {}).then((res) => {});
    }
    function changeColor(color: string) {
      updateTheme(color);
    }
    const updateTheme = (newPrimaryColor: string) => {
      themeColor.changeColor(newPrimaryColor);
    };
    return { changeColor };
  },
});
</script>

<style lang='less' module>
@import "./css";
</style>
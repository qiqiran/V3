<template>
  <div class="background" @click="handelInside" v-click-outside="handelOutside">
    <span>Please click me or click outside</span>
  </div>
</template>

<script lang="ts">
import { info } from "src/hooks/web/useMessage";
import { defineComponent } from "vue";

import clickOutside from "#/directives/clickOutside";
export default defineComponent({
  directives: { clickOutside },
  setup() {
    function handelOutside() {
      info("handelOutside");
    }
    function handelInside() {
      info("handelInside");
    }
    return { handelInside, handelOutside };
  },
});
</script>

<style lang='less' scoped>
.background {
  background-color: @primary-color;
  border-radius: 100px;
  margin: 100px;
  height: calc(100% - 200px);
  width: calc(100% - 200px);
  display: flex;
  justify-content: center;
  align-items: center;
  span {
    font-size: 50px;
    color: #fff;
  }
}
</style>
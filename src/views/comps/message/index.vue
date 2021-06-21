<template>
  <ScrollContainer class="container">
    <a-card title="Message">
      <a-button @click="()=>successMsg()">success</a-button>
      <a-button @click="()=>errorMsg()">errorMsg</a-button>
      <a-button @click="()=>infoMsg()">infoMsg</a-button>
      <a-button @click="()=>warningMsg()">warningMsg</a-button>
      <a-button @click="()=>loadingMsg()">loadingMsg</a-button>
    </a-card>
  </ScrollContainer>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import { success, error, info, warning, loading } from "@/hooks/web/useMessage";

import { ScrollContainer } from "@/components/Container/index";

export default defineComponent({
  components: { ScrollContainer },
  setup() {
    function successMsg() {
      success("successMsg");
    }

    function errorMsg() {
      error("errorMsg");
    }

    function infoMsg() {
      info("infoMsg");
    }

    function warningMsg() {
      warning("warningMsg");
    }

    function loadingMsg() {
      loading("loadingMsg");
    }

    return { successMsg, errorMsg, infoMsg, warningMsg, loadingMsg };
  },
});
</script>

<style lang="less" scoped>
.container {
  padding: 1rem;
}
</style>
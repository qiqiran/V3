<template>
  <div style="display: flex;flex-direction: column;text-align: center;height: 75px;">
    <h2>welcome to Water-IoT</h2>
    <a-button @click="logout">登出</a-button>
  </div>
  <Map style="height: calc(100% - 75px);"/>
  <!-- <Map /> -->
</template>
<script lang="ts">
import { defineComponent } from "vue";

import Map from "src/components/map/Map.vue";

import { userStore } from "#/store/modules/system/user";

export default defineComponent({
  name: "Index",
  components: {
    // Layout,
    Map,
  },
  setup() {
    function logout() {
      userStore.logout();
    }

    return {
      logout,
    };
  },
});
</script>

<style lang="less">
</style>
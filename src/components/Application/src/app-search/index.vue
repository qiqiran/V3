<template>
  <a-tooltip placement="bottom" :title="'搜索'" @click="changeModal(true)">
    <span>
      <SearchOutlined />
    </span>
  </a-tooltip>
  <AppSearchModal :visible="showModal" @close="changeModal(false)" />
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue';

  import AppSearchModal from './AppSearchModal.vue';

  export default defineComponent({
    name: 'AppSearch',
    components: { AppSearchModal },
    setup() {
      const showModal = ref(false);
      function changeModal(show: boolean) {
        showModal.value = show;
      }
      return { showModal, changeModal };
    },
  });
</script>

<style></style>

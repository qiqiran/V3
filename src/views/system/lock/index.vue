<template>
  <transition name="fade-bottom" mode="out-in">
    <LockPage v-if="getIsLock" />
  </transition>
</template>
<script lang="ts">
  import { defineComponent, computed } from 'vue';
  import LockPage from './LockPage.vue';

  import { lockStore } from '#/store/modules/lock';
  export default defineComponent({
    name: 'Lock',
    components: { LockPage },
    setup() {
      const getIsLock = computed(() => lockStore?.getLockInfo?.isLock ?? false);
      return { getIsLock };
    },
  });
</script>

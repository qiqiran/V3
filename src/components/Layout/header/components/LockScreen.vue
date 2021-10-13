<template>
  <a-tooltip placement="bottom" title="锁定屏幕">
    <span @click="openModal">
      <LockOutlined />
    </span>
    <LockAction @register="register" />
  </a-tooltip>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';

  import { useModal } from 'src/components/Modal';

  import { createAsyncComponent } from 'src/utils/factory/createAsyncComponent';
  export default defineComponent({
    name: 'LockScreen',
    components: {
      LockAction: createAsyncComponent(() => import('./lock/LockModal.vue')),
    },
    setup() {
      const [register, { openModal }] = useModal();
      return { register, openModal };
    },
  });
</script>

<style></style>

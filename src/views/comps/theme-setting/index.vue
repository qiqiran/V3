<template>
  <ScrollContainer class="container">
    <BasicThemeSetting />
  </ScrollContainer>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';

  import { BasicThemeSetting } from 'src/components/ThemeSetting';
  import { ScrollContainer } from '@/components/Container/index';

  export default defineComponent({
    name: 'ThemeSetting',
    components: { ScrollContainer, BasicThemeSetting },
  });
</script>

<style lang="less" scoped>
  .container {
    padding: 1rem;
  }
</style>

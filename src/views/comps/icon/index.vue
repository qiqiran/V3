<template>
  <ScrollContainer class="container">
    <h2>Icon 图标</h2>
    <hr />

    <template v-for="(icon, index) in icons" :key="`icon-${index}`">
      <span style="display: inline-block; width: 120px">{{ icon }}</span>
      <Icon :icon="icon" />&emsp; <Icon :icon="icon" :size="20" />&emsp;
      <Icon :icon="icon" :size="26" :color="`#0084f4`" />
      <hr />
    </template>

    <h3>更多图标参见项目阿里矢量图标库</h3>
  </ScrollContainer>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';

  import Icon from 'src/components/Icon';
  import { ScrollContainer } from '@/components/Container/index';

  export default defineComponent({
    components: { Icon, ScrollContainer },
    setup() {
      return {
        icons: [
          'comps',
          'keyboard-esc',
          'keyboard-up',
          'keyboard-down',
          'enter',
          'form',
          'data',
          'setting',
          'home',
          'close',
          'minus',
          'align-left',
          'align-right',
          'align-middle',
          'refresh',
          'fullscreen',
          'fullscreen-exit',
        ],
      };
    },
  });
</script>

<style lang="less" scoped>
  .container {
    padding: 1rem;
  }
</style>

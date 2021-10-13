<template>
  <ScrollContainer ref="scrollRef" class="container">
    <a-button @click="scrollBottom()">scrollBottom</a-button>
    <template v-for="index in 200" :key="index">
      <a-button v-if="index === 101" @click="scrollTo(0)">scrollToTop</a-button>
      <h2 v-else>鼠标移入显示滚动条</h2>
    </template>
    <a-button @click="scrollToCenter()">scrollToCenter</a-button>
  </ScrollContainer>
</template>

<script lang="ts">
  import { defineComponent, ref, unref } from 'vue';

  import { ScrollContainer, ScrollActionType } from '@/components/Container';

  export default defineComponent({
    components: { ScrollContainer },
    setup() {
      const scrollRef = ref<Nullable<ScrollActionType>>(null);
      const getScroll = () => {
        const scroll = unref(scrollRef);
        if (!scroll) {
          throw new Error('scroll is Null');
        }
        return scroll;
      };

      function scrollTo(top: number) {
        getScroll().scrollTo(top);
      }
      function scrollToCenter() {
        scrollTo((getScroll()?.getScrollWrap()?.scrollHeight || 0) / 2);
      }
      function scrollBottom() {
        getScroll().scrollBottom();
      }

      return {
        getScroll,
        scrollTo,
        scrollRef,
        scrollToCenter,
        scrollBottom,
      };
    },
  });
</script>

<style lang="less" scoped>
  .container {
    padding: 1rem;
  }
</style>

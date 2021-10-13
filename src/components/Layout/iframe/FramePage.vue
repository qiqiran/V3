<template>
  <div :class="prefixCls">
    <a-spin :spinning="loading" size="large">
      <iframe :src="frameSrc" :class="`${prefixCls}__main`" ref="frameRef"></iframe>
    </a-spin>
  </div>
</template>

<script lang="ts">
  import { defineComponent, onMounted, ref, unref, nextTick } from 'vue';

  import { useDesign } from 'src/hooks/web/useDesign';

  import { getViewportOffset } from 'src/utils/domUtils';

  export default defineComponent({
    name: 'FramePage',
    props: {
      frameSrc: {
        type: String,
        default: '',
      },
    },
    setup() {
      const { prefixCls } = useDesign('iframe-page');
      const topRef = ref(0);
      const heightRef = ref(window.innerHeight);
      const loading = ref(false);
      const frameRef = ref<HTMLFrameElement | null>(null);

      function calcHeight() {
        const iframe = unref(frameRef);
        if (!iframe) {
          return;
        }
        let { top } = getViewportOffset(iframe);
        topRef.value = top;
        heightRef.value = window.innerHeight - top;
        const clientHeight = document.documentElement.clientHeight - top;
        iframe.style.height = `${clientHeight}px`;
      }

      function hideLoading() {
        loading.value = false;
        calcHeight();
      }

      function init() {
        nextTick(() => {
          const iframe = unref(frameRef);

          if (!iframe) return;

          const _frame = iframe as any;
          if (_frame.attachEvent) {
            _frame.attachEvent('onload', () => {
              hideLoading();
            });
          } else {
            iframe.onload = () => {
              hideLoading();
            };
          }
        });
      }

      onMounted(() => {
        loading.value = true;
        init();
      });

      return {
        prefixCls,
        frameRef,
        loading,
      };
    },
  });
</script>

<style lang="less">
  @prefix-cls: ~'@{namespace}iframe-page';

  .@{prefix-cls} {
    .ant-spin-nested-loading {
      position: relative;
      height: 100%;

      .ant-spin-container {
        width: 100%;
        height: 100%;
      }
    }

    &__mask {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }

    &__main {
      width: 100%;
      height: 100%;
      background-color: fade(#fff, 0);
      overflow: hidden;
      border: 0;
      box-sizing: border-box;

      display: block;
    }
  }
</style>

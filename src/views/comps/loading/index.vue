<template>
  <ScrollContainer class="container">
    <a-card title="指令方式">
      <a-button v-if="!vLoadingRef" @click="()=>vLoadingRef = true">open-loading</a-button>
      <a-button v-else @click="()=>vLoadingRef = false">close-loading</a-button>
      <div class="background" v-loading="vLoadingRef"></div>
    </a-card>
    <hr />
    <a-card title="函数方式">
      <a-button type="primary" @click="openFnWrapLoading" style="margin-right: 0.5rem;">容器内 loading</a-button>
      <a-button type="primary" @click="openFnFullLoading">全屏 loading</a-button>
      <div ref="wrapEl" class="background">s</div>
    </a-card>
    <hr />
    <a-card title="组件方式">
      <a-button type="primary" @click="openCompAbsolute" style="margin-right: 0.5rem;">容器内 loading</a-button>
      <a-button type="primary" @click="openCompFullLoading">全屏 loading</a-button>
      <div class="background">
        <Loading :loading="loading" :absolute="absolute" :tip="tip" />
      </div>
    </a-card>
  </ScrollContainer>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, toRefs } from "vue";

import { ScrollContainer } from "@/components/Container/index";
import { Loading, useLoading } from "@/components/Loading";

export default defineComponent({
  components: { ScrollContainer, Loading },
  setup() {
    // 指令控制 start
    const vLoadingRef = ref(false);
    // 指令控制 end

    // 函数式 start
    // 不指定容器 默认全屏
    const [openFullLoading, closeFullLoading] = useLoading({
      tip: "加载中...",
    });

    function openFnFullLoading() {
      openFullLoading();

      setTimeout(() => {
        closeFullLoading();
      }, 2000);
    }

    // 指定容器 容器内loading
    const wrapEl = ref<ElRef>(null);
    const [openWrapLoading, closeWrapLoading] = useLoading({
      target: wrapEl,
      props: {
        tip: "加载中...",
        absolute: true,
      },
    });
    function openFnWrapLoading() {
      openWrapLoading();

      setTimeout(() => {
        closeWrapLoading();
      }, 2000);
    }
    // 函数式 end

    // 组件式 start
    const compState = reactive({
      absolute: false,
      loading: false,
      tip: "加载中...",
    });

    function openLoading(absolute: boolean) {
      compState.absolute = absolute;
      compState.loading = true;
      setTimeout(() => {
        compState.loading = false;
      }, 2000);
    }

    function openCompFullLoading() {
      openLoading(false);
    }

    function openCompAbsolute() {
      openLoading(true);
    }
    // 组件式 end

    return {
      vLoadingRef,

      wrapEl,
      openFnFullLoading,
      openFnWrapLoading,

      ...toRefs(compState),
      openCompAbsolute,
      openCompFullLoading,
    };
  },
});
</script>

<style lang="less" scoped>
.container {
  padding: 1rem;
}
.background {
  position: relative;
  background-color: @primary-color;
  border-radius: 100px;
  margin: 1rem;
  height: 300px;
  width: calc(100% - 2rem);
  display: flex;
  justify-content: center;
  align-items: center;
  span {
    font-size: 50px;
    color: #fff;
  }
}
</style>
<template>
  <div :class="getClass">
    <template v-if="canFullscreen">
      <FullscreenExitOutlined
        role="full"
        @click="handleFullScreen"
        v-if="fullScreen"
        :class="`${prefixCls}--full`"
      />

      <FullscreenOutlined
        role="close"
        @click="handleFullScreen"
        v-else
        :class="`${prefixCls}--full`"
      />
    </template>
    <CloseOutlined @click="handleCancel" :class="`${prefixCls}--close`" />
  </div>
</template>
<script lang="ts">
import { defineComponent, computed } from "vue";
import { FullscreenExitOutlined, FullscreenOutlined, CloseOutlined } from "@ant-design/icons-vue";
import { useDesign } from "src/hooks/web/useDesign";

export default defineComponent({
  name: "ModalClose",
  components: { FullscreenExitOutlined, FullscreenOutlined, CloseOutlined },
  props: {
    canFullscreen: {
      type: Boolean,
      default: true,
    },
    fullScreen: {
      type: Boolean,
    },
  },
  emits: ["cancel", "fullscreen"],
  setup(props, { emit }) {
    const { prefixCls } = useDesign("basic-modal-close");

    const getClass = computed(() => {
      return [
        prefixCls,
        `${prefixCls}--custom`,
        {
          [`${prefixCls}--can-full`]: props.canFullscreen,
        },
      ];
    });

    function handleCancel() {
      emit("cancel");
    }
    function handleFullScreen(e: Event) {
      e?.stopPropagation();
      e?.preventDefault();
      emit("fullscreen");
    }

    return {
      getClass,
      prefixCls,
      handleCancel,
      handleFullScreen,
    };
  },
});
</script>
<style lang="less">
@prefix-cls: ~"@{namespace}basic-modal-close";
.@{prefix-cls} {
  display: flex;
  height: 95%;
  align-items: center;

  > span {
    display: flex;
    flex: 50%;
    align-items: center;
    justify-content: space-evenly;

    font-size: 16px;
    height: 100%;
  }

  &:not(&--can-full) {
    margin-left: 48px;
    width: 48px;
  }

  &--full {
    display: inline-block;
    padding: 10px;

    &:hover {
      color: @primary-color;
    }
  }

  &--close {
    &:hover {
      color: @error-color;
    }
  }
}
</style>

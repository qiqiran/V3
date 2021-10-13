<template>
  <div :class="[prefixCls, `${prefixCls}--${theme}`]">
    <span></span>
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { useDesign } from 'src/hooks/web/useDesign';

  export default defineComponent({
    name: 'AppLogo',
    props: {
      theme: String,
    },
    setup() {
      const { prefixCls } = useDesign('app-logo');
      return { prefixCls };
    },
  });
</script>
<style lang="less" scoped>
  @prefix-cls: ~"@{namespace}app-logo";

  .@{prefix-cls} {
    display: flex;
    height: @header-height;
    cursor: pointer;

    span {
      height: @header-height * 0.8;
      width: 90%;
      line-height: @header-height;
      display: block;

      margin-top: @header-height * 0.1;
      margin-left: 5%;

      -webkit-mask-image: url(~static/images/app/logo.svg);
      mask-image: url(~static/images/app/logo.svg);
      -webkit-mask-repeat: no-repeat;
      mask-repeat: no-repeat;
      -webkit-mask-repeat: no-repeat;
      mask-repeat: no-repeat;
      -webkit-mask-size: auto 90%;
      mask-size: auto 90%;
    }
  }
  .@{prefix-cls}--light{
    .light({
      border-bottom: @lightGreyBorder;
    });
    span{
      background-color: @primary-color;
    }
  }
  .@{prefix-cls}--dark{
    .dark({});
    span{
      background-color: @white;
    }
  }
</style>

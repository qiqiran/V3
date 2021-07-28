<template>
  <ScrollContainer :class="[prefixCls, `container`]">
    <a-card title="更换头像">
      <CropperAvatar
        :uploadApi="uploadApi"
        :value="`static/images/pic/gsx.jpg`"
        btnText="更换头像"
        :btnProps="{ preIcon: 'cloud-upload' }"
        width="250"
      />
      <!-- @change="updateAvatar" -->
    </a-card>

    <p />

    <a-card title="矩形裁剪">
      <div class="section cropper-container">
        <!--  @ready="" -->
        <CropperImage
          style="height: 100%; width: 1000px;"
          :src="`static/images/pic/zl.jpg`"
          @cropend="handleCropperCropend"
        />
        <img :src="cropperImg" v-if="cropperImg" />
      </div>
      裁剪信息：{{cropperInfo}}
    </a-card>

    <p />

    <a-card title="圆形裁剪">
      <div class="section cropper-container">
        <!--  @ready="" -->
        <CropperImage
          style="height: 100%; width: 1000px;"
          :src="`static/images/pic/zl.jpg`"
          @cropend="handleCircleCropend"
          circled
        />
        <img :src="circleImg" v-if="circleImg" />
      </div>
      裁剪信息：{{circleInfo}}
    </a-card>
  </ScrollContainer>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

import { useDesign } from "@/hooks/web/useDesign";

import { ScrollContainer } from "@/components/Container";
import { CropperImage, CropperAvatar } from "@/components/Cropper";

export default defineComponent({
  components: { ScrollContainer, CropperImage, CropperAvatar },
  setup() {
    const { prefixCls } = useDesign("comps-cropper");
    const cropperImg = ref("");
    const cropperInfo = ref("");
    const circleImg = ref("");
    const circleInfo = ref("");

    function handleCropperCropend({ imgBase64, imgInfo }) {
      cropperImg.value = imgBase64;
      cropperInfo.value = imgInfo;
    }

    function handleCircleCropend({ imgBase64, imgInfo }) {
      circleImg.value = imgBase64;
      circleInfo.value = imgInfo;
    }

    return {
      prefixCls,
      handleCropperCropend,
      handleCircleCropend,
      cropperImg,
      cropperInfo,
      circleImg,
      circleInfo,
      uploadApi: new Promise((resolve) => {
        resolve(true);
      }),
    };
  },
});
</script>
<style lang="less">
@prefix-cls: ~"@{namespace}comps-cropper";

.@{prefix-cls} {
  .ant-card-body {
    overflow: auto;
  }
}
</style>
<style lang="less" scoped>
.container {
  padding: 1rem;
}
.section {
  height: 560px;
  display: flex;
}
.ant-card-body {
  overflow: auto !important;
}
.cropper-container {
  min-width: 1000px + 560px + 5rem;
  img {
    margin-left: 2.5rem;
    width: 560px;
    height: 560px;
    border: 1px solid #f2f2f2;
  }
}
</style>
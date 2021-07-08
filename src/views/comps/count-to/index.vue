<template>
  <ScrollContainer class="container">
    <a-row :gutter="[16,16]">
      <a-col :xs="24" :xl="12" :xxl="6">
        <a-card>
          <CountTo class="count-to-01" prefix="距离" suffix="m" :color="'#409EFF'" :endVal="200" />
        </a-card>
      </a-col>
      <a-col :xs="24" :xl="12" :xxl="6">
        <a-card>
          <CountTo class="count-to-02" prefix="$" :endVal="20000" />
        </a-card>
      </a-col>
      <a-col :xs="24" :xl="12" :xxl="6">
        <a-card>
          <CountTo class="count-to-03" :startVal="30" :endVal="0" :duration="30000" suffix="秒" />
        </a-card>
      </a-col>
      <a-col :xs="24" :xl="12" :xxl="6">
        <a-card>
          <CountTo
            ref="countTo32Ref"
            @onFinished="redo()"
            class="count-to-02"
            :endVal="99.99"
            :decimals="2"
            decimal="."
          />
        </a-card>
      </a-col>
    </a-row>

    <p></p>

    <a-row :gutter="[16,16]">
      <a-col :xs="24" :xl="12" :xxl="6">
        <a-card>
          <CountTo
            class="count-to-01"
            prefix="距离"
            suffix="m"
            :color="'#409EFF'"
            :startVal="200"
            :endVal="400"
            :separator="''"
          />
        </a-card>
      </a-col>
      <a-col :xs="24" :xl="12" :xxl="6">
        <a-card>
          <CountTo
            ref="countTo31"
            class="count-to-01"
            prefix="距离"
            suffix="m"
            :color="'#409EFF'"
            :startVal="400"
            :endVal="600"
            :separator="''"
            :autoplay="false"
          />
        </a-card>
      </a-col>
      <a-col :xs="24" :xl="12" :xxl="6">
        <a-card>
          <CountTo class="count-to-02" :endVal="99.99" :decimals="2" decimal="." />
        </a-card>
      </a-col>
      <a-col :xs="24" :xl="12" :xxl="6">
        <a-card>
          <CountTo class="count-to-03" :endVal="99.99" :decimals="2" decimal="-" :duration="10000" />
        </a-card>
      </a-col>
    </a-row>
  </ScrollContainer>
</template>

<script lang="ts">
import { defineComponent, ref, unref } from "vue";
import { ScrollContainer } from "@/components/Container";
import { CountTo } from "@/components/CountTo";

export default defineComponent({
  components: {
    ScrollContainer,
    CountTo,
  },
  setup() {
    const countTo31 = ref<typeof CountTo>(CountTo);

    setTimeout(() => {
      countTo31.value.start();
    }, 1500);

    const countTo32Ref = ref<typeof CountTo>(CountTo);

    function redo() {
      const countTo32 = unref(countTo32Ref);
      if (countTo32) {
        countTo32.reset();
        setTimeout(() => {
          countTo32.start();
        }, 500);
      }
    }
    return { countTo31, countTo32Ref, redo };
  },
});
</script>

<style lang="less" scoped>
.container {
  padding: 1rem;
}
.count-to {
  &-01 {
    font-size: 4rem;
  }
  &-02 {
    font-size: 4rem;
    color: #8340ff;
  }
  &-03 {
    font-size: 4rem;
    color: #ffcc40;
  }
}
</style>
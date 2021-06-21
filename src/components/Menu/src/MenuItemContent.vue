<template>
  <Icon v-if="getIcon" :icon="getIcon" :size="18" />
  <span>{{getName}}</span>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

import { contentProps } from "../prors";

import Icon from "src/components/Icon/index";

export default defineComponent({
  name: "MenuItemContent",
  components: { Icon },
  props: contentProps,
  setup(props) {
    const getName = props.item?.name;
    const getIcon = props.item?.icon;

    return {
      getName,
      getIcon,
    };
  },
});
</script>
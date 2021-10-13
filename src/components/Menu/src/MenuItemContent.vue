<template>
  <Icon v-if="getIcon" :icon="getIcon" :size="18" />
  <span>{{ getName }}</span>
</template>

<script lang="ts">
  import { computed, defineComponent } from 'vue';

  import { contentProps } from '../prors';

  import Icon from 'src/components/Icon/index';

  export default defineComponent({
    name: 'MenuItemContent',
    components: { Icon },
    props: contentProps,
    setup(props) {
      const getName = computed(() => props.item?.name);
      const getIcon = computed(() => props.item?.icon);

      return {
        getName,
        getIcon,
      };
    },
  });
</script>

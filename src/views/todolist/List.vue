<template>
  {{data}}
  <div ref="todolist" style="background:#fff">
    <a-list item-layout="horizontal" :data-source="data">
      <template #renderItem="{ item, index }">
        <a-list-item>
          <a-list-item-meta :description="item.description">
            <template #title>
              <a href="#/">
                <Item :data="`${index + 1}.${item.title}`"></Item>
              </a>
            </template>
          </a-list-item-meta>
        </a-list-item>
      </template>
    </a-list>
  <a-button @click="toggle()">{{getTitle}}</a-button>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, unref, ref } from "vue";
import { useFullscreen } from "@vueuse/core";
import Item from "src/views/todolist/Item.vue";
import IToDo from "src/views/todolist/interface/IToDo";

export default defineComponent({
  name: "List",
  props: {
    list: Object,
  },
  components: {
    Item,
  },
  setup(props) {
    let data = props.list;
    const todolist = ref();

    const { toggle, isFullscreen } = useFullscreen(todolist);

    const getTitle = computed(() => (unref(isFullscreen) ? "退出全屏" : "全屏"));

    return {
      todolist,
      data,
      toggle,
      isFullscreen,
      getTitle,
    };
  },
});
</script>

<style>
</style>
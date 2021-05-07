<template>
  <h1>This is todolist</h1>
  <Header />
  <List :list="list" />
  <Footer />
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';

import IToDo from "src/views/todolist/interface/IToDo";

import Header from "src/views/todolist/Header.vue";
import List from "src/views/todolist/List.vue";
import Footer from "src/views/todolist/Footer.vue";

export default defineComponent({
  name: 'ToDoList',
  components: {
    Header,
    List,
    Footer
  },
  setup() {
    console.log("初始化todolist");
    
    const list = reactive<IToDo[]>(
      [
        {
          id: '123',
          title: 'Ant Design Title 1',
          description: "do u know who i am?",
          herf: '',
          isChecked: false
        }
      ]
    );
    return {
      list
    }
  }
});
</script>

<style>
</style>
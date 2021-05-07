<template>
  <a-input v-model:value="content" placeholder="please input,and u can enter to save" @keyup.enter="log()" />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'Header',
  setup(){
    let content = ref("");
    return{
      content,
      log:()=>{
      }
    }
  }
});
</script>

<style>
</style>
<template>
  {{data}}
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Item',
  props:{
    data : String
  },
  setup(props){
    return {
      data : props.data
    }
  }
});
</script>

<style>
</style>
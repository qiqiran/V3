<template>
  <div class="container">
    <BasicTable
      title="数据表格"
      :title-help-message="['平平无奇一段提示', '平平无奇两段提示', '平平无奇三段提示', '你甚至可以在这里写一段冗长的小作文，不过要分好段落']"
      :columns="columns"
      :data-source="dataSource"
      :pagination="{ pageSize: 25 }"
      bordered
      :loading="loading"
      :rowSelection="{ type: 'checkbox' }"
      :indexColumnProps="{ title: 'index-number', width: 120 }"
      :isTreeTable="true"
    />
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref, reactive } from 'vue';

  import { BasicTable } from '@/components/Table';

  import { columns } from './columns';

  export default defineComponent({
    name: '',
    components: { BasicTable },
    setup() {
      const dataSource = reactive<any[]>([]);
      const loading = ref<Boolean>(true);

      setTimeout(() => {
        for (let index = 1; index <= 1000; index++) {
          dataSource.push({ key: index, username: `${index}号守门员`, children: [{ key: `${index}-${index}`, username: `${index}-${index}号耕地机` }] });
        }
        loading.value = false;
      }, 1000);

      function onSelectAll(selected: boolean, selectedRows: any[], changeRows: any[]) {
        console.log('onSelectAll');

        console.log('selected', selected);
        console.log('selectedRows', selectedRows);
        console.log('changeRows', changeRows);
      }

      function onSelectInvert(selectedRows: string[] | number[]) {
        console.log('onSelectInvert');
        console.log('selectedRows', selectedRows);
      }

      return {
        columns,
        dataSource,
        loading,

        onSelectAll,
        onSelectInvert,
      };
    },
  });
</script>

<style lang="less" scoped>
  .container {
    padding: 1rem;
  }
</style>

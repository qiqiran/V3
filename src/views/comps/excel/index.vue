<template>
  <ScrollContainer ref="scrollRef" class="container">
    <ImpExcel @success="loadDataSuccess" style="display: inline-block">
      <a-button class="m-3">导入Excel</a-button>
    </ImpExcel>
    <a-button @click="exportExcel">导出Excel</a-button>
    <hr />
    <a-table :dataSource="dataSource" :columns="columns" :pagination="false" :scroll="{ x: true, y: tableHeight }" />
  </ScrollContainer>
</template>

<script lang="ts">
  import type { Ref } from 'vue';
  import { defineComponent, ref, unref, onMounted } from 'vue';

  import { ImpExcel, ExcelData, jsonToSheetXlsx } from '@/components/Excel';

  import { ScrollContainer, ScrollActionType } from '@/components/Container';

  export default defineComponent({
    components: { ImpExcel, ScrollContainer },
    setup() {
      const scrollRef = ref<Nullable<ScrollActionType>>(null);
      const tableHeight = ref(100);
      onMounted(() => {
        console.log(scrollRef.value?.getScrollWrap()?.clientHeight);
        tableHeight.value = (scrollRef.value?.getScrollWrap()?.clientHeight || 0) - 16 * 3 - 32 - 25;
        console.log(tableHeight.value);
      });

      const columns: Ref<any[]> = ref([]);
      const dataSource: Ref<any[]> = ref([]);

      function loadDataSuccess(excelDataList: ExcelData[]) {
        columns.value = [];
        dataSource.value = [];

        const [{ header, results }] = excelDataList;

        header.forEach((item) => {
          columns.value.push({ title: item, dataIndex: item, key: item, width: '200px' });
        });
        results.forEach((row, index) => {
          row.key = index;
          dataSource.value.push(row);
        });
      }

      function exportExcel() {
        jsonToSheetXlsx({
          data: unref(dataSource),
          filename: '导出文件',
        });
      }
      return { scrollRef, loadDataSuccess, columns, dataSource, tableHeight, exportExcel };
    },
  });
</script>

<style lang="less" scoped>
  .container {
    padding: 1rem;
  }
</style>

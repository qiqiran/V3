<template>
  <s-table ref="tableRef" :columns="columns" :data-source="dataSource" :height="1200" :pagination="false">
    <template #bodyCell="{ column }">
      <template v-if="column.key === 'operation'">
        <a>Action</a>
      </template>
    </template>
  </s-table>
</template>
<script lang="ts">
  import type { ScrollPosition } from '@surely-vue/table';
  import { defineComponent, ref } from 'vue';

  import '@surely-vue/table/dist/index.less';
  import STable from '@surely-vue/table';
  interface DataItem {
    key: number;
    name: string;
    age: number;
    address: string;
  }

  export default defineComponent({
    components: { STable },
    setup() {
      const incomes = new Array(200).fill(1).map((_, index) => ({
        title: `other ${index + 1}`,
        dataIndex: 'address',
        key: `other_${index + 1}`,
        width: 200,
      }));
      const columns = [
        {
          title: 'Full Name',
          dataIndex: 'name',
          fixed: 'left',
          width: 150,
        },
        {
          title: 'Age',
          dataIndex: 'age',
          fixed: 'left',
          width: 100,
        },
        {
          title: 'Column 1',
          dataIndex: 'address',
          width: 200,
        },
        {
          title: 'Column 2',
          dataIndex: 'address',
          width: 200,
        },
        {
          title: 'Column 3',
          dataIndex: 'address',
          key: 'Column 3',
          width: 200,
        },
        {
          title: 'Column 4',
          dataIndex: 'address',
          width: 200,
        },
        { title: 'Column 5', children: incomes },
        {
          title: 'Action',
          key: 'operation',
          fixed: 'right',
          width: 100,
        },
      ];
      const tableRef = ref();
      const data: DataItem[] = [];
      for (let i = 0; i < 1000; i++) {
        data.push({
          key: i,
          name: `Edrward ${i}`,
          age: i + 1,
          address: `London Park no. ${i}`,
        });
      }
      return {
        tableRef,
        dataSource: ref(data),
        columns: ref(columns),
        handleClick: (pos: ScrollPosition, smooth = false) => {
          tableRef.value.scrollTo(pos, smooth ? 'smooth' : 'auto');
        },
      };
    },
  });
</script>

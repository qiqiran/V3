<template>
  <div style="padding: 1rem">
    <BasicTable @register="registerTable" @row-dbClick="dbClick" @selection-change="selectionChange">
      <template #headerTop>
        <a-alert type="info" show-icon>
          <template #message>
            <template v-if="selectRowKeys.length > 0">
              <span style="line-height: 24px">已选中{{ selectRowKeys.length }}条记录(可跨页)</span>
              <a-button type="link" @click="setSelectedRowKeys([])" size="small">清空</a-button>
            </template>
            <template v-else>
              <span style="line-height: 24px">未选中任何项目</span>
            </template>
          </template>
        </a-alert>
      </template>

      <template #toolbar>
        <a-button type="primary">toolbar-button</a-button>
        <Button type="primary" danger>toolbar-button</Button>
        <Button type="link">toolbar-button</Button>
      </template>

      <template #age="{ text }">{{ text + '11111' }}</template>

      <template #action="{ record: { age } }">
        <span>
          <a-divider type="vertical" />
          <a class="ant-dropdown-link">
            更多{{ age }}
            <down-outlined />
          </a>
          <a-divider type="vertical" />
        </span>
      </template>
    </BasicTable>
  </div>
</template>

<script lang="ts">
  import { defineComponent, onMounted, ref, Ref } from 'vue';

  import { BasicTable, useTable, BasicColumn } from '@/components/Table';
  import { Button } from '@/components/Button';

  export default defineComponent({
    name: 'UserManage',
    components: {
      BasicTable,
      Button,
    },
    setup() {
      const columns: BasicColumn[] = [
        { fixed: 'left', title: '名讳', dataIndex: 'name', width: 150, helpMessage: '猪头 猪头' },
        {
          fixed: 'left',
          title: 'Ageaaa',
          dataIndex: 'age2',
          width: 150,
          helpMessage: '猪头 猪头',
        },
        {
          title: 'Age1',
          dataIndex: 'age1',
          slots: { customRender: 'age' },
          width: 150,
        },
        {
          title: 'Age',
          dataIndex: 'age',
          width: 150,
        },
        {
          width: 150,
          title: 'Address',
          dataIndex: 'address',
        },
        {
          title: 'Address',
          dataIndex: 'address',
          filters: [
            {
              text: 'London',
              value: 'London',
            },
            {
              text: '53',
              value: '53',
            },
          ],
          onFilter: (value: string, { address }) => address.indexOf(value) > -1,
        },
      ];

      let data: Ref<any[]> = ref([]);

      const paginationRef: Ref<any> = ref(null);

      const selectRowKeys: Ref<string[]> = ref(['key-1', 'key-2']);
      const [registerTable, { setLoading, getRowSelection, setColumns, setSelectedRowKeys, setPagination, getPaginationRef }] = useTable({
        // useSearchForm: true,
        bordered: true,
        // pagination: false,
        columns,
        dataSource: data,
        rowKey: 'key',
        rowSelection: { type: 'checkbox' },
        title: '账户列表',
        titleHelpMessage: 'help message',
        showTableSetting: true,
        tableSetting: { redo: loadData, size: true, setting: true, fullScreen: true },
        actionColumn: {
          width: 120,
          title: '操作',
          dataIndex: 'action',
          slots: { customRender: 'action' },
        },
      });

      let rowSelectionRef: Ref<any> = ref(null);
      onMounted(() => {
        loadData();
        paginationRef.value = getPaginationRef();
      });
      function loadData() {
        // console.log("getRowSelection", getRowSelection());

        rowSelectionRef.value = getRowSelection();
        setLoading(true);

        setTimeout(() => {
          data.value = [...Array(100)].map((_, i) => ({
            key: `key-${i}`,
            name: `Edward King ${i}`,
            age: 30,
            age1: 31,
            age2: 32,
            address: `London, Park Lane no. ${i}`,
          }));
          setLoading(false);
        }, 500);

        setTimeout(() => {
          setSelectedRowKeys(selectRowKeys.value);
          columns[0].helpMessage = '狗头 狗头';
          columns[5].filters = [
            {
              text: '56',
              value: '56',
            },
            {
              text: '55',
              value: '55',
            },
          ];
          setColumns(columns);
          setPagination({ total: 1000 });
        }, 2000);
      }

      return {
        columns,
        data,
        registerTable,
        selectRowKeys,
        setSelectedRowKeys,
        dbClick: (p1, p2, p3) => {
          console.log(p1);
          console.log(p2);
          console.log(p3);
        },
        rowSelectionRef,
        paginationRef,
        selectionChange: ({ keys }) => {
          selectRowKeys.value = keys;
        },
      };
    },
  });
</script>

<style></style>

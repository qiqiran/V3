<template>
  <div style="padding:1rem">
    <BasicTable
      @register="registerTable"
      @row-dbClick="dbClick"
      @selection-change="selectionChange"
    >
      <template #headerTop>
        <a-alert type="info" show-icon>
          <template #message>
            <template v-if="selectRowKeys.length > 0">
              <span>已选中{{ selectRowKeys.length }}条记录(可跨页)</span>
              <a-button type="link" @click="setSelectedRowKeys([])" size="small">清空</a-button>
            </template>
            <template v-else>
              <span>未选中任何项目</span>
            </template>
          </template>
        </a-alert>
      </template>

      <template #toolbar>
        <template v-if="selectRowKeys.length">
          <Button type="primary" @click="delData(selectRowKeys)" danger>批量删除</Button>
          <a-divider type="vertical" />
          <Button type="primary" @click="warningTip()">批量导出</Button>
          <a-divider type="vertical" />
        </template>
        <Button type="primary" @click="openEditModel({type:'add'})">新增用户</Button>
      </template>

      <template #action="{ record: { id } }">
        <Button type="link" @click="warningTip()">编辑</Button>
        <a-divider type="vertical" />
        <Button type="link" @click="delData([id])" danger>删除</Button>
      </template>
    </BasicTable>
  </div>
  <EditModel ref="EditModelRef" @ok="loadData()" />
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, Ref, unref } from "vue";

import { Modal } from "ant-design-vue";
import { BasicTable, useTable } from "@/components/Table";
import { Button } from "@/components/Button";
import EditModel from "./edit/index.vue";

import { columns } from "./columns";

import { getUsersApi, delUsersApi } from "@/api/basics/userManage";
import { info, success } from "@/hooks/web/useMessage";

export default defineComponent({
  name: "UserManage",
  components: {
    BasicTable,
    Button,
    EditModel,
  },
  setup() {
    let data: Ref<any[]> = ref([]);
    const EditModelRef: Ref<ComponentRef> = ref(null);

    function updateColumns(datas) {
      const usernames: Set<string> = new Set();
      const names: Set<string> = new Set();

      datas.forEach(({ username, name }) => {
        usernames.add(username);
        names.add(name);
      });

      columns.forEach((column) => {
        // if (column.dataIndex === "username") {
        //   Object.assign(column, {
        //     filters: [...usernames].reduce((res, row) => {
        //       res.push({ text: row, value: row });
        //       return res;
        //     }, [] as any[]),
        //     onFilter: (value: string, { username }) => username.indexOf(value) > -1,
        //   });
        // }
        if (column.dataIndex === "name") {
          Object.assign(column, {
            filters: [...names].reduce((res, row) => {
              res.push({ text: row, value: row });
              return res;
            }, [] as any[]),
            onFilter: (value: string, { name }) => name.indexOf(value) > -1,
          });
        }
      });
      setColumns(columns);
    }

    function loadData() {
      setLoading(true);

      getUsersApi()
        .then((res) => {
          data.value = res;
          updateColumns(data.value);
        })
        .finally(() => {
          setLoading(false);
        });
    }

    function delData(ids: string[]) {
      Modal.confirm({
        title: "确定删除吗?",
        onOk() {
          return delUsersApi(ids).then(() => {
            success("删除完成");

            loadData();
            setSelectedRowKeys([]);
          });
        },
        onCancel() {},
      });
    }

    const selectRowKeys: Ref<string[]> = ref([]);

    const [registerTable, { setLoading, getSelectRowKeys, getRowSelection, setColumns, setSelectedRowKeys, setPagination }] = useTable({
      rowKey: "id",
      bordered: true,
      columns,
      dataSource: data,
      rowSelection: { type: "checkbox" },
      title: "账户列表",
      titleHelpMessage: "help message",
      showTableSetting: true,
      tableSetting: { redo: loadData, size: true, setting: true, fullScreen: true },
      actionColumn: {
        width: 160,
        title: "操作",
        dataIndex: "action",
        slots: { customRender: "action" },
      },
    });

    function openEditModel(params) {
      unref(EditModelRef).open(params);
    }

    function warningTip() {
      info("时间紧任务急，功能没做别点了！");
    }

    onMounted(() => {
      loadData();
    });

    return {
      registerTable,
      selectRowKeys,
      setSelectedRowKeys,
      dbClick: (p1, p2, p3) => {
        console.log(p1);
        console.log(p2);
        console.log(p3);
      },
      selectionChange: ({ keys, rows }) => {
        selectRowKeys.value = keys;
      },

      loadData: loadData,
      delData: delData,

      EditModelRef,
      openEditModel,

      warningTip,
    };
  },
});
</script>

<style>
</style>
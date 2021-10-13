<template>
  <div ref="wrapRef" :class="getWrapperClass">
    <Table ref="tableElRef" v-bind="getBindValues">
      <template #[item]="data" v-for="item in Object.keys($slots)" :key="item">
        <slot :name="item" v-bind="data || {}"></slot>
      </template>

      <template #[`header-${column.dataIndex}`] v-for="column in columns" :key="column.dataIndex">
        <HeaderCell :column="column" />
      </template>
    </Table>
  </div>
</template>

<script lang="ts">
import type { BasicTableProps, TableActionType, SizeType, InnerHandlers, ColumnChangeParam } from "./types/table";
import { defineComponent, ref, unref, toRaw, computed } from "vue";

import { Table } from "ant-design-vue";
import HeaderCell from "./components/HeaderCell.vue";

import { useDesign } from "@/hooks/web/useDesign";
import { useLoading } from "./hooks/useLoading";
import { useTableScroll } from "./hooks/useTableScroll";
import { useColumns } from "./hooks/useColumns";
import { usePagination } from "./hooks/usePagination";
import { useRowSelection } from "./hooks/useRowSelection";
import { useCustomRow } from "./hooks/useCustomRow";
import { useTableHeader } from "./hooks/useTableHeader";
import { createTableContext } from "./hooks/useTableContext";

import { omit } from "lodash-es";
import { basicProps } from "./props";
export default defineComponent({
  components: { Table, HeaderCell },
  props: basicProps,
  emits: [
    "fetch-success",
    "fetch-error",
    "selection-change",
    "register",
    "row-click",
    "row-dbClick",
    "row-contextmenu",
    "row-mouseenter",
    "row-mouseleave",
    "edit-end",
    "edit-cancel",
    "edit-row-end",
    "edit-change",
    "expanded-rows-change",
    "change",
    "columns-change",
  ],
  setup(props, { attrs, emit, slots, expose }) {
    const tableElRef = ref(null);

    const wrapRef = ref(null);
    const innerPropsRef = ref<Partial<BasicTableProps>>();

    const { prefixCls } = useDesign("basic-table");

    const getProps = computed(() => {
      return { ...props, ...unref(innerPropsRef) } as BasicTableProps;
    });

    const { getLoading, setLoading } = useLoading(getProps);

    const { getPaginationInfo, getPagination, setPagination, setShowPagination, getShowPagination } = usePagination(getProps);

    const { getViewColumns, getColumns, setCacheColumnsByField, setColumns, getColumnsRef, getCacheColumns } = useColumns(getProps, getPaginationInfo);
    
    const getDataSourceRef = computed(() => unref(getProps).dataSource || []);

    const { getScrollRef, redoHeight } = useTableScroll(getProps, tableElRef, getColumnsRef, getDataSourceRef);

    const { getRowSelection, getRowSelectionRef, getSelectRows, clearSelectedRowKeys, getSelectRowKeys, deleteSelectRowByKey, setSelectedRowKeys } = useRowSelection(getProps, getDataSourceRef, emit);
    
    const getAutoCreateKey = computed(() => true);

    const { customRow } = useCustomRow(getProps, { setSelectedRowKeys, getSelectRowKeys, clearSelectedRowKeys, getAutoCreateKey, emit });
    console.log(getRowSelectionRef);

    const handlers: InnerHandlers = {
      onColumnsChange: (data: ColumnChangeParam[]) => {
        emit("columns-change", data);
        // support useTable
        unref(getProps).onColumnsChange?.(data);
      },
    };

    const { getHeaderProps } = useTableHeader(getProps, slots, handlers);
    const getBindValues = computed(() => {
      let propsData: Recordable = {
        size: "middle",
        // ...(dataSource.length === 0 ? { getPopupContainer: () => document.body } : {}),
        ...attrs,
        customRow,
        ...unref(getProps),
        ...unref(getHeaderProps),
        scroll: unref(getScrollRef),
        loading: unref(getLoading),
        rowSelection: unref(getRowSelectionRef),
        pagination: toRaw(unref(getPaginationInfo)),
        columns: toRaw(unref(getViewColumns)),
      };
      if (slots.expandedRowRender) {
        propsData = omit(propsData, "scroll");
      }
      propsData = omit(propsData, ["class", "onChange"]);
      return propsData;
    });

    const getWrapperClass = computed(() => {
      return [prefixCls, attrs.class];
    });

    function setProps(props: Partial<BasicTableProps>) {
      innerPropsRef.value = { ...unref(innerPropsRef), ...props };
    }

    const tableAction: TableActionType = {
      reload: unref(getBindValues).reload,
      getSelectRows,
      clearSelectedRowKeys,
      getSelectRowKeys,
      deleteSelectRowByKey,
      setPagination,
      // setTableData,
      // updateTableDataRecord,
      // findTableDataRecord,
      redoHeight,
      setSelectedRowKeys,
      setColumns,
      setLoading,
      // getDataSource,
      // getRawDataSource,
      setProps,
      getRowSelection,
      getPaginationRef: getPagination,
      getColumns,
      getCacheColumns,
      emit,
      // updateTableData,
      setShowPagination,
      getShowPagination,
      setCacheColumnsByField,
      // expandAll,
      // collapseAll,
      getSize: () => {
        return unref(getBindValues).size as SizeType;
      },
    };

    createTableContext({ ...tableAction, wrapRef, getBindValues });

    emit("register", tableAction);

    // return { tableElRef, getBindValues, getLoading, getWrapperClass, redoHeight };
    return {
      tableElRef,
      getBindValues,
      getLoading,
      // registerForm,
      // handleSearchInfoChange,
      // getEmptyDataIsShowTable,
      // handleTableChange,
      // getRowClassName,
      wrapRef,
      tableAction,
      redoHeight,
      // getFormProps: getFormProps as any,
      // replaceFormSlotKey,
      // getFormSlotKeys,
      getWrapperClass,
      columns: getViewColumns,
    };
  },
});
</script>


<style lang="less">
@border-color: #cecece4d;

@prefix-cls: ~"@{namespace}basic-table";

.@{prefix-cls} {
  max-width: 100%;

  &-row__striped {
    td {
      background-color: @app-content-background;
    }
  }

  &-form-container {
    padding: 16px;

    .ant-form {
      padding: 12px 10px 6px 10px;
      margin-bottom: 16px;
      background-color: @component-background;
      border-radius: 2px;
    }
  }

  &--inset {
    .ant-table-wrapper {
      padding: 0;
    }
  }

  .ant-tag {
    margin-right: 0;
  }

  .ant-table-wrapper {
    padding: 6px;
    background-color: @component-background;
    border-radius: 2px;
    overflow: hidden;

    .ant-table-title {
      min-height: 40px;
      padding: 0 0 8px 0 !important;
    }

    .ant-table.ant-table-bordered .ant-table-title {
      border: none !important;
    }
  }

  .ant-table {
    width: 100%;
    overflow-x: hidden;

    &-title {
      display: flex;
      padding: 8px 6px;
      border-bottom: none;
      justify-content: space-between;
      align-items: center;
    }

    // .ant-table-tbody > tr.ant-table-row-selected td {
    //   background-color: tint(@primary-color, 90%) !important;
    // }

    .ant-table-tbody > tr.ant-table-row-selected {
      &:hover {
        td {
          background-color: tint(@primary-color, 80%) !important;
        }
      }
    }
    .ant-table-thead,
    .ant-table-tbody{
      tr{
        td,
        th{
          padding: 16px 8px;
        }
      }
    }
  }

  .ant-pagination {
    margin: 10px 0 0 0;
  }

  .ant-table-footer {
    padding: 0;

    .ant-table-wrapper {
      padding: 0;
    }

    table {
      border: none !important;
    }

    .ant-table-body {
      overflow-x: hidden !important;
      //  overflow-y: scroll !important;
    }

    td {
      padding: 12px 8px;
    }
  }
}
</style>
import type { PropType } from 'vue';
import type { PaginationProps } from './types/pagination';
import type {
  BasicColumn,
  // FetchSetting,
  // TableSetting,
  // SorterResult,
  // TableCustomRecord,
  TableRowSelection,
} from './types/table';
import { DEFAULT_FILTER_FN } from './const';
import { propTypes } from '@/utils/propTypes';

export const basicProps = {
  // 列
  columns: {
    type: [Array] as PropType<BasicColumn[]>,
    default: () => [],
  },
  // 是否展示序号列
  showIndexColumn: propTypes.bool.def(true),
  // 序号列配置
  indexColumnProps: {
    type: Object as PropType<BasicColumn>,
    default: null,
  },
  // 数据源
  dataSource: {
    type: Array as PropType<Recordable[]>,
    default: null,
  },

  // 表格标题title
  title: {
    type: [String, Function] as PropType<string | ((data: Recordable) => string)>,
    default: null,
  },
  // 表格标题title提示信息
  titleHelpMessage: {
    type: [String, Array] as PropType<string | string[]>,
  },

  // 分页配置，若不需要分页入参false
  pagination: {
    type: [Object, Boolean] as PropType<PaginationProps | boolean>,
    default: true,
  },

  // 是否展示外边框和列边框
  bordered: propTypes.bool,
  // 页面是否加载中
  loading: propTypes.bool.def(false),
  // 是否树形表格
  isTreeTable: propTypes.bool.def(false),

  // 列表项选择配置
  rowSelection: {
    type: Object as PropType<TableRowSelection | null>,
    default: null,
  },
  // 点击行选中 需指定type
  clickToRowSelect: propTypes.bool.def(true),
  // tableSetting: propTypes.shape<TableSetting>({}),
  inset: propTypes.bool,
  // sortFn: {
  //   type: Function as PropType<(sortInfo: SorterResult) => any>,
  //   default: DEFAULT_SORT_FN,
  // },
  filterFn: {
    type: Function as PropType<(data: Partial<Recordable<string[]>>) => any>,
    default: DEFAULT_FILTER_FN,
  },
  showTableSetting: propTypes.bool,
  autoCreateKey: propTypes.bool.def(true),
  striped: propTypes.bool.def(true),
  showSummary: propTypes.bool,
  summaryFunc: {
    type: [Function, Array] as PropType<(...arg: any[]) => any[]>,
    default: null,
  },
  summaryData: {
    type: Array as PropType<Recordable[]>,
    default: null,
  },
  indentSize: propTypes.number.def(24),
  canColDrag: propTypes.bool.def(true),
  api: {
    type: Function as PropType<(...arg: any[]) => Promise<any>>,
    default: null,
  },
  beforeFetch: {
    type: Function as PropType<Fn>,
    default: null,
  },
  afterFetch: {
    type: Function as PropType<Fn>,
    default: null,
  },
  handleSearchInfoFn: {
    type: Function as PropType<Fn>,
    default: null,
  },
  // fetchSetting: {
  //   type: Object as PropType<FetchSetting>,
  //   default: () => {
  //     return FETCH_SETTING;
  //   },
  // },
  // 立即请求接口
  immediate: propTypes.bool.def(true),
  emptyDataIsShowTable: propTypes.bool.def(true),
  // 额外的请求参数
  searchInfo: {
    type: Object as PropType<Recordable>,
    default: null,
  },
  // 使用搜索表单
  useSearchForm: propTypes.bool,
  // 表单配置
  // formConfig: {
  //   type: Object as PropType<Partial<FormProps>>,
  //   default: null,
  // },
  actionColumn: {
    type: Object as PropType<BasicColumn>,
    default: null,
  },
  ellipsis: propTypes.bool.def(true),
  canResize: propTypes.bool.def(true),
  clearSelectOnPageChange: propTypes.bool,
  resizeHeightOffset: propTypes.number.def(0),
  maxHeight: propTypes.number,
  // rowKey: {
  //   type: [String, Function] as PropType<string | ((record: Recordable) => string)>,
  //   default: '',
  // },
  // rowClassName: {
  //   type: Function as PropType<(record: TableCustomRecord<any>, index: number) => string>,
  // },
  scroll: {
    type: Object as PropType<{ x: number | true; y: number }>,
    default: null,
  },
  beforeEditSubmit: {
    type: Function as PropType<(data: { record: Recordable; index: number; key: string | number; value: any }) => Promise<any>>,
  },
};

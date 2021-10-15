import Pagination from 'ant-design-vue/lib/pagination';
import { VNodeChild } from 'vue';

interface PaginationRenderProps {
  page: number;
  type: 'page' | 'prev' | 'next';
  originalElement: any;
}

export declare class PaginationConfig extends Pagination {
  position?: 'top' | 'bottom' | 'both';
}
export interface PaginationProps {
  /**
   * 数据总条目数
   * @default 0
   * @type number
   */
  total?: number;

  /**
   * 默认页码
   * @default 1
   * @type number
   */
  defaultCurrent?: number;

  /**
   * 页码
   * @type number
   */
  current?: number;

  /**
   * 默认的每页条数
   * @default 10
   * @type number
   */
  defaultPageSize?: number;

  /**
   * 每页条数
   * @type number
   */
  pageSize?: number;

  /**
   * 只有一页时是否隐藏分页器
   * @default false
   * @type boolean
   */
  hideOnSinglePage?: boolean;

  /**
   * 是否可以改变 pageSize
   * @default true
   * @type boolean
   */
  showSizeChanger?: boolean;

  /**
   * 指定每页可以显示多少条
   * @default ['10', '20', '30', '40']
   * @type string[]
   */
  pageSizeOptions?: string[];

  /**
   * 是否可以快速跳转至某页
   * @default true
   * @type boolean
   */
  showQuickJumper?: boolean | object;

  /**
   * 用于显示数据总量和当前数据顺序
   * @type Function
   */
  showTotal?: (total: number, range: [number, number]) => any;

  /**
   * 分页器尺寸 'large' | 'small'
   * @default 'small'
   * @type string
   */
  size?: string;

  /**
   * 是否显示为简单分页
   * @default false
   * @type boolean
   */
  simple?: boolean;

  /**
   * 用于自定义页码的结构，可用于优化 SEO
   * @type Function
   */
  itemRender?: (props: PaginationRenderProps) => VNodeChild | JSX.Element;
}

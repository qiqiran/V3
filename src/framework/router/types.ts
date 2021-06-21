import { defineComponent } from 'vue';
import type { RouteRecordRaw } from 'vue-router'

export type Component<T extends any = any> =
  | ReturnType<typeof defineComponent>
  | (() => Promise<typeof import('*.vue')>)
  | (() => Promise<T>);

export interface RouteMeta {
  // title
  title?: string;
  // 是否不缓存
  ignoreKeepAlive?: boolean;
  // 是否固定标签
  affix?: boolean;
  // 外部链接地址
  frameSrc?: string;
  // 当前选中的菜单
  currentActiveMenu?: string;
  // 不在tab中显示
  hideTab?: boolean;
}

export interface AppRouteRecordRaw extends Omit<RouteRecordRaw, 'meta' | 'children'> {
  meta?: RouteMeta;
  children?: AppRouteRecordRaw[];
}

export interface Menu {
  name: string;

  icon?: string;

  path: string;

  disabled?: boolean;

  children?: Menu[];

  orderNo?: number;

  // roles?: RoleEnum[];

  meta?: Partial<RouteMeta>;

  hideMenu?: boolean;
}
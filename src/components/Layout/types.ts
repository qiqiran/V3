
import { ThemeEnum } from 'src/enums/appEnum';
import { MenuModeEnum, MenuTypeEnum, TriggerEnum } from 'src/enums/menuEnum';

export interface MenuSetting {
  theme: ThemeEnum;
  // bgColor: string;
  // fixed: boolean;
  showTopMenu: boolean;
  collapsed: boolean;
  // canDrag: boolean;
  // show: boolean;
  // hidden: boolean;
  // split: boolean;
  // menuWidth: number;
  // mode: MenuModeEnum;
  // type: MenuTypeEnum;
  // topMenuAlign: 'start' | 'center' | 'end';
  trigger: TriggerEnum;
  // accordion: boolean;
  // closeMixSidebarOnChange: boolean;
  // collapsedShowTitle: boolean;
  // // mixSideTrigger: MixSidebarTriggerEnum;
  // mixSideFixed: boolean;
}

export interface MultiTabSetting {
  show: boolean;
  showQuick: boolean;
  canDrag: boolean;
  showRedo: boolean;
  showFold: boolean;
}

export interface HeaderSetting {
  theme: ThemeEnum;
  show: boolean;
  bgColor: string;
  fixed: boolean;

  // 显示全屏按钮
  showFullScreen: boolean;
  // 开启全屏功能
  useLockPage: boolean;
  // 显示文档按钮
  showDoc: boolean;
  // 显示消息中心按钮
  showNotice: boolean;

  showSearch: boolean;
}

export interface SiderSetting {
  theme: ThemeEnum;
  show: boolean;
  bgColor: string;
  siderWidth: number;
  siderCollapsedWidth: number;
}

export interface ProjectConfig {
  headerSetting: HeaderSetting;
  // 菜单类型
  // menuType: MenuTypeEnum;
  menuSetting: MenuSetting;
  siderSetting: SiderSetting;

  // locale: LocaleSetting;

  // permissionCacheType: CacheTypeEnum;

  // 是否显示配置按钮
  showSettingButton: boolean;
  // settingButtonPosition: SettingButtonPositionEnum;
  // 权限模式
  // permissionMode: PermissionModeEnum;
  // 网站灰色模式，用于可能悼念的日期开启
  grayMode: boolean;
  // 是否开启色弱模式
  colorWeak: boolean;
  // 主题色
  themeColor: string;
  // themeMode: ThemeMode;
  // 全屏显示主界面,不显示菜单,及顶部
  fullContent: boolean;
  // 区域宽度
  // contentMode: ContentEnum;
  // 是否显示logo
  showLogo: boolean;
  showFooter: boolean;

  // 多标签页设置
  multiTabSetting: MultiTabSetting;

  // transitionSetting: TransitionSetting;

  // pageLayout是否开启keep-alive
  openKeepAlive: boolean;

  //
  // 锁屏时间
  lockTime: number;
  // 显示面包屑
  showBreadCrumb: boolean;
  // 显示面包屑图标
  showBreadCrumbIcon: boolean;
  // 使用error-handler-plugin
  useErrorHandle: boolean;
  // 是否开启回到顶部
  useOpenBackTop: boolean;
  // 是否可以嵌入iframe页面
  canEmbedIFramePage: boolean;
  // 切换界面的时候是否删除未关闭的message及notify
  closeMessageOnSwitch: boolean;
  // 切换界面的时候是否取消已经发送但是未响应的http请求。
  removeAllHttpPending: boolean;
}
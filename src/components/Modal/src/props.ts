import type { PropType, VNodeChild, CSSProperties } from 'vue';
import { ButtonProps } from 'ant-design-vue/es/button/buttonTypes';

import type { ModalWrapperProps } from './types';

type VueNode = VNodeChild | JSX.Element;

export const modalProps = {
  visible: { type: Boolean },

  scrollTop: { type: Boolean, default: true },

  height: { type: Number },
  minHeight: { type: Number },

  // 开启拖拽
  draggable: { type: Boolean, default: true },
  centered: { type: Boolean },

  cancelText: { type: String, default: '取消' },
  okText: { type: String, default: '确认' },

  closeFunc: Function as PropType<() => Promise<boolean>>,
};


export const basicProps = Object.assign({}, modalProps, {
  visible: { type: Boolean },
  defaultFullscreen: { type: Boolean },
  // 是否支持全屏
  canFullscreen: { type: Boolean, default: true },
  // After enabling the wrapper, the bottom can be increased in height
  wrapperFooterOffset: { type: Number, default: 0 },
  // 表头提示信息
  helpMessage: [String, Array] as PropType<string | string[]>,
  // Whether to setting wrapper
  useWrapper: { type: Boolean, default: true },

  wrapperProps: Object as PropType<Partial<ModalWrapperProps>>,

  loading: { type: Boolean, default: false },

  loadingTip: { type: String },
  // 页脚，支持传入组件自定义，或设为null不显示
  footer: Object as PropType<VueNode>,
  // 显示关闭按钮
  showCancelBtn: { type: Boolean, default: true },
  // 显示确认按钮
  showOkBtn: { type: Boolean, default: true },
  // 确认按钮类型
  okType: { type: String, default: 'primary' },

  okButtonProps: Object as PropType<ButtonProps>,

  cancelButtonProps: Object as PropType<ButtonProps>,

  confirmLoading: { type: Boolean },

  destroyOnClose: { type: Boolean },

  title: { type: String },

  mask: { type: Boolean, default: true },
  maskStyle: Object as PropType<CSSProperties>,
  // 点击蒙层是否允许关闭
  maskClosable: { type: Boolean, default: false },
  // 是否支持键盘 esc 关闭
  keyboard: { type: Boolean, default: true },

  width: [String, Number] as PropType<string | number>,

  wrapClassName: { type: String },

  zIndex: { type: Number },
});
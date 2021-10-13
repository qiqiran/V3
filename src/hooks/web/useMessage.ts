import { message as Message } from 'ant-design-vue';

import { isFunction } from 'src/utils/is';

const { messageDuration } = require('config');

type NoticeType = 'success' | 'error' | 'info' | 'warning' | 'warn' | 'loading';

export function success(content: any, duration?: number | Function, onClose?: Function) {
  openMessage(content, 'success', duration, onClose);
}
export function error(content: any, duration?: number | Function, onClose?: Function) {
  openMessage(content, 'error', duration, onClose);
}
export function info(content: any, duration?: number | Function, onClose?: Function) {
  openMessage(content, 'info', duration, onClose);
}
export function warning(content: any, duration?: number | Function, onClose?: Function) {
  openMessage(content, 'warning', duration, onClose);
}
export function warn(content: any, duration?: number | Function, onClose?: Function) {
  openMessage(content, 'warning', duration, onClose);
}
export function loading(content: any, duration?: number | Function, onClose?: Function) {
  openMessage(content, 'loading', duration, onClose);
}
export function openMessage(content: any, type: NoticeType, duration: any = messageDuration, onClose?: any) {
  if (isFunction(duration)) {
    onClose = duration;
    duration = messageDuration;
  }
  Message.open({ content, duration, type: type as any, onClose });
}
export default { success, error, info, warning, warn, loading, openMessage };

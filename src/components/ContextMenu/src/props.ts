import type { PropType, CSSProperties } from 'vue';
import type { Axis, ContextMenuItem } from './types';

export const contextMenuProps = {
  width: { type: Number, default: 156 },
  customEvent: {
    type: Object as PropType<Event>,
    default: null,
  },
  styles: {
    name: 'style',
    getter: true,
    type: Object as PropType<CSSProperties>,
    default: {},
  },
  showIcon: { type: Boolean, default: true },
  axis: {
    // The position of the right mouse button click
    type: Object as PropType<Axis>,
    default() {
      return { x: 0, y: 0 };
    },
  },
  items: {
    // The most important list, if not, will not be displayed
    type: Array as PropType<ContextMenuItem[]>,
    default() {
      return [];
    },
  },
};

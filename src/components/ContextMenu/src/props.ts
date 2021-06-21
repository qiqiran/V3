import type { PropType } from 'vue';
import type { Axis, ContextMenuItem } from './types';
import { createTypes, VueTypeValidableDef, VueTypesInterface } from 'vue-types';

export const contextMenuProps = {
  width: { type: Number, default: 156 },
  customEvent: {
    type: Object as PropType<Event>,
    default: null,
  },
  styles: {
    name: 'style',
    getter: true,
    type: [String, Object],
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

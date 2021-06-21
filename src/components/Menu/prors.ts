import type { PropType } from "vue";
import type { Menu as MenuType } from "#/router/types";

export const itemProps = {
  item: {
    type: Object as PropType<MenuType>,
    default: {},
  },
  isHorizontal: Boolean,
}

export const contentProps = {
  item: {
    type: Object as PropType<MenuType>,
    default: null,
  },
}
<script lang="ts">
import { defineComponent, h, unref, computed } from "vue";
import BasicButton from "./BasicButton.vue";
import { Popconfirm } from "ant-design-vue";
import { extendSlots } from "@/utils/helper/tsxHelper";
import { omit } from "lodash-es";
import { useAttrs } from "@/hooks/core/useAttrs";

const props = {
  /**
   * Whether to enable the drop-down menu
   * @default: true
   */
  enable: {
    type: Boolean,
    default: true,
  },
};

export default defineComponent({
  name: "PopButton",
  components: { Popconfirm, BasicButton },
  inheritAttrs: false,
  props,
  setup(props, { slots }) {
    const attrs = useAttrs();

    // get inherit binding value
    const getBindValues = computed(() => {
      const popValues = Object.assign(
        {
          okText: `确认`,
          cancelText: `取消`,
        },
        { ...props, ...unref(attrs) }
      );
      return popValues;
    });

    return () => {
      const bindValues = omit(unref(getBindValues), "icon");
      const Button = h(BasicButton, omit(bindValues, "title"), extendSlots(slots));

      // If it is not enabled, it is a normal button
      if (!props.enable) {
        return Button;
      }
      return h(Popconfirm, bindValues, { default: () => Button });
    };
  },
});
</script>

import { defineComponent } from 'vue';
import { createFromIconfontCN } from '@ant-design/icons-vue';
import { useDesign } from '@/hooks/web/useDesign';

const { prefixCls } = require('@/settings/designSetting');

const Icon = createFromIconfontCN({
  scriptUrl: ['static/iconfont/iconfont.js', 'static/iconfont/ant-design.js'],
});

export default defineComponent({
  props: {
    icon: { type: String, required: true },
    color: { type: String },
    size: { type: Number, default: 14 },
  },
  setup(props) {
    const isHisPrefixCls = props.icon?.startsWith(prefixCls);
    const icon: string = isHisPrefixCls ? props.icon : useDesign(props.icon).prefixCls;
    const color = props.color ? { color: props.color } : {};
    const fontSize = props.size ? { fontSize: `${props.size}px` } : {};

    return () => <Icon type={icon} style={{ ...color, ...fontSize }} />;
  },
});

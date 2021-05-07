import { defineComponent, inject } from 'vue';
import { createFromIconfontCN } from '@ant-design/icons-vue';

const Icon = createFromIconfontCN({
  scriptUrl: 'static/iconfont/iconfont.js',
});

export default defineComponent({
  props: {
    icon: { type: String, required: true },
    color: { type: String },
    size: { type: Number, default: 14 }
  },
  setup(props) {
    const prefixCls: any = inject("prefixCls");
    const isHisPrefixCls = props.icon?.startsWith(prefixCls);
    const icon: string = isHisPrefixCls ? props.icon : `${prefixCls}${props.icon}`;
    const color = props.color ? { color: props.color } : {};
    const fontSize = props.size ? { fontSize: `${props.size}px` } : {};

    return () => <Icon type={icon} style={{ ...color, ...fontSize }} />;
  },
});
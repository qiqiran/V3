import { prefixCls } from '@/settings/designSetting';

export interface AppContextProps {
  prefixCls: string;
}

export function useDesign(scope: string) {
  return {
    prefixCls: `${prefixCls}${scope}`,
    prefixVar: prefixCls,
  };
}

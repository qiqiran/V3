import { inject } from 'vue';

export interface AppContextProps {
  prefixCls: string;
}

export function useDesign(scope: string) {  
  const prefixCls = inject("prefixCls");
  return {
    prefixCls: `${prefixCls}${scope}`,
    prefixVar: prefixCls,
  };
}

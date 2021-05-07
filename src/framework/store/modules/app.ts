import { VuexModule, getModule, Module, Mutation, Action } from 'vuex-module-decorators';
import store from 'src/framework/store';
import { isObject } from 'src/utils/is';

import { ProjectConfig } from 'src/components/Layout/types'
import { ThemeEnum } from 'src/enums/appEnum';
import { TriggerEnum } from 'src/enums/menuEnum'

function deepMerge<T = any>(src: any = {}, target: any = {}): T {
  let key: string;
  for (key in target) {
    src[key] = isObject(src[key]) ? deepMerge(src[key], target[key]) : (src[key] = target[key]);
  }
  return src;
}

const NAME = 'app';
@Module({ dynamic: true, namespaced: true, store, name: NAME })
class App extends VuexModule {
  private isMobile: boolean = false;

  /**
   * 项目框架配置
   */
  private projectConfigState: ProjectConfig | null = ({
    menuSetting: { theme: ThemeEnum.LIGHT, collapsed: false, trigger: TriggerEnum.HEADER, showTopMenu: false },
    multiTabSetting: { show: true },
    headerSetting: { theme: ThemeEnum.LIGHT, show: true, showFullScreen: true },
    siderSetting: { theme: ThemeEnum.LIGHT, show: true, siderWidth: 220, siderCollapsedWidth: 48 },
    showFooter: false
  } as ProjectConfig);

  get getIsMobile(): boolean {
    return this.isMobile;
  }

  get getProjectConfig(): ProjectConfig {
    return this.projectConfigState || ({} as ProjectConfig);
  }
  
  @Mutation
  commitIsMobile(isMobile: boolean) {
    this.isMobile = isMobile;
  }

  @Mutation
  commitProjectConfigState(proCfg: DeepPartial<ProjectConfig>): void {
    this.projectConfigState = deepMerge(this.projectConfigState || {}, proCfg);
  }
}
export const appStore = getModule<App>(App);
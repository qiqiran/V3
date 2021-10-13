import { VuexModule, getModule, Module, Mutation } from 'vuex-module-decorators';
import store from '#/store';

import type { ProjectConfig } from '@/types/config';

import { PROJ_CFG_KEY } from 'src/enums/cacheEnum';

import { deepMerge } from 'src/utils';
import { Persistent } from 'src/utils/cache/persistent';

const NAME = 'app';
@Module({ dynamic: true, namespaced: true, store, name: NAME })
class App extends VuexModule {
  private isMobile = false;

  /**
   * 项目框架配置
   */
  private projectConfigState: ProjectConfig | null = Persistent.getLocal(PROJ_CFG_KEY);

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
    Persistent.setLocal(PROJ_CFG_KEY, this.projectConfigState);
  }
}
export const appStore = getModule<App>(App);

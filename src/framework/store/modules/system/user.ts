import type { LoginParams, LoginResultModel as UserInfo } from "src/api/system/model/loginModel"

import { USER_INFO_KEY } from 'src/enums/cacheEnum';;
import { PageEnum } from 'src/enums/pageEnum';

import { VuexModule, getModule, Module, Mutation, Action } from 'vuex-module-decorators';
import store from '#/store';

import { Persistent } from 'src/utils/cache/persistent';
import router from "#/router";

import { loginApi } from "src/api/system/login"

const NAME = 'user';
@Module({ dynamic: true, namespaced: true, store, name: NAME })
class App extends VuexModule {

  private userInfoState: UserInfo | null = Persistent.getLocal(USER_INFO_KEY);

  get getToken(): string {
    return this.userInfoState?.KEY || "";
  }

  get getUserInfoState(): UserInfo {
    return this.userInfoState || ({} as UserInfo);
  }

  @Mutation
  commitUserInfoState(userInfo: UserInfo | null): void {
    this.userInfoState = userInfo;
    Persistent.setLocal(USER_INFO_KEY, this.userInfoState, true);
  }

  @Action
  async login(
    params: LoginParams & {
      goHome?: boolean;
    }
  ): Promise<UserInfo | null> {
    const { goHome = true, ...loginParams } = params;
    const data = await loginApi(loginParams);
    this.commitUserInfoState(data);
    goHome && (await router.replace(PageEnum.BASE_HOME));
    return data;
  }

  @Action
  async logout() {
    this.commitUserInfoState(null);
    router.push(PageEnum.BASE_LOGIN);
  }
}
export const userStore = getModule<App>(App);
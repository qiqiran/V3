import { enableStorageEncryption, DEFAULT_CACHE_TIME } from 'src/settings/encryptionSetting';

import type { LoginParams, LoginResultModel as UserInfo } from 'src/api/system/model/loginModel';

import { USER_INFO_KEY } from 'src/enums/cacheEnum';
import { PageEnum } from 'src/enums/pageEnum';

import { VuexModule, getModule, Module, Mutation, Action } from 'vuex-module-decorators';
import store from '#/store';

import { createCookieStore } from 'src/utils/cache/cookieStore';

import router from '#/router';

import { loginApi } from 'src/api/system/login';

const cs = createCookieStore({
  // No encryption in debug mode
  hasEncrypt: enableStorageEncryption,
  prefixKey: `${'wiot'}_`.toUpperCase(),
  timeout: DEFAULT_CACHE_TIME,
});

const NAME = 'user';
@Module({ dynamic: true, namespaced: true, store, name: NAME })
class App extends VuexModule {
  private userInfoState: UserInfo | null = cs.get(USER_INFO_KEY);

  get getToken(): string {
    return this.userInfoState?.KEY || '';
  }

  get getUserInfoState(): UserInfo {
    return this.userInfoState || ({} as UserInfo);
  }

  @Mutation
  commitUserInfoState(userInfo: UserInfo | null): void {
    this.userInfoState = userInfo;
    console.log(cs.set(USER_INFO_KEY, this.userInfoState));

    cs.set(USER_INFO_KEY, this.userInfoState);
  }

  @Action
  async login(
    params: LoginParams & {
      goHome?: boolean;
    },
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

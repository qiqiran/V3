import type { LockInfo } from '@/types/store';

import { VuexModule, getModule, Module, Mutation, Action } from 'vuex-module-decorators';
import store from '#/store';

import { LOCK_INFO_KEY } from 'src/enums/cacheEnum';
import { Persistent } from 'src/utils/cache/persistent';
import { userStore } from './system/user';

const NAME = 'app-lock';
@Module({ dynamic: true, namespaced: true, store, name: NAME })
class App extends VuexModule {
  private lockInfo: LockInfo | null = Persistent.getLocal(LOCK_INFO_KEY);

  get getLockInfo(): LockInfo {
    return this.lockInfo || {};
  }

  @Mutation
  commitLockInfo(info: LockInfo | null) {
    this.lockInfo = info
  }

  @Action
  setLockInfo(info: LockInfo) {
    const lockInfo = Object.assign({}, this.lockInfo, info)
    this.commitLockInfo(lockInfo);
    Persistent.setLocal(LOCK_INFO_KEY, lockInfo, true);
  }

  @Action
  resetLockInfo() {
    Persistent.removeLocal(LOCK_INFO_KEY);
    this.commitLockInfo(null);
  }

  @Action
  async unLock(password?: string) {
    if (this.getLockInfo?.pwd === password) {
      this.resetLockInfo();
      return true;
    }
    const tryLogin = async () => {
      try {
        const NM = userStore.getUserInfoState?.NM;
        const res = await userStore.login({
          NM,
          PW: password!,
          goHome: false,
        });

        if (res) {
          this.resetLockInfo();
        }
        return res;
      } catch (error) {
        return false;
      }
    };
    return await tryLogin();
  }
}
export const lockStore = getModule<App>(App);
import type { Router } from 'vue-router';
import { setLastChangeTab } from 'src/components/Layout/tabs/useTabChange';
import { REDIRECT_NAME } from '../constant';

export function createPageGuard(router: Router) {
  // const loadedPageMap = new Map<string, boolean>();
  router.beforeEach(async (to) => {
    try {
      to.query.title && (to.meta.title = to.query.title);
    } catch (e) {}
    to.name != REDIRECT_NAME && setLastChangeTab(to);
    return true;
  });

  router.afterEach(() => {
    // loadedPageMap.set(to.path, true);
  });
}

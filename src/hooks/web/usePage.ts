import { unref } from 'vue';
import type { RouteLocationRaw } from 'vue-router';

import router from '#/router';

import { isString } from 'src/utils/is';

function handleError(error: Error) {
  console.error(error);
}

export function useGo() {
  const { push, replace } = router;
  function go(opt: any, isReplace = false): Promise<boolean> {
    return new Promise((resolve, reject) => {
      if (!opt) reject('undefined url information');
      if (isString(opt)) {
        isReplace
          ? replace(opt)
              .then(() => resolve(true))
              .catch(handleError)
          : push(opt)
              .then(() => resolve(true))
              .catch(handleError);
      } else {
        opt = opt as RouteLocationRaw;
        isReplace
          ? replace(opt)
              .then(() => resolve(true))
              .catch(handleError)
          : push(opt)
              .then(() => resolve(true))
              .catch(handleError);
      }
    });
  }
  return go;
}

export function useRedo() {
  const { replace, currentRoute } = router;
  const { query, params } = currentRoute.value;

  function redo(): Promise<boolean> {
    return new Promise((resolve) => {
      replace({
        path: '/redirect' + unref(currentRoute).fullPath,
        query,
        params,
      }).then(() => resolve(true));
    });
  }
  return redo;
}

import { Router } from 'vue-router';

import { createPermissionGuard } from './permissionGuard';
import { createPageGuard } from './pageGuard';

export function createGuard(router: Router) {
  createPermissionGuard(router);
  createPageGuard(router);
}

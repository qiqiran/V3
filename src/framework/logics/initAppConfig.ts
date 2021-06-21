import type { ProjectConfig } from '@/types/config';

import { PROJ_CFG_KEY } from 'src/enums/cacheEnum';

import projectSetting from 'src/settings/projectSetting'

import { useRootSetting } from 'src/hooks/setting'

import { deepMerge } from 'src/utils';
import { Persistent } from 'src/utils/cache/persistent';
import { updateHeaderBgColor, updateSidebarBgColor } from '#/logics/theme/updateBackground';
import { changeThemeColor } from "#/ui/themePlugin/index.js";

export function initAppConfigStore() {
  const { setRootSetting } = useRootSetting();

  let projCfg: ProjectConfig = Persistent.getLocal(PROJ_CFG_KEY) as ProjectConfig;

  projCfg = deepMerge(projectSetting, projCfg || {});

  const {
    themeColor,
    headerSetting: { bgColor: headerBgColor },
    siderSetting: { bgColor: siderBgColor },
  } = projCfg;

  themeColor && changeThemeColor(themeColor);
  headerBgColor && updateHeaderBgColor(headerBgColor);
  siderBgColor && updateSidebarBgColor(siderBgColor);

  setRootSetting(projCfg);
}
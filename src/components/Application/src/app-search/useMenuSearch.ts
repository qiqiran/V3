import type { Menu } from '#/router/types';

import { ref, onBeforeMount, unref, Ref, nextTick } from 'vue';

import { menus as getMenus } from 'src/settings/menuSetting';

import { cloneDeep } from 'lodash-es';
import { filter } from 'src/utils/helper/treeHelper';

import { useGo } from 'src/hooks/web/usePage';
import { useScrollTo } from 'src/hooks/event/useScrollTo';
import { onKeyStroke, useDebounceFn } from '@vueuse/core';

export interface SearchResult {
  name: string;
  path: string;
  icon?: string;
}

// Translate special characters
function transform(c: string) {
  const code: string[] = ['$', '(', ')', '*', '+', '.', '[', ']', '?', '\\', '^', '{', '}', '|'];
  return code.includes(c) ? `\\${c}` : c;
}

function createSearchReg(key: string) {
  const keys = [...key].map((item) => transform(item));
  const str = ['', ...keys, ''].join('.*');
  return new RegExp(str);
}

export function useMenuSearch(refs: Ref<HTMLElement[]>, scrollWrap: Ref<ElRef>, emit: any) {
  const searchResult = ref<SearchResult[]>([]);
  const keyword = ref('');
  const activeIndex = ref(-1);

  let menuList: Menu[] = [];

  const go = useGo();
  const handleSearch = useDebounceFn(search, 200);

  onBeforeMount(async () => {
    const list = getMenus;
    menuList = cloneDeep(list);
  });

  function search(e: ChangeEvent) {
    e?.stopPropagation();
    const key = e.target.value;
    keyword.value = key.trim();
    if (!key) {
      searchResult.value = [];
      return;
    }
    const reg = createSearchReg(unref(keyword));

    const filterMenu = filter(menuList, (item) => {
      return reg.test(item.name);
    });
    console.log(filterMenu);
    searchResult.value = handlerSearchResult(filterMenu, reg);
    activeIndex.value = 0;
  }

  function handlerSearchResult(filterMenu: Menu[], reg: RegExp, parent?: Menu) {
    const ret: SearchResult[] = [];
    filterMenu.forEach((item) => {
      const { name, path, icon, children } = item;
      if (reg.test(name) && !children?.length) {
        ret.push({
          name: parent?.name ? `${parent.name} > ${name}` : name,
          path,
          icon,
        });
      }
      if (Array.isArray(children) && children.length) {
        ret.push(...handlerSearchResult(children, reg, item));
      }
    });
    return ret;
  }

  function handleMouseenter(e: any) {
    const index = e.target.dataset.index;
    activeIndex.value = Number(index);
  }

  function handleUp() {
    if (!searchResult.value.length) return;
    activeIndex.value--;
    if (activeIndex.value < 0) {
      activeIndex.value = searchResult.value.length - 1;
    }
    handleScroll();
  }

  function handleDown() {
    if (!searchResult.value.length) return;
    activeIndex.value++;
    if (activeIndex.value > searchResult.value.length - 1) {
      activeIndex.value = 0;
    }
    handleScroll();
  }

  function handleScroll() {
    const refList = unref(refs);
    if (!refList || !Array.isArray(refList) || refList.length === 0 || !unref(scrollWrap)) return;

    const index = unref(activeIndex);
    const currentRef = refList[index];
    if (!currentRef) return;
    const wrapEl = unref(scrollWrap);
    if (!wrapEl) return;
    const scrollHeight = currentRef.offsetTop + currentRef.offsetHeight;
    const wrapHeight = wrapEl.offsetHeight;
    const { start } = useScrollTo({
      el: wrapEl,
      duration: 100,
      to: scrollHeight - wrapHeight,
    });
    start();
  }

  async function handleEnter() {
    if (!searchResult.value.length) return;
    const result = unref(searchResult);
    const index = unref(activeIndex);
    if (result.length === 0 || index < 0) {
      return;
    }
    const to = result[index];
    handleClose();
    await nextTick();

    go({ path: to.path, query: { title: to.name } });
  }

  function handleClose() {
    searchResult.value = [];
    emit('close');
  }

  onKeyStroke('Enter', handleEnter);
  onKeyStroke('ArrowUp', handleUp);
  onKeyStroke('ArrowDown', handleDown);
  onKeyStroke('Escape', handleClose);

  return { handleSearch, searchResult, keyword, activeIndex, handleMouseenter, handleEnter };
}

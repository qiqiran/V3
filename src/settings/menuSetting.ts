import { Menu as MenuType } from "#/router/types"
export const menus: MenuType[] = [
  {
    name: "首页",
    path: '/index',
    icon: 'home',
  }, {
    name: "水文本地",
    path: '/x7',
    icon: 'setting',
  }, {
    name: "水文线上",
    path: '/x77',
    icon: 'setting',
  }, {
    name: '图表',
    path: '/charts',
    icon: 'data',
    children: [
      {
        name: '断面测流图',
        path: '/hydrometer-chart',
        icon: 'data'
      }, {
        name: '梯级剖面图',
        path: '/cascade-graphs',
        icon: 'data'
      }
    ]
  }, {
    name: '组件',
    path: '/components',
    icon: 'comps',
    children: [
      {
        name: "项目配置",
        path: "/theme-setting"
      }, {
        name: "消息",
        path: "/message"
      }, {
        name: '弹出窗体',
        path: '/modal',
      }, {
        name: "图标",
        path: "/icon"
      }, {
        name: "ClickOutside",
        path: "/click-outside"
      }, {
        name: "Loading状态",
        path: "/loading"
      }, {
        name: "Fullscreen",
        path: "/fullscreen"
      }, {
        name: "Excel",
        path: "/excel"
      }, {
        name: "ScrollContainer",
        path: "/scroll-container"
      }, {
        name: "数字动画",
        path: "/count-to"
      }
    ]
  }, {
    name: "多级节点",
    path: '/d1',
    icon: 'setting',
    children: [
      {
        name: 'd11',
        path: '/todoList2',
        children: [
          {
            name: 'd111',
            path: '/d111',
            children: [
              {
                name: 'd1111',
                path: '/d1111',
              }, {
                name: 'd1112',
                path: '/d1112',
              }
            ],
          }, {
            name: 'd112',
            path: '/d112',
          }
        ],
      }, {
        name: 'd12',
        path: '/d12',
        children: [
          {
            name: 'd121',
            path: '/d121',
          }, {
            name: 'd122',
            path: '/d122',
          }
        ],
      }
    ]
  },
]
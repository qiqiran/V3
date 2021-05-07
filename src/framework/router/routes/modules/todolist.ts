import { RouteRecordRaw } from 'vue-router';

export default <RouteRecordRaw>{
  path: '/todolist',
  meta: {
    title: "代办事项",
    ignoreKeepAlive: true
  },
  name: 'ToDoList',
  component: () => import('src/views/todolist/Index.vue')
}
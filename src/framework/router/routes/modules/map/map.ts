const todolist = {
  path: '/map',
  name: 'map',
  component: () => import('src/views/todolist/Index.vue')
}
const routrs = [todolist]
export default routrs;
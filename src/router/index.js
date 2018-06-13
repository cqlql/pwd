// import Index from '@/hello/Index.vue'
const Index = () => import(/* webpackChunkName: "hello" */ '@/views/index')

export default [
  {
    path: '/index',
    name: 'index',
    meta: {title: 'index'},
    component: Index
  }
]

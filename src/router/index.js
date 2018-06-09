// import Index from '@/hello/Index.vue'
const Index = () => import(/* webpackChunkName: "hello" */ '@/views')

export default [
  {
    path: '/',
    name: 'index',
    meta: {title: 'index'},
    component: Index
  }
]

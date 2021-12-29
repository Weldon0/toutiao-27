import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/login'
import Layout from '@/views/layout'
import Home from '@/views/Home'
import Video from '@/views/Video'
import MyPage from '@/views/My'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    component: Login
  },
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '',
        component: Home
      },
      {
        path: 'qa',
        component: () => import('@/views/Qa')
      },
      {
        path: 'video',
        component: Video
      },
      {
        path: 'my',
        component: MyPage
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router

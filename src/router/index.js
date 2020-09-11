import {
  createRouter,
  createWebHistory, 
  createWebHashHistory
} from 'vue-router'
import Home from '@/views/Home.vue'

const routes = [
  {
    path: '/',
    component: Home,
    name: 'Home',
    meta: {
      title: '首页'
    }
  },
  {
    path: '/counter',
    component: () => import('@/views/Counter.vue'),
    name: 'counter',
    meta: {
      title: '计数器-ref API'
    }
  },
  {
    path: '/mousePosition',
    component: () => import('@/views/MousePosition.vue'),
    name: 'mousePosition',
    meta: {
      title: '鼠标坐标-reactive API'
    }
  },
  {
    path: '/multiplier',
    component: () => import('@/views/Multiplier.vue'),
    name: 'multiplier',
    meta: {
      title: '乘法器-watchEffect API'
    }
  },
  {
    path: '/lifeCycle',
    component: () => import('@/views/LifeCycle.vue'),
    name: 'lifeCycle',
    meta: {
      title: '生命周期'
    }
  },
  {
    path: '/form',
    component: () => import('@/views/MyForm.vue'),
    name: 'form',
    meta: {
      title: '多值双向绑定v-model'
    }
  }
]

const router = createRouter({
  // 使用hash模式的路由，url带#标识
  history: createWebHashHistory(),
  // 使用history模式的路由，跟正常的url一样，需要后台配置
  // history: createWebHistory(),
  routes
})

export default router

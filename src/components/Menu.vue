<template>
  <ul>
    <li v-for="menu in menus" :key="menu.path">
      <router-link :to="menu.path">{{ menu.name }}</router-link>
    </li>
  </ul>
</template>

<script>
import router from '@/router'
import { setup, computed } from 'vue'

export default {
  name: 'Menu',

  setup() {
    // 计算属性
    const menus = computed(() => {
      // 获取所有路由信息
      const routes = router.getRoutes()

      const res = []
      routes.forEach(route => {
        res.push({
          name: route.meta.title,
          path: route.path
        })
      })

      return res
    })

    return {
      menus
    }
  }
}
</script>

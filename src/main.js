import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// 创建应用
const app = createApp(App)

// 配置路由
app.use(router)

// 挂载
app.mount('#app')

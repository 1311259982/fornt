import { createApp } from 'vue'
import App from './App.vue'
// 导入路由配置
import router from './router'
// 导入Pinia状态管理
import store from './store'
// 导入Element Plus组件库
import ElementPlus from 'element-plus'
// 导入Element Plus样式
import 'element-plus/dist/index.css'
// 导入全局样式变量（如果创建了该文件）
import './assets/css/variables.css'

// 创建Vue应用实例
const app = createApp(App)

// 注册插件
app.use(router)    // 启用路由
app.use(store)     // 启用状态管理
app.use(ElementPlus) // 启用UI组件库

// 挂载应用到index.html的#app元素
app.mount('#app')

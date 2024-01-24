import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import { createPinia } from 'pinia'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import locale from "element-plus/dist/locale/zh-cn.mjs"
import './style.css'
import App from './App.vue'

const pinia = createPinia()

const app = createApp(App)

app.use(pinia)

app.use(ElementPlus, { locale })
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

app.mount('#app')

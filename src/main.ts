import { createApp } from 'vue'
import router from './router'
import App from './App.vue'
import store from './store'
import axios from 'axios'

axios.defaults.baseURL = 'http://apis.imooc.com/api/'
const icode = 'AC22E9BABB029A8D'
axios.interceptors.request.use(config => {
  config.params = {
    ...config.params,
    icode
  }
  return config
})
axios.get('/columns').then(response => {
  console.log(response.data)
})
const app = createApp(App)
app.use(router)
app.use(store)
app.mount('#app')

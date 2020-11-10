// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import VueRouter from 'vue-router'
import App from './App'
import router from './router'
import httpRequest from "@/untils/httpRequest"
import stores from '@/store/store'
import  { AlertPlugin,LoadingPlugin,ToastPlugin  } from 'vux'  
import VueCookies from 'vue-cookies'
import '@/vux' 


Vue.use(VueRouter)
Vue.use(VueCookies)
Vue.use(ToastPlugin)
Vue.use(AlertPlugin)
Vue.use(LoadingPlugin)

FastClick.attach(document.body)

Vue.config.productionTip = false

//挂载全局
Vue.prototype.$http = httpRequest

/* eslint-disable no-new */
new Vue({
  router,
  store:stores,
  render: h => h(App)
}).$mount('#app-box')

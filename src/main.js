// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import './common/style/reset.css'
import Axios from './axios'
import router from './router/index'
import VueLazyload from 'vue-lazyload'
import store from './store/index'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(MintUI)
// Vue.use(VueLazyload)
Vue.prototype.$axios = Axios
Vue.config.productionTip = false
Vue.use(VueLazyload, {
  // preLoad: 1.3,
  error: require('@/assets/logo.png'),
  loading: require('@/assets/logo.png'),
  attempt: 1
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  router,
  store,
  template: '<App/>'
})


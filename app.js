import App from './src/App.vue'
import router from './src/routes.js'
import mixins from './src/mixins'
import * as filters from './src/filters'
import store from './src/store'
import VueEvents from 'vue-events'

const storage = weex.requireModule('storage')

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.mixin(mixins)
Vue.use(VueEvents)

new Vue(Vue.util.extend({ el: '#root', router, store }, App))







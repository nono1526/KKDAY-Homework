import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

document.dispatchEvent(new Event('vue-ready'))

new Vue({
  render: h => h(App),
}).$mount('#app')

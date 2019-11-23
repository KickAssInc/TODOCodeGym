import Vue from 'vue'
import App from './App'
import { store } from './store/store'

//window.eventBus = new Vue()

//Vue.config.productionTip = false


new Vue({
  el: '#app',
  store: store,
  components: { App },
  template: '<App/>'
})

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import {Button,Row,Col,Swipe,SwipeItem,lazyload,Field,NavBar,Toast,Tab,Tabs,List,PullRefresh,Stepper,TabbarItem,Tabbar} from 'vant';
Vue.use(Button).use(Row).use(Col).use(Swipe).use(SwipeItem).use(lazyload).use(Stepper).use(TabbarItem)
.use(Field).use(NavBar).use(Toast).use(Tab).use(Tabs).use(List).use(PullRefresh).use(Tabbar)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

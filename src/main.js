// Import Vue
import Vue from 'vue';
import VueRouter from 'vue-router';

// Import Vue App, routes, store
import App from './App';
import routes from './routes';

Vue.use(VueRouter);

// Configure router
const router = new VueRouter({
  routes,
  linkActiveClass: 'active',
  mode: 'history'
});

new Vue({
  el: '#app',
  render: h => h(App),
  router
});

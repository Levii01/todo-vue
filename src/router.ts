import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import HelloWorldVue from './views/HelloWorldVue.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/hello_world',
      name: 'hello_world',
      component: HelloWorldVue,
    },
    {
      path: '/about',
      name: 'about',
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
    },
  ],
});

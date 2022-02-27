import Vue from 'vue';
import type { RouteConfig } from 'vue-router';
import VueRouter from 'vue-router';
import Home from '../views/HomePage.vue';

Vue.use(VueRouter);

export const route = {
  home: 'Home',
};

const routes: RouteConfig[] = [
  {
    path: '/',
    name: route.home,
    component: Home,
  },
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: async () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  // },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL as string,
  routes: routes,
});

export default router;

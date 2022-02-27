import type { VNode } from 'vue';
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import i18n from './i18n';
import './util/request';
import 'toastr/toastr.scss';

Vue.config.productionTip = false;

new Vue({
  router: router,
  store: store,
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  vuetify: vuetify,
  i18n: i18n,
  render: (h): VNode => h(App)
}).$mount('#app');

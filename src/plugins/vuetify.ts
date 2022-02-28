/* eslint-disable @typescript-eslint/no-unsafe-argument */
import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    options: {
      customProperties: true
    },
  },
  lang: {
    locales: {
      // eslint-disable-next-line
      ptbr: require('vuetify/lib/locale/pt').default,
    },
    current: 'ptbr',
  },
});

import { createApp } from 'vue';
import App from './App.vue';
import router from './router/index';
import store from './store/index';
import VCalendar from 'v-calendar';
import 'v-calendar/style.css';
import Vue3Toasity from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core';

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

/* import specific icons */
import { faPhone } from '@fortawesome/free-solid-svg-icons';

library.add(faPhone);

import 'bootstrap/dist/css/bootstrap.css';
import bootstrap from 'bootstrap/dist/js/bootstrap.bundle.js';

createApp(App)
  .use(store)
  .use(router)
  .use(bootstrap)
  .use(VCalendar, {})
  .use(Vue3Toasity, {
    autoClose: 3000,
    // ...
  })
  .component('font-awesome-icon', FontAwesomeIcon)
  .mount('#app');

// Check if there's an initial route in the URL
const initialRoute = window.location.hash.replace(/^#\//, '');
if (!initialRoute) {
  // If there's no initial route, replace with '/home'
  router.replace('/home').catch(() => {});
}

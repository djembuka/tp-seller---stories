import { createApp } from 'vue';
import { createStore } from 'vuex';
import App from './App.vue';
import Store from './store.js';
//import { Swiper, SwiperSlide } from '/swiper/vue.js';

const store = createStore(Store);
const app = createApp(App);

//app.use(Swiper);
//app.use(SwiperSlide);
app.use(store);
app.mount('#app');

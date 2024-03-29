import { createApp } from 'vue'
import './style.scss'
import App from './App.vue'
import router from "./router";
import store from './store';
import 'bootstrap';

const app = createApp(App);
app.use(router);
app.use(store);
app.mount("#app");

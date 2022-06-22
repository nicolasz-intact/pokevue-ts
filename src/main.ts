import { createApp } from "vue";
import App from "./App.vue";
import { createPinia } from "pinia";
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import router from "./router";

const app = createApp(App);

library.add(faHeart)
app.use(createPinia());
app.use(router);
app.component('font-awesome-icon', FontAwesomeIcon)
app.mount("#app")

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
// import FadeInFadeOut from './components/FadeIn&FadeOut.vue'

const app = createApp(App);

// app.component('fade-in-fade-out', FadeInFadeOut);

app.use(router);
app.mount('#app');

import { createRouter, createWebHistory } from 'vue-router';
import LandingPage from '../views/LandingPage.vue';
import BouncingBalls from '../components/BouncingBalls.vue';
import FadeInFadeOut from '../components/FadeInFadeOut.vue'; // Updated import

const routes = [
  {
    path: '/',
    name: 'home',
    component: LandingPage,
  },
  {
    path: '/bouncing-balls',
    name: 'bouncing-balls',
    component: BouncingBalls,
  },
  {
    path: '/fade-in-fade-out', // Add a route for your new component
    name: 'fade-in-fade-out', // Use the correct component name
    component: FadeInFadeOut,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;

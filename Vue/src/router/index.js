import { createRouter, createWebHistory } from 'vue-router'
import LandingPage from '../views/LandingPage.vue'
import BouncingBalls from '../components/BouncingBalls.vue'
import FadeInFadeOut from '../components/FadeInFadeOut.vue'
import PulseEffect from '../components/PulseEffect.vue'


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
    path: '/fade-in-fade-out',
    name: 'fade-in-fade-out',
    component: FadeInFadeOut,
  },
  {
    path:'/Pulse-Effect',
    name: 'Pulse-Effect',
    component: PulseEffect,
  }
];


const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Pokedex from '../views/Pokedex.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
    },
    {
      path: "/pokedex",
      name: "pokedex",
      component: Pokedex,
    }
  ],
});

export default router;

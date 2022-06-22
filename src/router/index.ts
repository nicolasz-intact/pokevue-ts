import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Pokedex from '../views/Pokedex.vue'
import Pokemon from '../views/Pokemon.vue'

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
    },
    {
      path: '/pokemon/:id',
      name: 'PokemonDetails',
      component: Pokemon
    },
  ],
});

export default router;

import { createRouter, createWebHistory } from 'vue-router'
import NotFound from "@/views/NotFound.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('/src/views/Home.vue'),
      alias: '/home',
    },
    {
      path: '/books',
      name: 'Search',
      component: () => import('/src/views/Search.vue'),
      props: (route) => ({ searchQuery: route.query.search_query, page: route.query.page}),
    },
    {
      path: '/books/:id',
      name: 'BookDetails',
      component: () => import('/src/views/BookDetails.vue'),
      props: true,
    },
    {
      path: '/profile/liked',
      name: 'LikedBooks',
      component: () => import('/src/views/LikedBooks.vue'),
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: NotFound,
    },
  ],
})

export default router

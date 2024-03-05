import { createRouter, createWebHistory } from 'vue-router'

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
      props: (route) => ({ searchQuery: route.query.search_query }),
    },
    {
      path: '/books/:id',
      name: 'BookDetails',
      component: () => import('/src/views/BookDetails.vue'),
      props: true,
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('/src/views/NotFound.vue'),
    },
  ],
})

export default router

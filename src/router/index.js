import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('@/components/pages/Home.vue'),
      alias: '/home',
    },
    {
      path: '/books/:id',
      name: 'BookDetails',
      component: () => import('@/components/pages/BookDetails.vue'),
      props: true,
    },
    {
      path: '/books',
      name: 'Search',
      component: () => import('@/components/pages/Search.vue'),
      props: (route) => ({ searchQuery: route.query.search_query, page: route.query.page }),
    },
    {
      path: '/newest',
      name: 'NewestBooksList',
      component: () => import('@/components/pages/NewestBooksList.vue'),
      props: (route) => ({ page: route.query.page }),
    },
    {
      path: '/favorites',
      name: 'FavoriteBooks',
      component: () => import('@/components/pages/FavoriteBooks.vue'),
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('@/components/pages/NotFound.vue'),
    },
  ],
})

export default router

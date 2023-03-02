import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@views/HomeView.vue'),
    },

    {
      path: '/:id',
      name: 'detail',
      component: () => import('@views/DetailView.vue'),
    },

    // 404
    {
      path: '/404',
      name: 'error',
      component: () => import('@views/PageNotFound.vue'),
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/404'
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    // always scroll to top
    return { top: 0 }
  },
})

export default router

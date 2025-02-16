import { createRouter, createWebHistory } from 'vue-router'
import CocktailPage from '@/pages/CocktailPage.vue'
import NotFoundPage from '@/pages/NotFoundPage.vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import { availableCodes } from '@/consts'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: DefaultLayout,
      children: [
        {
          path: '/',
          redirect: '/margarita',
        },
        {
          path: '/:cocktailCode',
          name: 'Cocktail',
          component: CocktailPage,
          beforeEnter: (to, _, next) => {
            const codeParam = to.params.cocktailCode as string
            if (!availableCodes.includes(codeParam)) {
              return next({ name: 'NotFound' })
            }
            next()
          },
        },
        {
          path: '/:pathMatch(.*)*',
          name: 'NotFound',
          component: NotFoundPage,
        },
      ],
    },
  ],
})

export default router

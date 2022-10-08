import { createRouter, createWebHistory } from 'vue-router'
import { usePageStore } from '@/stores/page'
import HomeView from '@/views/HomeView.vue'
import ProductView from '@/views/ProductView.vue'
import CategoryView from '@/views/CategoryView.vue'
import SearchView from '@/views/SearchView.vue'
import CartView from '@/views/CartView.vue'
import SignUpView from '@/views/SignUpView.vue'
import LoginView from '@/views/LoginView.vue'
import MyAccountView from '@/views/MyAccountView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/search',
      name: 'search',
      component: SearchView
    },
    {
      path: '/carrinho',
      name: 'cart',
      component: CartView
    },
    {
      path: '/cadastro',
      name: 'signup',
      component: SignUpView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/minha-conta',
      name: 'myaccount',
      component: MyAccountView,
      meta: {
        requireLogin: true
      }
    },
    {
      path: '/:category_slug/:product_slug',
      name: 'product',
      component: ProductView
    },
    {
      path: '/:category_slug',
      name: 'category',
      component: CategoryView
    }
  ]
})

router.beforeEach((to, from, next) => {
  const pageStore = usePageStore()

  if (to.matched.some(record => record.meta.requireLogin) && !pageStore.isAuthenticated) {
    next({ name: 'login', query: { to: to.path }})
  } else {
    next()
  }
})

export default router

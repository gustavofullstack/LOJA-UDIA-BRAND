import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/produtos',
      name: 'products',
      component: () => import('@/views/Products.vue')
    },
    {
      path: '/produto/:id',
      name: 'product',
      component: () => import('@/views/ProductDetail.vue')
    },
    {
      path: '/carrinho',
      name: 'cart',
      component: () => import('@/views/Cart.vue')
    },
    {
      path: '/checkout',
      name: 'checkout',
      component: () => import('@/views/Checkout.vue')
    }
  ]
})

export default router
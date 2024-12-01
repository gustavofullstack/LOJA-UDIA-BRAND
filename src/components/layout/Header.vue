<script setup lang="ts">
import { ref } from 'vue'
import { useCartStore } from '@/stores/cart'
import { RouterLink } from 'vue-router'
import { 
  ShoppingBagIcon, 
  UserIcon, 
  MagnifyingGlassIcon,
  XMarkIcon 
} from '@heroicons/vue/24/outline'
import PromoBar from './PromoBar.vue'

const cart = useCartStore()
const searchQuery = ref('')
const isSearchFocused = ref(false)
const isMobileMenuOpen = ref(false)

const categories = [
  'Novidades',
  'Feminino',
  'Masculino',
  'Acessórios',
  'Promoções'
]

function toggleMobileMenu() {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}
</script>

<template>
  <div class="fixed top-0 left-0 right-0 z-50">
    <!-- Promo Bar -->
    <PromoBar />

    <!-- Main Header -->
    <header class="bg-white/80 backdrop-blur-md border-b border-gray-200">
      <!-- Upper Header -->
      <div class="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16 gap-4">
          <!-- Logo -->
          <RouterLink to="/" class="flex-shrink-0">
            <h1 class="text-xl font-light tracking-tight">FASHION STORE</h1>
          </RouterLink>

          <!-- Search Bar -->
          <div class="flex-1 max-w-2xl mx-4 hidden sm:block">
            <div class="relative">
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Buscar produtos..."
                class="w-full pl-10 pr-4 py-2 text-sm bg-gray-100 border-0 rounded-full focus:ring-1 focus:ring-black focus:outline-none"
                @focus="isSearchFocused = true"
                @blur="isSearchFocused = false"
              />
              <MagnifyingGlassIcon class="h-5 w-5 text-gray-400 absolute left-3 top-2" />
            </div>
          </div>

          <!-- Right Icons -->
          <div class="flex items-center space-x-4">
            <RouterLink to="/profile" class="text-gray-700 hover:text-black transition-colors">
              <UserIcon class="h-6 w-6" />
            </RouterLink>

            <RouterLink to="/carrinho" class="text-gray-700 hover:text-black transition-colors relative">
              <ShoppingBagIcon class="h-6 w-6" />
              <span
                v-if="cart.itemCount"
                class="absolute -top-1 -right-1 bg-black text-white text-xs font-medium rounded-full h-4 w-4 flex items-center justify-center"
              >
                {{ cart.itemCount }}
              </span>
            </RouterLink>
          </div>
        </div>
      </div>

      <!-- Categories Menu -->
      <nav class="border-t border-gray-200">
        <div class="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <ul class="flex items-center justify-center space-x-8 h-12 text-sm">
            <li v-for="category in categories" :key="category">
              <RouterLink
                :to="{ name: 'products', query: { category: category.toLowerCase() }}"
                class="text-gray-700 hover:text-black transition-colors"
              >
                {{ category }}
              </RouterLink>
            </li>
          </ul>
        </div>
      </nav>

      <!-- Mobile Search (Visible on small screens) -->
      <div class="sm:hidden border-t border-gray-200">
        <div class="px-4 py-3">
          <div class="relative">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Buscar produtos..."
              class="w-full pl-10 pr-4 py-2 text-sm bg-gray-100 border-0 rounded-full focus:ring-1 focus:ring-black focus:outline-none"
            />
            <MagnifyingGlassIcon class="h-5 w-5 text-gray-400 absolute left-3 top-2" />
          </div>
        </div>
      </div>
    </header>
  </div>

  <!-- Spacer for fixed header -->
  <div class="h-[120px] sm:h-[112px]"></div>
</template>
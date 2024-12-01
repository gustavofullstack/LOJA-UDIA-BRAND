<script setup lang="ts">
import { ref } from 'vue'
import ProductCard from '@/components/product/ProductCard.vue'
import FeaturedCarousel from '@/components/home/FeaturedCarousel.vue'
import NewsletterSignup from '@/components/common/NewsletterSignup.vue'
import CategoryHighlight from '@/components/home/CategoryHighlight.vue'
import { useFeaturedProducts } from '@/composables/useFeaturedProducts'

const { featuredProducts, newArrivals, bestSellers } = useFeaturedProducts()
</script>

<template>
  <div>
    <!-- Hero Section with Carousel -->
    <FeaturedCarousel class="mb-12" />
    
    <!-- Category Highlights -->
    <CategoryHighlight class="mb-16" />

    <!-- Featured Products Section -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
      <div class="flex items-center justify-between mb-8">
        <h2 class="text-2xl md:text-3xl font-bold text-gray-900">Produtos em Destaque</h2>
        <RouterLink 
          to="/produtos" 
          class="text-primary-600 hover:text-primary-500 font-medium"
        >
          Ver todos
        </RouterLink>
      </div>
      <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        <ProductCard
          v-for="product in featuredProducts"
          :key="product.id"
          :product="product"
        />
      </div>
    </section>

    <!-- New Arrivals Section -->
    <section class="bg-gray-50 py-16 mb-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between mb-8">
          <h2 class="text-2xl md:text-3xl font-bold text-gray-900">Novidades</h2>
          <RouterLink 
            to="/produtos?sort=newest" 
            class="text-primary-600 hover:text-primary-500 font-medium"
          >
            Ver todos
          </RouterLink>
        </div>
        <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          <ProductCard
            v-for="product in newArrivals"
            :key="product.id"
            :product="product"
          />
        </div>
      </div>
    </section>

    <!-- Best Sellers Section -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
      <div class="flex items-center justify-between mb-8">
        <h2 class="text-2xl md:text-3xl font-bold text-gray-900">Mais Vendidos</h2>
        <RouterLink 
          to="/produtos?sort=bestsellers" 
          class="text-primary-600 hover:text-primary-500 font-medium"
        >
          Ver todos
        </RouterLink>
      </div>
      <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        <ProductCard
          v-for="product in bestSellers"
          :key="product.id"
          :product="product"
        />
      </div>
    </section>

    <!-- Newsletter Section -->
    <NewsletterSignup />
  </div>
</template>
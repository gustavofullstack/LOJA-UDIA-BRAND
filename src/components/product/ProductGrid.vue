<script setup lang="ts">
import type { Product } from '@/types'
import ProductCard from './ProductCard.vue'

defineProps<{
  products: Product[]
}>()
</script>

<template>
  <div class="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3">
    <ProductCard
      v-for="product in products"
      :key="product.id"
      :product="product"
    />
  </div>
</template>
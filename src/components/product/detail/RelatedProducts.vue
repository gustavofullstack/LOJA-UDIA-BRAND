<script setup lang="ts">
import { computed } from 'vue'
import ProductCard from '@/components/product/ProductCard.vue'
import { useProducts } from '@/composables/useProducts'

const props = defineProps<{
  category: string
  currentProductId: string
}>()

const { products } = useProducts()

const relatedProducts = computed(() => {
  return products.value
    .filter(p => p.category === props.category && p.id !== props.currentProductId)
    .slice(0, 4)
})
</script>

<template>
  <div>
    <h2 class="text-2xl font-bold mb-6">Produtos Relacionados</h2>
    <div class="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4">
      <ProductCard
        v-for="product in relatedProducts"
        :key="product.id"
        :product="product"
      />
    </div>
  </div>
</template>
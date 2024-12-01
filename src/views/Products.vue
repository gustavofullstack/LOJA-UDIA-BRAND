<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import ProductGrid from '@/components/product/ProductGrid.vue'
import ProductFilters from '@/components/product/ProductFilters.vue'
import ProductSort from '@/components/product/ProductSort.vue'
import { useProducts } from '@/composables/useProducts'
import { FunnelIcon } from '@heroicons/vue/24/outline'

const route = useRoute()
const { products, loading, error } = useProducts()
const isFilterOpen = ref(false)

const selectedFilters = ref({
  categories: [],
  sizes: [],
  colors: [],
  priceRange: { min: 0, max: 1000 }
})

const sortOption = ref('newest')

const filteredProducts = computed(() => {
  // TODO: Implement actual filtering logic
  return products.value
})

const sortedProducts = computed(() => {
  // TODO: Implement actual sorting logic
  return filteredProducts.value
})

function toggleFilters() {
  isFilterOpen.value = !isFilterOpen.value
}
</script>

<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div class="flex items-baseline justify-between border-b border-gray-200 pb-6">
      <h1 class="text-2xl md:text-4xl font-bold tracking-tight text-gray-900">Produtos</h1>
      
      <div class="flex items-center gap-4">
        <!-- Mobile filter button -->
        <button
          @click="toggleFilters"
          class="lg:hidden flex items-center gap-2 text-gray-700 hover:text-gray-900"
        >
          <FunnelIcon class="h-5 w-5" />
          Filtros
        </button>
        
        <ProductSort v-model="sortOption" />
      </div>
    </div>

    <div class="flex gap-x-8 py-6">
      <!-- Mobile filter dialog -->
      <div
        v-show="isFilterOpen"
        class="fixed inset-0 z-40 lg:hidden"
        @click="isFilterOpen = false"
      >
        <div class="fixed inset-0 bg-black bg-opacity-25" />
        <div class="fixed inset-y-0 right-0 z-40 w-full bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div class="flex items-center justify-between mb-4">
            <h2 class="text-lg font-medium text-gray-900">Filtros</h2>
            <button
              @click="isFilterOpen = false"
              class="rounded-md bg-white text-gray-400 hover:text-gray-500"
            >
              <span class="sr-only">Fechar menu</span>
              <XMarkIcon class="h-6 w-6" />
            </button>
          </div>
          <ProductFilters
            v-model="selectedFilters"
          />
        </div>
      </div>

      <!-- Desktop filters -->
      <aside class="hidden lg:block w-64 flex-none">
        <ProductFilters
          v-model="selectedFilters"
          class="sticky top-6"
        />
      </aside>

      <div class="flex-1">
        <div v-if="loading" class="flex justify-center py-8">
          <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        </div>

        <div v-else-if="error" class="text-center py-8 text-red-600">
          {{ error }}
        </div>

        <ProductGrid
          v-else
          :products="sortedProducts"
        />
      </div>
    </div>
  </div>
</template>
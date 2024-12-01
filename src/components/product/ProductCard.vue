<script setup lang="ts">
import { computed } from 'vue'
import type { Product } from '@/types'
import { useCartStore } from '@/stores/cart'
import { ShoppingBagIcon } from '@heroicons/vue/24/outline'

const props = defineProps<{
  product: Product
}>()

const cart = useCartStore()

const formattedPrice = computed(() => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(props.product.price)
})
</script>

<template>
  <div class="group relative">
    <div class="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200">
      <img
        :src="product.images[0]"
        :alt="product.name"
        class="h-full w-full object-cover object-center group-hover:opacity-75"
      />
    </div>
    <div class="mt-4 flex justify-between">
      <div>
        <h3 class="text-sm text-gray-700">
          <RouterLink :to="{ name: 'product', params: { id: product.id }}">
            {{ product.name }}
          </RouterLink>
        </h3>
        <p class="mt-1 text-sm text-gray-500">{{ product.colors.length }} cores</p>
      </div>
      <div class="text-right">
        <p class="text-sm font-medium text-gray-900">{{ formattedPrice }}</p>
        <button
          @click="cart.addItem(product)"
          class="mt-2 inline-flex items-center rounded-md bg-primary-600 px-3 py-2 text-sm font-semibold text-white hover:bg-primary-500"
        >
          <ShoppingBagIcon class="h-4 w-4 mr-2" />
          Adicionar
        </button>
      </div>
    </div>
  </div>
</template>
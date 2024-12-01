<script setup lang="ts">
import { computed } from 'vue'
import type { Product } from '@/types'
import { ShoppingBagIcon } from '@heroicons/vue/24/outline'

const props = defineProps<{
  product: Product
  size: string
  color: string
  quantity: number
}>()

const emit = defineEmits<{
  (e: 'update:size', value: string): void
  (e: 'update:color', value: string): void
  (e: 'update:quantity', value: number): void
  (e: 'add-to-cart'): void
}>()

const formattedPrice = computed(() => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(props.product.price)
})

const canAddToCart = computed(() => {
  return props.size && props.color && props.quantity > 0
})
</script>

<template>
  <div class="mt-10 lg:mt-0">
    <h1 class="text-3xl font-bold tracking-tight text-gray-900">{{ product.name }}</h1>
    <div class="mt-4">
      <p class="text-3xl tracking-tight text-gray-900">{{ formattedPrice }}</p>
    </div>

    <div class="mt-8">
      <h2 class="text-sm font-medium text-gray-900">Cor</h2>
      <div class="mt-2">
        <div class="flex items-center space-x-3">
          <button
            v-for="colorOption in product.colors"
            :key="colorOption"
            @click="emit('update:color', colorOption)"
            :class="[
              'relative h-8 w-8 rounded-full border',
              color === colorOption ? 'ring-2 ring-primary-500' : 'ring-1 ring-gray-200'
            ]"
          >
            <span class="sr-only">{{ colorOption }}</span>
          </button>
        </div>
      </div>
    </div>

    <div class="mt-8">
      <h2 class="text-sm font-medium text-gray-900">Tamanho</h2>
      <div class="mt-2">
        <div class="grid grid-cols-4 gap-2">
          <button
            v-for="sizeOption in product.sizes"
            :key="sizeOption"
            @click="emit('update:size', sizeOption)"
            :class="[
              'flex items-center justify-center rounded-md py-2 text-sm font-medium',
              size === sizeOption
                ? 'bg-primary-600 text-white'
                : 'bg-white text-gray-900 ring-1 ring-gray-200 hover:bg-gray-50'
            ]"
          >
            {{ sizeOption }}
          </button>
        </div>
      </div>
    </div>

    <div class="mt-8">
      <h2 class="text-sm font-medium text-gray-900">Quantidade</h2>
      <div class="mt-2">
        <select
          :value="quantity"
          @change="emit('update:quantity', +($event.target as HTMLSelectElement).value)"
          class="max-w-full rounded-md border border-gray-300 py-1.5 text-base leading-5 font-medium text-gray-700 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
        >
          <option v-for="n in 10" :key="n" :value="n">{{ n }}</option>
        </select>
      </div>
    </div>

    <button
      @click="emit('add-to-cart')"
      :disabled="!canAddToCart"
      :class="[
        'mt-8 flex w-full items-center justify-center rounded-md border border-transparent px-8 py-3 text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2',
        canAddToCart ? 'bg-primary-600 hover:bg-primary-700' : 'bg-gray-400 cursor-not-allowed'
      ]"
    >
      <ShoppingBagIcon class="h-5 w-5 mr-2" />
      Adicionar ao Carrinho
    </button>
  </div>
</template>
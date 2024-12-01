<script setup lang="ts">
import { computed } from 'vue'
import type { CartItem } from '@/types'
import { TrashIcon } from '@heroicons/vue/24/outline'

const props = defineProps<{
  item: CartItem
}>()

const emit = defineEmits<{
  (e: 'updateQuantity', quantity: number): void
  (e: 'remove'): void
}>()

const formattedPrice = computed(() => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(props.item.price)
})

const formattedSubtotal = computed(() => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(props.item.price * props.item.quantity)
})
</script>

<template>
  <div class="flex gap-6">
    <div class="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
      <img
        :src="item.images[0]"
        :alt="item.name"
        class="h-full w-full object-cover object-center"
      />
    </div>

    <div class="flex flex-1 flex-col">
      <div class="flex justify-between text-base font-medium text-gray-900">
        <h3>{{ item.name }}</h3>
        <p class="ml-4">{{ formattedSubtotal }}</p>
      </div>
      
      <div class="mt-1 text-sm text-gray-500">
        <p>Cor: {{ item.colors[0] }}</p>
        <p>Tamanho: {{ item.sizes[0] }}</p>
      </div>

      <div class="flex flex-1 items-end justify-between text-sm">
        <div class="flex items-center gap-2">
          <label for="quantity" class="text-gray-500">Qtd</label>
          <select
            :value="item.quantity"
            @change="emit('updateQuantity', +($event.target as HTMLSelectElement).value)"
            class="rounded-md border-gray-300 py-1.5 text-base leading-5 font-medium text-gray-700 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
          >
            <option v-for="n in 10" :key="n" :value="n">{{ n }}</option>
          </select>
        </div>

        <button
          @click="emit('remove')"
          class="font-medium text-primary-600 hover:text-primary-500 flex items-center gap-1"
        >
          <TrashIcon class="h-4 w-4" />
          Remover
        </button>
      </div>
    </div>
  </div>
</template>
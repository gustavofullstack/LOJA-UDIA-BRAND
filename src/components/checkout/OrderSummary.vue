<script setup lang="ts">
import { computed } from 'vue'
import { useCartStore } from '@/stores/cart'
import type { Address } from '@/types'

const props = defineProps<{
  address: Address
  paymentMethod: string
}>()

const emit = defineEmits<{
  (e: 'checkout'): void
}>()

const cart = useCartStore()

const isFormValid = computed(() => {
  const { street, number, city, state, zipCode } = props.address
  return street && number && city && state && zipCode && props.paymentMethod
})

const formattedTotal = computed(() => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(cart.total)
})
</script>

<template>
  <div class="bg-white p-6 rounded-lg shadow">
    <h2 class="text-lg font-medium text-gray-900 mb-6">Resumo do Pedido</h2>

    <div class="space-y-4">
      <div v-for="item in cart.items" :key="item.id" class="flex justify-between">
        <div class="flex items-center">
          <img
            :src="item.images[0]"
            :alt="item.name"
            class="h-16 w-16 object-cover rounded"
          />
          <div class="ml-4">
            <h3 class="text-sm font-medium text-gray-900">{{ item.name }}</h3>
            <p class="text-sm text-gray-500">Qtd: {{ item.quantity }}</p>
          </div>
        </div>
        <p class="text-sm font-medium text-gray-900">
          {{ new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.price * item.quantity) }}
        </p>
      </div>

      <div class="border-t border-gray-200 pt-4">
        <div class="flex justify-between">
          <p class="text-base font-medium text-gray-900">Total</p>
          <p class="text-base font-medium text-gray-900">{{ formattedTotal }}</p>
        </div>
      </div>
    </div>

    <button
      @click="emit('checkout')"
      :disabled="!isFormValid"
      :class="[
        'mt-6 w-full rounded-md border border-transparent px-4 py-3 text-base font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2',
        isFormValid
          ? 'bg-primary-600 hover:bg-primary-700'
          : 'bg-gray-400 cursor-not-allowed'
      ]"
    >
      Confirmar Pedido
    </button>
  </div>
</template>
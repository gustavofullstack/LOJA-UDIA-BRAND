<script setup lang="ts">
import { useRouter } from 'vue-router'
import { ShoppingBagIcon } from '@heroicons/vue/24/outline'

const router = useRouter()

function goToProducts() {
  router.push({ name: 'products' })
}
</script>

<template>
  <div class="text-center py-16">
    <ShoppingBagIcon class="mx-auto h-12 w-12 text-gray-400" />
    <h2 class="mt-4 text-lg font-medium text-gray-900">Seu carrinho está vazio</h2>
    <p class="mt-2 text-sm text-gray-500">
      Comece a adicionar produtos para fazer suas compras
    </p>
    <button
      @click="goToProducts"
      class="mt-6 inline-flex items-center rounded-md border border-transparent bg-primary-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-700"
    >
      Continuar Comprando
    </button>
  </div>
</template>
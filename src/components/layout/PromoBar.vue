<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/24/outline'

const promos = [
  'Frete Grátis em compras acima de R$ 299',
  'Até 50% OFF em produtos selecionados',
  'Ganhe 10% OFF na primeira compra',
  'Parcelamento em até 10x sem juros'
]

const currentPromoIndex = ref(0)

function nextPromo() {
  currentPromoIndex.value = (currentPromoIndex.value + 1) % promos.length
}

function prevPromo() {
  currentPromoIndex.value = currentPromoIndex.value === 0 ? promos.length - 1 : currentPromoIndex.value - 1
}

onMounted(() => {
  setInterval(nextPromo, 5000)
})
</script>

<template>
  <div class="bg-black text-white py-2">
    <div class="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-center relative">
        <button 
          @click="prevPromo" 
          class="absolute left-0 p-1 hover:text-gray-300"
          aria-label="Previous promotion"
        >
          <ChevronLeftIcon class="h-4 w-4" />
        </button>
        
        <p class="text-sm text-center">
          {{ promos[currentPromoIndex] }}
        </p>
        
        <button 
          @click="nextPromo" 
          class="absolute right-0 p-1 hover:text-gray-300"
          aria-label="Next promotion"
        >
          <ChevronRightIcon class="h-4 w-4" />
        </button>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { StarIcon } from '@heroicons/vue/20/solid'

// Mock reviews data
const reviews = ref([
  {
    id: 1,
    author: 'João Silva',
    rating: 5,
    date: '2024-02-20',
    content: 'Excelente produto! Superou minhas expectativas.'
  },
  {
    id: 2,
    author: 'Maria Santos',
    rating: 4,
    date: '2024-02-19',
    content: 'Muito bom, mas poderia ter mais opções de cores.'
  }
])

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('pt-BR')
}
</script>

<template>
  <div>
    <h2 class="text-2xl font-bold mb-6">Avaliações</h2>
    
    <div class="space-y-8">
      <div v-for="review in reviews" :key="review.id" class="border-b border-gray-200 pb-8">
        <div class="flex items-center mb-2">
          <div class="flex items-center">
            <StarIcon
              v-for="i in 5"
              :key="i"
              :class="[
                'h-5 w-5',
                i <= review.rating ? 'text-yellow-400' : 'text-gray-300'
              ]"
            />
          </div>
          <p class="ml-2 text-sm text-gray-500">
            {{ formatDate(review.date) }}
          </p>
        </div>
        <p class="font-medium">{{ review.author }}</p>
        <p class="mt-2 text-gray-600">{{ review.content }}</p>
      </div>
    </div>
  </div>
</template>
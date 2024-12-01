<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  images: string[]
}>()

const selectedImage = ref(props.images[0])
</script>

<template>
  <div class="flex flex-col">
    <div class="aspect-h-4 aspect-w-3 overflow-hidden rounded-lg">
      <img
        :src="selectedImage"
        :alt="'Product image'"
        class="h-full w-full object-cover object-center"
      />
    </div>
    <div class="mt-4 grid grid-cols-4 gap-4">
      <button
        v-for="(image, index) in images"
        :key="index"
        @click="selectedImage = image"
        :class="[
          'relative aspect-h-1 aspect-w-1 overflow-hidden rounded-lg',
          selectedImage === image ? 'ring-2 ring-primary-500' : 'ring-1 ring-gray-200'
        ]"
      >
        <img
          :src="image"
          :alt="'Product thumbnail'"
          class="h-full w-full object-cover object-center"
        />
      </button>
    </div>
  </div>
</template>
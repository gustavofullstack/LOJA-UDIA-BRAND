<script setup lang="ts">
const categories = [
  {
    id: 'feminino',
    name: 'Feminino',
    image: 'https://placehold.co/600x400',
    description: 'Moda feminina atual'
  },
  {
    id: 'masculino',
    name: 'Masculino',
    image: 'https://placehold.co/600x400',
    description: 'Estilo masculino moderno'
  },
  {
    id: 'acessorios',
    name: 'Acessórios',
    image: 'https://placehold.co/600x400',
    description: 'Complementos para seu look'
  }
]
</script>

<template>
  <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <h2 class="text-2xl md:text-3xl font-bold text-gray-900 mb-8">Categorias em Destaque</h2>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <RouterLink
        v-for="category in categories"
        :key="category.id"
        :to="{ name: 'products', query: { category: category.id }}"
        class="group relative overflow-hidden rounded-lg"
      >
        <div class="aspect-h-3 aspect-w-4">
          <img
            :src="category.image"
            :alt="category.name"
            class="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-6">
          <h3 class="text-xl font-bold text-white mb-1">{{ category.name }}</h3>
          <p class="text-gray-200">{{ category.description }}</p>
        </div>
      </RouterLink>
    </div>
  </section>
</template>
<script setup lang="ts">
import { ref } from 'vue'

const email = ref('')
const subscribed = ref(false)

function handleSubmit() {
  // TODO: Implement newsletter signup
  subscribed.value = true
  email.value = ''
}
</script>

<template>
  <section class="bg-primary-900 py-12">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <h2 class="text-3xl font-bold text-white mb-4">
        Receba nossas novidades
      </h2>
      <p class="text-primary-200 mb-8">
        Cadastre-se para receber ofertas exclusivas e novidades
      </p>
      <form @submit.prevent="handleSubmit" class="max-w-md mx-auto">
        <div class="flex gap-4">
          <input
            v-model="email"
            type="email"
            required
            placeholder="Seu melhor e-mail"
            class="flex-1 rounded-md px-4 py-2"
          />
          <button
            type="submit"
            class="bg-primary-600 text-white px-6 py-2 rounded-md hover:bg-primary-500"
          >
            Cadastrar
          </button>
        </div>
      </form>
      <p v-if="subscribed" class="mt-4 text-green-400">
        Obrigado por se cadastrar!
      </p>
    </div>
  </section>
</template>
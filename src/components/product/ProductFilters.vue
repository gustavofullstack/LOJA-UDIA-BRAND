<script setup lang="ts">
import { ref } from 'vue'
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue'
import { MinusIcon, PlusIcon } from '@heroicons/vue/20/solid'

const props = defineProps<{
  modelValue: {
    categories: string[]
    sizes: string[]
    colors: string[]
    priceRange: { min: number; max: number }
  }
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: typeof props.modelValue): void
}>()

const filters = [
  {
    id: 'categories',
    name: 'Categorias',
    options: [
      { value: 'camisetas', label: 'Camisetas' },
      { value: 'calcas', label: 'Calças' },
      { value: 'vestidos', label: 'Vestidos' },
      { value: 'acessorios', label: 'Acessórios' }
    ]
  },
  {
    id: 'sizes',
    name: 'Tamanhos',
    options: [
      { value: 'P', label: 'P' },
      { value: 'M', label: 'M' },
      { value: 'G', label: 'G' },
      { value: 'GG', label: 'GG' }
    ]
  },
  {
    id: 'colors',
    name: 'Cores',
    options: [
      { value: 'branco', label: 'Branco' },
      { value: 'preto', label: 'Preto' },
      { value: 'azul', label: 'Azul' },
      { value: 'vermelho', label: 'Vermelho' }
    ]
  }
]

function updateFilter(filterId: string, value: string) {
  const newValue = { ...props.modelValue }
  const index = newValue[filterId as keyof typeof newValue].indexOf(value)
  
  if (index === -1) {
    (newValue[filterId as keyof typeof newValue] as string[]).push(value)
  } else {
    (newValue[filterId as keyof typeof newValue] as string[]).splice(index, 1)
  }
  
  emit('update:modelValue', newValue)
}
</script>

<template>
  <form class="space-y-4">
    <Disclosure
      v-for="section in filters"
      :key="section.id"
      as="div"
      class="border-b border-gray-200 py-6"
      v-slot="{ open }"
    >
      <h3 class="-my-3 flow-root">
        <DisclosureButton class="flex w-full items-center justify-between py-3 text-sm text-gray-400 hover:text-gray-500">
          <span class="font-medium text-gray-900">{{ section.name }}</span>
          <span class="ml-6 flex items-center">
            <PlusIcon v-if="!open" class="h-5 w-5" />
            <MinusIcon v-else class="h-5 w-5" />
          </span>
        </DisclosureButton>
      </h3>
      <DisclosurePanel class="pt-6">
        <div class="space-y-4">
          <div
            v-for="option in section.options"
            :key="option.value"
            class="flex items-center"
          >
            <input
              :id="`filter-${section.id}-${option.value}`"
              :name="`${section.id}[]`"
              :value="option.value"
              type="checkbox"
              :checked="modelValue[section.id as keyof typeof modelValue].includes(option.value)"
              @change="updateFilter(section.id, option.value)"
              class="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
            />
            <label
              :for="`filter-${section.id}-${option.value}`"
              class="ml-3 text-sm text-gray-600"
            >
              {{ option.label }}
            </label>
          </div>
        </div>
      </DisclosurePanel>
    </Disclosure>

    <div class="border-b border-gray-200 py-6">
      <h3 class="text-sm font-medium text-gray-900">Faixa de Preço</h3>
      <div class="mt-4 space-y-4">
        <div class="flex gap-4">
          <div class="flex-1">
            <label class="text-xs text-gray-500">Mínimo</label>
            <input
              type="number"
              :value="modelValue.priceRange.min"
              @input="emit('update:modelValue', { ...modelValue, priceRange: { ...modelValue.priceRange, min: +(($event.target as HTMLInputElement).value) }})"
              class="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
            />
          </div>
          <div class="flex-1">
            <label class="text-xs text-gray-500">Máximo</label>
            <input
              type="number"
              :value="modelValue.priceRange.max"
              @input="emit('update:modelValue', { ...modelValue, priceRange: { ...modelValue.priceRange, max: +(($event.target as HTMLInputElement).value) }})"
              class="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
            />
          </div>
        </div>
      </div>
    </div>
  </form>
</template>
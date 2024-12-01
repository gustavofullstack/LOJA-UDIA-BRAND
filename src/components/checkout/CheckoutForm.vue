<script setup lang="ts">
import { computed } from 'vue'
import type { Address } from '@/types'

const props = defineProps<{
  address: Address
}>()

const emit = defineEmits<{
  (e: 'update:address', address: Address): void
}>()

const states = [
  'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA',
  'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN',
  'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
]

const isFormValid = computed(() => {
  const { street, number, city, state, zipCode } = props.address
  return street && number && city && state && zipCode
})

function updateField(field: keyof Address, value: string) {
  emit('update:address', {
    ...props.address,
    [field]: value
  })
}
</script>

<template>
  <div class="bg-white p-6 rounded-lg shadow">
    <h2 class="text-lg font-medium text-gray-900 mb-6">Endereço de Entrega</h2>

    <div class="space-y-4">
      <div>
        <label for="street" class="block text-sm font-medium text-gray-700">Rua</label>
        <input
          type="text"
          id="street"
          :value="address.street"
          @input="updateField('street', ($event.target as HTMLInputElement).value)"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
        />
      </div>

      <div class="grid grid-cols-2 gap-4">
        <div>
          <label for="number" class="block text-sm font-medium text-gray-700">Número</label>
          <input
            type="text"
            id="number"
            :value="address.number"
            @input="updateField('number', ($event.target as HTMLInputElement).value)"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          />
        </div>

        <div>
          <label for="complement" class="block text-sm font-medium text-gray-700">Complemento</label>
          <input
            type="text"
            id="complement"
            :value="address.complement"
            @input="updateField('complement', ($event.target as HTMLInputElement).value)"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          />
        </div>
      </div>

      <div class="grid grid-cols-2 gap-4">
        <div>
          <label for="city" class="block text-sm font-medium text-gray-700">Cidade</label>
          <input
            type="text"
            id="city"
            :value="address.city"
            @input="updateField('city', ($event.target as HTMLInputElement).value)"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          />
        </div>

        <div>
          <label for="state" class="block text-sm font-medium text-gray-700">Estado</label>
          <select
            id="state"
            :value="address.state"
            @change="updateField('state', ($event.target as HTMLSelectElement).value)"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          >
            <option value="">Selecione</option>
            <option v-for="state in states" :key="state" :value="state">
              {{ state }}
            </option>
          </select>
        </div>
      </div>

      <div>
        <label for="zipCode" class="block text-sm font-medium text-gray-700">CEP</label>
        <input
          type="text"
          id="zipCode"
          :value="address.zipCode"
          @input="updateField('zipCode', ($event.target as HTMLInputElement).value)"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          placeholder="00000-000"
        />
      </div>
    </div>
  </div>
</template>
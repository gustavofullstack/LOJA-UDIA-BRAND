<script setup lang="ts">
import { computed } from 'vue'
import { RadioGroup, RadioGroupLabel, RadioGroupOption } from '@headlessui/vue'
import { CreditCardIcon, QrCodeIcon, BanknotesIcon } from '@heroicons/vue/24/outline'

const props = defineProps<{
  modelValue: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const paymentMethods = [
  {
    id: 'credit-card',
    title: 'Cartão de Crédito',
    icon: CreditCardIcon,
    description: 'Pague em até 12x'
  },
  {
    id: 'pix',
    title: 'PIX',
    icon: QrCodeIcon,
    description: '10% de desconto'
  },
  {
    id: 'bank-slip',
    title: 'Boleto',
    icon: BanknotesIcon,
    description: '5% de desconto'
  }
]
</script>

<template>
  <div class="bg-white p-6 rounded-lg shadow">
    <RadioGroup :value="modelValue" @change="emit('update:modelValue', $event)">
      <RadioGroupLabel class="text-lg font-medium text-gray-900">
        Método de Pagamento
      </RadioGroupLabel>

      <div class="mt-4 space-y-4">
        <RadioGroupOption
          v-for="method in paymentMethods"
          :key="method.id"
          :value="method.id"
          v-slot="{ checked }"
          as="template"
        >
          <div
            :class="[
              checked ? 'border-primary-500 ring-2 ring-primary-500' : 'border-gray-300',
              'relative block cursor-pointer rounded-lg border bg-white px-6 py-4 shadow-sm focus:outline-none sm:flex sm:justify-between'
            ]"
          >
            <div class="flex items-center">
              <div class="flex items-center">
                <div class="text-sm">
                  <div class="flex items-center">
                    <component
                      :is="method.icon"
                      class="h-6 w-6 text-gray-400 mr-2"
                    />
                    <RadioGroupLabel as="p" class="font-medium text-gray-900">
                      {{ method.title }}
                    </RadioGroupLabel>
                  </div>
                  <RadioGroupDescription as="p" class="text-gray-500">
                    {{ method.description }}
                  </RadioGroupDescription>
                </div>
              </div>
            </div>
          </div>
        </RadioGroupOption>
      </div>
    </RadioGroup>
  </div>
</template>
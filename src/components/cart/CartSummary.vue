<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '@/stores/cart'

const router = useRouter()
const cart = useCartStore()
const couponCode = ref('')
const shippingZipCode = ref('')
const shippingCost = ref(0)
const discount = ref(0)

const subtotal = computed(() => cart.total)

const total = computed(() => {
  return subtotal.value + shippingCost.value - discount.value
})

const formattedSubtotal = computed(() => {
  return formatCurrency(subtotal.value)
})

const formattedShipping = computed(() => {
  return formatCurrency(shippingCost.value)
})

const formattedDiscount = computed(() => {
  return formatCurrency(discount.value)
})

const formattedTotal = computed(() => {
  return formatCurrency(total.value)
})

function formatCurrency(value: number) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value)
}

async function calculateShipping() {
  // TODO: Implement shipping calculation
  shippingCost.value = 15.90
}

async function applyCoupon() {
  // TODO: Implement coupon validation
  if (couponCode.value === 'DESCONTO10') {
    discount.value = subtotal.value * 0.1
  }
}

function proceedToCheckout() {
  router.push({ name: 'checkout' })
}
</script>

<template>
  <div class="rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:p-8">
    <h2 class="text-lg font-medium text-gray-900">Resumo do Pedido</h2>

    <div class="mt-6 space-y-4">
      <div class="flex items-center justify-between">
        <p class="text-sm text-gray-600">Subtotal</p>
        <p class="text-sm font-medium text-gray-900">{{ formattedSubtotal }}</p>
      </div>

      <div class="flex items-center justify-between border-t border-gray-200 pt-4">
        <div class="flex-1">
          <label for="zipcode" class="block text-sm text-gray-600">CEP</label>
          <div class="mt-1 flex gap-2">
            <input
              v-model="shippingZipCode"
              type="text"
              id="zipcode"
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
              placeholder="00000-000"
            />
            <button
              @click="calculateShipping"
              class="rounded-md border border-transparent bg-gray-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-gray-700"
            >
              Calcular
            </button>
          </div>
        </div>
      </div>

      <div v-if="shippingCost" class="flex items-center justify-between">
        <p class="text-sm text-gray-600">Frete</p>
        <p class="text-sm font-medium text-gray-900">{{ formattedShipping }}</p>
      </div>

      <div class="flex items-center justify-between border-t border-gray-200 pt-4">
        <div class="flex-1">
          <label for="coupon" class="block text-sm text-gray-600">Cupom de Desconto</label>
          <div class="mt-1 flex gap-2">
            <input
              v-model="couponCode"
              type="text"
              id="coupon"
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
              placeholder="Digite seu cupom"
            />
            <button
              @click="applyCoupon"
              class="rounded-md border border-transparent bg-gray-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-gray-700"
            >
              Aplicar
            </button>
          </div>
        </div>
      </div>

      <div v-if="discount" class="flex items-center justify-between">
        <p class="text-sm text-gray-600">Desconto</p>
        <p class="text-sm font-medium text-green-600">-{{ formattedDiscount }}</p>
      </div>

      <div class="flex items-center justify-between border-t border-gray-200 pt-4">
        <p class="text-base font-medium text-gray-900">Total</p>
        <p class="text-base font-medium text-gray-900">{{ formattedTotal }}</p>
      </div>
    </div>

    <button
      @click="proceedToCheckout"
      class="mt-6 w-full rounded-md border border-transparent bg-primary-600 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
    >
      Finalizar Compra
    </button>
  </div>
</template>
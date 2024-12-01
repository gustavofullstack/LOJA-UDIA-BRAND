<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '@/stores/cart'
import CheckoutForm from '@/components/checkout/CheckoutForm.vue'
import OrderSummary from '@/components/checkout/OrderSummary.vue'
import PaymentMethods from '@/components/checkout/PaymentMethods.vue'
import type { Address } from '@/types'

const router = useRouter()
const cart = useCartStore()

const shippingAddress = ref<Address>({
  street: '',
  number: '',
  complement: '',
  city: '',
  state: '',
  zipCode: ''
})

const selectedPaymentMethod = ref('')

async function handleCheckout() {
  try {
    // TODO: Implement checkout logic
    await processOrder()
    router.push({ name: 'order-confirmation' })
  } catch (error) {
    console.error('Checkout failed:', error)
  }
}

async function processOrder() {
  // Simulating API call
  return new Promise(resolve => setTimeout(resolve, 1000))
}
</script>

<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <h1 class="text-2xl md:text-3xl font-bold mb-8">Finalizar Compra</h1>

    <div class="lg:grid lg:grid-cols-12 lg:gap-x-12 space-y-8 lg:space-y-0">
      <div class="lg:col-span-7">
        <CheckoutForm
          v-model:address="shippingAddress"
          class="mb-8"
        />

        <PaymentMethods
          v-model="selectedPaymentMethod"
        />
      </div>

      <div class="lg:col-span-5">
        <OrderSummary
          :address="shippingAddress"
          :payment-method="selectedPaymentMethod"
          @checkout="handleCheckout"
        />
      </div>
    </div>
  </div>
</template>
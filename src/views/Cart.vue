<script setup lang="ts">
import { computed } from 'vue'
import { useCartStore } from '@/stores/cart'
import CartItem from '@/components/cart/CartItem.vue'
import CartSummary from '@/components/cart/CartSummary.vue'
import EmptyCart from '@/components/cart/EmptyCart.vue'

const cart = useCartStore()

const hasItems = computed(() => cart.items.length > 0)
</script>

<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <h1 class="text-2xl md:text-3xl font-bold mb-8">Carrinho de Compras</h1>

    <template v-if="hasItems">
      <div class="lg:grid lg:grid-cols-12 lg:gap-x-12 space-y-8 lg:space-y-0">
        <div class="lg:col-span-7">
          <ul class="divide-y divide-gray-200">
            <li
              v-for="item in cart.items"
              :key="item.id"
              class="py-6"
            >
              <CartItem
                :item="item"
                @update-quantity="cart.updateQuantity(item.id, $event)"
                @remove="cart.removeItem(item.id)"
              />
            </li>
          </ul>
        </div>

        <div class="lg:col-span-5">
          <CartSummary />
        </div>
      </div>
    </template>

    <EmptyCart v-else />
  </div>
</template>
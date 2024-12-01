<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useCartStore } from '@/stores/cart'
import ProductGallery from '@/components/product/detail/ProductGallery.vue'
import ProductInfo from '@/components/product/detail/ProductInfo.vue'
import RelatedProducts from '@/components/product/detail/RelatedProducts.vue'
import ProductReviews from '@/components/product/detail/ProductReviews.vue'
import { useProduct } from '@/composables/useProduct'

const route = useRoute()
const cart = useCartStore()
const productId = route.params.id as string
const { product, loading, error } = useProduct(productId)

const selectedSize = ref('')
const selectedColor = ref('')
const quantity = ref(1)

function addToCart() {
  if (product.value && selectedSize.value && selectedColor.value) {
    cart.addItem(product.value, quantity.value)
  }
}
</script>

<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div v-if="loading" class="flex justify-center py-16">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
    </div>

    <div v-else-if="error" class="text-center py-16 text-red-600">
      {{ error }}
    </div>

    <template v-else-if="product">
      <div class="lg:grid lg:grid-cols-2 lg:gap-x-8 space-y-8 lg:space-y-0">
        <ProductGallery :images="product.images" />
        
        <ProductInfo
          :product="product"
          v-model:size="selectedSize"
          v-model:color="selectedColor"
          v-model:quantity="quantity"
          @add-to-cart="addToCart"
        />
      </div>

      <div class="mt-16 border-t border-gray-200 pt-8">
        <h2 class="text-2xl font-bold mb-4">Descrição do Produto</h2>
        <div class="prose prose-sm max-w-none">
          {{ product.description }}
        </div>
      </div>

      <ProductReviews class="mt-16" />
      
      <RelatedProducts
        :category="product.category"
        :current-product-id="product.id"
        class="mt-16"
      />
    </template>
  </div>
</template>
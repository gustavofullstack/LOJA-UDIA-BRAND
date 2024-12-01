import { ref, onMounted } from 'vue'
import type { Product } from '@/types'

export function useProducts() {
  const products = ref<Product[]>([])
  const loading = ref(true)
  const error = ref<string | null>(null)

  async function fetchProducts() {
    try {
      // TODO: Replace with actual API call
      const mockProducts: Product[] = [
        {
          id: '1',
          name: 'Camiseta Básica',
          description: 'Camiseta 100% algodão',
          price: 49.90,
          images: ['https://placehold.co/300x400'],
          category: 'camisetas',
          sizes: ['P', 'M', 'G'],
          colors: ['Branco', 'Preto'],
          stock: 100
        },
        {
          id: '2',
          name: 'Calça Jeans',
          description: 'Calça jeans slim',
          price: 159.90,
          images: ['https://placehold.co/300x400'],
          category: 'calcas',
          sizes: ['38', '40', '42'],
          colors: ['Azul'],
          stock: 50
        }
      ]
      
      products.value = mockProducts
      loading.value = false
    } catch (e) {
      error.value = 'Erro ao carregar produtos'
      loading.value = false
    }
  }

  onMounted(() => {
    fetchProducts()
  })

  return {
    products,
    loading,
    error
  }
}
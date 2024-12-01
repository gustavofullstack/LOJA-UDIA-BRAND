import { ref, onMounted } from 'vue'
import type { Product } from '@/types'

export function useProduct(id: string) {
  const product = ref<Product | null>(null)
  const loading = ref(true)
  const error = ref<string | null>(null)

  async function fetchProduct() {
    try {
      // TODO: Replace with actual API call
      const mockProduct: Product = {
        id: '1',
        name: 'Camiseta Básica',
        description: 'Camiseta 100% algodão de alta qualidade. Perfeita para o dia a dia, com acabamento premium e durabilidade excepcional. Disponível em várias cores e tamanhos.',
        price: 49.90,
        images: [
          'https://placehold.co/600x800',
          'https://placehold.co/600x800',
          'https://placehold.co/600x800',
          'https://placehold.co/600x800'
        ],
        category: 'camisetas',
        sizes: ['P', 'M', 'G', 'GG'],
        colors: ['Branco', 'Preto', 'Azul', 'Vermelho'],
        stock: 100
      }
      
      product.value = mockProduct
      loading.value = false
    } catch (e) {
      error.value = 'Erro ao carregar produto'
      loading.value = false
    }
  }

  onMounted(() => {
    fetchProduct()
  })

  return {
    product,
    loading,
    error
  }
}
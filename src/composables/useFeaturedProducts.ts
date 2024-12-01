import { ref } from 'vue'
import type { Product } from '@/types'

// Temporary mock data - Replace with API calls
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

export function useFeaturedProducts() {
  const featuredProducts = ref<Product[]>(mockProducts)
  const newArrivals = ref<Product[]>(mockProducts)
  const bestSellers = ref<Product[]>(mockProducts)

  // TODO: Implement API calls to fetch different product lists

  return {
    featuredProducts,
    newArrivals,
    bestSellers
  }
}
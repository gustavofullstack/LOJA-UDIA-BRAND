export interface Product {
  id: string
  name: string
  description: string
  price: number
  images: string[]
  category: string
  sizes: string[]
  colors: string[]
  stock: number
}

export interface CartItem extends Product {
  quantity: number
}

export interface User {
  id: string
  name: string
  email: string
  address?: Address
}

export interface Address {
  street: string
  number: string
  complement?: string
  city: string
  state: string
  zipCode: string
}
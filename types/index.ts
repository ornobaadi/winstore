export type Product = {
  id: number
  title: string
  price: number
  description: string
  category: string
  image: string
  rating: {
    rate: number
    count: number
  }
}

export type Category = {
  id: number
  name: string
}

export type ApiResponse<T> = {
  success: boolean
  message: string
  data: T
}

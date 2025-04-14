export interface User {
    id: number
    name: string
    email: string
    role: "customer" | "employee" | "admin"
  }
  
  export interface Category {
    id: number
    name: string
    slug: string
  }
  
  export interface Plant {
    id: number
    name: string
    slug: string
    description: string
    price: number
    image: string | null
    category: Category
    category_id: number
  }
  
  export interface OrderItem {
    id: number
    plant: Plant
    quantity: number
    price: number
  }
  
  export interface Order {
    id: number
    user_id: number
    status: "pending" | "preparing" | "delivered" | "cancelled"
    total: number
    items: OrderItem[]
    created_at: string
    updated_at: string
  }
  
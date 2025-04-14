import type { Plant } from "@/types"
import { useAuthStore } from "@/store/authStore"

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api"

// Helper function to get auth token
const getToken = () => {
  const { token } = useAuthStore.getState()
  return token
}

// Helper function for API requests
async function apiRequest(endpoint: string, options: RequestInit = {}) {
  const token = getToken()

  const headers = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  })

  if (!response.ok) {
    const error = await response.json().catch(() => ({}))
    throw new Error(error.message || "API request failed")
  }

  return response.json()
}

// Auth
export async function loginUser(email: string, password: string) {
  return apiRequest("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  })
}

export async function registerUser(name: string, email: string, password: string) {
  return apiRequest("/auth/register", {
    method: "POST",
    body: JSON.stringify({ name, email, password, password_confirmation: password }),
  })
}

export async function getCurrentUser() {
  return apiRequest("/auth/user")
}


export async function updateOrderStatus(orderId: number, status: string) {
  return apiRequest(`/admin/orders/${orderId}/status`, {
    method: "POST",
    body: JSON.stringify({ status }),
  })
}

export async function createPlant(plantData: Partial<Plant>) {
  return apiRequest("/admin/plants", {
    method: "POST",
    body: JSON.stringify(plantData),
  })
}

export async function updatePlant(plantId: number, plantData: Partial<Plant>) {
  return apiRequest(`/admin/plants/${plantId}`, {
    method: "PUT",
    body: JSON.stringify(plantData),
  })
}

export async function deletePlant(plantId: number) {
  return apiRequest(`/admin/plants/${plantId}`, {
    method: "DELETE",
  })
}

export async function getCategories() {
  return apiRequest("/categories")
}

export async function createCategory(name: string) {
  return apiRequest("/admin/categories", {
    method: "POST",
    body: JSON.stringify({ name }),
  })
}

export async function updateCategory(categoryId: number, name: string) {
  return apiRequest(`/admin/categories/${categoryId}`, {
    method: "PUT",
    body: JSON.stringify({ name }),
  })
}

export async function deleteCategory(categoryId: number) {
  return apiRequest(`/admin/categories/${categoryId}`, {
    method: "DELETE",
  })
}

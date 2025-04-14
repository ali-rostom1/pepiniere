"use client"

import Link from "next/link"
import { useAuthStore } from "@/store/authStore"
import { useCartStore } from "@/store/cartStore"
import { usePathname, useRouter } from "next/navigation"

export default function Navbar() {
  const { user, logout } = useAuthStore()
  const { items } = useCartStore()
  const pathname = usePathname()
  const router = useRouter()

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  return (
    <nav className="bg-green-600 text-white">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold">
          PéAPInière
        </Link>

        <div className="flex items-center gap-6">
          <Link href="/" className={pathname === "/" ? "font-bold" : ""}>
            Plants
          </Link>

          <Link href="/cart" className={pathname === "/cart" ? "font-bold" : ""}>
            Cart ({items.length})
          </Link>

          {user ? (
            <>
              <Link href="/orders" className={pathname === "/orders" ? "font-bold" : ""}>
                Orders
              </Link>

              {(user.role === "admin" || user.role === "employee") && (
                <Link href="/admin" className={pathname.startsWith("/admin") ? "font-bold" : ""}>
                  Admin
                </Link>
              )}

              <div className="flex items-center gap-2">
                <span>{user.name}</span>
                <button onClick={handleLogout} className="px-3 py-1 bg-white text-green-600 rounded text-sm">
                  Logout
                </button>
              </div>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <Link href="/login" className="px-3 py-1 bg-white text-green-600 rounded text-sm">
                Login
              </Link>
              <Link href="/register" className="px-3 py-1 border border-white rounded text-sm">
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}

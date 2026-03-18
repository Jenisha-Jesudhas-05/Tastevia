import { Outlet } from "react-router-dom"
import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
import { WishlistProvider } from "@/features/wishlist/WishlistContext"
import FloatingCartBar from "@/features/cart/FloatingCart"
import ChatWidget from "@/components/ChatWidget"

export default function MainLayout() {
  return (
    <WishlistProvider>
      <div className="flex min-h-screen flex-col bg-gradient-to-b from-amber-50 via-white to-rose-50 text-foreground transition-colors dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
        <Navbar />
        <main className="flex-1">
          <Outlet />
        </main>
        <FloatingCartBar />
        <ChatWidget />
        <Footer />
      </div>
    </WishlistProvider>
  )
}

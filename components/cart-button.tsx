"use client"

import { ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/lib/cart-context"
import { useState } from "react"
import { CartSheet } from "@/components/cart-sheet"

export function CartButton() {
  const { totalItems } = useCart()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <Button
        variant="outline"
        size="icon"
        className="relative bg-transparent"
        onClick={() => setIsOpen(true)}
        aria-label="Shopping cart"
      >
        <ShoppingCart className="w-5 h-5" />
        {totalItems > 0 && (
          <Badge
            variant="destructive"
            className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0 flex items-center justify-center text-xs"
          >
            {totalItems}
          </Badge>
        )}
      </Button>
      <CartSheet open={isOpen} onOpenChange={setIsOpen} />
    </>
  )
}

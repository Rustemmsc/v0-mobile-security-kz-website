"use client"

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { useCart } from "@/lib/cart-context"
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react"
import { useTranslation } from "@/lib/translations"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"

interface CartSheetProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CartSheet({ open, onOpenChange }: CartSheetProps) {
  const { cart, removeFromCart, updateQuantity, totalPrice, clearCart } = useCart()
  const { t } = useTranslation()

  const handleCheckout = () => {
    const items = cart
      .map((item) => `${item.name} x${item.quantity} - ${(item.price * item.quantity).toLocaleString()}₸`)
      .join("\n")
    const message = `Здравствуйте! Хочу оформить заказ:\n\n${items}\n\nИтого: ${totalPrice.toLocaleString()} ₸`
    window.open(`https://wa.me/77789755555?text=${encodeURIComponent(message)}`, "_blank")
  }

  if (cart.length === 0) {
    return (
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent className="flex flex-col">
          <SheetHeader>
            <SheetTitle>{t("shop.cart")}</SheetTitle>
          </SheetHeader>
          <div className="flex-1 flex flex-col items-center justify-center text-center p-6">
            <ShoppingBag className="w-16 h-16 text-muted-foreground mb-4" />
            <p className="text-lg font-medium mb-2">{t("shop.emptyCart")}</p>
            <p className="text-sm text-muted-foreground">{t("shop.emptyCartDesc")}</p>
          </div>
        </SheetContent>
      </Sheet>
    )
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="flex flex-col w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle>{t("shop.cart")}</SheetTitle>
        </SheetHeader>

        <ScrollArea className="flex-1 -mx-6 px-6">
          <div className="space-y-4 py-4">
            {cart.map((item) => (
              <div key={item.id} className="flex gap-4">
                <img
                  src={item.image || "/placeholder.svg"}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded-lg"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-sm leading-tight mb-1 truncate">{item.name}</h4>
                  <p className="text-lg font-bold text-primary">{item.price.toLocaleString()} ₸</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 bg-transparent"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    >
                      <Minus className="w-3 h-3" />
                    </Button>
                    <span className="w-8 text-center font-medium">{item.quantity}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 bg-transparent"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      <Plus className="w-3 h-3" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 ml-auto text-destructive hover:text-destructive"
                      onClick={() => removeFromCart(item.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        <Separator className="my-4" />

        <SheetFooter className="flex-col gap-4">
          <div className="flex justify-between items-center w-full">
            <span className="text-lg font-medium">{t("shop.total")}:</span>
            <span className="text-2xl font-bold text-primary">{totalPrice.toLocaleString()} ₸</span>
          </div>
          <Button onClick={handleCheckout} className="w-full" size="lg">
            {t("shop.checkout")}
          </Button>
          <Button variant="outline" onClick={clearCart} className="w-full bg-transparent">
            {t("shop.clearCart")}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

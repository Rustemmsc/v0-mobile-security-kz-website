import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { CallButton } from "@/components/call-button"
import { StructuredData } from "@/components/structured-data"
import { Shop } from "@/components/shop"
import { createClient } from "@/lib/supabase/server"

export const revalidate = 0

export default async function ShopPage() {
  const supabase = await createClient()

  const { data: categories } = await supabase
    .from("product_categories")
    .select("*")
    .eq("is_active", true)
    .order("display_order", { ascending: true })

  const { data: products } = await supabase
    .from("products")
    .select("*, product_categories(name_ru, name_kk, name_en, id)")
    .eq("is_active", true)
    .order("position", { ascending: true })
    .order("id", { ascending: true })

  return (
    <>
      <StructuredData />
      <main className="min-h-screen bg-background">
        <Header />
        <section className="pt-8 pb-16">
          <Shop categories={categories || []} products={products || []} />
        </section>
        <Footer />
        <CallButton />
        <WhatsAppButton />
      </main>
    </>
  )
}


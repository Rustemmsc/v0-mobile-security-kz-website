import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { TradeInOffer } from "@/components/trade-in-offer"
import { Benefits } from "@/components/benefits"
import { Services } from "@/components/services"
import { CtaServices } from "@/components/cta-services"
import { Technologies } from "@/components/technologies"
import { Shop } from "@/components/shop"
import { ShopCustomCta } from "@/components/shop-custom-cta"
import { Packages } from "@/components/packages"
import { Projects } from "@/components/projects"
import { CtaProjects } from "@/components/cta-projects"
import { MaintenancePromo } from "@/components/maintenance-promo"
import { About } from "@/components/about"
import { Reviews } from "@/components/reviews"
import { Contact } from "@/components/contact"
import { Footer } from "@/components/footer"
import { UrgencyBanner } from "@/components/urgency-banner"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { CallButton } from "@/components/call-button"
import { StructuredData } from "@/components/structured-data"
import { createClient } from "@/lib/supabase/server"

export const revalidate = 0

export default async function Home() {
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
        <UrgencyBanner />
        <Header />
        <Hero />
        <TradeInOffer />
        <Benefits />
        <Services />
        <CtaServices />
        <Technologies />
        <Shop categories={categories || []} products={products || []} showCustomCtaInline={false} />
        <ShopCustomCta />
        <Packages />
        <Projects />
        <CtaProjects />
        <MaintenancePromo />
        <About />
        <Reviews />
        <Contact />
        <Footer />
        <CallButton />
        <WhatsAppButton />
      </main>
    </>
  )
}

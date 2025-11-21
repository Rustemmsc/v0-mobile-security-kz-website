"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useTranslation } from "@/lib/translations"

export function ShopCustomCta() {
  const { t } = useTranslation()

  return (
    <section className="py-8 md:py-10 bg-background">
      <div className="container mx-auto px-4">
        <Card className="relative mx-auto w-full max-w-7xl overflow-hidden border border-[#242582] bg-gradient-to-r from-[#242582] via-[#2F2FA2] to-[#242582] text-white shadow-xl shadow-[#242582]/40">
          <div className="absolute inset-0 opacity-60 bg-[radial-gradient(circle_at_top_left,#2F2FA2,transparent_55%),radial-gradient(circle_at_bottom_right,#553D67,transparent_60%)]" />
          <div className="relative flex flex-col gap-3 p-4 md:p-6 md:flex-row md:items-center md:justify-between">
            <div className="space-y-3 max-w-3xl">
              <h3 className="text-xl md:text-2xl font-semibold md:font-bold tracking-tight">
                {t("shop.customTitle")}
              </h3>
              <p className="text-base md:text-lg text-white/85">
                {t("shop.customSubtitle")}
              </p>
            </div>
            <div className="flex w-full md:w-auto items-center justify-start md:justify-end">
              <Button
                asChild
                size="lg"
                variant="secondary"
                className="w-full md:w-auto px-7 text-sm md:text-base font-medium shadow-lg shadow-orange-500/40 bg-orange-500 text-white hover:bg-orange-400"
              >
                <a
                  href="https://wa.me/77789755555?text=Здравствуйте! Нужна консультация по выбору оборудования."
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t("shop.customButton")}
                </a>
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </section>
  )
}

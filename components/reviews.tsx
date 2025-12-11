"use client"

import { Star, Quote } from "lucide-react"
import { useTranslation } from "@/lib/translations"

const certifications = [
  {
    name: "Hikvision",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Hikvision-Logo-GgB812Y5GCqHd0jPJkP8U6QqSiQTb5.png",
  },
  {
    name: "Dahua",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Dahua_Technology_logo.svg-iwjZEWbJW4xL6MGQT2dVqCQ1T5i3wF.png",
  },
  {
    name: "HiWatch",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/HiWatch-logo-zWlvcAYum9Cx43SNNM3t53E9wd0mnT.png",
  },
  {
    name: "Macroscop",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Macroscop_logo-B3pogGPNuXvGfs4k1VrH13IpCUTUkY.png",
  },
  {
    name: "EZVIZ",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ezviz-logo_brandlogos.net_z9wlt-EKRCM4n0RnT3TUgJkK2Ho8VriKn9hx.png",
  },
  {
    name: "Tuya",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/tuya-logo-YLfapAnCnhM2w8pDuBswaoR5yvlnix.png",
  },
  {
    name: "Imou",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ol3fv2sz3pdh7q5tl2d80i9do64h9xdn-FETq9Bd6vXY8rih4NGu7miVdVoPA57.png",
  },
  {
    name: "Tiandy",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/tiandy-logo-OAhcBVGG00W0J76TAed0Hx9jKStgCL.png",
  },
  {
    name: "HiLook",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/nhu9jzorsfttz8wy900bsucyf01ebu0n-oInCd7AVlxoWCweOcyftzpUgZt1dhG.png",
  },
]

export function Reviews() {
  const { t } = useTranslation()

  const reviews = [
    {
      name: t("reviews.review1Name"),
      position: t("reviews.review1Position"),
      rating: 5,
      text: t("reviews.review1Text"),
      image: "/kazakhstani-asian-businessman-director.jpg",
    },
    {
      name: t("reviews.review2Name"),
      position: t("reviews.review2Position"),
      rating: 5,
      text: t("reviews.review2Text"),
      image: "/kazakhstani-asian-businesswoman-owner.jpg",
    },
    {
      name: t("reviews.review3Name"),
      position: t("reviews.review3Position"),
      rating: 5,
      text: t("reviews.review3Text"),
      image: "/professional-kazakhstani-male-manager-in-business-.jpg",
    },
  ]

  return (
    <section id="reviews" className="py-12 md:py-16 bg-surface">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">{t("reviews.title")}</h2>
          <p className="text-lg text-muted-foreground">{t("reviews.subtitle")}</p>
        </div>

        {/* Reviews Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {reviews.map((review, index) => (
            <div
              key={index}
              className="bg-background border border-border rounded-2xl p-8 hover:border-primary/50 transition-all duration-300 hover:shadow-lg"
            >
              <div className="flex items-center gap-1 mb-4">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                ))}
              </div>

              <Quote className="w-8 h-8 text-primary/30 mb-4" />

              <p className="text-foreground/70 mb-6 leading-relaxed">{review.text}</p>

              <div className="flex items-center gap-4 pt-6 border-t border-border">
                <img
                  src={review.image || "/placeholder.svg"}
                  alt={review.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-bold">{review.name}</h4>
                  <p className="text-sm text-foreground/70">{review.position}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Certifications - CSS-based infinite scroll */}
        <div className="text-center">
          <h3 className="text-xl font-bold mb-6 text-muted-foreground">{t("reviews.partnersTitle")}</h3>

          <div className="relative overflow-hidden">
            <div className="flex animate-scroll">
              {/* First set of logos */}
              {certifications.map((cert, index) => (
                <div
                  key={`first-${index}`}
                  className="flex-shrink-0 mx-8 grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all duration-300"
                >
                  <img src={cert.logo || "/placeholder.svg"} alt={cert.name} className="h-12 w-auto object-contain" />
                </div>
              ))}
              {/* Duplicate set for seamless loop */}
              {certifications.map((cert, index) => (
                <div
                  key={`second-${index}`}
                  className="flex-shrink-0 mx-8 grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all duration-300"
                >
                  <img src={cert.logo || "/placeholder.svg"} alt={cert.name} className="h-12 w-auto object-contain" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-scroll {
          animation: scroll 30s linear infinite;
        }

        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  )
}

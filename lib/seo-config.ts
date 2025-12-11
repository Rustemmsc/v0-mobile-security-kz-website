export const seoConfig = {
  ru: {
    title: "Системы безопасности в Астане | Видеонаблюдение, СКУД, Сигнализация | MobileSecurity.kz",
    description:
      "Установка систем безопасности в Астане: видеонаблюдение, СКУД, охранная сигнализация, умный дом. 15 лет опыта. Работаем по всему Казахстану. Бесплатный выезд. ☎️ +7 (777) 777-77-77",
    keywords:
      "системы безопасности Астана, видеонаблюдение Астана, установка видеонаблюдения Астана, СКУД Астана, контроль доступа Астана, охранная сигнализация Астана, охранно-пожарная сигнализация, умный дом Астана, домофоны Астана, GSM усилители, системы безопасности Казахстан, видеонаблюдение Алматы, видеонаблюдение Караганда, видеонаблюдение Шымкент",
    ogTitle: "Системы безопасности в Астане - Видеонаблюдение, СКУД, Сигнализация",
    ogDescription:
      "Профессиональная установка систем безопасности в Астане и по всему Казахстану. 15 лет опыта, 500+ проектов. Бесплатная консультация.",
  },
  kk: {
    title: "Астанадағы қауіпсіздік жүйелері | Бейнебақылау, КББЖ, Дабыл | MobileSecurity.kz",
    description:
      "Астанада қауіпсіздік жүйелерін орнату: бейнебақылау, КББЖ, қауіпсіздік дабылы, ақылды үй. 15 жыл тәжірибе. Бүкіл Қазақстан бойынша жұмыс істейміз. Тегін шығу. ☎️ +7 (777) 777-77-77",
    keywords:
      "қауіпсіздік жүйелері Астана, бейнебақылау Астана, бейнебақылау орнату Астана, КББЖ Астана, кіруді бақылау Астана, қауіпсіздік дабылы Астана, өрт-қауіпсіздік дабылы, ақылды үй Астана, домофондар Астана, GSM күшейткіштер, қауіпсіздік жүйелері Қазақстан, бейнебақылау Алматы",
    ogTitle: "Астанадағы қауіпсіздік жүйелері - Бейнебақылау, КББЖ, Дабыл",
    ogDescription:
      "Астана мен бүкіл Қазақстан бойынша қауіпсіздік жүйелерін кәсіби орнату. 15 жыл тәжірибе, 500+ жоба. Тегін консультация.",
  },
  en: {
    title: "Security Systems in Astana | CCTV, Access Control, Alarm | MobileSecurity.kz",
    description:
      "Security systems installation in Astana: CCTV, access control, security alarms, smart home. 15 years experience. Operating throughout Kazakhstan. Free visit. ☎️ +7 (777) 777-77-77",
    keywords:
      "security systems Astana, CCTV Astana, video surveillance installation Astana, access control Astana, security alarm Astana, fire alarm, smart home Astana, intercoms Astana, GSM boosters, security systems Kazakhstan, CCTV Almaty, CCTV installation Kazakhstan",
    ogTitle: "Security Systems in Astana - CCTV, Access Control, Alarm",
    ogDescription:
      "Professional security systems installation in Astana and throughout Kazakhstan. 15 years experience, 500+ projects. Free consultation.",
  },
}

export const businessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "MobileSecurity.kz",
  image: "https://mobilesecurity.kz/logo.png",
  "@id": "https://mobilesecurity.kz",
  url: "https://mobilesecurity.kz",
  telephone: "+77777777777",
  priceRange: "₸₸",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Проспект Туран, 54 НП3",
    addressLocality: "Астана",
    postalCode: "010000",
    addressCountry: "KZ",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 51.1605,
    longitude: 71.4704,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "18:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Saturday",
      opens: "10:00",
      closes: "15:00",
    },
  ],
  sameAs: [
    "https://www.instagram.com/mobilesecurity.kz",
    "https://www.facebook.com/mobilesecurity.kz",
    "https://wa.me/77777777777",
  ],
  areaServed: [
    {
      "@type": "City",
      name: "Астана",
    },
    {
      "@type": "City",
      name: "Алматы",
    },
    {
      "@type": "City",
      name: "Шымкент",
    },
    {
      "@type": "City",
      name: "Караганда",
    },
    {
      "@type": "Country",
      name: "Казахстан",
    },
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Услуги по безопасности",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Видеонаблюдение",
          description: "Проектирование и монтаж систем видеонаблюдения любой сложности",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Контроль доступа (СКУД)",
          description: "Установка систем контроля и управления доступом",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Охранная сигнализация",
          description: "Монтаж охранно-пожарной сигнализации",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Умный дом",
          description: "Автоматизация освещения, климата и безопасности",
        },
      },
    ],
  },
}

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "MobileSecurity.kz",
  url: "https://mobilesecurity.kz",
  logo: "https://mobilesecurity.kz/logo.png",
  description:
    "Ведущий поставщик систем безопасности в Казахстане. Видеонаблюдение, СКУД, охранная сигнализация, умный дом.",
  foundingDate: "2010",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Проспект Туран, 54 НП3",
    addressLocality: "Астана",
    postalCode: "010000",
    addressCountry: "KZ",
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+77777777777",
    contactType: "customer service",
    areaServed: "KZ",
    availableLanguage: ["Russian", "Kazakh", "English"],
  },
}

export const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Главная",
      item: "https://mobilesecurity.kz",
    },
  ],
}

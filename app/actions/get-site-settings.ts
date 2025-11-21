"use server"

import { createClient } from "@/lib/supabase/server"

export interface SiteSettings {
  company_address: string
  company_phone: string
  company_phone_support?: string
  company_email: string
  [key: string]: string | undefined
}

export async function getSiteSettings(language = "ru"): Promise<SiteSettings> {
  // Return hardcoded values for now - will use database once schema cache updates
  const settings: SiteSettings = {
    company_address: "Проспект Туран, 54 НП3, Астана, Казахстан",
    company_phone: "+7 (778) 975-55-55",
    company_phone_support: "+7 (778) 340-00-00",
    company_email: "info@mobilesecurity.kz",
  }

  try {
    const supabase = await createClient()
    
    // Try to fetch from database but don't fail if table doesn't exist yet
    const { data, error } = await supabase
      .from("site_settings")
      .select("key, value")
      .eq("language", language)
      .eq("category", "contact")

    if (!error && data) {
      // Merge database values with defaults
      data.forEach((setting) => {
        settings[setting.key] = setting.value
      })
    }
  } catch (err) {
    // Silently use fallback values if database access fails
    console.log("[v0] Using fallback site settings")
  }

  return settings
}

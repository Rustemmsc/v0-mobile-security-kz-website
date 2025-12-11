import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { notFound } from 'next/navigation'
import { ProductDetailClient } from '@/components/product-detail-client'

interface Product {
  id: string
  category_id: string
  name_ru: string
  name_kk: string
  name_en: string
  brand: string | null
  description_ru: string | null
  description_kk: string | null
  description_en: string | null
  specifications: any
  price: number
  images: string[] | null
  is_featured: boolean
  is_in_stock: boolean
  sku: string | null
  is_active: boolean
  product_categories?: {
    name_ru: string
    name_kk: string
    name_en: string
    id: string
  }
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const cookieStore = await cookies()
  
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    }
  )

  const { data: product, error } = await supabase
    .from('products')
    .select('*, product_categories(*)')
    .eq('id', id)
    .eq('is_active', true)
    .single()

  if (error || !product) {
    notFound()
  }

  return <ProductDetailClient product={product as Product} />
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const cookieStore = await cookies()
  
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll() {},
      },
    }
  )

  const { data: product } = await supabase
    .from('products')
    .select('name_ru, description_ru, images')
    .eq('id', id)
    .single()

  if (!product) {
    return {
      title: 'Товар не найден',
    }
  }

  return {
    title: `${product.name_ru} | MobileSecurity.kz`,
    description: product.description_ru || 'Системы безопасности и видеонаблюдения',
    openGraph: {
      images: product.images?.[0] ? [product.images[0]] : [],
    },
  }
}

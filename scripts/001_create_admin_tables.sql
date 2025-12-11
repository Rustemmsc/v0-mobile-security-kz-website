-- Create admin users table
create table if not exists public.admins (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade unique,
  email text not null unique,
  full_name text,
  role text default 'admin' check (role in ('admin', 'super_admin')),
  is_active boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Enable RLS
alter table public.admins enable row level security;

-- Policies for admins
create policy "Admins can view all admin users"
  on public.admins for select
  using (
    exists (
      select 1 from public.admins
      where user_id = auth.uid()
    )
  );

create policy "Super admins can insert admin users"
  on public.admins for insert
  with check (
    exists (
      select 1 from publicа .admins
      where user_id = auth.uid() and role = 'super_admin'
    )
  );

create policy "Super admins can update admin users"
  on public.admins for update
  using (
    exists (
      select 1 from public.admins
      where user_id = auth.uid() and role = 'super_admin'
    )
  );

create policy "Allow first admin creation"
  on public.admins for insert
  with check (
    not exists (select 1 from public.admins)
  );

-- Create product categories table
create table if not exists public.product_categories (
  id uuid primary key default gen_random_uuid(),
  name_ru text not null,
  name_kk text not null,
  name_en text not null,
  description_ru text,
  description_kk text,
  description_en text,
  icon text,
  display_order int default 0,
  is_active boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Enable RLS
alter table public.product_categories enable row level security;

-- Policies for product_categories (public can read, admins can manage)
create policy "Anyone can view active categories"
  on public.product_categories for select
  using (is_active = true);

create policy "Admins can view all categories"
  on public.product_categories for select
  using (
    exists (
      select 1 from public.admins
      where user_id = auth.uid()
    )
  );

create policy "Admins can insert categories"
  on public.product_categories for insert
  with check (
    exists (
      select 1 from public.admins
      where user_id = auth.uid()
    )
  );

create policy "Admins can update categories"
  on public.product_categories for update
  using (
    exists (
      select 1 from public.admins
      where user_id = auth.uid()
    )
  );

create policy "Admins can delete categories"
  on public.product_categories for delete
  using (
    exists (
      select 1 from public.admins
      where user_id = auth.uid()
    )
  );

-- Create products table
create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  category_id uuid references public.product_categories(id) on delete set null,
  name_ru text not null,
  name_kk text not null,
  name_en text not null,
  description_ru text,
  description_kk text,
  description_en text,
  price decimal(10, 2) not null,
  currency text default 'KZT',
  sku text unique,
  stock_quantity int default 0,
  is_in_stock boolean default true,
  images text[] default '{}',
  features_ru text[],
  features_kk text[],
  features_en text[],
  brand text,
  model text,
  specifications jsonb,
  is_featured boolean default false,
  is_active boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Enable RLS
alter table public.products enable row level security;

-- Policies for products
create policy "Anyone can view active products"
  on public.products for select
  using (is_active = true);

create policy "Admins can view all products"
  on public.products for select
  using (
    exists (
      select 1 from public.admins
      where user_id = auth.uid()
    )
  );

create policy "Admins can insert products"
  on public.products for insert
  with check (
    exists (
      select 1 from public.admins
      where user_id = auth.uid()
    )
  );

create policy "Admins can update products"
  on public.products for update
  using (
    exists (
      select 1 from public.admins
      where user_id = auth.uid()
    )
  );

create policy "Admins can delete products"
  on public.products for delete
  using (
    exists (
      select 1 from public.admins
      where user_id = auth.uid()
    )
  );

-- Create site content table for managing website content
create table if not exists public.site_content (
  id uuid primary key default gen_random_uuid(),
  key text not null unique,
  value_ru text,
  value_kk text,
  value_en text,
  content_type text default 'text' check (content_type in ('text', 'html', 'markdown', 'image', 'url')),
  section text,
  description text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Enable RLS
alter table public.site_content enable row level security;

-- Policies for site_content
create policy "Anyone can view site content"
  on public.site_content for select
  using (true);

create policy "Admins can insert site content"
  on public.site_content for insert
  with check (
    exists (
      select 1 from public.admins
      where user_id = auth.uid()
    )
  );

create policy "Admins can update site content"
  on public.site_content for update
  using (
    exists (
      select 1 from public.admins
      where user_id = auth.uid()
    )
  );

create policy "Admins can delete site content"
  on public.site_content for delete
  using (
    exists (
      select 1 from public.admins
      where user_id = auth.uid()
    )
  );

-- Create orders table
create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  customer_name text not null,
  customer_email text not null,
  customer_phone text not null,
  items jsonb not null,
  total_amount decimal(10, 2) not null,
  currency text default 'KZT',
  status text default 'pending' check (status in ('pending', 'confirmed', 'processing', 'completed', 'cancelled')),
  notes text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Enable RLS
alter table public.orders enable row level security;

-- Policies for orders
create policy "Admins can view all orders"
  on public.orders for select
  using (
    exists (
      select 1 from public.admins
      where user_id = auth.uid()
    )
  );

create policy "Anyone can create orders"
  on public.orders for insert
  with check (true);

create policy "Admins can update orders"
  on public.orders for update
  using (
    exists (
      select 1 from public.admins
      where user_id = auth.uid()
    )
  );

-- Create indexes for better performance
create index if not exists idx_products_category on public.products(category_id);
create index if not exists idx_products_active on public.products(is_active);
create index if not exists idx_products_featured on public.products(is_featured);
create index if not exists idx_orders_status on public.orders(status);
create index if not exists idx_orders_created on public.orders(created_at desc);

-- Create updated_at trigger function
create or replace function public.update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- Add triggers for updated_at
create trigger update_admins_updated_at before update on public.admins
  for each row execute function public.update_updated_at_column();

create trigger update_product_categories_updated_at before update on public.product_categories
  for each row execute function public.update_updated_at_column();

create trigger update_products_updated_at before update on public.products
  for each row execute function public.update_updated_at_column();

create trigger update_site_content_updated_at before update on public.site_content
  for each row execute function public.update_updated_at_column();

create trigger update_orders_updated_at before update on public.orders
  for each row execute function public.update_updated_at_column();

-- CleanPlate Database Schema Migration
-- Version: 001
-- Description: Initial schema with profiles, household members, pantry items, meal plans, and cooked meals

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- ============================================================================
-- PROFILES TABLE
-- ============================================================================
create table public.profiles (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users(id) on delete cascade not null unique,
  email text,
  full_name text,
  avatar_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create index profiles_user_id_idx on public.profiles(user_id);

alter table public.profiles enable row level security;

create policy "Users can view their own profile"
  on public.profiles for select
  using (auth.uid() = user_id);

create policy "Users can insert their own profile"
  on public.profiles for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own profile"
  on public.profiles for update
  using (auth.uid() = user_id);

-- ============================================================================
-- HOUSEHOLD MEMBERS TABLE
-- ============================================================================
create table public.household_members (
  id uuid primary key default uuid_generate_v4(),
  profile_id uuid references public.profiles(id) on delete cascade not null,
  name text not null,
  appetite_level text check (appetite_level in ('light', 'moderate', 'hearty')) default 'moderate',
  dietary_restrictions text[] default '{}',
  allergies text[] default '{}',
  cuisine_preferences text[] default '{}',
  age_group text check (age_group in ('child', 'teen', 'adult', 'senior')),
  notes text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create index household_members_profile_id_idx on public.household_members(profile_id);

alter table public.household_members enable row level security;

create policy "Users can view their own household members"
  on public.household_members for select
  using (
    profile_id in (
      select id from public.profiles where user_id = auth.uid()
    )
  );

create policy "Users can insert their own household members"
  on public.household_members for insert
  with check (
    profile_id in (
      select id from public.profiles where user_id = auth.uid()
    )
  );

create policy "Users can update their own household members"
  on public.household_members for update
  using (
    profile_id in (
      select id from public.profiles where user_id = auth.uid()
    )
  );

create policy "Users can delete their own household members"
  on public.household_members for delete
  using (
    profile_id in (
      select id from public.profiles where user_id = auth.uid()
    )
  );

-- ============================================================================
-- PANTRY ITEMS TABLE
-- ============================================================================
create table public.pantry_items (
  id uuid primary key default uuid_generate_v4(),
  profile_id uuid references public.profiles(id) on delete cascade not null,
  name text not null,
  quantity_level text check (quantity_level in ('low', 'medium', 'plenty')) default 'medium',
  quantity_value numeric,
  unit text,
  expiration_date date,
  category text not null,
  location text,
  notes text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create index pantry_items_profile_id_idx on public.pantry_items(profile_id);
create index pantry_items_category_idx on public.pantry_items(category);
create index pantry_items_expiration_date_idx on public.pantry_items(expiration_date);

alter table public.pantry_items enable row level security;

create policy "Users can view their own pantry items"
  on public.pantry_items for select
  using (
    profile_id in (
      select id from public.profiles where user_id = auth.uid()
    )
  );

create policy "Users can insert their own pantry items"
  on public.pantry_items for insert
  with check (
    profile_id in (
      select id from public.profiles where user_id = auth.uid()
    )
  );

create policy "Users can update their own pantry items"
  on public.pantry_items for update
  using (
    profile_id in (
      select id from public.profiles where user_id = auth.uid()
    )
  );

create policy "Users can delete their own pantry items"
  on public.pantry_items for delete
  using (
    profile_id in (
      select id from public.profiles where user_id = auth.uid()
    )
  );

-- ============================================================================
-- MEAL PLANS TABLE
-- ============================================================================
create table public.meal_plans (
  id uuid primary key default uuid_generate_v4(),
  profile_id uuid references public.profiles(id) on delete cascade not null,
  week_start_date date not null,
  week_end_date date,
  plan_data jsonb not null default '{}'::jsonb,
  status text check (status in ('draft', 'active', 'completed', 'archived')) default 'draft',
  total_meals integer default 0,
  notes text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  constraint unique_week_per_profile unique(profile_id, week_start_date)
);

create index meal_plans_profile_id_idx on public.meal_plans(profile_id);
create index meal_plans_week_start_date_idx on public.meal_plans(week_start_date);

alter table public.meal_plans enable row level security;

create policy "Users can view their own meal plans"
  on public.meal_plans for select
  using (
    profile_id in (
      select id from public.profiles where user_id = auth.uid()
    )
  );

create policy "Users can insert their own meal plans"
  on public.meal_plans for insert
  with check (
    profile_id in (
      select id from public.profiles where user_id = auth.uid()
    )
  );

create policy "Users can update their own meal plans"
  on public.meal_plans for update
  using (
    profile_id in (
      select id from public.profiles where user_id = auth.uid()
    )
  );

create policy "Users can delete their own meal plans"
  on public.meal_plans for delete
  using (
    profile_id in (
      select id from public.profiles where user_id = auth.uid()
    )
  );

-- ============================================================================
-- COOKED MEALS TABLE
-- ============================================================================
create table public.cooked_meals (
  id uuid primary key default uuid_generate_v4(),
  profile_id uuid references public.profiles(id) on delete cascade not null,
  meal_plan_id uuid references public.meal_plans(id) on delete set null,
  date_cooked date not null,
  meal_type text check (meal_type in ('breakfast', 'lunch', 'dinner', 'snack')) default 'dinner',
  meal_data jsonb not null default '{}'::jsonb,
  rating integer check (rating >= 1 and rating <= 5),
  feedback text,
  would_make_again boolean,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create index cooked_meals_profile_id_idx on public.cooked_meals(profile_id);
create index cooked_meals_meal_plan_id_idx on public.cooked_meals(meal_plan_id);
create index cooked_meals_date_cooked_idx on public.cooked_meals(date_cooked);

alter table public.cooked_meals enable row level security;

create policy "Users can view their own cooked meals"
  on public.cooked_meals for select
  using (
    profile_id in (
      select id from public.profiles where user_id = auth.uid()
    )
  );

create policy "Users can insert their own cooked meals"
  on public.cooked_meals for insert
  with check (
    profile_id in (
      select id from public.profiles where user_id = auth.uid()
    )
  );

create policy "Users can update their own cooked meals"
  on public.cooked_meals for update
  using (
    profile_id in (
      select id from public.profiles where user_id = auth.uid()
    )
  );

create policy "Users can delete their own cooked meals"
  on public.cooked_meals for delete
  using (
    profile_id in (
      select id from public.profiles where user_id = auth.uid()
    )
  );

-- ============================================================================
-- FUNCTIONS AND TRIGGERS
-- ============================================================================

create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = timezone('utc'::text, now());
  return new;
end;
$$ language plpgsql;

create trigger set_updated_at
  before update on public.profiles
  for each row
  execute function public.handle_updated_at();

create trigger set_updated_at
  before update on public.household_members
  for each row
  execute function public.handle_updated_at();

create trigger set_updated_at
  before update on public.pantry_items
  for each row
  execute function public.handle_updated_at();

create trigger set_updated_at
  before update on public.meal_plans
  for each row
  execute function public.handle_updated_at();

create trigger set_updated_at
  before update on public.cooked_meals
  for each row
  execute function public.handle_updated_at();

create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (user_id, email, full_name)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name')
  );
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row
  execute function public.handle_new_user();

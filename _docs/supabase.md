```
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  first_name text,
  last_name text,
  personalization text default 'Koreksi tugas ini dengan karakter dosen yang tegas namun adil...',
  created_at timestamp default now(),
  updated_at timestamp default now()
);

alter table public.profiles enable row level security;
```


```
-- SELECT
create policy "Users can view their profile"
on profiles for select
using (auth.uid() = id);

-- INSERT
create policy "Users can create their profile"
on profiles for insert
with check (auth.uid() = id);

-- UPDATE
create policy "Users can update their profile"
on profiles for update
using (auth.uid() = id);
```
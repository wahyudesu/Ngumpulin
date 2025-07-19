# Tech Stack: 
Next js, Drizzle, Supabase, Flask, Clerk, Shdcn UI

## Start Development
1. Install Dependencies:
   ```bash
   npm install
   ```

2. Setup Environment Variables:
   - Create file `.env`
   - Copy all text in file `.env.example` ke `.env`.
   - Insert environtment on file `.env`.

3. Run NEXT js :a
   ```bash
   npm run dev
   ```

## Structure App Folder
(Main)
1. Landing page -> src/app/(landingpage)/
   
   (Satu set ama componentnya)
2. Project -> src/app/(dashboard)

   (Page setelah login, Punya multiple page)
   
()

3. Auth -> src/app/(auth)/
   
   (Fitur authentifikasinya blom diimplementasi, belakangan, buat mempermudah development, middlewarenya masih txt)
   
4. Student -> src/app/(student)/[nameAssignment]/ Buat upload tugas
   (Not protected Route, Buat siswa bisa upload tugas tanpa perlu login)



## Poin Utama
1. Responsive: Desain yang responsif untuk semua perangkat.
2. Simple: Antarmuka yang sederhana dan mudah digunakan.
3. Smooth: Pengalaman pengguna yang lancar dan nyaman.


## Database
- Skema database berada di `src/server/schema`.
- Untuk mengubah skema database:
   1. Ubah file `schema.ts`.
   2. Generate migrasi:
      ```bash
      npm run db:generate
      ```
   3. Jalankan migrasi:
      ```bash
      npm run db:migrate
      ```

## Component
1. Landing Page:
   - Komponen untuk landing page berada di `src/app/(landingpage)/`.
   - Semua komponen terkait landing page disatukan di sini untuk mempermudah development.

2. Dashboard:
   - Komponen statis untuk dashboard sebagian besar adalah Server Component.
   - Terletak di `components/dashboard`.

3. Shadcn UI:
   - Komponen UI dari Shadcn berada di `components/ui`.

## Interaksi dengan Database Backend
- Folder `src/actions` berisi fungsi-fungsi untuk mengambil dan memanipulasi data dari database.

# SOS — Synergy of Symphony 2026

Website Penerimaan Mahasiswa Baru Departemen Sistem Informasi.

## Daftar Isi

- Tentang Project
- Tech Stack
- Prasyarat
- Memulai
- Environment Variables
- Skrip Tersedia
- Struktur Folder
- Konvensi Coding & Git
- Cara Menambah Fitur Baru
- Quality Gate (Husky)
- Tim

## Tentang Project

Penjelasan SOS, target user (maba SI), modul utama (akademik, aktivitas, peta, STF, profile, admin).

## Tech Stack

Tabel: Next.js 15, React 19, TypeScript 5, Tailwind v4, Radix UI, TanStack Query/Table, Axios, Zod, Framer Motion, Jose (JWT).

## Prasyarat

- Node.js v20+ (LTS)
- npm v10+
- Git, VSCode (recommended)

## Memulai

1. Clone repo
2. Copy `.env.example` → `.env.local`, isi value
3. `npm install`
4. `npm run dev` → http://localhost:3000

## Environment Variables

Tabel: nama | wajib? | deskripsi | contoh.

## Skrip Tersedia

Tabel: dev / build / start / lint.

## Struktur Folder

src/
├── app/ # Next.js App Router (route: (auth), (user), admin)
├── feature/ # Logic per fitur
├── shared/ # Komponen, hooks, context, util lintas fitur
├── api/ # Axios + service layer
├── assets/ # Gambar, font, ikon
├── lib/ # Helper umum
├── styles/ # globals.css
└── middleware.ts # JWT + role-based routing

## Konvensi Coding & Git

- Komponen: PascalCase. Hook: camelCase.
- Branch: feat/, fix/, chore/, docs/, refactor/ + nama (kebab-case).
- Commit: Conventional Commits (di-enforce commitlint).
- PR: minimal 1 reviewer.

## Cara Menambah Fitur Baru

1. Route: src/app/(user)/<fitur>/page.tsx
2. Logic: src/feature/(user)/<fitur>/{components,container,hooks,types}
3. Service: src/api/services/<scope>/<fitur>.ts
4. Asset: src/assets/<fitur>/

## Quality Gate

- pre-commit: tsc --noEmit + lint-staged
- commit-msg: commitlint
- pre-push: npm run build

Jangan pakai --no-verify kalau hook nolak.

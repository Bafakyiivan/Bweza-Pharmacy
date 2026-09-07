# Bweza Pharmacy website

Production-oriented Next.js website for **Bweza Pharmacy / Bweza Medicare Ltd** in Kibuye, Kampala. It supports individual customer enquiries, prescription submissions and corporate procurement requests while keeping unverified business information out of the public content.

## Local setup

1. Install Node.js 20.9 or newer.
2. Run `npm install`.
3. Copy `.env.example` to `.env.local` and enter verified business settings.
4. Run `npm run dev` and open `http://localhost:3000`.

## Required launch configuration

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical production URL |
| `NEXT_PUBLIC_PHONE_NUMBER` | Public phone number, preferably with country code |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Digits-only international WhatsApp number |
| `NEXT_PUBLIC_EMAIL` | Public business email |
| `NEXT_PUBLIC_BUSINESS_HOURS` | Verified opening hours |
| `NEXT_PUBLIC_MAP_EMBED_URL` | Approved Google Maps embed URL |
| `SUPABASE_URL` | Server-side Supabase project URL |
| `SUPABASE_SERVICE_ROLE_KEY` | Server-only key used by the API routes; never expose publicly |
| `SUPABASE_PRESCRIPTIONS_BUCKET` | Private storage bucket; defaults to `prescriptions` |
| `RESEND_API_KEY` | Optional server-only Resend key for staff notifications |
| `INQUIRY_NOTIFICATION_EMAIL` | Private staff inbox that receives notifications |
| `INQUIRY_FROM_EMAIL` | Verified sender, for example `Bweza Website <website@bwezapharmacy.com>` |

Optional analytics variables are documented in `.env.example`. Tracking is disabled when IDs are blank.

## Quality checks

Run `npm run typecheck`, `npm run lint` and `npm run build` before deployment.

## Deployment

The project can be imported into Vercel from GitHub. Add all environment variables in the hosting dashboard, use the default Next.js build settings, then connect `bwezapharmacy.com` after the verified business contacts and privacy workflow have been approved.

## Enquiry backend

Run `supabase/migrations/001_enquiry_backend.sql` in the Supabase SQL editor before enabling forms. It creates enquiry tables with row-level security and a private `prescriptions` bucket. Add the Supabase environment variables in Vercel, then redeploy.

The prescription route validates file type and size, generates an unguessable storage path, stores the file privately and rolls it back if the database record fails. Email notifications never attach prescription files. Before public launch, approve staff access roles and a documented retention/deletion policy.

## Content safeguards

- Product categories do not claim live stock.
- No licenses, partners, corporate clients or testimonials are claimed.
- Missing business details appear as awaiting confirmation.
- Health information is general and does not replace professional assessment.

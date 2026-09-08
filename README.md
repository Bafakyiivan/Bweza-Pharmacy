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
| `RESEND_API_KEY` | Server-only Resend key for staff notifications |
| `INQUIRY_NOTIFICATION_EMAIL` | Staff inbox; defaults to `info@bwezapharmacy.org` |
| `INQUIRY_FROM_EMAIL` | Verified sender; defaults to `Bweza Website <website@bwezapharmacy.org>` |

Optional analytics variables are documented in `.env.example`. Tracking is disabled when IDs are blank.

## Quality checks

Run `npm run typecheck`, `npm run lint` and `npm run build` before deployment.

## Deployment

The project can be imported into Vercel from GitHub. Add all environment variables in the hosting dashboard, use the default Next.js build settings, then connect `bwezapharmacy.org`.

## Enquiry backend

Run `supabase/migrations/001_enquiry_backend.sql` in the Supabase SQL editor before enabling forms. It creates enquiry tables with row-level security and a private `prescriptions` bucket. Add the Supabase environment variables in Vercel, then redeploy.

The application build does not require live Supabase credentials; forms remain safely unavailable until the server-only variables are configured.

The prescription route validates file type and size, generates an unguessable storage path, stores the file privately and rolls it back if the database record fails. Staff notification emails contain only the enquiry type and database reference. Customer contact details, messages and prescription files remain in Supabase and are never included in those emails.

## Staff notification setup

1. Add and verify `bwezapharmacy.org` in Resend.
2. Add `RESEND_API_KEY` to the Vercel Production environment as a Secret.
3. Keep `INQUIRY_NOTIFICATION_EMAIL=info@bwezapharmacy.org`.
4. Use the verified sender `Bweza Website <website@bwezapharmacy.org>`.
5. Redeploy Production and submit a labelled test enquiry.

If email delivery is unavailable, submissions remain stored in Supabase and the form still returns success. Vercel logs record notification configuration or delivery failures without logging customer details.

## Privacy operations

The published privacy notice adopts a 90-day review period for general and corporate website enquiries and a 30-day review period for prescription uploads and their website enquiry records. Authorised staff must routinely review and securely delete expired records and files unless a transaction, dispute or applicable record-keeping obligation requires longer retention.

## Content safeguards

- Product categories do not claim live stock.
- No licenses, partners, corporate clients or testimonials are claimed.
- Missing business details appear as awaiting confirmation.
- Health information is general and does not replace professional assessment.

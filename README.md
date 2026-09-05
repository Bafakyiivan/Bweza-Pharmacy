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
| `CONTACT_WEBHOOK_URL` | Private HTTPS receiver for contact and RFQ forms |
| `PRESCRIPTION_WEBHOOK_URL` | Private HTTPS multipart receiver approved for prescription data |

Optional analytics variables are documented in `.env.example`. Tracking is disabled when IDs are blank.

## Quality checks

Run `npm run typecheck`, `npm run lint` and `npm run build` before deployment.

## Deployment

The project can be imported into Vercel from GitHub. Add all environment variables in the hosting dashboard, use the default Next.js build settings, then connect `bwezapharmacy.com` after the verified business contacts and privacy workflow have been approved.

The prescription route validates file type and size, does not log form contents, and sends files only to an HTTPS server-side destination. The receiving service must still be selected, secured, access-controlled and given an approved retention/deletion policy before launch.

## Content safeguards

- Product categories do not claim live stock.
- No licenses, partners, corporate clients or testimonials are claimed.
- Missing business details appear as awaiting confirmation.
- Health information is general and does not replace professional assessment.

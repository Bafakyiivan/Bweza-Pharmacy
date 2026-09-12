import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Notice",
  description: "How Bweza Pharmacy collects, uses, protects and retains information submitted through its website.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return <>
    <PageHero eyebrow="Privacy" title="How we handle website enquiry information." description="This notice explains how Bweza Medicare Ltd, trading as Bweza Pharmacy, handles information submitted through this website." />
    <section className="section"><div className="container privacy-content">
      <p className="small"><strong>Effective date:</strong> 12 September 2026</p>
      <h2>Who is responsible</h2><p className="lead">Bweza Medicare Ltd, trading as Bweza Pharmacy in Kibuye, Kampala, is responsible for website enquiry information. Privacy questions can be sent to <a href={`mailto:${site.email}`}>{site.email}</a>.</p>
      <h2>Information we collect</h2><p className="lead">We collect information you choose to provide, including your name, contact details, enquiry message and, for corporate enquiries, organisation and supply details. The prescription form may also collect a prescription file and related message.</p>
      <h2>How we use it</h2><p className="lead">We use submitted information to respond to enquiries, clarify requirements, assess prescription requests, provide customer support, prevent misuse and maintain necessary business records. Prescription information is not used for unrelated advertising.</p>
      <h2>General and corporate enquiries</h2><p className="lead">The general enquiry and corporate quotation form is provided through Google Forms. Responses may be stored in Google Forms and a linked Google Sheet that authorised Bweza Pharmacy staff use to respond and manage enquiries. Do not submit sensitive health information through that form.</p>
      <h2>Prescription information</h2><p className="lead">Prescription files submitted through the prescription page are stored in a private Supabase storage area. They are not publicly accessible or attached to staff notification emails. Do not upload identity documents, payment information or unrelated medical records.</p>
      <h2>Hosting, analytics and service providers</h2><p className="lead">Vercel hosts the website, Supabase provides private prescription storage, and Google provides the general and corporate enquiry form. If enabled, Google Analytics and Meta may process limited website interaction information, such as pages visited and button clicks. These services may process information outside Uganda.</p>
      <h2>Retention and access</h2><p className="lead">Access is limited to authorised staff who need the information to respond. General and corporate enquiries are normally reviewed for deletion after 90 days. Prescription uploads and their enquiry records are normally reviewed for deletion after 30 days, unless a longer period is reasonably required for a transaction, dispute or applicable record-keeping obligation.</p>
      <h2>Your choices</h2><p className="lead">You may ask whether we hold information you submitted and request access, correction or deletion where appropriate. Email <a href={`mailto:${site.email}?subject=Privacy%20request`}>{site.email}</a>. We may request reasonable information to locate the relevant submission.</p>
      <h2>Security and updates</h2><p className="lead">We use encrypted connections, input validation, access controls and private file storage to reduce risk. No online service can guarantee absolute security. This notice may be updated when website practices or service providers change.</p>
    </div></section>
  </>;
}

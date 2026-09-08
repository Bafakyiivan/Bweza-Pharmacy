import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Notice",
  description: "How Bweza Pharmacy collects, uses, protects and retains information submitted through its website.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        eyebrow="Privacy"
        title="How we handle website enquiry information."
        description="This notice explains how Bweza Medicare Ltd, trading as Bweza Pharmacy, handles information submitted through this website."
      />
      <section className="section">
        <div className="container" style={{ maxWidth: 820 }}>
          <p className="small"><strong>Effective date:</strong> 8 September 2026</p>

          <h2>Who is responsible</h2>
          <p className="lead">
            Bweza Medicare Ltd, trading as Bweza Pharmacy in Kibuye, Kampala, is responsible for website enquiry information. Privacy questions and requests can be sent to{" "}
            <a href={`mailto:${site.email}`} style={{ color: "var(--green)", fontWeight: 800 }}>{site.email}</a>.
          </p>

          <h2>Information we collect</h2>
          <p className="lead">
            We collect information you choose to provide, including your name, phone number, email address, enquiry message and, for corporate enquiries, organisation and supply details. The prescription form may also collect a prescription file and related message.
          </p>
          <p className="lead">
            Our hosting and security services may process limited technical information, such as request time, browser information and network identifiers, to deliver and protect the website.
          </p>

          <h2>How we use it</h2>
          <p className="lead">
            We use submitted information to review and respond to enquiries, clarify product or supply requirements, assess prescription requests, provide customer support, prevent misuse and maintain necessary business records. We do not use a prescription upload for unrelated advertising.
          </p>

          <h2>Prescription information</h2>
          <p className="lead">
            Use the prescription form only for information needed by the pharmacy team. Do not upload identity documents or unrelated medical records. Prescription files are stored in a private area and are not attached to staff notification emails. This form is not for emergencies and does not guarantee supply or dispensing.
          </p>

          <h2>Service providers and access</h2>
          <p className="lead">
            The website uses Vercel for hosting and Supabase for private enquiry storage. Resend may be used to notify authorised pharmacy staff by email. These providers may process information outside Uganda as part of delivering their services. Access should be limited to authorised staff who need the information to respond.
          </p>

          <h2>Retention</h2>
          <p className="lead">
            General and corporate website enquiries are normally reviewed for deletion after 90 days. Uploaded prescription files and their website enquiry records are normally reviewed for deletion after 30 days. Relevant information may be retained for longer when an enquiry becomes a transaction, a dispute must be resolved, or applicable record-keeping obligations require it.
          </p>

          <h2>Your choices</h2>
          <p className="lead">
            You may ask whether we hold information submitted through the website and request access, correction or deletion where appropriate. Send the request to{" "}
            <a href={`mailto:${site.email}?subject=Privacy%20request`} style={{ color: "var(--green)", fontWeight: 800 }}>{site.email}</a>. We may need reasonable information to identify the relevant submission before acting on a request.
          </p>

          <h2>Security and changes</h2>
          <p className="lead">
            We use access controls, private file storage, encrypted connections and input validation to reduce risk. No online service can guarantee absolute security. We may update this notice when website practices or service providers change and will publish the revised effective date here.
          </p>
        </div>
      </section>
    </>
  );
}

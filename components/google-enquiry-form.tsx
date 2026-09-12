const googleFormUrl =
  "https://docs.google.com/forms/d/e/1FAIpQLSdh7FiyAl5KVgQ0VZUR6DDiYLSMx7biB4twGObXaemJ9kp6Ag/viewform";

export function GoogleEnquiryForm({ context = "general" }: { context?: "general" | "corporate" }) {
  const isCorporate = context === "corporate";
  return (
    <div className="google-form-card">
      <div className="google-form-intro">
        <div>
          <strong>{isCorporate ? "Corporate quotation form" : "Online enquiry form"}</strong>
          <p>{isCorporate ? "Select Corporate Quotation Request when the form opens." : "Choose General Enquiry or Corporate Quotation Request to continue."}</p>
        </div>
        <a
          className="button button-secondary"
          href={googleFormUrl}
          target="_blank"
          rel="noreferrer"
          data-conversion="enquiry_form_open"
          data-intent={isCorporate ? "corporate_quotation" : "general_enquiry"}
          data-location="google_form_card"
        >
          Open in a new tab
        </a>
      </div>
      <iframe
        className="google-form-frame"
        src={`${googleFormUrl}?embedded=true`}
        title="Bweza Pharmacy online enquiry and corporate quotation form"
        loading="lazy"
      />
      <p className="google-form-fallback">
        If the form does not appear, use the “Open in a new tab” button above.
      </p>
    </div>
  );
}

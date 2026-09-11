const googleFormUrl =
  "https://docs.google.com/forms/d/e/1FAIpQLSdh7FiyAl5KVgQ0VZUR6DDiYLSMx7biB4twGObXaemJ9kp6Ag/viewform";

export function GoogleEnquiryForm() {
  return (
    <div className="google-form-card">
      <div className="google-form-intro">
        <div>
          <strong>Online enquiry form</strong>
          <p>Choose General Enquiry or Corporate Quotation Request to continue.</p>
        </div>
        <a
          className="button button-secondary"
          href={googleFormUrl}
          target="_blank"
          rel="noreferrer"
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

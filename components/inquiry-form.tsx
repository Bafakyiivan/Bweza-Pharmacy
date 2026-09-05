"use client";

import { FormEvent, useState } from "react";

type Kind = "contact" | "corporate" | "prescription";

export function InquiryForm({ kind }: { kind: Kind }) {
  const [status, setStatus] = useState<"idle"|"sending"|"success"|"error">("idle");
  const [message, setMessage] = useState("");
  const isRx = kind === "prescription";
  const isCorporate = kind === "corporate";

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault(); setStatus("sending"); setMessage("");
    const form = e.currentTarget;
    try {
      const response = await fetch(isRx ? "/api/prescription" : "/api/contact", { method: "POST", body: new FormData(form) });
      const data = await response.json() as { message?: string };
      if (!response.ok) throw new Error(data.message || "We could not send your enquiry.");
      setStatus("success"); setMessage(data.message || "Thank you. Your enquiry has been received."); form.reset();
    } catch (error) { setStatus("error"); setMessage(error instanceof Error ? error.message : "We could not send your enquiry."); }
  }

  return <form className="form-card" onSubmit={submit} noValidate><div className="form-grid">
    <div className="field"><label htmlFor={`${kind}-name`}>{isCorporate ? "Contact person" : "Full name"}</label><input id={`${kind}-name`} name="name" autoComplete="name" minLength={2} maxLength={100} required /></div>
    {isCorporate ? <div className="field"><label htmlFor="organisation">Organisation</label><input id="organisation" name="organisation" maxLength={140} required /></div> : null}
    <div className="field"><label htmlFor={`${kind}-phone`}>Phone / WhatsApp</label><input id={`${kind}-phone`} name="phone" type="tel" autoComplete="tel" inputMode="tel" maxLength={30} required /></div>
    <div className="field"><label htmlFor={`${kind}-email`}>Email {isRx ? "(optional)" : ""}</label><input id={`${kind}-email`} name="email" type="email" autoComplete="email" maxLength={160} required={!isRx} /></div>
    {isCorporate ? <><div className="field"><label htmlFor="sector">Organisation type</label><select id="sector" name="sector" required defaultValue=""><option value="" disabled>Select one</option><option>Company</option><option>Clinic or health facility</option><option>NGO</option><option>School</option><option>Construction company</option><option>Oil and gas contractor</option><option>Other organisation</option></select></div><div className="field"><label htmlFor="deadline">Required by (optional)</label><input id="deadline" name="deadline" type="date" /></div></> : null}
    {isRx ? <div className="field field-full"><label htmlFor="prescription">Prescription file</label><input id="prescription" name="prescription" type="file" accept="image/jpeg,image/png,application/pdf" required /><span className="field-help">JPEG, PNG or PDF only. Maximum 5 MB. Do not upload identity documents or unrelated medical records.</span></div> : null}
    <div className="field field-full"><label htmlFor={`${kind}-message`}>{isCorporate ? "Supply requirements" : isRx ? "Additional information (optional)" : "How can we help?"}</label><textarea id={`${kind}-message`} name="message" maxLength={2000} required={!isRx} placeholder={isCorporate ? "Describe items, quantities, preferred brands/specifications and delivery location." : undefined} /></div>
    <div aria-hidden="true" style={{position:"absolute",left:"-9999px"}}><label htmlFor={`${kind}-website`}>Website</label><input id={`${kind}-website`} name="website" tabIndex={-1} autoComplete="off" /></div>
    {isRx ? <label className="checkbox field-full"><input name="consent" type="checkbox" value="yes" required /><span>I consent to Bweza Pharmacy using the information and prescription I submit to respond to this enquiry. I understand this form is not for emergencies.</span></label> : null}
    <input type="hidden" name="kind" value={kind} />
    <div className="field-full"><button className="button" type="submit" disabled={status === "sending"}>{status === "sending" ? "Sending…" : isCorporate ? "Request a quotation" : isRx ? "Send prescription inquiry" : "Send enquiry"}</button>{status !== "idle" && message ? <div className={`status status-${status === "success" ? "success" : "error"}`} role="status">{message}</div> : null}</div>
  </div></form>;
}

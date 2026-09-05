import Link from "next/link";

export function PageHero({ title, description, eyebrow }: { title: string; description: string; eyebrow: string }) {
  return <section className="page-hero"><div className="container"><div className="breadcrumbs"><Link href="/">Home</Link> / {eyebrow}</div><p className="eyebrow">{eyebrow}</p><h1 className="heading">{title}</h1><p className="lead">{description}</p></div></section>;
}

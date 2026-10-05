import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CtaBand } from "@/components/cta-band";
import { blogPosts, formatBlogDate, getBlogPost } from "@/lib/blog";
import { site } from "@/lib/site";

type BlogPostPageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};
  const path = `/blog/${post.slug}`;

  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: path },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      url: path,
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      images: [{ url: post.image, alt: post.imageAlt }]
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [post.image]
    }
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    image: `${site.url}${post.image}`,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    author: { "@type": "Organization", name: site.name, url: site.url },
    publisher: {
      "@type": "Organization",
      name: site.name,
      logo: { "@type": "ImageObject", url: `${site.url}/images/bweza-logo.jpg` }
    },
    mainEntityOfPage: `${site.url}/blog/${post.slug}`
  };

  return (
    <>
      <article className="blog-article">
        <header className="blog-article-header">
          <div className="container blog-article-heading">
            <nav className="breadcrumbs" aria-label="Breadcrumb">
              <Link href="/">Home</Link> / <Link href="/blog">Health guides</Link>
            </nav>
            <p className="eyebrow">{post.category}</p>
            <h1 className="display">{post.title}</h1>
            <p className="lead">{post.description}</p>
            <div className="blog-byline">
              <span>Prepared by Bweza Pharmacy</span>
              <time dateTime={post.publishedAt}>{formatBlogDate(post.publishedAt)}</time>
              <span>{post.readTime}</span>
            </div>
          </div>
        </header>

        <div className="container blog-article-layout">
          <div className="blog-article-main">
            <div className={`blog-article-image${["ebola-update-uganda-outbreak-status", "understanding-high-blood-pressure", "how-to-use-medicines-safely", "know-your-blood-sugar-and-diabetes-risk"].includes(post.slug) ? " blog-article-image-poster" : ""}`}>
              <Image src={post.image} alt={post.imageAlt} fill priority sizes="(max-width: 900px) 100vw, 760px" />
            </div>

            <div className="notice blog-disclaimer">
              <strong>Important:</strong> This article provides general health education. It is not a diagnosis, prescription or substitute for care from a qualified health professional.
            </div>

            {post.sections.map((section) => (
              <section className="blog-section" key={section.heading}>
                <h2>{section.heading}</h2>
                {section.paragraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                {section.bullets && <ul>{section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>}
                {section.callout && <aside className="blog-callout">{section.callout}</aside>}
              </section>
            ))}

            <section className="blog-sources" aria-labelledby="sources-heading">
              <h2 id="sources-heading">Trusted sources</h2>
              <ul>{post.sources.map((source) => <li key={source.url}><a href={source.url} target="_blank" rel="noreferrer">{source.label}</a></li>)}</ul>
            </section>

            <div className="blog-article-footer">
              <Link className="button button-secondary" href="/blog">← All health guides</Link>
              <Link className="button" href="/contact">Contact the pharmacy</Link>
            </div>
          </div>
        </div>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema).replace(/</g, "\\u003c") }} />
      </article>
      <CtaBand />
    </>
  );
}

import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { BlogCard } from "@/components/blog-card";
import { blogPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Health Guides",
  description: "Clear, practical health and medicine-safety guides from Bweza Pharmacy in Kibuye, Kampala.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Health Guides | Bweza Pharmacy",
    description: "Clear, practical health and medicine-safety guides from Bweza Pharmacy.",
    url: "/blog",
    images: [{ url: "/images/pharmacy-counter.jpg", alt: "Bweza Pharmacy team in Kibuye, Kampala" }]
  },
  twitter: {
    card: "summary_large_image",
    title: "Health Guides | Bweza Pharmacy",
    description: "Clear, practical health and medicine-safety guides from Bweza Pharmacy.",
    images: ["/images/pharmacy-counter.jpg"]
  }
};

export default function BlogPage() {
  return (
    <>
      <PageHero
        eyebrow="Health guides"
        title="Practical information for everyday health."
        description="Short, clear guides on prevention, medicine safety and when to seek professional care."
      />
      <section className="section">
        <div className="container">
          <div className="notice blog-disclaimer">
            <strong>Health information only.</strong> These guides do not diagnose illness or replace advice from a doctor, pharmacist or other qualified health professional.
          </div>
          <div className="blog-grid">
            {blogPosts.map((post) => <BlogCard post={post} key={post.slug} />)}
          </div>
        </div>
      </section>
    </>
  );
}

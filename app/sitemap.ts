import type { MetadataRoute } from "next";
import { blogPosts } from "@/lib/blog";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const mainRoutes = ["", "/products", "/services", "/prescription", "/corporate", "/about", "/contact", "/blog", "/privacy"].map((path) => ({
    url: `${site.url}${path}`,
    changeFrequency: path === "" || path === "/blog" ? "weekly" as const : "monthly" as const,
    priority: path === "" ? 1 : path === "/privacy" ? 0.3 : 0.8
  }));

  const articleRoutes = blogPosts.map((post) => ({
    url: `${site.url}/blog/${post.slug}`,
    lastModified: post.updatedAt,
    changeFrequency: "monthly" as const,
    priority: 0.7
  }));

  return [...mainRoutes, ...articleRoutes];
}

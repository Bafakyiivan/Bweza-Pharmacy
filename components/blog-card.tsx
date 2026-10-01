import Image from "next/image";
import Link from "next/link";
import type { BlogPost } from "@/lib/blog";
import { formatBlogDate } from "@/lib/blog";

export function BlogCard({ post }: { post: BlogPost }) {
  return (
    <article className="blog-card">
      <Link className={`blog-card-image${["understanding-high-blood-pressure", "know-your-blood-sugar-and-diabetes-risk"].includes(post.slug) ? " blog-card-image-poster" : ""}`} href={`/blog/${post.slug}`} aria-label={`Read ${post.title}`}>
        <Image src={post.image} alt={post.imageAlt} fill sizes="(max-width: 680px) 100vw, (max-width: 1000px) 50vw, 33vw" />
      </Link>
      <div className="blog-card-body">
        <div className="blog-meta"><span>{post.category}</span><time dateTime={post.publishedAt}>{formatBlogDate(post.publishedAt)}</time></div>
        <h2><Link href={`/blog/${post.slug}`}>{post.title}</Link></h2>
        <p>{post.description}</p>
        <Link className="card-link" href={`/blog/${post.slug}`}>Read health guide →</Link>
      </div>
    </article>
  );
}

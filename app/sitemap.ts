import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap { return ["","/products","/services","/screening","/prescription","/corporate","/about","/contact","/privacy"].map(path=>({url:`${site.url}${path}`,changeFrequency:path===""?"weekly":"monthly",priority:path===""?1:path==="/privacy"?.3:.8})); }

import { useEffect } from "react";

interface SEOOptions {
  title: string;
  description: string;
  canonicalPath: string; // e.g. "/blog/my-post"
  keywords?: string[];
  jsonLd?: object;
  image?: string;
}

const SITE_URL = "https://www.zeeonix.com";
const DEFAULT_IMAGE = `${SITE_URL}/og-image.jpg`;

function setMeta(attr: "name" | "property", key: string, content: string) {
  let el = document.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

/**
 * useSEO — updates document title, meta description/keywords, canonical link,
 * Open Graph / Twitter tags, and an optional JSON-LD block for the current route.
 * Runs client-side; Googlebot renders JS so this is crawlable, but a host
 * with SSR/prerendering would be even stronger for indexing.
 */
export function useSEO({ title, description, canonicalPath, keywords, jsonLd, image }: SEOOptions) {
  useEffect(() => {
    document.title = title;
    setMeta("name", "description", description);
    if (keywords?.length) setMeta("name", "keywords", keywords.join(", "));

    const canonicalUrl = `${SITE_URL}${canonicalPath}`;
    let link = document.querySelector('link[rel="canonical"]');
    if (!link) {
      link = document.createElement("link");
      link.setAttribute("rel", "canonical");
      document.head.appendChild(link);
    }
    link.setAttribute("href", canonicalUrl);

    setMeta("property", "og:title", title);
    setMeta("property", "og:description", description);
    setMeta("property", "og:url", canonicalUrl);
    setMeta("property", "og:image", image || DEFAULT_IMAGE);
    setMeta("name", "twitter:title", title);
    setMeta("name", "twitter:description", description);
    setMeta("name", "twitter:image", image || DEFAULT_IMAGE);

    let script = document.getElementById("page-jsonld") as HTMLScriptElement | null;
    if (jsonLd) {
      if (!script) {
        script = document.createElement("script");
        script.id = "page-jsonld";
        script.type = "application/ld+json";
        document.head.appendChild(script);
      }
      script.textContent = JSON.stringify(jsonLd);
    } else if (script) {
      script.remove();
    }

    return () => {
      // Leave tags in place between route changes; next page overwrites them.
    };
  }, [title, description, canonicalPath, keywords, jsonLd, image]);
}

import { useParams, Link, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, Calendar, ArrowRight } from "lucide-react";
import { getPostBySlug, getRelatedPosts } from "../data/blogPosts";
import { useSEO } from "../hooks/useSEO";

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getPostBySlug(slug) : undefined;

  // Hooks must run unconditionally — guard inside with a fallback object.
  useSEO({
    title: post ? post.metaTitle : "Post Not Found | Zeeonix Digital",
    description: post ? post.metaDescription : "This blog post could not be found.",
    canonicalPath: `/blog/${slug || ""}`,
    keywords: post?.keywords,
    jsonLd: post
      ? {
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: post.title,
          description: post.metaDescription,
          datePublished: post.date,
          author: { "@type": "Organization", name: "Zeeonix Digital" },
          publisher: { "@type": "Organization", name: "Zeeonix Digital" },
          mainEntityOfPage: `https://www.zeeonix.com/blog/${post.slug}`,
        }
      : undefined,
  });

  if (!post) return <Navigate to="/blog" replace />;

  const related = getRelatedPosts(post.slug, 3);

  return (
    <main className="relative pt-32 pb-24 min-h-screen">
      <div className="absolute inset-0 bg-[#06060e] bg-grid" />
      <div className="absolute top-1/3 -right-20 w-80 h-80 rounded-full bg-cyan-500/10 blur-[140px]" />

      <article className="relative z-10 mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-brand-400 transition-colors mb-8"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Blog
          </Link>

          <span className="inline-block text-sm font-semibold text-cyan-400 uppercase tracking-widest mb-3">
            {post.category}
          </span>
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight">
            {post.title}
          </h1>

          <div className="mt-5 flex items-center gap-5 text-sm text-zinc-500">
            <span className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4" />
              {new Date(post.date).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="h-4 w-4" />
              {post.readTime}
            </span>
          </div>

          <div className={`mt-8 h-48 sm:h-64 rounded-2xl bg-gradient-to-br ${post.coverGradient}`} />

          <div className="mt-10 space-y-9">
            {post.sections.map((section, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5 }}
              >
                {section.heading && (
                  <h2 className="text-xl sm:text-2xl font-bold font-display text-white mb-4">
                    {section.heading}
                  </h2>
                )}
                {section.paragraphs?.map((p, pi) => (
                  <p key={pi} className="text-zinc-400 leading-relaxed mb-4">
                    {p}
                  </p>
                ))}
                {section.list && (
                  <ul className="space-y-2.5 mt-2">
                    {section.list.map((item, li) => (
                      <li key={li} className="flex items-start gap-3 text-zinc-400 leading-relaxed">
                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-brand-500 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-14 rounded-2xl glass p-8 text-center">
            <h3 className="text-xl font-bold text-white font-display mb-2">
              Ready to grow your business online?
            </h3>
            <p className="text-zinc-400 mb-6">
              Get a free consultation for your business — wherever you are, no pressure, no commitment.
            </p>
            <Link
              to="/#contact"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-brand-500 to-brand-700 px-6 py-3 text-sm font-semibold text-white neon-glow hover:from-brand-400 hover:to-brand-600 transition-all duration-300"
            >
              Get a Free Quote <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Related posts */}
          {related.length > 0 && (
            <div className="mt-16">
              <h3 className="text-lg font-bold text-white font-display mb-5">More from the blog</h3>
              <div className="grid sm:grid-cols-3 gap-4">
                {related.map((r) => (
                  <Link
                    key={r.slug}
                    to={`/blog/${r.slug}`}
                    className="rounded-xl glass-light p-4 hover:bg-white/[0.06] transition-colors"
                  >
                    <span className="text-xs text-cyan-400 uppercase tracking-wide">{r.category}</span>
                    <p className="text-sm text-white font-medium mt-1 leading-snug line-clamp-2">{r.title}</p>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </article>
    </main>
  );
}

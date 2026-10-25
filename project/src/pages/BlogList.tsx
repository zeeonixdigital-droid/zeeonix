import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Clock } from "lucide-react";
import { blogPosts } from "../data/blogPosts";
import { useSEO } from "../hooks/useSEO";

export default function BlogList() {
  useSEO({
    title: "Blog — Web Design, SEO & Digital Marketing Insights | Zeeonix Digital",
    description:
      "Practical guides on web design, local SEO, app development & digital marketing for businesses in Faridabad, Ballabgarh, Palwal and the NCR.",
    canonicalPath: "/blog",
    keywords: ["Faridabad digital marketing blog", "web design tips Faridabad", "SEO blog Faridabad"],
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "Blog",
      name: "Zeeonix Digital Blog",
      url: "https://www.zeeonix.com/blog",
      publisher: { "@type": "Organization", name: "Zeeonix Digital" },
    },
  });

  return (
    <main className="relative pt-32 pb-24 min-h-screen">
      <div className="absolute inset-0 bg-[#06060e] bg-grid" />
      <div className="absolute top-1/4 -left-20 w-72 h-72 rounded-full bg-brand-500/15 blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="inline-block text-sm font-semibold text-cyan-400 uppercase tracking-widest mb-3">
            Insights
          </span>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-white tracking-tight">
            The Zeeonix <span className="gradient-text">Blog</span>
          </h1>
          <p className="mt-4 text-lg text-zinc-400">
            Straight-talk guides on web design, SEO, apps, and digital
            marketing — written for business owners in Faridabad & the NCR.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.map((post, i) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
            >
              <Link
                to={`/blog/${post.slug}`}
                className="group block h-full rounded-2xl glass-light overflow-hidden hover:border-brand-500/30 hover:bg-white/[0.06] transition-all duration-300"
              >
                <div className={`h-36 bg-gradient-to-br ${post.coverGradient} relative flex items-end p-5`}>
                  <span className="text-xs font-semibold uppercase tracking-wider text-white/90 bg-black/30 rounded-full px-3 py-1">
                    {post.category}
                  </span>
                </div>
                <div className="p-6">
                  <h2 className="text-lg font-bold text-white font-display leading-snug group-hover:text-brand-300 transition-colors">
                    {post.title}
                  </h2>
                  <p className="mt-3 text-sm text-zinc-400 leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="mt-5 flex items-center justify-between text-xs text-zinc-500">
                    <span className="flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5" />
                      {post.readTime}
                    </span>
                    <span className="flex items-center gap-1 text-brand-400 font-medium group-hover:gap-2 transition-all">
                      Read <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}

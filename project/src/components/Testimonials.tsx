import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { getStaticTestimonials, type TestimonialData } from "../lib/db";

export default function Testimonials() {
  const [testimonials] = useState<TestimonialData[]>(getStaticTestimonials());
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);

  const next = useCallback(() => {
    setDirection(1);
    setCurrent((c) => (c + 1) % testimonials.length);
  }, []);

  const prev = useCallback(() => {
    setDirection(-1);
    setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);
  }, []);

  // Auto-rotate every 6 seconds
  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next]);

  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? 200 : -200, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -200 : 200, opacity: 0 }),
  };

  return (
    <section id="testimonials" className="relative py-24 sm:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-[#06060e]" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-500/20 to-transparent" />

      <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <span className="inline-block text-sm font-semibold text-brand-400 uppercase tracking-widest mb-3">
            Client Love
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white">
            Trusted by{" "}
            <span className="gradient-text">Industry Leaders</span>
          </h2>
        </motion.div>

        {/* Testimonial Card */}
        <div className="relative">
          <div className="glass rounded-3xl p-8 sm:p-12 text-center shimmer-border">
            <Quote className="h-8 w-8 text-brand-400/40 mx-auto mb-6" />

            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={current}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4, ease: "easeInOut" as const }}
              >
                <p className="text-lg sm:text-xl text-zinc-200 leading-relaxed max-w-2xl mx-auto mb-8">
                  "{testimonials[current].content}"
                </p>

                <div className="flex items-center justify-center gap-3 mb-2">
                  <img
                    src={testimonials[current].avatar}
                    alt={testimonials[current].name}
                    className="h-12 w-12 rounded-full object-cover border-2 border-brand-500/30"
                    loading="lazy"
                  />
                  <div className="text-left">
                    <div className="font-semibold text-white">
                      {testimonials[current].name}
                    </div>
                    <div className="text-sm text-zinc-400">
                      {testimonials[current].role}
                    </div>
                  </div>
                </div>

                {/* Stars */}
                <div className="flex items-center justify-center gap-1">
                  {Array.from({ length: testimonials[current].rating }).map(
                    (_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 fill-amber-400 text-amber-400"
                      />
                    )
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prev}
            className="absolute top-1/2 -left-4 -translate-y-1/2 h-10 w-10 rounded-full glass-light flex items-center justify-center text-zinc-300 hover:text-white hover:border-white/20 transition-all"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={next}
            className="absolute top-1/2 -right-4 -translate-y-1/2 h-10 w-10 rounded-full glass-light flex items-center justify-center text-zinc-300 hover:text-white hover:border-white/20 transition-all"
            aria-label="Next testimonial"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        {/* Dots */}
        <div className="flex items-center justify-center gap-2 mt-8">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setDirection(i > current ? 1 : -1);
                setCurrent(i);
              }}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === current
                  ? "w-8 bg-gradient-to-r from-brand-400 to-brand-600"
                  : "w-2 bg-zinc-600 hover:bg-zinc-500"
              }`}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

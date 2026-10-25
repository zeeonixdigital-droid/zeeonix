import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Hero from "../components/Hero";
import Services from "../components/Services";
import ServiceBlog from "../components/ServiceBlog";
import Portfolio from "../components/Portfolio";
import WhyUs from "../components/WhyUs";
import ServiceAreas from "../components/ServiceAreas";
import Testimonials from "../components/Testimonials";
import Pricing from "../components/Pricing";
import FAQ from "../components/FAQ";
import CTABanner from "../components/CTABanner";
import Contact from "../components/Contact";
import { useSEO } from "../hooks/useSEO";

export default function Home() {
  const location = useLocation();

  useSEO({
    title: "Web Design & Digital Marketing Agency in Faridabad | Zeeonix Digital",
    description:
      "Zeeonix Digital is a premium web design, app development & SEO agency in Faridabad, serving Faridabad, Ballabgarh, Palwal, South Delhi, Noida, Greater Noida & Gurugram.",
    canonicalPath: "/",
    keywords: [
      "web design agency Faridabad",
      "digital marketing agency Faridabad",
      "SEO company Faridabad",
      "app development Faridabad",
    ],
  });

  // If we arrived here with a #section hash (e.g. from the blog via "/#contact"),
  // scroll to that section once the page has rendered.
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace("#", "");
      const el = document.getElementById(id);
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: "smooth" }), 60);
      }
    }
  }, [location.hash]);

  return (
    <main>
      {/* 1. Hero — big headline + CTA + animated background */}
      <Hero />

      {/* 2. Services — cards with hover animations */}
      <Services />

      {/* 2.5 AI Services Blog — detailed SEO content */}
      <ServiceBlog />

      {/* 3. CTA Banner between sections */}
      <CTABanner />

      {/* 4. Portfolio — project showcase */}
      <Portfolio />

      {/* 5. Why Choose Us — trust + benefits */}
      <WhyUs />

      {/* 5.5 Service Areas — Local SEO / GEO targeting Faridabad + 50km radius */}
      <ServiceAreas />

      {/* 6. Testimonials — client reviews carousel */}
      <Testimonials />

      {/* 7. Pricing — Basic / Pro / Premium */}
      <Pricing />

      {/* 7.5 FAQ — Answer Engine Optimization (AEO) */}
      <FAQ />

      {/* 8. CTA Banner before contact */}
      <CTABanner
        title="Let's Build Your Digital Empire"
        subtitle="Fill out the form below and we'll send you a custom proposal within 2 hours. No pressure, no commitment."
        buttonText="Get Free Proposal →"
      />

      {/* 9. Contact — form + WhatsApp button */}
      <Contact />
    </main>
  );
}

"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const slides = [
  {
    eyebrow: "SERVICES",
    title: "Build your team's capabilities",
    desc:
      "Comprehensive learning programmes designed for regulated environments, enabling operational excellence across quality, compliance, manufacturing and leadership functions.",
    link: "Explore Training",
    image: "/pis1.png",
  },
  {
    eyebrow: "CONSULTING",
    title: "Discover your pathway",
    desc:
      "Strategic advisory and operational consulting tailored to life sciences organisations navigating growth, transformation and regulatory complexity.",
    link: "Explore Consulting",
    image: "/pis2.png",
  },
  {
    eyebrow: "AUDITS",
    title: "Strengthen inspection readiness",
    desc:
      "Global audit programmes and mock inspections built around real-world regulatory expectations and sustainable compliance frameworks.",
    link: "Explore Audits",
    image: "/pis1.png",
  },
  {
    eyebrow: "TRAINING",
    title: "Develop your team's expertise",
    desc:
      "Targeted training solutions designed for life sciences professionals, ensuring compliance and operational excellence across all functions.",
    link: "Explore Training",
    image: "/pis2.png",
  },
];

export default function AnimatedPathwaysSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const prevSection = section.previousElementSibling as HTMLElement | null;

    const ctx = gsap.context(() => {
      const panels = gsap.utils.toArray<HTMLElement>("[data-pathway-panel]");

      panels.forEach((panel, index) => {
        gsap.set(panel, {
          autoAlpha: index === 0 ? 1 : 0,
          y: index === 0 ? 0 : 90,
          scale: index === 0 ? 1 : 1.02,
          filter: index === 0 ? "blur(0px)" : "blur(6px)",
          force3D: true,
        });
      });

      // -----------------------------
      // PREVIOUS SECTION EFFECT
      // -----------------------------
      ScrollTrigger.create({
        trigger: section,
        start: "top 70%",
        end: "bottom top",

        onEnter: () => {
          if (!prevSection) return;

          gsap.to(prevSection, {
            scale: 0.97,
            filter: "blur(8px)",
            opacity: 0.75,
            duration: 0.7,
            ease: "power3.out",
          });
        },

        onLeaveBack: () => {
          if (!prevSection) return;

          gsap.to(prevSection, {
            scale: 1,
            filter: "blur(0px)",
            opacity: 1,
            duration: 0.7,
            ease: "power3.out",
          });
        },
      });

      // -----------------------------
      // MAIN TIMELINE
      // -----------------------------
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: `+=${slides.length * 1300}`,
          scrub: 1.6,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
        },
      });

      panels.forEach((panel, index) => {
        if (index === panels.length - 1) return;

        const next = panels[index + 1];
        const step = index * 1.1;

        tl.to(
          panel,
          {
            y: -120,
            scale: 0.88,
            autoAlpha: 0,
            filter: "blur(8px)",
            ease: "power3.out",
          },
          step
        );

        tl.to(
          next,
          {
            y: 0,
            scale: 1,
            autoAlpha: 1,
            filter: "blur(0px)",
            ease: "power3.out",
          },
          step + 0.2
        );
      });

      ScrollTrigger.refresh();
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* GLOBAL GREY BACKGROUND (VISIBLE OUTSIDE ANIMATION) */}
      <div className="fixed inset-0 -z-10 bg-[#070b10]" />

      <section
        ref={sectionRef}
        className="relative w-full min-h-screen overflow-hidden text-white"
      >
        {/* BACKGROUND LAYERS (FIXED) */}
        <div className="absolute inset-0 bg-[rgb(14,19,26)]" />

        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_50%,rgba(56,189,248,0.08),transparent_55%)]" />

        {/* PADDED FRAME (THIS IS THE KEY FIX) */}
        <div className="relative h-full w-full px-[120px]">
          {slides.map((slide) => (
            <article
              key={slide.title}
              data-pathway-panel
              className="
                absolute
                left-[120px] right-[120px]
                top-1/2
                -translate-y-1/2
                grid
                grid-cols-1
                gap-16
                lg:grid-cols-2
                items-center
              "
            >
              {/* LEFT */}
              <div className="max-w-[900px]">
                <p className="mb-6 text-[18px] tracking-wide text-white/40">
                  {slide.eyebrow}
                </p>

                <h2 className="text-[42px] font-light leading-tight">
                  {slide.title}
                </h2>

                <p className="mt-6 text-[16px] leading-7 text-white/60">
                  {slide.desc}
                </p>

                <a
                  href="#"
                  className="mt-10 inline-block text-white/90 hover:text-white transition"
                >
                  {slide.link} →
                </a>
              </div>

              {/* RIGHT */}
              <div className="relative h-[700px] w-[700px] overflow-hidden border border-white/10 bg-black/40">
  <Image
    src={slide.image}
    alt={slide.title}
    fill
    className="object-cover object-[95%_50%]"
  />

                <div className="absolute inset-0 bg-gradient-to-tr from-black/80 via-transparent to-cyan-300/10" />
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
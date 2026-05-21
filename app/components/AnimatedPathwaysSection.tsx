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
  }
];

export default function AnimatedPathwaysSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      const panels = gsap.utils.toArray<HTMLElement>(
        "[data-pathway-panel]"
      );

      // -----------------------------
      // INITIAL STATES
      // -----------------------------
      panels.forEach((panel, index) => {
        gsap.set(panel, {
          autoAlpha: index === 0 ? 1 : 0,
          y: index === 0 ? 0 : 140,
          scale: index === 0 ? 1 : 1.03,
          filter: index === 0 ? "blur(0px)" : "blur(10px)",
          willChange: "transform, opacity, filter",
          force3D: true,
        });
      });

      if (reduceMotion) return;

      // -----------------------------
      // MASTER TIMELINE
      // -----------------------------
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,

          // animation starts ONLY when section fully reaches viewport
          start: "top top",

          // enough scroll distance for all slides
          end: `+=${slides.length * 1400}`,

          scrub: 1.2,
          pin: true,
  pinSpacing: true,


          invalidateOnRefresh: true,

          fastScrollEnd: true,

          anticipatePin: 1,
        },
      });

      // -----------------------------
      // PANEL ANIMATIONS
      // -----------------------------
      panels.forEach((panel, index) => {
        if (index === panels.length - 1) return;

        const nextPanel = panels[index + 1];

        const step = index * 1.2;

        // CURRENT PANEL OUT
        tl.to(
          panel,
          {
            y: -180,
            scale: 0.86,
            autoAlpha: 0,
            filter: "blur(12px)",
            ease: "power2.out",
            duration: 1,
          },
          step
        );

        // NEXT PANEL IN
        tl.to(
          nextPanel,
          {
            y: 0,
            scale: 1,
            autoAlpha: 1,
            filter: "blur(0px)",
            ease: "power3.out",
            duration: 1,
          },
          step + 0.15
        );
      });

      ScrollTrigger.refresh();
    }, section);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen overflow-hidden bg-[#0A0F14] text-white"
      aria-label="Service pathways"
    >
      {/* BACKGROUND */}
      <div className="absolute inset-0 bg-[#0A0F14]" />

      {/* RADIAL GLOW */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_76%_55%,rgba(56,189,248,0.07),transparent_45%)]" />

      <div className="relative mx-auto h-full max-w-7xl px-6 sm:px-10">
        {slides.map((slide) => (
          <article
            data-pathway-panel
            key={slide.title}
            className="
              absolute
              inset-x-6
              top-1/2
              grid
              -translate-y-1/2
              grid-cols-1
              items-center
              gap-20
              sm:inset-x-10
              lg:grid-cols-[0.92fr_1.08fr]
            "
          >
            {/* LEFT CONTENT */}
            <div className="max-w-xl">
              {/* EYEBROW */}
              <p
                className="
                  mb-8
                  text-[24px]
                  font-light
                  tracking-[-0.03em]
                  text-white/38
                "
              >
                {slide.eyebrow}
              </p>

              {/* TITLE */}
              <h2
                className="
                  max-w-lg
                  text-[40px]
                  font-light
                  leading-[1.08]
                  tracking-[-0.05em]
                  text-white
                "
              >
                {slide.title}
              </h2>

              {/* DESC */}
              <p
                className="
                  mt-6
                  max-w-lg
                  text-[16px]
                  leading-7
                  text-white/52
                "
              >
                {slide.desc}
              </p>

              {/* LINK */}
              <a
                href="#services"
                className="
                  mt-10
                  inline-flex
                  items-center
                  gap-2
                  text-[16px]
                  font-medium
                  text-white
                  transition-all
                  duration-300
                  hover:text-white/70
                "
              >
                {slide.link}

                <span className="translate-y-[1px]">→</span>
              </a>
            </div>

            {/* RIGHT IMAGE */}
            <div
              className="
                relative
                h-[min(50vw,620px)]
                min-h-[360px]
                overflow-hidden
                border
                border-white/10
                bg-[#030814]
                shadow-[0_0_120px_rgba(0,0,0,0.42)]
              "
            >
              {/* IMAGE */}
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                priority
                className="
                  object-cover
                  [transform:translateZ(0)]
                  will-change-transform
                  h-600
                  w-650
                "
              />

              {/* OVERLAYS */}
              <div className="absolute inset-0 bg-gradient-to-tr from-[#030814]/92 via-[#030814]/18 to-cyan-300/10" />

              <div className="absolute inset-0 bg-gradient-to-t from-[#030814] via-transparent to-transparent" />

              {/* GLOW */}
              <div className="absolute -bottom-24 left-1/2 h-56 w-56 -translate-x-1/2 rounded-full bg-cyan-300/20 blur-[110px]" />

              {/* BORDER */}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
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
      "Risk-based internal audits that identify gaps, strengthen systems, and drive continuous improvement.",
    link: "Explore Training",
    image: "/pic1.png",
  },
  {
    eyebrow: "SERVICES",
    title: "Discover your pathway",
    desc:
      "Realistic simulations of regulatory inspections to ensure readiness and confidence.",
    link: "Explore Consulting",
    image: "/pic2.png",
  },
];

export default function AnimatedPathwaysSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context((self) => {
      const q = self.selector;

      if (!q) return;

      const panels = q("[data-pathway-panel]");

      gsap.set(panels[0], {
        autoAlpha: 1,
        y: 0,
        scale: 1,
        filter: "blur(0px)",
        force3D: true,
      });

      gsap.set(panels[1], {
        autoAlpha: reduceMotion ? 1 : 0,
        y: reduceMotion ? 0 : 230,
        scale: reduceMotion ? 1 : 1.02,
        filter: reduceMotion ? "blur(0px)" : "blur(10px)",
        force3D: true,
      });

      if (reduceMotion) return;

      gsap
        .timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top+=1",
            end: "+=1800",
            scrub: 0.75,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            refreshPriority: -1,
          },
        })
        .to(
          panels[0],
          {
            y: -240,
            scale: 0.78,
            autoAlpha: 0.22,
            filter: "blur(9px)",
            ease: "none",
            duration: 1,
          },
          0
        )
        .to(
          panels[1],
          {
            y: 0,
            scale: 1,
            autoAlpha: 1,
            filter: "blur(0px)",
            ease: "none",
            duration: 1,
          },
          0.18
        );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen overflow-hidden bg-[#050B12] text-white"
      aria-label="Service pathways"
    >
      {/* BACKGROUND */}
      <div className="absolute inset-0 bg-[#050B12]" />

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_76%_55%,rgba(56,189,248,0.06),transparent_45%)]" />

      <div className="relative mx-auto h-full max-w-7xl px-6 sm:px-10">
        {slides.map((slide) => (
          <article
            data-pathway-panel
            key={slide.title}
            className="absolute inset-x-6 top-1/2 grid -translate-y-1/2 grid-cols-1 items-center gap-16 sm:inset-x-10 lg:grid-cols-[0.9fr_1.1fr]"
          >
            {/* LEFT CONTENT */}
            <div className="max-w-lg">
              <p className="mb-8 text-lg font-light tracking-[-0.03em] text-white/42">
                {slide.eyebrow}
              </p>

              <h2 className="max-w-md text-[clamp(2rem,3.25vw,3.4rem)] font-light leading-[1.12] tracking-[-0.045em] text-white">
                {slide.title}
              </h2>

              <p className="mt-5 max-w-md text-sm leading-6 text-white/48">
                {slide.desc}
              </p>

              <a
                href="#services"
                className="mt-8 inline-flex text-sm font-medium text-white transition hover:text-white/65"
              >
                {slide.link}&nbsp;→
              </a>
            </div>

            {/* RIGHT IMAGE */}
            <div className="relative h-[min(48vw,560px)] min-h-[340px] overflow-hidden rounded-[28px] border border-white/10 bg-[#030814] shadow-[0_0_90px_rgba(0,0,0,0.45)]">
              {/* IMAGE */}
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                priority
                className="object-cover"
              />

              {/* OVERLAYS */}
              <div className="absolute inset-0 bg-gradient-to-tr from-[#030814]/90 via-[#030814]/10 to-cyan-300/10" />

              <div className="absolute inset-0 bg-gradient-to-t from-[#030814] via-transparent to-transparent" />

              {/* GLOW */}
              <div className="absolute -bottom-24 left-1/2 h-48 w-48 -translate-x-1/2 rounded-full bg-cyan-300/20 blur-[90px]" />

              {/* BORDER LIGHT */}
              <div className="absolute inset-0 rounded-[28px] border border-white/10" />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
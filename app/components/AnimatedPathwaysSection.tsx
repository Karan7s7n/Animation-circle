"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const slides = [
  {
    eyebrow: "SERVICES",
    title: "Build your team's capabilities",
    desc: "Risk-based internal audits that identify gaps, strengthen systems, and drive continuous improvement.",
    link: "Explore Training",
    tone: "blue",
  },
  {
    eyebrow: "SERVICES",
    title: "Discover your pathway",
    desc: "Realistic simulations of regulatory inspections to ensure readiness and confidence.",
    link: "Explore Consulting",
    tone: "amber",
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
      <div className="absolute inset-0 bg-[#050B12]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_76%_55%,rgba(56,189,248,0.055),transparent_45%)]" />

      <div className="relative mx-auto h-full max-w-7xl px-6 sm:px-10">
        {slides.map((slide) => (
          <article
            data-pathway-panel
            key={slide.title}
            className="absolute inset-x-6 top-1/2 grid -translate-y-1/2 grid-cols-1 items-center gap-12 sm:inset-x-10 lg:grid-cols-[0.9fr_1.1fr]"
          >
            <div className="max-w-lg">
              <p className="mb-8 text-lg font-light tracking-[-0.03em] text-white/42">
                {slide.eyebrow}
              </p>
              <h2 className="max-w-md text-[clamp(2rem,3.25vw,3.4rem)] font-light leading-[1.24] tracking-[-0.045em] text-white">
                {slide.title}
              </h2>
              <p className="mt-4 max-w-md text-sm leading-6 text-white/48">
                {slide.desc}
              </p>
              <a
                href="#services"
                className="mt-8 inline-flex text-sm font-medium text-white transition hover:text-white/65"
              >
                {slide.link}&nbsp;→
              </a>
            </div>

            <AbstractRibbon tone={slide.tone} />
          </article>
        ))}
      </div>
    </section>
  );
}

function AbstractRibbon({ tone }: { tone: string }) {
  const colors =
    tone === "amber"
      ? [
          "rgba(251,146,60,0.92)",
          "rgba(244,114,182,0.8)",
          "rgba(168,85,247,0.75)",
          "rgba(99,102,241,0.9)",
          "rgba(14,165,233,0.75)",
        ]
      : [
          "rgba(125,211,252,0.9)",
          "rgba(34,211,238,0.82)",
          "rgba(99,102,241,0.82)",
          "rgba(168,85,247,0.82)",
          "rgba(251,146,60,0.72)",
        ];

  return (
    <div className="relative h-[min(48vw,520px)] min-h-[300px] overflow-hidden bg-[#030814] shadow-[0_0_90px_rgba(0,0,0,0.45)_inset]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_88%_88%,rgba(14,165,233,0.26),transparent_22%),radial-gradient(circle_at_18%_40%,rgba(255,255,255,0.08),transparent_32%)]" />
      {colors.map((color, index) => (
        <span
          key={color}
          className="absolute rounded-[50%] border-l border-t"
          style={{
            borderColor: color,
            boxShadow: `0 0 ${18 + index * 8}px ${color}`,
            height: `${88 + index * 14}%`,
            left: `${8 + index * 7}%`,
            opacity: 0.72,
            top: `${7 + index * 5}%`,
            transform: `rotate(${-18 + index * 2}deg) skewX(-8deg)`,
            width: `${88 + index * 14}%`,
          }}
        />
      ))}
      <div className="absolute -bottom-[22%] right-[-5%] h-[42%] w-[38%] rounded-full border-t border-sky-300/80 shadow-[0_0_40px_rgba(14,165,233,0.65)]" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#030814] via-transparent to-[#030814]/10" />
    </div>
  );
}

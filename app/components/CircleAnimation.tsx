"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Briefcase,
  ShieldCheck,
  BookOpen,
  Search,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    title: "Consulting",
    subtitle: "SERVICES",
    desc: "Strategic and operational support across quality and compliance systems.",
    icon: Briefcase,
  },
  {
    title: "Audits",
    subtitle: "AUDITS",
    desc: "Inspection-ready audit systems designed for regulated environments.",
    icon: ShieldCheck,
  },
  {
    title: "Training",
    subtitle: "TRAINING",
    desc: "Practical training programmes aligned to operational requirements.",
    icon: BookOpen,
  },
  {
    title: "Search",
    subtitle: "SEARCH",
    desc: "Executive hiring and specialist recruitment for life sciences.",
    icon: Search,
  },
];

const positions = [
  { x: 0, y: -210 },
  { x: 210, y: 0 },
  { x: 0, y: 210 },
  { x: -210, y: 0 },
];

export default function CircularServicesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const iconRefs = useRef<(HTMLDivElement | null)[]>([]);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // PERFORMANCE
      gsap.set("*", {
        force3D: true,
      });

      // INITIAL POSITIONS
      iconRefs.current.forEach((icon, i) => {
        if (!icon) return;

        gsap.set(icon, {
          x: positions[i].x,
          y: positions[i].y,
        });
      });

      // CONTENT INITIAL
      contentRefs.current.forEach((content, i) => {
        if (!content) return;

        gsap.set(content, {
          opacity: i === 0 ? 1 : 0,
          y: i === 0 ? 0 : 40,
        });
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=4000",
          scrub: 1.5,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          snap: {
            snapTo: [0, 0.33, 0.66, 1],
            duration: 0.6,
            ease: "power2.inOut",
          },
        },
      });

      for (let step = 0; step < services.length - 1; step++) {
        // ICONS
        iconRefs.current.forEach((icon, index) => {
          if (!icon) return;

          const nextPos =
            positions[
              (index - (step + 1) + positions.length) %
                positions.length
            ];

          tl.to(
            icon,
            {
              x: nextPos.x,
              y: nextPos.y,
              duration: 1,
              ease: "power3.inOut",
            },
            step
          );

          // ACTIVE ICON
          tl.to(
            icon.children[0],
            {
              scale:
                (index - (step + 1) + positions.length) %
                  positions.length ===
                1
                  ? 1.2
                  : 1,
              opacity:
                (index - (step + 1) + positions.length) %
                  positions.length ===
                1
                  ? 1
                  : 0.4,
              duration: 1,
              ease: "power3.out",
            },
            step
          );
        });

        // CONTENT OUT
        tl.to(
          contentRefs.current[step],
          {
            opacity: 0,
            y: -40,
            duration: 0.45,
            ease: "power2.out",
          },
          step
        );

        // CONTENT IN
        tl.fromTo(
          contentRefs.current[step + 1],
          {
            opacity: 0,
            y: 40,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
          },
          step + 0.25
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen overflow-hidden bg-[#020817]"
    >
      {/* BACKGROUND */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(70,90,255,0.08),transparent_60%)]" />

      <div className="mx-auto flex h-full max-w-7xl items-center px-10">
        {/* LEFT */}
        <div className="relative flex w-1/2 items-center justify-center">
          <div className="relative h-[540px] w-[540px]">
            {/* OUTER RING */}
            <div className="absolute inset-0 rounded-full border border-white/20" />

            {/* INNER SHADOW */}
            <div className="absolute inset-0 rounded-full shadow-[0_0_120px_rgba(255,255,255,0.06)_inset]" />

            {/* RIGHT GLOW */}
            <div className="absolute right-[-10px] top-1/2 h-36 w-36 -translate-y-1/2 rounded-full bg-cyan-200/20 blur-[60px]" />

            {/* RIGHT DOT */}
            <div className="absolute right-[-4px] top-1/2 z-20 h-2 w-2 -translate-y-1/2 rounded-full bg-white shadow-[0_0_15px_white]" />

            {/* ICONS */}
            {services.map((service, i) => {
              const Icon = service.icon;

              return (
                <div
                  key={i}
                  ref={(el) => {
                    iconRefs.current[i] = el;
                  }}
                  className="absolute left-1/2 top-1/2 will-change-transform"
                >
                  <div className="flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-3 opacity-40">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full border border-white/20 bg-white/[0.02]">
                      <Icon className="h-7 w-7 text-white" />
                    </div>

                    <p className="text-[10px] tracking-[0.25em] text-white/60">
                      {service.title.toUpperCase()}
                    </p>
                  </div>
                </div>
              );
            })}

            {/* CENTER */}
            <div className="absolute left-1/2 top-1/2 z-10 flex h-44 w-44 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-[#030b17]">
              <div className="text-7xl font-black text-white">
                K
              </div>
            </div>
          </div>
        </div>

        {/* DIVIDER */}
        <div className="h-[420px] w-px bg-white/10" />

        {/* RIGHT */}
        <div className="relative flex w-1/2 items-center pl-20">
          <div className="relative h-[300px] w-full">
            {services.map((service, i) => (
              <div
                key={i}
                ref={(el) => {
                  contentRefs.current[i] = el;
                }}
                className="absolute left-0 top-0 w-full will-change-transform"
              >
                <p className="mb-4 text-xs tracking-[0.35em] text-white/40">
                  {service.subtitle}
                </p>

                <h2 className="mb-8 text-6xl font-light leading-tight text-white">
                  {service.title}
                </h2>

                <p className="max-w-xl text-lg leading-8 text-white/60">
                  {service.desc}
                </p>

                <button className="mt-12 text-sm tracking-[0.25em] text-white/70 transition-colors hover:text-white">
                  LEARN MORE →
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* SCROLL SPACE */}
      <div className="h-[4000px]" />
    </section>
  );
}
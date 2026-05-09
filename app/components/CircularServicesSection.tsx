"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const introContent = {
  title: "Precision",
  subtitle: "LIFESCIENCE GROUP",
  desc: "Building modern compliance, audit and recruitment systems for regulated industries.",
};

const services = [
  {
    title: "Consulting",
    subtitle: "SERVICES",
    desc: "Strategic and operational support across quality and compliance systems.",
    image: "/venn.png",
  },
  {
    title: "Audits",
    subtitle: "AUDITS",
    desc: "Inspection-ready audit systems designed for regulated environments.",
    image: "/Icon.png",
  },
  {
    title: "Training",
    subtitle: "TRAINING",
    desc: "Practical training programmes aligned to operational requirements.",
    image: "/fi_864685.png",
  },
  {
    title: "Search",
    subtitle: "SEARCH",
    desc: "Executive hiring and specialist recruitment for life sciences.",
    image: "/iconoir_user.png",
  },
];

const iconOrder = [
  services[3],
  services[0],
  services[1],
  services[2],
];

const positions = [
  { x: 0, y: -175 },
  { x: 190, y: 0 },
  { x: 0, y: 175 },
  { x: -175, y: 0 },
];

export default function CircularServicesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const iconRefs = useRef<(HTMLDivElement | null)[]>([]);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // --------------------------------
      // ICON INITIAL STATE
      // --------------------------------
      iconRefs.current.forEach((icon, i) => {
        if (!icon) return;

        gsap.set(icon, {
          x: positions[i].x,
          y: positions[i].y,
          opacity: 0,
        });

        const wrapper = icon.children[0] as HTMLElement;
        const circle = wrapper.children[0] as HTMLElement;

        gsap.set(wrapper, {
          scale: 1,
          opacity: 0.35,
        });

        gsap.set(circle, {
          boxShadow: "0 0 0px rgba(0,0,0,0)",
          borderColor: "rgba(255,255,255,0.12)",
          backgroundColor: "rgba(255,255,255,0.02)",
        });
      });

      // --------------------------------
      // RIGHT GLOW HIDDEN INITIALLY
      // --------------------------------
      gsap.set(".right-glow", {
        opacity: 0,
      });

      // --------------------------------
      // CONTENT INITIAL STATES
      // intro visible
      // --------------------------------
      contentRefs.current.forEach((content, i) => {
        if (!content) return;

        gsap.set(content, {
          opacity: i === 0 ? 1 : 0,
          y: i === 0 ? 0 : 50,
        });
      });

      // --------------------------------
      // CENTER GLOW LOOP
      // --------------------------------
      gsap.to(".center-core", {
        boxShadow:
          "0 0 50px rgba(255,255,255,0.14), 0 0 140px rgba(56,189,248,0.28), inset 0 0 40px rgba(255,255,255,0.08)",
        duration: 2.4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(".center-logo", {
        filter:
          "brightness(3) drop-shadow(0 0 12px rgba(255,255,255,1)) drop-shadow(0 0 40px rgba(56,189,248,0.7))",
        duration: 2.4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // --------------------------------
      // MAIN TIMELINE
      // --------------------------------
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=6200",
          scrub: 1.4,
          pin: true,
          anticipatePin: 1,

          snap: {
            snapTo: [0, 0.2, 0.4, 0.6, 0.8, 1],
            duration: 0.5,
            ease: "power2.inOut",
          },
        },
      });

      // =====================================
      // INTRO DISAPPEAR
      // =====================================

      tl.to(
        contentRefs.current[0],
        {
          opacity: 0,
          y: -50,
          duration: 0.6,
          ease: "power2.out",
        },
        0.15
      );

      // =====================================
      // ICONS APPEAR
      // =====================================

      tl.to(
        iconRefs.current,
        {
          opacity: 1,
          duration: 0.8,
          stagger: 0.06,
        },
        0.2
      );

      tl.to(
        ".right-glow",
        {
          opacity: 1,
          duration: 0.8,
        },
        0.2
      );

      tl.to(
        ".active-dot",
        {
          opacity: 1,
          duration: 0.8,
        },
        0.2
      );

      // =====================================
      // CONSULTING CONTENT APPEAR
      // =====================================

      const consultingContent = contentRefs.current[1];

      if (consultingContent) {
        tl.to(
          consultingContent,
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
          },
          0.35
        );
      }

      // =====================================
      // FIRST ACTIVE ICON
      // =====================================

      const firstIcon = iconRefs.current[1];

      if (firstIcon) {
        const wrapper = firstIcon.children[0] as HTMLElement;
        const circle = wrapper.children[0] as HTMLElement;

        tl.to(
          wrapper,
          {
            scale: 1.38,
            opacity: 1,
            duration: 0.8,
          },
          0.35
        );

        tl.to(
          circle,
          {
            boxShadow:
              "0 0 25px rgba(255,255,255,0.35), 0 0 60px rgba(56,189,248,0.45)",
            borderColor: "rgba(255,255,255,0.9)",
            backgroundColor: "rgba(255,255,255,0.08)",
            duration: 0.8,
          },
          0.35
        );
      }

      // =====================================
      // ACTIVE DOT PULSE
      // =====================================

      gsap.to(".active-dot", {
        scale: 1.8,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // =====================================
      // ROTATIONS
      // =====================================

      for (let step = 0; step < services.length - 1; step++) {
        iconRefs.current.forEach((icon, index) => {
          if (!icon) return;

          const nextSlot =
            (index - (step + 1) + positions.length) %
            positions.length;

          const nextPos = positions[nextSlot];

          const isActive = nextSlot === 1;

          const wrapper = icon.children[0] as HTMLElement;
          const circle = wrapper.children[0] as HTMLElement;

          tl.to(
            icon,
            {
              x: nextPos.x,
              y: nextPos.y,
              duration: 1,
              ease: "power3.inOut",
            },
            step + 1.5
          );

          tl.to(
            wrapper,
            {
              scale: isActive ? 1.38 : 1,
              opacity: isActive ? 1 : 0.35,
              duration: 1,
              ease: "power3.out",
            },
            step + 1.5
          );

          tl.to(
            circle,
            {
              boxShadow: isActive
                ? "0 0 25px rgba(255,255,255,0.35), 0 0 60px rgba(56,189,248,0.45)"
                : "0 0 0px rgba(0,0,0,0)",

              borderColor: isActive
                ? "rgba(255,255,255,0.9)"
                : "rgba(255,255,255,0.12)",

              backgroundColor: isActive
                ? "rgba(255,255,255,0.08)"
                : "rgba(255,255,255,0.02)",

              duration: 1,
              ease: "power3.out",
            },
            step + 1.5
          );
        });

        const currentContent = contentRefs.current[step + 1];

        if (currentContent) {
          tl.to(
            currentContent,
            {
              opacity: 0,
              y: -40,
              duration: 0.45,
              ease: "power2.out",
            },
            step + 1.5
          );
        }

        const nextContent = contentRefs.current[step + 2];

        if (nextContent) {
          tl.fromTo(
            nextContent,
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
            step + 1.75
          );
        }
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen overflow-hidden bg-[#020817]"
    >
      {/* BG */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(70,90,255,0.08),transparent_60%)]" />

      <div className="mx-auto flex h-full max-w-7xl items-center px-10">
        {/* LEFT */}
        <div className="relative flex w-1/2 items-center justify-center">
          <div className="relative h-[540px] w-[540px]">
            {/* RINGS */}
            <div className="absolute inset-0 rounded-full border border-white/20 shadow-[0_0_120px_rgba(255,255,255,0.06)_inset]" />

            <div className="absolute inset-[24px] rounded-full border border-white/5" />

            {/* RIGHT GLOW */}
            <div className="right-glow">
              <div className="absolute right-[-140px] top-1/2 h-[320px] w-[320px] -translate-y-1/2 rounded-full bg-cyan-400/12 blur-[160px]" />

              <div className="absolute right-[-70px] top-1/2 h-[180px] w-[180px] -translate-y-1/2 rounded-full bg-cyan-300/18 blur-[90px]" />

              <div className="absolute right-[-20px] top-1/2 h-[90px] w-[90px] -translate-y-1/2 rounded-full bg-cyan-200/30 blur-[40px]" />

              <div className="active-dot absolute right-[-4px] top-1/2 z-20 h-2.5 w-2.5 -translate-y-1/2 rounded-full bg-white opacity-0" />
            </div>

            {/* ICONS */}
            {iconOrder.map((service, i) => (
              <div
                key={i}
                ref={(el) => {
                  iconRefs.current[i] = el;
                }}
                className="absolute left-1/2 top-1/2"
              >
                <div className="flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-3">
                  <div className="relative flex h-20 w-20 items-center justify-center rounded-full border border-white/20 bg-white/[0.03] backdrop-blur-xl">
                    <div className="absolute inset-[-6px] rounded-full border border-white/10" />

                    <div className="absolute inset-[4px] rounded-full border border-white/10" />

                    <Image
                      src={service.image}
                      alt={service.title}
                      width={34}
                      height={34}
                      className="relative z-10 object-contain brightness-[12] contrast-[2]"
                    />
                  </div>

                  <p className="text-[10px] tracking-[0.25em] text-white/60">
                    {service.title.toUpperCase()}
                  </p>
                </div>
              </div>
            ))}

            {/* CENTER */}
            <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
              <div className="absolute left-1/2 top-1/2 h-[260px] w-[260px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-300/10 blur-[120px]" />

              <div className="absolute left-1/2 top-1/2 h-[210px] w-[210px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10" />

              <div className="center-core relative flex h-44 w-44 items-center justify-center rounded-full border border-white/20 bg-[#030b17]/90 backdrop-blur-xl">
                <div className="absolute inset-[18px] rounded-full border border-white/10" />

                <Image
                  src="/Vector.png"
                  alt="Center Logo"
                  width={72}
                  height={72}
                  className="center-logo object-contain brightness-[12] contrast-[2]"
                />
              </div>
            </div>
          </div>
        </div>

        {/* DIVIDER */}
        <div className="relative h-[420px] w-px overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-200/40 to-transparent" />

          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-200/30 to-transparent blur-[8px]" />
        </div>

        {/* RIGHT */}
        <div className="relative flex w-1/2 items-center pl-20">
          <div className="relative h-[320px] w-full">
            {[introContent, ...services].map((service, i) => (
              <div
                key={i}
                ref={(el) => {
                  contentRefs.current[i] = el;
                }}
                className="absolute left-0 top-0 w-full"
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

      <div className="h-[7000px]" />
    </section>
  );
}


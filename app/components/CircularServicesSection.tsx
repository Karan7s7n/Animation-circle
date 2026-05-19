"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const introContent = {
  title: "Built for regulated life sciences",
  subtitle: "Services",
  desc: "A unified approach across consulting, audits, search and training--designed for high-stakes, regulated operations.",
  items: [],
};



const services = [
  {
    title: "Inspection-Ready Audit Systems",
    iconTitle: "Audits",
    subtitle: "AUDITS",
    desc: "Global audit programmes across GxP, ISO and regulatory frameworks.",
    image: "/Icon.png",
    items: [
      {
        title: "Internal Audits",
        desc: "Risk-based internal audits that identify gaps, strengthen systems, and drive continuous improvement.",
      },
      {
        title: "External Audits",
        desc: "Support for supplier, vendor, and third-party audits across global regulatory standards.",
      },
      {
        title: "Mock Inspections",
        desc: "Realistic simulations of regulatory inspections to ensure readiness and confidence.",
      },
    ],
  },
  {
    title: "Building Inspection-Ready Systems",
    iconTitle: "Consulting",
    subtitle: "Consulting",
    desc: "Strategic and operational support across quality, regulatory and validation.",
    image: "/venn.png",
    items: [
      {
        title: "Quality",
        desc: "Risk-based internal audits that identify gaps, strengthen systems, and drive continuous improvement.",
      },
      {
        title: "Regulatory",
        desc: "Support for supplier, vendor, and third-party audits across global regulatory standards.",
      },
      {
        title: "Validation",
        desc: "Realistic simulations of regulatory inspections to ensure readiness and confidence.",
      },
    ],
  },
  {
    title: "Inspection-Ready Training",
    iconTitle: "Training",
    subtitle: "TRAINING",
    desc: "Practical training programmes aligned to regulatory and operational needs.",
    image: "/fi_864685.png",
    items: [
      {
        title: "Strategy",
        desc: "Risk-based internal audits that identify gaps, strengthen systems, and drive continuous improvement.",
      },
      {
        title: "Operations",
        desc: "Support for supplier, vendor, and third-party audits across global regulatory standards.",
      },
      {
        title: "Leadership",
        desc: "Realistic simulations of regulatory inspections to ensure readiness and confidence.",
      },
    ],
  },
  {
    title: "Talent for Regulated Environments",
    iconTitle: "Search",
    subtitle: "Search & Selection",
    desc: "Specialist recruitment across critical life sciences functions.",
    image: "/iconoir_user.png",
    items: [
      {
        title: "Executive",
        desc: "Risk-based internal audits that identify gaps, strengthen systems, and drive continuous improvement.",
      },
      {
        title: "Retained",
        desc: "Support for supplier, vendor, and third-party audits across global regulatory standards.",
      },
      {
        title: "Team Build",
        desc: "Realistic simulations of regulatory inspections to ensure readiness and confidence.",
      },
    ],
  },
];

const T = {
  introOut: 0,
  orbitIn: 5,
  service1In: 10,
  rot1: 20,
  rot2: 45,
  rot3: 70,
  end: 95,
};

export default function CircularServicesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);

  const [logoSrc, setLogoSrc] = useState("/logo1.png");

  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);
  const centerLogoRef = useRef<HTMLImageElement | null>(null);
  

  useEffect(() => {
    if (!sectionRef.current || !orbitRef.current) return;

    const initTimer = setTimeout(() => {
      const ctx = gsap.context(() => {
        // INITIAL STATES
        contentRefs.current.forEach((el, i) => {
          if (!el) return;

          if (i === 0) {
            gsap.set(el, {
              opacity: 1,
              y: 0,
              visibility: "visible",
            });
          } else {
            gsap.set(el, {
              opacity: 0,
              y: 40,
              visibility: "visible",
            });
          }
        });

        gsap.set(".orbit-wrapper", {
          opacity: 1,
          scale: 1,
        });

        gsap.set(".right-glow", {
          opacity: 0,
        });

        gsap.set(".icon-keep-straight", {
          rotation: 0,
        });

        gsap.set(".arc-gradient-wrapper", {
          opacity: 0,
        });

        gsap.set(centerLogoRef.current, {
          opacity: 1,
          scale: 1,
        });

        // AMBIENT GLOW
        let t = 0;

        gsap.ticker.add(() => {
          t += 0.01;

          const wave = (Math.sin(t) + 1) / 2;

          const glow1 = 30 + wave * 20;
          const glow2 = 100 + wave * 40;
          const inset = 20 + wave * 20;

          const brightness = 2 + wave * 1;
          const blur = 8 + wave * 4;
          const glow = 25 + wave * 15;

          gsap.set(".center-core", {
            boxShadow: `
              0 0 ${glow1}px rgba(255,255,255,0.14),
              0 0 ${glow2}px rgba(56,189,248,0.28),
              inset 0 0 ${inset}px rgba(255,255,255,0.08)
            `,
          });

          gsap.set(".center-logo", {
            filter: `
              brightness(${brightness})
              drop-shadow(0 0 ${blur}px rgba(255,255,255,1))
              drop-shadow(0 0 ${glow}px rgba(56,189,248,0.7))
            `,
          });
        });

        // ACTIVE DOT
        gsap.to(".active-dot", {
          scale: 1.7,
          duration: 2.2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          filter:
            "drop-shadow(0 0 10px rgba(255,255,255,0.95)) drop-shadow(0 0 25px rgba(56,189,248,0.8))",
        });

        // MAIN TIMELINE
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "+=15000",
            scrub: 1.5,
            pin: true,
            anticipatePin: 1,
            snap: {
              snapTo: [0, 0.1, 0.2, 0.45, 0.7, 0.95, 1],
              duration: { min: 0.4, max: 0.8 },
              ease: "power2.inOut",
              delay: 0.05,
              directional: true,
            },
          },
        });

        // INTRO OUT
        tl.to(
          contentRefs.current[0],
          {
            opacity: 0,
            y: -30,
            duration: T.orbitIn - T.introOut,
            ease: "power2.out",
          },
          T.introOut
        );

        // LOGO SWITCH OUT// LOGO SWITCH OUT
tl.to(
  centerLogoRef.current,
  {
    opacity: 0,
    scale: 0.8,
    duration: 2,
    ease: "power2.out",
  },
  T.orbitIn - 1
);

// CHANGE IMAGE
// CHANGE IMAGE
tl.call(
  () => {
    setLogoSrc("/logo2.png");
  },
  [],
  T.orbitIn + 0.15
);

// LOGO SWITCH IN
tl.to(
  centerLogoRef.current,
  {
    opacity: 1,
    scale: 1,
    duration: 2.5,
    ease: "power3.out",
  },
  T.orbitIn + 0.5
);

        // ORBIT IN
        tl.to(
          ".orbit-wrapper",
          {
            opacity: 1,
            scale: 1,
            duration: 6,
            ease: "power2.out",
          },
          T.orbitIn
        );

        tl.to(
          ".right-glow",
          {
            opacity: 1,
            duration: 6,
            ease: "power2.out",
          },
          T.orbitIn
        );

        tl.to(
          ".arc-gradient-wrapper",
          {
            opacity: 1,
            duration: 6,
            ease: "power2.out",
          },
          T.orbitIn
        );

        // SERVICE 1
        tl.to(
          contentRefs.current[1],
          {
            opacity: 1,
            y: 0,
            duration: 8,
            ease: "power2.out",
          },
          T.orbitIn + 2
        );

        // ROTATION 1
        tl.to(
          orbitRef.current,
          {
            rotate: -90,
            duration: 18,
            ease: "power2.inOut",
          },
          T.rot1
        );

        tl.to(
          ".icon-keep-straight",
          {
            rotation: 90,
            duration: 18,
            ease: "power2.inOut",
          },
          T.rot1
        );

        tl.to(
          contentRefs.current[1],
          {
            opacity: 0,
            y: -30,
            duration: 6,
            ease: "power2.in",
          },
          T.rot1
        );

        tl.to(
          contentRefs.current[2],
          {
            opacity: 1,
            y: 0,
            duration: 7,
            ease: "power2.out",
          },
          T.rot1 + 8
        );

        // ROTATION 2
        tl.to(
          orbitRef.current,
          {
            rotate: -180,
            duration: 18,
            ease: "power2.inOut",
          },
          T.rot2
        );

        tl.to(
          ".icon-keep-straight",
          {
            rotation: 180,
            duration: 18,
            ease: "power2.inOut",
          },
          T.rot2
        );

        tl.to(
          contentRefs.current[2],
          {
            opacity: 0,
            y: -30,
            duration: 6,
            ease: "power2.in",
          },
          T.rot2
        );

        tl.to(
          contentRefs.current[3],
          {
            opacity: 1,
            y: 0,
            duration: 7,
            ease: "power2.out",
          },
          T.rot2 + 8
        );

        // ROTATION 3
        tl.to(
          orbitRef.current,
          {
            rotate: -270,
            duration: 18,
            ease: "power2.inOut",
          },
          T.rot3
        );

        tl.to(
          ".icon-keep-straight",
          {
            rotation: 270,
            duration: 18,
            ease: "power2.inOut",
          },
          T.rot3
        );

        tl.to(
          contentRefs.current[3],
          {
            opacity: 0,
            y: -30,
            duration: 6,
            ease: "power2.in",
          },
          T.rot3
        );

        tl.to(
          contentRefs.current[4],
          {
            opacity: 1,
            y: 0,
            duration: 7,
            ease: "power2.out",
          },
          T.rot3 + 8
        );

        tl.to({}, { duration: T.end - (T.rot3 + 18) }, T.rot3 + 18);
      }, sectionRef);

      return () => ctx.revert();
    }, 150);

    return () => clearTimeout(initTimer);
  }, []);

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative h-screen overflow-hidden"
      style={{ backgroundColor: "#0A0F14" }}
    >
      <div
        className="absolute inset-0 z-0"
        style={{ backgroundColor: "#0A0F14" }}
      />

      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_35%_50%,rgba(56,189,248,0.05),transparent_55%)]" />

      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_70%_50%,rgba(99,102,241,0.04),transparent_50%)]" />

      <div className="relative z-10 mx-auto flex h-full max-w-7xl items-center px-10">
        {/* LEFT */}
        <div className="relative flex w-1/2 items-center justify-center">
          <div className="relative h-[560px] w-[560px]">
            {/* RINGS */}
            <div className="absolute inset-0 rounded-full border border-white/10" />

            <div className="absolute inset-[60px] rounded-full border border-white/[0.06]" />

            {/* ARC */}
            <div
              className="arc-gradient-wrapper absolute inset-0"
              style={{ opacity: 0 }}
            >
              <svg
                className="absolute inset-0 h-full w-full"
                viewBox="0 0 560 560"
                fill="none"
              >
                <defs>
                  <linearGradient
                    id="arcMulti"
                    x1="0%"
                    y1="0%"
                    x2="0%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor="#38bdf8" stopOpacity="0" />

                    <stop
                      offset="18%"
                      stopColor="#818cf8"
                      stopOpacity="0.85"
                    />

                    <stop
                      offset="36%"
                      stopColor="#c084fc"
                      stopOpacity="0.95"
                    />

                    <stop
                      offset="50%"
                      stopColor="#ffffff"
                      stopOpacity="1"
                    />

                    <stop
                      offset="64%"
                      stopColor="#f472b6"
                      stopOpacity="0.95"
                    />

                    <stop
                      offset="82%"
                      stopColor="#fb923c"
                      stopOpacity="0.85"
                    />

                    <stop offset="100%" stopColor="#38bdf8" stopOpacity="0" />
                  </linearGradient>

                  <filter id="arcGlow">
                    <feGaussianBlur stdDeviation="4" result="blur" />

                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                <path
                  d="M 280 4 A 276 276 0 0 1 280 556"
                  stroke="url(#arcMulti)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  fill="none"
                />

                <path
                  d="M 280 4 A 276 276 0 0 1 280 556"
                  stroke="url(#arcMulti)"
                  strokeWidth="14"
                  strokeLinecap="round"
                  fill="none"
                  opacity="0.15"
                  filter="url(#arcGlow)"
                />
              </svg>
            </div>

            {/* GLOW */}
            <div className="right-glow opacity-0">
              <div className="absolute right-[-140px] top-1/2 h-[320px] w-[320px] -translate-y-1/2 rounded-full bg-cyan-400/10 blur-[160px]" />

              <div className="absolute right-[-70px] top-1/2 h-[180px] w-[180px] -translate-y-1/2 rounded-full bg-cyan-300/15 blur-[90px]" />

              <div className="absolute right-[-20px] top-1/2 h-[90px] w-[90px] -translate-y-1/2 rounded-full bg-cyan-200/20 blur-[40px]" />

              <div className="active-dot absolute right-[-6px] top-1/2 h-5 w-5 -translate-y-1/2 rounded-full">
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-300 via-white to-cyan-400 blur-[2px]" />
              </div>
            </div>

            {/* ORBIT */}
            <div ref={orbitRef} className="orbit-wrapper absolute inset-0">
              <div className="absolute" style={{ left: 280, top: 100 }}>
                <div
                  className="icon-keep-straight"
                  style={{ transform: "translate(-50%, -50%)" }}
                >
                  <ServiceIcon service={services[3]} />
                </div>
              </div>

              <div className="absolute" style={{ left: 460, top: 280 }}>
                <div
                  className="icon-keep-straight"
                  style={{ transform: "translate(-50%, -50%)" }}
                >
                  <ServiceIcon active service={services[0]} />
                </div>
              </div>

              <div className="absolute" style={{ left: 280, top: 460 }}>
                <div
                  className="icon-keep-straight"
                  style={{ transform: "translate(-50%, -50%)" }}
                >
                  <ServiceIcon service={services[1]} />
                </div>
              </div>

              <div className="absolute" style={{ left: 100, top: 280 }}>
                <div
                  className="icon-keep-straight"
                  style={{ transform: "translate(-50%, -50%)" }}
                >
                  <ServiceIcon service={services[2]} />
                </div>
              </div>
            </div>

            {/* CENTER */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <div
                className="center-core flex h-44 w-44 items-center justify-center rounded-full border border-white/20 backdrop-blur-xl"
                style={{ backgroundColor: "rgba(6,13,22,0.92)" }}
              >
                <div ref={centerLogoRef}>
   <Image
        src={logoSrc}
        alt="Center Logo"
        width={72}
        height={72}
        className="center-logo object-contain h-auto w-auto"
      />
</div>
              </div>
            </div>
          </div>
        </div>

        {/* DIVIDER */}
        <div className="h-[72%] w-px shrink-0 bg-gradient-to-b from-white/0 via-white/18 to-white/0" />

        {/* RIGHT */}
        <div className="relative flex w-1/2 items-center pl-20">
          <div className="relative h-[620px] w-full">
            {[introContent, ...services].map((service, i) => (
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

                <h2 className="mb-6 max-w-xl text-5xl font-light leading-[1.08] text-white">
                  {service.title}
                </h2>

                <p className="max-w-xl text-base leading-7 text-white/60">
                  {service.desc}
                </p>

                {service.items.length > 0 && (
                  <div className="mt-10 space-y-7">
                    {service.items.map((item) => (
                      <div key={item.title} className="flex gap-5">
                        <span className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full border border-white/45 bg-white/10 shadow-[0_0_18px_rgba(255,255,255,0.16)]" />

                        <div>
                          <p className="text-sm text-white">
                            {item.title}
                          </p>

                          <p className="mt-2 max-w-sm text-sm leading-6 text-white/45">
                            {item.desc}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <a
                  href="mailto:hello@cirle.com"
                  className="mt-10 inline-flex text-base font-medium text-white transition hover:text-white/70"
                >
                  Learn More →
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ServiceIcon({
  service,
  active = false,
}: {
  service: { title: string; iconTitle?: string; image: string };
  active?: boolean;
}) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className={`flex h-14 w-14 items-center justify-center ${
          active
            ? "drop-shadow-[0_0_12px_rgba(56,189,248,0.6)]"
            : "opacity-55"
        }`}
      >
        <Image
          src={service.image}
          alt={service.iconTitle ?? service.title}
          width={30}
          height={30}
        />
      </div>

      <p className="text-[9px] tracking-[0.25em] text-white/50">
        {(service.iconTitle ?? service.title).toUpperCase()}
      </p>
    </div>
  );
}
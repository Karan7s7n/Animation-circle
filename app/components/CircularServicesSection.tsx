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

  const section = sectionRef.current;

  let glowTicker: (() => void) | null = null;

  const ctx = gsap.context(() => {
    // =========================
    // INITIAL STATES
    // =========================
    contentRefs.current.forEach((el, i) => {
      if (!el) return;

      gsap.set(el, {
        opacity: i === 0 ? 1 : 0,
        y: i === 0 ? 0 : 40,
        visibility: "visible",
      });
    });

    gsap.set(orbitRef.current, {
      opacity: 1,
      scale: 1,
      rotate: 0,
      force3D: true,
    });

    gsap.set(".right-glow", {
      opacity: 0,
    });

    gsap.set(".icon-keep-straight", {
      rotation: 0,
      force3D: true,
    });

    gsap.set(".arc-gradient-wrapper", {
      opacity: 0,
    });

    gsap.set(centerLogoRef.current, {
      opacity: 1,
      scale: 1,
      force3D: true,
    });

    setLogoSrc("/logo1.png");

    // =========================
    // AMBIENT GLOW
    // =========================
    let t = 0;

    glowTicker = () => {
      t += 0.01;

      const wave = (Math.sin(t) + 1) / 2;

      const glow1 = 30 + wave * 20;
      const glow2 = 100 + wave * 40;
      const inset = 20 + wave * 20;

      const brightness = 2 + wave;
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
    };

    gsap.ticker.add(glowTicker);

    // =========================
    // ACTIVE DOT
    // =========================
    gsap.to(".active-dot", {
      scale: 1.7,
      duration: 2.2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      force3D: true,
    });

    // =========================
    // MAIN TIMELINE
    // =========================
    const tl = gsap.timeline({
      defaults: {
        ease: "power2.inOut",
      },
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "+=6000",
        scrub: 1.2,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        fastScrollEnd: true,

        snap: {
          snapTo: [0, 0.1, 0.2, 0.45, 0.7, 0.95, 1],
          duration: { min: 0.25, max: 0.55 },
          ease: "power2.out",
          directional: true,
        },

        onRefresh: () => {
          gsap.set(section, {
            clearProps: "transform",
          });
        },
      },
    });

    // =========================
    // INTRO OUT
    // =========================
    tl.to(
      contentRefs.current[0],
      {
        opacity: 0,
        y: -30,
        duration: 5,
      },
      T.introOut
    );

    // =========================
    // LOGO SWITCH
    // =========================
    tl.to(
      centerLogoRef.current,
      {
        opacity: 0,
        scale: 0.8,
        duration: 2,
      },
      T.orbitIn - 1
    );

    tl.to(
  {},
  {
    duration: 0,
    onStart: () => setLogoSrc("/logo2.png"),
  },
  T.orbitIn
);

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

    tl.call(
  () => {
    requestAnimationFrame(() => {
      setLogoSrc("/logo2.png");
    });
  },
  [],
  T.orbitIn
);

    // =========================
    // ORBIT INTRO
    // =========================
    tl.to(
      ".right-glow",
      {
        opacity: 1,
        duration: 6,
      },
      T.orbitIn
    );

    tl.to(
      ".arc-gradient-wrapper",
      {
        opacity: 1,
        duration: 6,
      },
      T.orbitIn
    );

    // =========================
    // SERVICE 1
    // =========================
    tl.to(
      contentRefs.current[1],
      {
        opacity: 1,
        y: 0,
        duration: 7,
      },
      T.orbitIn + 2
    );

    // =========================
    // ROTATION 1
    // =========================
    tl.to(
      orbitRef.current,
      {
        rotate: 90,
        duration: 18,
      },
      T.rot1
    );

    tl.to(
      ".icon-keep-straight",
      {
        rotation: -90,
        duration: 18,
      },
      T.rot1
    );

    tl.to(
      contentRefs.current[1],
      {
        opacity: 0,
        y: -30,
        duration: 5,
      },
      T.rot1
    );

    tl.to(
      contentRefs.current[2],
      {
        opacity: 1,
        y: 0,
        duration: 6,
      },
      T.rot1 + 8
    );

    // =========================
    // ROTATION 2
    // =========================
    tl.to(
      orbitRef.current,
      {
        rotate: 180,
        duration: 18,
      },
      T.rot2
    );

    tl.to(
      ".icon-keep-straight",
      {
        rotation: -180,
        duration: 18,
      },
      T.rot2
    );

    tl.to(
      contentRefs.current[2],
      {
        opacity: 0,
        y: -30,
        duration: 5,
      },
      T.rot2
    );

    tl.to(
      contentRefs.current[3],
      {
        opacity: 1,
        y: 0,
        duration: 6,
      },
      T.rot2 + 8
    );

    // =========================
    // ROTATION 3
    // =========================
    tl.to(
      orbitRef.current,
      {
        rotate: 270,
        duration: 18,
      },
      T.rot3
    );

    tl.to(
      ".icon-keep-straight",
      {
        rotation: -270,
        duration: 18,
      },
      T.rot3
    );

    tl.to(
      contentRefs.current[3],
      {
        opacity: 0,
        y: -30,
        duration: 5,
      },
      T.rot3
    );

    tl.to(
      contentRefs.current[4],
      {
        opacity: 1,
        y: 0,
        duration: 6,
      },
      T.rot3 + 8
    );

    tl.to({}, { duration: 10 });

    // =========================
    // IMPORTANT
    // =========================
    ScrollTrigger.refresh();
  }, section);

  return () => {
    if (glowTicker) {
      gsap.ticker.remove(glowTicker);
    }

    ScrollTrigger.getAll().forEach((trigger) => {
      if (trigger.trigger === section) {
        trigger.kill();
      }
    });

    ctx.revert();
  };
}, []);

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative h-screen overflow-hidden"
      style={{ backgroundColor: "rgb(14,19,26)" }}
    >
      <div
        className="absolute inset-0 z-0"
        style={{ backgroundColor: "rgb(14,19,26)" }}
      />

      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_35%_50%,rgba(56,189,248,0.05),transparent_55%)]" />

      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_70%_50%,rgba(99,102,241,0.04),transparent_50%)]" />

      <div className="relative z-10 mx-auto flex h-full max-w-7xl items-center px-10">
        {/* LEFT */}
        <div className="relative flex w-[629px] items-center justify-center">
          <div className="relative h-[600px] w-[629px]">
            {/* RINGS */}
            <div className="absolute inset-0 rounded-full border border-white/30" />


            {/* ARC */}
            <div
              className="arc-gradient-wrapper absolute inset-0"
              style={{ opacity: 0 }}
            >
              <svg
                className="absolute inset-0 h-full w-full"
                viewBox="0 0 629 600"
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
  d="M 314.5 2 A 312.5 298 0 0 1 314.5 598"
  stroke="url(#arcMulti)"
  strokeWidth="1.5"
  strokeLinecap="round"
  fill="none"
/>

<path
  d="M 314.5 2 A 312.5 298 0 0 1 314.5 598"
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

            <div
  ref={orbitRef}
  className="
    orbit-wrapper
    absolute
    inset-0
    opacity-100
    brightness-125
    contrast-125
    drop-shadow-[0_0_40px_rgba(56,189,248,0.28)]
  "
>
  {/* TOP */}
  <div className="absolute" style={{ left: 314, top: 110 }}>
    <div
      className="icon-keep-straight"
      style={{ transform: "translate(-50%, -50%)" }}
    >
      <ServiceIcon service={services[1]} />
    </div>
  </div>

  {/* RIGHT */}
  <div className="absolute" style={{ left: 520, top: 300 }}>
    <div
      className="icon-keep-straight"
      style={{ transform: "translate(-50%, -50%)" }}
    >
      <ServiceIcon active service={services[0]} />
    </div>
  </div>

  {/* BOTTOM */}
  <div className="absolute" style={{ left: 314, top: 490 }}>
    <div
      className="icon-keep-straight"
      style={{ transform: "translate(-50%, -50%)" }}
    >
      <ServiceIcon service={services[3]} />
    </div>
  </div>

  {/* LEFT */}
  <div className="absolute" style={{ left: 108, top: 300 }}>
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
                className="
  center-core
  relative
  flex
  h-44
  w-44
  items-center
  justify-center
  rounded-full
  border
  border-white/80
  backdrop-blur-xl
  shadow-[0_0_0_1px_rgba(255,255,255,0.08),0_0_40px_rgba(255,255,255,0.08)]
"style={{ backgroundColor: "rgba(6,13,22,0.92)" }}
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
        <div
  className="
    absolute
    left-[833px]
    top-[158px]
    h-[72%]
    w-[2px]
    bg-gradient-to-b
    from-white/0
    via-white/18
    to-white/0
  "
/>

        {/* RIGHT */}
<div className="relative ml-[250px] flex h-[600px] w-[403px] items-center">
  <div className="relative h-full w-full">
    {[introContent, ...services].map((service, i) => (
      <div
        key={i}
        ref={(el) => {
          contentRefs.current[i] = el;
        }}
        className="absolute left-0 top-1/2 w-full -translate-y-1/2 will-change-transform"
      >
        <p className="mb-4 text-[24px] tracking-[0.35em] text-white/40">
          {service.subtitle}
        </p>

        <h2 className="mb-6 max-w-xl text-[40px] font-light leading-[1.08] text-white">
          {service.title}
        </h2>

        <p className="max-w-xl text-[18px] leading-7 text-white/60">
          {service.desc}
        </p>

        {service.items.length > 0 && (
          <div className="mt-10 space-y-7">
            {service.items.map((item) => (
              <div key={item.title} className="flex gap-5">
                <span className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full border border-white/45 bg-white/10 shadow-[0_0_18px_rgba(255,255,255,0.16)]" />

                <div>
                  <p className="text-[16px] text-white">{item.title}</p>

                  <p className="mt-2 max-w-sm text-[16px] leading-6 text-white/45">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        <a
          href="mailto:hello@cirle.com"
          className="mt-10 inline-flex text-[20px] font-medium text-white transition hover:text-white/70"
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
        className={`flex h-[55px] w-[55px] items-center justify-center ${
          active
            ? "opacity-100"
            : "opacity-100"
        }`}
      >
        <Image
    src={service.image}
    alt={service.iconTitle ?? service.title}
    width={55}
    height={55}
    className="object-contain"
  />
      </div>

      <p className="text-[9px] tracking-[0.25em] text-white/50">
        {(service.iconTitle ?? service.title).toUpperCase()}
      </p>
    </div>
  );
}
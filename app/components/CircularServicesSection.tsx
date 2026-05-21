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
  const logoRef = useRef("/logo1.png");
  const [activeIndex, setActiveIndex] = useState(0);
  const [phase, setPhase] = useState<"intro" | "orbit">("intro");

  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);
  const centerLogoRef = useRef<HTMLImageElement | null>(null);

  const isIntro = phase === "intro";
  
  

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
// MAIN TIMELINE (STABLE VERSION)
// =========================

// IMPORTANT: ensure clean state before timeline starts
ScrollTrigger.refresh();

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
    pinSpacing: true,

    // =========================
    // SMOOTHER SNAP (FIXED)
    // =========================
    snap: {
      snapTo: (value) => {
        const snaps = [0, 0.1, 0.2, 0.45, 0.7, 0.95, 1];
        return snaps.reduce((prev, curr) =>
          Math.abs(curr - value) < Math.abs(prev - value) ? curr : prev
        );
      },
      duration: { min: 0.25, max: 0.6 },
      ease: "power2.out",
      directional: true,
    },

    // =========================
    // CLEAN REFRESH HANDLING
    // =========================
    onRefresh: (self) => {
      // prevents transform drift after refresh
      gsap.set(section, {
        clearProps: "transform",
      });

      // ensures correct recalculation after layout shift
      
    },

    onRefreshInit: (self) => {
      // force correct initial measurement
      self.update();
    },
  },
});


ScrollTrigger.create({
  trigger: section,
  start: "top top",
  end: "+=6000",

  onUpdate: (self) => {
    const shouldBeLogo2 = self.progress >= T.orbitIn / 100;

    setLogoSrc(shouldBeLogo2 ? "/logo2.png" : "/logo1.png");
  },
});

ScrollTrigger.create({
  trigger: sectionRef.current,
  start: "top top",
  end: "+=6000",
  scrub: true,
  onUpdate: (self) => {
    const progress = self.progress;

    // 4 services → divide into 4 ranges
    const index = Math.min(
      services.length - 1,
      Math.floor(progress * services.length)
    );

    setActiveIndex(index);
  },
});

ScrollTrigger.create({
  trigger: sectionRef.current,
  start: "top top",
  end: "+=6000",
  scrub: true,

  onUpdate: (self) => {
    const p = self.progress;

    if (p < 0.18) {
      setPhase("intro");
    } else {
      setPhase("orbit");
    }
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

    //

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
    className="relative w-full min-h-screen overflow-hidden flex items-center justify-center"
    style={{ backgroundColor: "rgb(14,19,26)" }}
  >
    {/* GLOBAL BG */}
    <div className="absolute inset-0 bg-[#070b10]" />
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_40%_50%,rgba(56,189,248,0.05),transparent_60%)]" />

    {/* =========================
        FIXED DESIGN FRAME
    ========================== */}
    <div
      className="
        relative
        flex
        items-center
        justify-between
        gap-[80px]
        w-[1440px]   /* 👈 fixed design width */
        h-[800px]    /* 👈 fixed design height */
        scale-[0.95] /* optional slight shrink */
        origin-center
      "
    >

      {/* LEFT */}
      <div className="relative flex w-[650px] items-center justify-center">
        <div className="relative h-[600px] w-[600px]">
          
          {/* ORBIT SYSTEM (UNCHANGED) */}
          <div className="absolute inset-0 rounded-full border border-white/30" />

          <div
            ref={orbitRef}
            className="absolute inset-0 brightness-125 contrast-125"
          >
            {/* icons unchanged */}
            <div className="absolute" style={{ left: 300, top: 100 }}>
              <div className="icon-keep-straight" style={{ transform: "translate(-50%, -50%)" }}>
                <ServiceIcon active={isIntro ? true : activeIndex === 1} service={services[1]} />
              </div>
            </div>

            <div className="absolute" style={{ left: 520, top: 300 }}>
              <div className="icon-keep-straight" style={{ transform: "translate(-50%, -50%)" }}>
                <ServiceIcon active={isIntro ? true : activeIndex === 0} service={services[0]} />
              </div>
            </div>

            <div className="absolute" style={{ left: 300, top: 500 }}>
              <div className="icon-keep-straight" style={{ transform: "translate(-50%, -50%)" }}>
                <ServiceIcon active={isIntro ? true : activeIndex === 3} service={services[3]} />
              </div>
            </div>

            <div className="absolute" style={{ left: 100, top: 300 }}>
              <div className="icon-keep-straight" style={{ transform: "translate(-50%, -50%)" }}>
                <ServiceIcon active={isIntro ? true : activeIndex === 2} service={services[2]} />
              </div>
            </div>
          </div>

          <div
              className="arc-gradient-wrapper absolute inset-0"
              style={{ opacity: 0 }}
            >
              <svg
  className="absolute inset-0 h-full w-full"
  viewBox="0 0 600 600"
  preserveAspectRatio="xMidYMid meet"
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
  d="M 300 0 A 300 300 0 0 1 300 600"
  stroke="url(#arcMulti)"
  strokeWidth="2.5"
  strokeLinecap="round"
  fill="none"
/>

<path
  d="M 300 0 A 300 300 0 0 1 300 600"
  stroke="url(#arcMulti)"
  strokeWidth="12"
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

          {/* CENTER */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="center-core h-[260px] w-[260px] rounded-full border border-white/60 bg-[#0A0f14] flex items-center justify-center">
              <Image src={logoSrc} alt="logo" width={150} height={150} />
            </div>
          </div>
        </div>
      </div>

      {/* DIVIDER (FIXED POSITION RELATIVE TO FRAME) */}
      <div className="w-[2px] h-[70%] bg-gradient-to-b from-transparent via-white/20 to-transparent" />

      {/* RIGHT */}
      <div className="relative w-[520px] h-[700px] flex items-center">
        <div className="relative w-full h-full">
          {[introContent, ...services].map((service, i) => (
            <div
              key={i}
              ref={(el) => {
                contentRefs.current[i] = el;
              }}
              className="absolute top-1/2 -translate-y-1/2 w-full"
            >
              <p className="mb-4 text-[22px] tracking-[0.3em] text-white/40">
                {service.subtitle}
              </p>

              <h2 className="mb-6 text-[42px] font-light leading-tight text-white">
                {service.title}
              </h2>

              <p className="text-[18px] leading-7 text-white/60">
                {service.desc}
              </p>

              {service.items?.length > 0 && (
  <div className="mt-8 space-y-6">
    {service.items.map((item, idx) => (
      <div key={idx} className="flex gap-4">
        {/* dot */}
        <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-white/40" />

        {/* content */}
        <div>
          <p className="text-[16px] text-white">
            {item.title}
          </p>

          <p className="mt-1 text-[14px] leading-6 text-white/50">
            {item.desc}
          </p>
        </div>
      </div>
    ))}
  </div>
)}

              <a className="mt-10 inline-block text-white hover:text-white/70">
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
    <div className="flex flex-col items-center gap-2 transition-all duration-300">
      <div
        className={`flex h-[55px] w-[55px] items-center justify-center transition-all duration-300 ${
          active
            ? "opacity-100 scale-110"
            : "opacity-40 scale-90"
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

      <p
        className={`text-[9px] tracking-[0.25em] transition-all duration-300 ${
          active ? "text-white/90" : "text-white/40"
        }`}
      >
        {(service.iconTitle ?? service.title).toUpperCase()}
      </p>
    </div>
  );
}
"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const introContent = {
  title: "Services",
  subtitle: "WHAT WE DO",
  desc: "We provide expert consulting, audits, training and search services to the life sciences sector.",};

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

const T = {
  introOut:  0,
  orbitIn:   5,
  service1In: 10,
  rot1:      20,
  rot2:      45,
  rot3:      70,
  end:       95,
};

export default function CircularServicesSection() {
  const sectionRef  = useRef<HTMLDivElement>(null);
  const orbitRef    = useRef<HTMLDivElement>(null);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!sectionRef.current || !orbitRef.current) return;

    const initTimer = setTimeout(() => {
      const ctx = gsap.context(() => {

        // ── INITIAL STATE ──────────────────────────────────────
        contentRefs.current.forEach((el, i) => {
          if (!el) return;
          gsap.set(el, { opacity: i === 0 ? 1 : 0, y: i === 0 ? 0 : 40 });
        });
        gsap.set(".orbit-wrapper",        { opacity: 0, scale: 0.92 });
        gsap.set(".right-glow",           { opacity: 0 });
        gsap.set(".icon-keep-straight",   { rotation: 0 });
        gsap.set(".arc-gradient-wrapper", { opacity: 0 });

        // ── AMBIENT ────────────────────────────────────────────
        gsap.to(".center-core", {
          boxShadow: "0 0 50px rgba(255,255,255,0.14), 0 0 140px rgba(56,189,248,0.28), inset 0 0 40px rgba(255,255,255,0.08)",
          duration: 3, repeat: -1, yoyo: true, ease: "sine.inOut",
        });
        gsap.to(".center-logo", {
          filter: "brightness(3) drop-shadow(0 0 12px rgba(255,255,255,1)) drop-shadow(0 0 40px rgba(56,189,248,0.7))",
          duration: 3, repeat: -1, yoyo: true, ease: "sine.inOut",
        });
        gsap.to(".active-dot", {
          scale: 1.7, duration: 2.2, repeat: -1, yoyo: true, ease: "sine.inOut",
          filter: "drop-shadow(0 0 10px rgba(255,255,255,0.95)) drop-shadow(0 0 25px rgba(56,189,248,0.8))",
        });

        // ── MAIN TIMELINE ──────────────────────────────────────
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "+=15000",
            scrub: 2,
            pin: true,
            anticipatePin: 1,
            snap: {
              snapTo: [0, 0.1, 0.2, 0.45, 0.7, 0.95, 1],
              duration: { min: 0.5, max: 1.0 },
              ease: "power2.inOut",
              delay: 0.1,
              directional: true,
            },
          },
        });

        // Phase 0→10: intro out, orbit + arc in, service 1 in
        tl.to(contentRefs.current[0],
          { opacity: 0, y: -40, duration: T.orbitIn - T.introOut, ease: "power2.inOut" },
          T.introOut
        );
        tl.to(".orbit-wrapper",
          { opacity: 1, scale: 1, duration: 8, ease: "power3.out" }, T.orbitIn);
        tl.to(".right-glow",
          { opacity: 1, duration: 8, ease: "power2.out" }, T.orbitIn);
        tl.to(".arc-gradient-wrapper",
          { opacity: 1, duration: 8, ease: "power2.out" }, T.orbitIn);
        tl.to(contentRefs.current[1],
          { opacity: 1, y: 0, duration: 6, ease: "power3.out" }, T.service1In);

        // Phase rot1: -90° → Audits
        tl.to(orbitRef.current,
          { rotate: -90, duration: 18, ease: "power2.inOut" }, T.rot1);
        tl.to(".icon-keep-straight",
          { rotation: 90, duration: 18, ease: "power2.inOut" }, T.rot1);
        tl.to(contentRefs.current[1],
          { opacity: 0, y: -30, duration: 6, ease: "power2.in" }, T.rot1);
        tl.to(contentRefs.current[2],
          { opacity: 1, y: 0, duration: 7, ease: "power3.out" }, T.rot1 + 8);

        // Phase rot2: -180° → Training
        tl.to(orbitRef.current,
          { rotate: -180, duration: 18, ease: "power2.inOut" }, T.rot2);
        tl.to(".icon-keep-straight",
          { rotation: 180, duration: 18, ease: "power2.inOut" }, T.rot2);
        tl.to(contentRefs.current[2],
          { opacity: 0, y: -30, duration: 6, ease: "power2.in" }, T.rot2);
        tl.to(contentRefs.current[3],
          { opacity: 1, y: 0, duration: 7, ease: "power3.out" }, T.rot2 + 8);

        // Phase rot3: -270° → Search
        tl.to(orbitRef.current,
          { rotate: -270, duration: 18, ease: "power2.inOut" }, T.rot3);
        tl.to(".icon-keep-straight",
          { rotation: 270, duration: 18, ease: "power2.inOut" }, T.rot3);
        tl.to(contentRefs.current[3],
          { opacity: 0, y: -30, duration: 6, ease: "power2.in" }, T.rot3);
        tl.to(contentRefs.current[4],
          { opacity: 1, y: 0, duration: 7, ease: "power3.out" }, T.rot3 + 8);

        tl.to({}, { duration: T.end - (T.rot3 + 18) }, T.rot3 + 18);

      }, sectionRef);

      return () => ctx.revert();
    }, 150);

    return () => clearTimeout(initTimer);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen overflow-hidden"
      style={{ backgroundColor: "#0A0F14" }}
    >
      <div className="absolute inset-0 z-0" style={{ backgroundColor: "#0A0F14" }} />
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_35%_50%,rgba(56,189,248,0.05),transparent_55%)]" />
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_70%_50%,rgba(99,102,241,0.04),transparent_50%)]" />

      <div className="relative z-10 mx-auto flex h-full max-w-7xl items-center px-10">

        {/* ── LEFT ─────────────────────────────────────────── */}
        <div className="relative flex w-1/2 items-center justify-center">

          {/*
            Circle geometry:
              Container:  560 × 560px
              Centre:     280, 280
              Outer ring: r = 280  (the container edge)
              Inner ring: r = 220  (inset 60px each side)
              Track mid:  r = 250  (midpoint of 60px gap = 30px from outer)

            To place an icon centred on r=250:
              Use a zero-size anchor div positioned at the radial point,
              then use transform: translate(-50%, -50%) on the icon wrapper.

            Anchor positions (from container top-left):
              TOP:    left=280, top=30      (280 - 250 = 30)
              RIGHT:  left=530, top=280     (280 + 250 = 530)
              BOTTOM: left=280, top=530
              LEFT:   left=30,  top=280
          */}
          <div className="relative h-[560px] w-[560px]">

            {/* Rings */}
            <div className="absolute inset-0 rounded-full border border-white/10" />
            <div className="absolute inset-[60px] rounded-full border border-white/[0.06]" />

            {/* MULTICOLOUR ARC — static, never rotated */}
            <div className="arc-gradient-wrapper absolute inset-0" style={{ opacity: 0 }}>
              <svg
                className="absolute inset-0 h-full w-full"
                viewBox="0 0 560 560"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <linearGradient id="arcMulti" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%"   stopColor="#38bdf8" stopOpacity="0" />
                    <stop offset="18%"  stopColor="#818cf8" stopOpacity="0.85" />
                    <stop offset="36%"  stopColor="#c084fc" stopOpacity="0.95" />
                    <stop offset="50%"  stopColor="#ffffff" stopOpacity="1" />
                    <stop offset="64%"  stopColor="#f472b6" stopOpacity="0.95" />
                    <stop offset="82%"  stopColor="#fb923c" stopOpacity="0.85" />
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
                  stroke="url(#arcMulti)" strokeWidth="1.5"
                  strokeLinecap="round" fill="none"
                />
                <path
                  d="M 280 4 A 276 276 0 0 1 280 556"
                  stroke="url(#arcMulti)" strokeWidth="14"
                  strokeLinecap="round" fill="none"
                  opacity="0.15" filter="url(#arcGlow)"
                />
              </svg>
            </div>

            {/* RIGHT GLOW */}
            <div className="right-glow opacity-0">
              <div className="absolute right-[-140px] top-1/2 h-[320px] w-[320px] -translate-y-1/2 rounded-full bg-cyan-400/10 blur-[160px]" />
              <div className="absolute right-[-70px] top-1/2 h-[180px] w-[180px] -translate-y-1/2 rounded-full bg-cyan-300/15 blur-[90px]" />
              <div className="absolute right-[-20px] top-1/2 h-[90px] w-[90px] -translate-y-1/2 rounded-full bg-cyan-200/20 blur-[40px]" />
              <div className="active-dot absolute right-[-6px] top-1/2 h-5 w-5 -translate-y-1/2 rounded-full">
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-300 via-white to-cyan-400 blur-[2px]" />
                
              </div>
            </div>

            {/* ── ORBIT ─────────────────────────────────────────
                Each icon anchor = zero-size point on the track circle (r=250).
                The icon-keep-straight wrapper uses translate(-50%,-50%)
                so the icon visual centre lands exactly on that point.
            ─────────────────────────────────────────────────── */}
            <div ref={orbitRef} className="orbit-wrapper absolute inset-0">

              {/* TOP  — anchor at (280, 30) */}
              <div
                className="absolute"
                style={{ left: 280, top: 100 }}
              >
                <div
                  className="icon-keep-straight"
                  style={{ transform: "translate(-50%, -50%)" }}
                >
                  <ServiceIcon service={services[3]} />
                </div>
              </div>

              {/* RIGHT — anchor at (530, 280) */}
              <div
                className="absolute"
                style={{ left: 460, top: 280 }}
              >
                <div
                  className="icon-keep-straight"
                  style={{ transform: "translate(-50%, -50%)" }}
                >
                  <ServiceIcon active service={services[0]} />
                </div>
              </div>

              {/* BOTTOM — anchor at (280, 530) */}
              <div
                className="absolute"
                style={{ left: 280, top: 460 }}
              >
                <div
                  className="icon-keep-straight"
                  style={{ transform: "translate(-50%, -50%)" }}
                >
                  <ServiceIcon service={services[1]} />
                </div>
              </div>

              {/* LEFT — anchor at (30, 280) */}
              <div
                className="absolute"
                style={{ left: 100, top: 280 }}
              >
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
                <Image
                  src="/Vector.png" alt="Center Logo"
                  width={72} height={72}
                  className="center-logo"
                />
              </div>
            </div>

          </div>
        </div>

        {/* ── RIGHT ─────────────────────────────────────────── */}
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
                <h2 className="mb-8 text-6xl font-light text-white">
                  {service.title}
                </h2>
                <p className="text-lg text-white/60">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="h-[20000px]" />
    </section>
  );
}

function ServiceIcon({
  service,
  active = false,
}: {
  service: { title: string; image: string };
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
        <Image src={service.image} alt={service.title} width={30} height={30} />
      </div>
      <p className="text-[9px] tracking-[0.25em] text-white/50">
        {service.title.toUpperCase()}
      </p>
    </div>
  );
}
"use client";

import * as React from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import gsap from "gsap";

const caseStudies = [
  {
    id: "1",
    category: "CASE STUDY",
    title: "Why audit readiness is becoming a competitive advantage",
    image: "/pharma.png",
  },
  {
    id: "2",
    category: "CASE STUDY",
    title:
      "Global audit programme reduced compliance risk across multi-site operations",
    image: "/bio.png",
    featured: true,
  },
  {
    id: "3",
    category: "CASE STUDY",
    title:
      "Quality and Clinical Consultancy, and Technical Operations Team Build",
    image: "/medtech.png",
  },
  {
    id: "4",
    category: "CASE STUDY",
    title:
      "Search partnership accelerated executive hiring across regulated teams",
    image: "/pharma.png",
  },
];

export default function CaseStudiesSection() {
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);

  const [canScrollLeft, setCanScrollLeft] = React.useState(false);
  const [canScrollRight, setCanScrollRight] = React.useState(true);

  // -----------------------------------
  // CHECK SCROLL
  // -----------------------------------

  const checkScrollability = React.useCallback(() => {
    const container = scrollContainerRef.current;

    if (!container) return;

    const { scrollLeft, scrollWidth, clientWidth } = container;

    setCanScrollLeft(scrollLeft > 10);

    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  }, []);

  React.useEffect(() => {
    const container = scrollContainerRef.current;

    if (!container) return;

    checkScrollability();

    container.addEventListener("scroll", checkScrollability);

    return () => {
      container.removeEventListener("scroll", checkScrollability);
    };
  }, [checkScrollability]);

  // -----------------------------------
  // GSAP ENTRY
  // -----------------------------------

  React.useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".case-title", {
        opacity: 0,
        y: 40,
        duration: 1.2,
        ease: "power3.out",
      });

      gsap.from(".case-card", {
        opacity: 0,
        y: 80,
        duration: 1.5,
        stagger: 0.12,
        ease: "power4.out",
        delay: 0.2,
      });
    });

    return () => ctx.revert();
  }, []);

  // -----------------------------------
  // SCROLL
  // -----------------------------------

  const scroll = (direction: "left" | "right") => {
    const container = scrollContainerRef.current;

    if (!container) return;

    const scrollAmount = 420;

    container.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <section className="relative overflow-hidden bg-[#020817] py-32">
      {/* BG GLOW */}
      <div className="absolute left-1/2 top-[20%] h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-cyan-400/5 blur-[160px]" />

      {/* CONTAINER */}
      <div className="relative z-10 mx-auto max-w-[1600px]">
        {/* TOP */}
        <div className="mb-20 flex items-start justify-between px-10">
          <div className="max-w-2xl">
            <h2 className="case-title text-6xl font-light leading-[1.05] tracking-[-0.04em] text-white">
              Proven Outcomes in
              <br />
              Regulated Environments
            </h2>
          </div>

          {/* ARROWS */}
          <div className="mt-4 hidden items-center gap-4 md:flex">
            <button
              onClick={() => scroll("left")}
              disabled={!canScrollLeft}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-white/15 text-white/80 transition-all duration-300 hover:border-white/40 hover:bg-white/5 disabled:opacity-30"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <button
              onClick={() => scroll("right")}
              disabled={!canScrollRight}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-white/15 text-white/80 transition-all duration-300 hover:border-white/40 hover:bg-white/5 disabled:opacity-30"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* SLIDER */}
        <div
          ref={scrollContainerRef}
          className="scrollbar-hide flex overflow-x-auto px-10 pb-4"
        >
          <div className="flex gap-8">
            {caseStudies.map((item, index) => (
              <div
                key={item.id}
                className={`case-card group relative shrink-0 overflow-hidden border border-white/6 bg-white/[0.02] ${
                  item.featured
                    ? "w-[420px] h-[520px]"
                    : "w-[390px] h-[520px]"
                }`}
              >
                {/* IMAGE */}
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className={`object-cover transition-all duration-700 group-hover:scale-105 ${
                    item.featured
                      ? "brightness-100 saturate-125"
                      : "brightness-[0.45] grayscale"
                  }`}
                />

                {/* OVERLAYS */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#020817]/10 via-transparent to-[#020817]/90" />

                <div className="absolute inset-0 bg-black/20 transition-all duration-500 group-hover:bg-black/10" />

                {/* TOP LINE */}
                <div className="absolute left-0 top-0 h-px w-full bg-white/8" />

                {/* CONTENT */}
                <div className="absolute inset-0 flex flex-col justify-between p-8">
                  {/* TOP */}
                  <div>
                    <p className="mb-6 text-xs tracking-[0.22em] text-white/35">
                      {item.category}
                    </p>

                    <div className="h-px w-full bg-white/8" />
                  </div>

                  {/* TITLE */}
                  <div>
                    <h3
                      className={`max-w-[90%] font-light leading-[1.45] tracking-[-0.02em] ${
                        item.featured
                          ? "text-[2rem] text-white"
                          : "text-[2rem] text-white/85"
                      }`}
                    >
                      {item.title}
                    </h3>
                  </div>
                </div>

                {/* HOVER GLOW */}
                <div className="absolute inset-0 bg-cyan-300/0 transition-all duration-500 group-hover:bg-cyan-300/[0.03]" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
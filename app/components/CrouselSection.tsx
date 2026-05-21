"use client";

import * as React from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

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
    image: "/pharma1.png",
  },
  {
    id: "5",
    category: "CASE STUDY",
    title:
      "Regulatory transformation programme improved operational efficiency",
    image: "/bio.png",
  },
  {
    id: "6",
    category: "CASE STUDY",
    title:
      "Strategic quality hiring enabled faster GMP manufacturing scale-up",
    image: "/medtech.png",
  },
  {
    id: "7",
    category: "CASE STUDY",
    title:
      "Clinical operations expansion strengthened delivery across EU markets",
    image: "/pharma1.png",
  },
];

export default function CrouselSection() {
  const CARD_WIDTH = 260;
  const CARD_HEIGHT = 390;
  const GAP = 20;

  const duplicatedStudies = [
    ...caseStudies,
    ...caseStudies,
    ...caseStudies,
  ];

  const [currentIndex, setCurrentIndex] = React.useState(
    caseStudies.length
  );

  const [transitionEnabled, setTransitionEnabled] =
    React.useState(true);

  // NEXT
  const handleNext = () => {
    setCurrentIndex((prev) => prev + 1);
  };

  // PREV
  const handlePrev = () => {
    setCurrentIndex((prev) => prev - 1);
  };

  // TRUE INFINITE LOOP
  React.useEffect(() => {
    const total = caseStudies.length;

    if (currentIndex >= total * 2) {
      const timer = setTimeout(() => {
        setTransitionEnabled(false);

        setCurrentIndex(total);

        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            setTransitionEnabled(true);
          });
        });
      }, 700);

      return () => clearTimeout(timer);
    }

    if (currentIndex <= total - 2) {
      const timer = setTimeout(() => {
        setTransitionEnabled(false);

        setCurrentIndex(total + currentIndex);

        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            setTransitionEnabled(true);
          });
        });
      }, 700);

      return () => clearTimeout(timer);
    }
  }, [currentIndex]);

  return (
    <section className="relative overflow-hidden bg-[#0A0F14] py-32">
      {/* BG GLOW */}
      <div className="absolute left-1/2 top-1/2 h-[900px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-400/[0.04] blur-[220px]" />

      {/* TOP FADE */}
      <div className="absolute inset-x-0 top-0 z-10 h-40 bg-gradient-to-b from-[#0A0F14] to-transparent" />

      <div className="relative z-20 mx-auto max-w-[1540px]">
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: -60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            duration: 1,
            ease: [0.22, 1, 0.36, 1],
          }}
          viewport={{ once: true }}
          className="mb-24 flex items-start justify-between px-10"
        >
          <div className="max-w-4xl">
            <h2 className="text-[48px] font-light leading-[0.98] tracking-[-0.07em] text-white">
              Proven Outcomes in
              <br />
              Regulated Environments
            </h2>
          </div>

          {/* CONTROLS */}
          <div className="hidden items-center gap-4 md:flex">
            <button
              onClick={handlePrev}
              className="group flex h-14 w-14 items-center justify-center rounded-full border border-white/15 bg-white/[0.03] text-white/48 transition-all duration-300 hover:border-white/40 hover:bg-white/5"
            >
              <ChevronLeft className="h-5 w-5 transition-transform duration-300 group-hover:-translate-x-0.5" />
            </button>

            <button
              onClick={handleNext}
              className="group flex h-14 w-14 items-center justify-center rounded-full border border-white/15 bg-white/[0.03] text-white/48 transition-all duration-300 hover:border-white/40 hover:bg-white/5"
            >
              <ChevronRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-0.5" />
            </button>
          </div>
        </motion.div>

        {/* CAROUSEL */}
        <div className="overflow-hidden px-10">
          <div
            className={`
              flex items-stretch
              ${
                transitionEnabled
                  ? "transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
                  : ""
              }
            `}
            style={{
              gap: `${GAP}px`,
              transform: `translateX(-${
                currentIndex * (CARD_WIDTH + GAP)
              }px)`,
            }}
          >
            {duplicatedStudies.map((item, index) => {
              const activeRangeStart = currentIndex;
              const activeRangeEnd = currentIndex + 4;

              const isVisible =
                index >= activeRangeStart &&
                index <= activeRangeEnd;

              const centerIndex = currentIndex + 2;

              const distance = Math.abs(index - centerIndex);

              const isCenter = distance === 0;

              return (
                <div
                  key={`${item.id}-${index}`}
                  className={`
                    group
                    relative
                    shrink-0
                    overflow-hidden
                    rounded-[28px]
                    border
                    border-white/10
                    bg-white/[0.03]
                    transition-all
                    duration-700
                    ease-[cubic-bezier(0.22,1,0.36,1)]

                    ${
                      isCenter
                        ? `
                          z-20
                          scale-100
                          opacity-100
                          shadow-[0_0_120px_rgba(34,211,238,0.14)]
                        `
                        : isVisible
                        ? `
                          z-10
                          scale-[0.94]
                          opacity-80
                        `
                        : `
                          scale-[0.82]
                          opacity-25
                        `
                    }
                  `}
                  style={{
                    width: `${CARD_WIDTH}px`,
                    height: `${CARD_HEIGHT}px`,
                  }}
                >
                  {/* IMAGE */}
                  <div className="relative h-full w-full overflow-hidden rounded-[28px]">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      priority
                      sizes="(min-width: 1280px) 20vw, (min-width: 768px) 25vw, 80vw"
                      className={`
                        object-cover
                        transition-all
                        duration-700
                        ease-out
                        group-hover:scale-105

                        ${
                          isCenter
                            ? `
                              grayscale-0
                              brightness-100
                              contrast-110
                              saturate-[1.35]
                            `
                            : `
                              grayscale
                              brightness-[0.45]
                              contrast-125
                            `
                        }
                      `}
                    />

                    {/* OVERLAY */}
                    <div className="absolute inset-0 bg-gradient-to-b from-[#0A0F14]/5 via-transparent to-[#0A0F14]/95" />

                    <div
                      className={`
                        absolute inset-0 transition-all duration-500
                        ${
                          isCenter
                            ? "bg-black/10"
                            : "bg-black/45"
                        }
                      `}
                    />

                    {/* CYAN GLOW */}
                    {isCenter && (
                      <div className="absolute inset-0 bg-cyan-300/[0.04]" />
                    )}

                    {/* CONTENT */}
                    <div className="absolute inset-0 flex flex-col justify-between p-8">
                      <div>
                        <p
                          className={`
                            mb-6 text-[12px] tracking-[0.24em]
                            ${
                              isCenter
                                ? "text-cyan-100/80"
                                : "text-white/35"
                            }
                          `}
                        >
                          {item.category}
                        </p>

                        <div className="h-px w-full bg-white/10" />
                      </div>

                      <div>
                        <h3 className="text-[20px] font-light leading-[1.05] tracking-[-0.055em] text-white transition-all duration-500">
                          {item.title}
                        </h3>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
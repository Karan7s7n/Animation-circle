"use client";

import * as React from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

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
    image: "/pharma.png",
  },
  {
    id: "5",
    category: "CASE STUDY",
    title:
      "Regulatory transformation programme improved operational efficiency",
    image: "/bio.png",
  },
];

export default function CaseStudiesSection() {
  const itemsToShow = 3;

  // DUPLICATE ITEMS FOR INFINITE EFFECT
  const duplicatedStudies = [
    ...caseStudies,
    ...caseStudies,
    ...caseStudies,
  ];

  // START FROM MIDDLE SET
  const [currentIndex, setCurrentIndex] = React.useState(
    caseStudies.length
  );

  const [transitionEnabled, setTransitionEnabled] =
    React.useState(true);

  // -----------------------------------
  // NEXT
  // -----------------------------------

  const handleNext = () => {
    setCurrentIndex((prev) => prev + 1);
  };

  // -----------------------------------
  // PREV
  // -----------------------------------

  const handlePrev = () => {
    setCurrentIndex((prev) => prev - 1);
  };

  // -----------------------------------
  // TRUE INFINITE RESET
  // -----------------------------------

  React.useEffect(() => {
    const total = caseStudies.length;

    // RIGHT EDGE
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

    // LEFT EDGE
    if (currentIndex <= total - itemsToShow) {
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
    <section className="relative overflow-hidden bg-[#020817] py-32">
      {/* BG GLOW */}
      <div className="absolute left-1/2 top-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-400/5 blur-[180px]" />

      <div className="relative z-10 mx-auto max-w-[1600px] px-6">
        {/* HEADER */}
        <div className="mb-20 flex items-start justify-between">
          <div className="max-w-2xl">
            <h2 className="text-5xl font-light leading-[1.05] tracking-[-0.04em] text-white md:text-6xl">
              Proven Outcomes in
              <br />
              Regulated Environments
            </h2>
          </div>

          {/* CONTROLS */}
          <div className="hidden items-center gap-4 md:flex">
            <button
              onClick={handlePrev}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-white/15 text-white/80 transition-all duration-300 hover:border-white/40 hover:bg-white/5"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <button
              onClick={handleNext}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-white/15 text-white/80 transition-all duration-300 hover:border-white/40 hover:bg-white/5"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* CAROUSEL */}
        <div className="overflow-hidden">
          <div
            className={`
              flex gap-8
              ${
                transitionEnabled
                  ? "transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
                  : ""
              }
            `}
            style={{
              transform: `translateX(calc(-${
                currentIndex * (100 / itemsToShow)
              }% - ${currentIndex * (32 / itemsToShow)}px))`,
            }}
          >
            {duplicatedStudies.map((item, index) => {
              const centerIndex = currentIndex + 1;

              const isCenter = index === centerIndex;

              return (
                <div
                  key={`${item.id}-${index}`}
                  className={`
                    group
                    relative
                    shrink-0
                    overflow-hidden
                    border
                    border-white/10
                    bg-white/[0.03]
                    transition-all
                    duration-700
                    ease-[cubic-bezier(0.22,1,0.36,1)]

                    ${
                      isCenter
                        ? `
                          scale-100
                          opacity-100
                          shadow-[0_0_100px_rgba(34,211,238,0.14)]
                        `
                        : `
                          scale-[0.92]
                          opacity-60
                        `
                    }
                  `}
                  style={{
                    flexBasis: `calc((100% / ${itemsToShow}) - ${
                      ((itemsToShow - 1) * 32) /
                      itemsToShow
                    }px)`,
                  }}
                >
                  {/* IMAGE */}
                  <div className="relative h-[560px] overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      priority
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
                              saturate-[1.35]
                              brightness-100
                              contrast-110
                            `
                            : `
                              grayscale
                              saturate-0
                              brightness-[0.45]
                              contrast-125
                            `
                        }
                      `}
                    />

                    {/* OVERLAYS */}
                    <div className="absolute inset-0 bg-gradient-to-b from-[#020817]/5 via-transparent to-[#020817]/95" />

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
                            mb-6 text-xs tracking-[0.24em]

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
                        <h3
                          className={`
                            font-light
                            leading-[1.15]
                            tracking-[-0.03em]
                            transition-all
                            duration-500

                            ${
                              isCenter
                                ? "text-[2.2rem] text-white"
                                : "text-[1.7rem] text-white/75"
                            }
                          `}
                        >
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
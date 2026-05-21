"use client";

import * as React from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

interface CaseStudy {
  id: string;
  category: string;
  title: string;
  image: string;
}

const caseStudies: CaseStudy[] = [
  {
    id: "1",
    category: "CASE STUDY",
    title: "Why audit readiness is becoming a competitive advantage",
    image: "/pharma1.png",
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
    title: "Regulatory transformation programme improved operational efficiency",
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

const CARD_WIDTH = 400;
const CARD_HEIGHT = 525;
const GAP = 20;

export default function CarouselSection() {
  const duplicatedStudies = [
    ...caseStudies,
    ...caseStudies,
    ...caseStudies,
  ];

  const [currentIndex, setCurrentIndex] = React.useState(
    caseStudies.length
  );
  const [transitionEnabled, setTransitionEnabled] = React.useState(true);

  const handleNext = () => setCurrentIndex((prev) => prev + 1);
  const handlePrev = () => setCurrentIndex((prev) => prev - 1);

  React.useEffect(() => {
    const total = caseStudies.length;

    if (currentIndex >= total * 2) {
      const timer = setTimeout(() => {
        setTransitionEnabled(false);
        setCurrentIndex(total);
        requestAnimationFrame(() => {
          requestAnimationFrame(() => setTransitionEnabled(true));
        });
      }, 700);
      return () => clearTimeout(timer);
    }

    if (currentIndex <= total - 2) {
      const timer = setTimeout(() => {
        setTransitionEnabled(false);
        setCurrentIndex(total + currentIndex);
        requestAnimationFrame(() => {
          requestAnimationFrame(() => setTransitionEnabled(true));
        });
      }, 700);
      return () => clearTimeout(timer);
    }
  }, [currentIndex]);

  const getCardVisualStyle = (distance: number) => {
    if (distance === 0) {
      return "opacity-100 z-30";
    }
    if (distance === 1) {
      return "opacity-70 z-20";
    }
    return "opacity-40 z-10";
  };

  const getImageStyle = (isCenter: boolean) => {
    return isCenter
      ? "grayscale-0 brightness-110 contrast-110 saturate-150"
      : "grayscale brightness-50 contrast-125";
  };

  return (
    <section className="relative overflow-hidden bg-[rgb(14,19,26)] py-32">
      <div className="absolute left-1/2 top-1/2 h-[900px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-400/[0.04] blur-[220px]" />

      <div className="relative z-20 mx-auto max-w-[1540px]">
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: -60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="mb-24 flex items-start justify-between px-10"
        >
          <h2 className="text-[48px] font-light leading-[0.98] tracking-[-0.07em] text-white">
            Proven Outcomes in
            <br />
            Regulated Environments
          </h2>

          <div className="hidden md:flex items-center gap-4">
  <button
    onClick={handlePrev}
    aria-label="Previous slide"
    className="group flex h-14 w-14 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/60 transition-all duration-300 hover:border-white/40 hover:bg-white/10 hover:text-white active:scale-95"
  >
    <ChevronLeft className="h-5 w-5 transition-transform duration-300 group-hover:-translate-x-0.5" />
  </button>

  <button
    onClick={handleNext}
    aria-label="Next slide"
    className="group flex h-14 w-14 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/60 transition-all duration-300 hover:border-white/40 hover:bg-white/10 hover:text-white active:scale-95"
  >
    <ChevronRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-0.5" />
  </button>
</div>
        </motion.div>

        {/* CAROUSEL */}
        <div className="overflow-hidden px-[200px]">
          <div
            className={`flex items-stretch ${
              transitionEnabled
                ? "transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
                : ""
            }`}
            style={{
              gap: `${GAP}px`,
              transform: `translateX(-${
                currentIndex * (CARD_WIDTH + GAP) - (CARD_WIDTH + GAP)
              }px)`,
            }}
          >
            {duplicatedStudies.map((item, index) => {
              const centerIndex = currentIndex ;
              const distance = Math.abs(index - centerIndex);
              const isCenter = distance === 0;

              return (
                <div
                  key={`${item.id}-${index}`}
                  className={`group relative shrink-0 overflow-hidden rounded-[28px] border border-white/10 bg-white/5 transition-all duration-700 ${getCardVisualStyle(
                    distance
                  )}`}
                  style={{
                    width: `${CARD_WIDTH}px`,
                    height: `${CARD_HEIGHT}px`,
                  }}
                >
                  <div className="relative h-full w-full overflow-hidden rounded-[28px]">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      priority
                      className={`object-cover transition-all duration-700 group-hover:scale-105 ${getImageStyle(
                        isCenter
                      )}`}
                    />

                    <div
                      className={`absolute inset-0 ${
                        isCenter ? "bg-black/10" : "bg-black/60"
                      }`}
                    />

                    {isCenter && (
                      <div className="absolute inset-0 bg-cyan-300/10" />
                    )}

                    <div className="absolute inset-0 flex flex-col justify-between p-8">
                      <p
                        className={`text-[12px] tracking-[0.24em] ${
                          isCenter ? "text-cyan-100" : "text-white/40"
                        }`}
                      >
                        {item.category}
                      </p>

                      <h3 className="text-[20px] font-light leading-tight text-white">
                        {item.title}
                      </h3>
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
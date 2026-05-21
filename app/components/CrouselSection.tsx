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
  { id: "1", category: "CASE STUDY", title: "Why audit readiness is becoming a competitive advantage", image: "/pharma1.png" },
  { id: "2", category: "CASE STUDY", title: "Global audit programme reduced compliance risk across multi-site operations", image: "/bio.png" },
  { id: "3", category: "CASE STUDY", title: "Quality and Clinical Consultancy, and Technical Operations Team Build", image: "/medtech.png" },
  { id: "4", category: "CASE STUDY", title: "Search partnership accelerated executive hiring across regulated teams", image: "/pharma1.png" },
  { id: "5", category: "CASE STUDY", title: "Regulatory transformation programme improved operational efficiency", image: "/bio.png" },
  { id: "6", category: "CASE STUDY", title: "Strategic quality hiring enabled faster GMP manufacturing scale-up", image: "/medtech.png" },
  { id: "7", category: "CASE STUDY", title: "Clinical operations expansion strengthened delivery across EU markets", image: "/pharma1.png" },
];

export default function CarouselSection() {
  const duplicated = [...caseStudies, ...caseStudies, ...caseStudies];

  const [currentIndex, setCurrentIndex] = React.useState(caseStudies.length);
  const [transitionEnabled, setTransitionEnabled] = React.useState(true);

  const CARD_GAP = 24;

  // ✅ responsive card size (THIS FIXES EVERYTHING)
  const getCardWidth = () => {
    if (typeof window === "undefined") return 340;
    if (window.innerWidth < 640) return 260;
    if (window.innerWidth < 1024) return 320;
    return 380;
  };

  const [cardWidth, setCardWidth] = React.useState(380);

  React.useEffect(() => {
    const update = () => setCardWidth(getCardWidth());
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const handleNext = () => setCurrentIndex((p) => p + 1);
  const handlePrev = () => setCurrentIndex((p) => p - 1);

  const CENTER_OFFSET = -1; 

  const centerIndex = currentIndex + CENTER_OFFSET;

  return (
    <section className="relative overflow-hidden bg-[rgb(14,19,26)] py-24">
      {/* background glow */}
      <div className="absolute left-1/2 top-1/2 h-[900px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-400/[0.04] blur-[220px]" />

      {/* FULL WIDTH WRAPPER */}
      <div className="relative w-full px-6 sm:px-10 lg:px-20">
        
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16 flex items-start justify-between"
        >
          <h2 className="text-[40px] md:text-[48px] font-light leading-tight text-white">
            Proven Outcomes in <br /> Regulated Environments
          </h2>

          <div className="hidden md:flex gap-4">
            <button onClick={handlePrev} className="h-12 w-12 rounded-full border border-white/20 bg-white/5 text-white">
              <ChevronLeft />
            </button>
            <button onClick={handleNext} className="h-12 w-12 rounded-full border border-white/20 bg-white/5 text-white">
              <ChevronRight />
            </button>
          </div>
        </motion.div>

        {/* CAROUSEL */}
        <div className="w-full overflow-hidden">
          <div className="px-[50vw]">
          <div
            className={`flex items-stretch ${transitionEnabled ? "transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]" : ""}`}
            style={{
              gap: `${CARD_GAP}px`,
              transform: `translateX(-${(centerIndex - CENTER_OFFSET) * (cardWidth + CARD_GAP)}px)`,
            }}
          >
            {duplicated.map((item, index) => {
              const distance = Math.abs(index - centerIndex);
              const isCenter = distance === 0;

              return (
                <div
  key={index}
  className={`group shrink-0 rounded-2xl overflow-hidden border border-white/10 transition-all duration-500
    ${isCenter ? "opacity-100 scale-100 z-20" : "opacity-60 scale-[0.92] hover:opacity-100 hover:scale-100 hover:z-10"}
  `}
  style={{
    width: `${cardWidth}px`,
    height: `${cardWidth * 1.35}px`,
  }}
>
                  <div className="relative h-full w-full">
                    <Image
  src={item.image}
  alt={item.title}
  fill
  className={`object-cover transition-all duration-700
    ${isCenter ? "grayscale-0" : "grayscale group-hover:grayscale-0"}
  `}
/>

                    <div className="absolute inset-0 bg-black/40" />

                    <div className="absolute inset-0 flex flex-col justify-between p-6">
                      <p className="text-[12px] tracking-[0.2em] text-white/50">
                        {item.category}
                      </p>

                      <h3 className="text-[18px] md:text-[20px] font-light text-white">
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
      </div>
    </section>
  );
}
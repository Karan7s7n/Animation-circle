"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FiArrowRight } from "react-icons/fi";

gsap.registerPlugin(ScrollTrigger);

export default function CoordinatedSystemSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const text =
    "Not separate services, but one coordinated system. Aligning regulatory expertise, audit delivery and specialist talent.";

  useEffect(() => {
    if (!sectionRef.current) return;

    const chars = sectionRef.current.querySelectorAll(".char");

    const ctx = gsap.context(() => {
      // initial state (grey)
      gsap.set(chars, {
        color: "rgba(255,255,255,0.18)",
      });

      // cursor blink
      gsap.to(".cursor", {
        opacity: 0,
        repeat: -1,
        yoyo: true,
        duration: 0.5,
        ease: "none",
      });

      // scroll reveal per character
      gsap.to(chars, {
        color: "#ffffff",
        stagger: 0.02,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          end: "top 20%",
          scrub: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-[rgb(14,19,26)] py-32 text-white"
    >
      <div className="mx-auto max-w-6xl px-8 lg:px-0">

        {/* TEXT */}
        <h2 className="text-[48px] font-light leading-[1.25] tracking-[-0.03em]">
          {text.split(" ").map((word, wi) => (
            <span key={wi} className="inline-block mr-[10px]">
              {word.split("").map((char, ci) => (
                <span key={ci} className="char inline-block">
                  {char}
                </span>
              ))}
            </span>
          ))}
        </h2>


        {/* BUTTON */}
        <a
          href="/about"
          className="mt-14 inline-flex items-center gap-2 text-[20px] font-medium text-white hover:text-white/70"
        >
          About Us
          <FiArrowRight className="text-[18px]" />
        </a>

      </div>
    </section>
  );
}
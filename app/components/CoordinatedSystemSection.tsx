"use client";

import { FiArrowRight } from "react-icons/fi";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function CoordinatedSystemSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const text =
    "Not separate services, but one coordinated system. Aligning regulatory expertise, audit delivery and specialist talent.";

  const words = text.split(" ");

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // WORDS
      gsap.set(".reveal-word", {
        color: "rgba(255,255,255,0.14)",
      });

      gsap.to(".reveal-word", {
        color: "rgba(255,255,255,1)",
        stagger: 0.08,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          end: "top 20%",
          scrub: 1,
        },
      });

      // BUTTON
      gsap.fromTo(
        ".about-btn",
        {
          opacity: 0,
          y: 20,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 55%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#0A0F14] py-32 text-white"
    >
      <div className="mx-auto max-w-6xl px-8 lg:px-0">
        {/* TEXT */}
        <h2
          className="
            max-w-5xl
            text-[48px]
            font-light
            leading-[1.22]
            tracking-[-0.045em]
          "
        >
          {words.map((word, index) => (
            <span
              key={index}
              className="reveal-word inline-block"
              style={{
                marginRight: "0.28em",
                color: "rgba(255,255,255,0.14)",
              }}
            >
              {word}
            </span>
          ))}
        </h2>

        {/* BUTTON */}
        <a
          href="/about"
          className="
            about-btn
            mt-14
            inline-flex
            h-[62px]
            w-[162px]
            items-center
            justify-center
            gap-2
            rounded-full
            border
            border-white/12
            bg-white/[0.03]
            text-base
            font-medium
            text-white
            backdrop-blur-xl
            transition-all
            duration-300
            hover:border-white/30
            hover:bg-white/[0.06]
          "
        >
          <span>About Us</span>

          <FiArrowRight className="text-[18px]" />
        </a>
      </div>
    </section>
  );
}
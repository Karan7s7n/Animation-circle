"use client";

import { FiArrowRight } from "react-icons/fi";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function CoordinatedSystemSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  
  useEffect(() => {
  if (!sectionRef.current) return;

  const ctx = gsap.context(() => {
    // INIT STATE
    gsap.set(".reveal-word", {
      color: "rgba(255,255,255,0.14)",
    });

    // TEXT ANIMATION
    gsap.to(".reveal-word", {
      color: "rgba(255,255,255,1)",
      stagger: 0.25,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        end: "bottom 30%",
        scrub: 1,
        invalidateOnRefresh: true,
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
          start: "top 60%",
          toggleActions: "play none none reverse",
        },
      }
    );

    // 🔥 IMPORTANT FIX
    ScrollTrigger.refresh();
  }, sectionRef);

  return () => ctx.revert();
}, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[rgb(14,19,26)] py-32 text-white"
    >
      <div className="mx-auto max-w-6xl px-8 lg:px-0">
        {/* TEXT */}
        <h2 className="max-w-5xl text-[48px] font-light leading-[1.22] tracking-[-0.045em]">
          <span className="reveal-word">Not separate services, but one coordinated</span>
          <br />
          <span className="reveal-word">system. Aligning regulatory expertise, audit</span>
          <br />
          <span className="reveal-word">delivery and specialist talent.</span>
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
            text-base
            font-medium
            text-white
            backdrop-blur-xl
            transition-all
            duration-300
          "
        >
          <span>About Us</span>
          <FiArrowRight className="text-[18px]" />
        </a>
      </div>
    </section>
  );
}
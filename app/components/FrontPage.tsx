"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const cards = [
  {
    title: "Pharmaceuticals",
    image: "/pharma1.png",
    nextImage: "/name1.png",
  },
  {
    title: "Medtech",
    image: "/medtech.png",
    nextImage: "/name2.png",
  },
  {
    title: "Biotechnology",
    image: "/bio.png",
    nextImage: "/name3.png",
  },
];

export default function FrontPage() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context((self) => {
      const q = self.selector;
      if (!q) return;

      gsap.set(q("[data-hero-logo], [data-hero-cta]"), {
        autoAlpha: 0,
        y: -10,
      });

      gsap.set(q("[data-hero-title]"), { autoAlpha: 0, y: 32 });
      gsap.set(q("[data-hero-copy]"), { autoAlpha: 0, y: 18 });

      gsap.set(q("[data-hero-content], [data-hero-card]"), {
        force3D: true,
        willChange: "transform, opacity",
      });

      // second image hidden initially
      gsap.set(q("[data-next-image]"), {
        autoAlpha: 0,
        scale: 1.05,
      });

      if (reduceMotion) {
        gsap.set(
          q(
            "[data-hero-logo], [data-hero-cta], [data-hero-title], [data-hero-copy]"
          ),
          { autoAlpha: 1, y: 0 }
        );
        return;
      }

      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .to(q("[data-hero-logo], [data-hero-cta]"), {
          autoAlpha: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.06,
        })
        .to(
          q("[data-hero-title]"),
          { autoAlpha: 1, y: 0, duration: 1.05 },
          "-=0.38"
        )
        .to(
          q("[data-hero-copy]"),
          { autoAlpha: 1, y: 0, duration: 0.85 },
          "-=0.62"
        );

      const cards = q("[data-hero-card]");


cards.forEach((card: Element) => {
  const currentImage = card.querySelector(
    "[data-current-image]"
  ) as HTMLElement;

  const nextImage = card.querySelector(
    "[data-next-image]"
  ) as HTMLElement;

  // DEFAULT STATE
  gsap.set(currentImage, {
    autoAlpha: 0,
    scale: 1,
  });

  gsap.set(nextImage, {
    autoAlpha: 1,
    scale: 1,
  });

  // HOVER IN
  card.addEventListener("mouseenter", () => {
    gsap.to(nextImage, {
      autoAlpha: 0,
      scale: 1.04,
      duration: 0.45,
      ease: "power3.out",
    });

    gsap.to(currentImage, {
      autoAlpha: 1,
      scale: 1,
      duration: 0.45,
      ease: "power3.out",
    });
  });

  // HOVER OUT
  card.addEventListener("mouseleave", () => {
    gsap.to(currentImage, {
      autoAlpha: 0,
      scale: 1.04,
      duration: 0.45,
      ease: "power3.out",
    });

    gsap.to(nextImage, {
      autoAlpha: 1,
      scale: 1,
      duration: 0.45,
      ease: "power3.out",
    });
  });

  // SCROLL OUT
  gsap.to(card, {
    y: -40,
    autoAlpha: 0,
    ease: "none",

    scrollTrigger: {
      trigger: section,
      start: "top top",
      end: "bottom top",
      scrub: 0.6,
    },
  });
});

      gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom top",
          scrub: 0.6,
          invalidateOnRefresh: true,
        },
      }).to(
        q("[data-hero-content]"),
        {
          y: -70,
          autoAlpha: 0,
          ease: "none",
          duration: 1,
        },
        0
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-[100svh] min-h-[640px] overflow-hidden bg-[#0A0F14] text-white"
      aria-label="Life sciences regulatory consulting"
    >
      <div className="absolute inset-0 bg-[#0A0F14]" />

      <div className="absolute inset-x-0 top-0 h-[56vh] bg-[radial-gradient(circle_at_50%_24%,rgba(40,76,120,0.12),transparent_34%),linear-gradient(180deg,rgba(10,15,20,0.22),rgba(10,15,20,0.96)_88%)]" />

      <header className="absolute left-0 top-0 z-40 flex w-full items-start justify-between px-7 py-7 sm:px-10 sm:py-8">
        <div data-hero-logo className="relative h-9 w-9 sm:h-10 sm:w-10">
          <Image
            src="/logo2.png"
            alt="Cirle"
            fill
            priority
            sizes="40px"
            className="object-contain brightness-[9]"
          />
        </div>

        <a
          data-hero-cta
          href="mailto:hello@cirle.com"
          className="inline-flex h-10 items-center rounded-lg border border-white/35 bg-white/[0.015] px-4 text-[13px] font-medium text-white shadow-[0_1px_0_rgba(255,255,255,0.08)_inset] transition hover:border-white/60 hover:bg-white/[0.055] focus:outline-none focus:ring-2 focus:ring-white/60 sm:h-[42px] sm:px-5"
        >
          Schedule a Call&nbsp;→
        </a>
      </header>

      <div
        data-hero-content
        className="relative z-30 mx-auto flex h-[50vh] max-w-5xl flex-col items-center justify-center px-6 pb-7 pt-24 text-center sm:h-[49vh] sm:pt-20"
      >
        <h1
          data-hero-title
          className="max-w-4xl text-balance text-[clamp(2.75rem,5.15vw,4.6rem)] font-normal leading-[0.95] tracking-[-0.045em] text-white"
        >
          Regulatory Confidence.
          <br />
          Built for Life Sciences.
        </h1>

        <p
          data-hero-copy
          className="mt-6 max-w-xl text-pretty text-[13px] leading-5 text-white/35 sm:text-sm"
        >
          We help life sciences organisations move faster through regulation,
          reduce risk, and build the teams that deliver.
        </p>
      </div>

      <div className="absolute inset-x-0 bottom-0 z-20 grid h-[51vh] min-h-[320px] grid-cols-1 sm:grid-cols-3">
        {cards.map((card) => (
          <article
            data-hero-card
            key={card.title}
            className="relative min-h-0 overflow-hidden border-t border-white/[0.03] will-change-transform sm:border-l sm:border-t-0 sm:first:border-l-0"
          >
            {/* ORIGINAL IMAGE */}
            <div
              data-current-image
              className="absolute inset-0"
            >
              <Image
  src={card.image}
  alt=""
  fill
  priority
  sizes="(min-width: 640px) 33vw, 100vw"
  className="object-cover object-[center_top]"
/>
            </div>

            {/* NEW IMAGE */}
            <div
              data-next-image
              className="absolute inset-0"
            >
              <Image
  src={card.nextImage}
  alt=""
  fill
  priority
  sizes="(min-width: 640px) 33vw, 100vw"
  className="object-cover object-[center_top]"
/>
            </div>

            <div className="absolute inset-x-0 bottom-[18%] z-10 px-6 text-center sm:bottom-[22%]">
              <h2 className="text-[clamp(1.2rem,2vw,1.55rem)] font-normal leading-none tracking-[-0.03em] text-white drop-shadow-[0_2px_14px_rgba(0,0,0,0.95)]">
                {card.title}
              </h2>
            </div>

            <a
              href="#services"
              className="absolute inset-0 z-20 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-cyan-200"
              aria-label={`Explore ${card.title}`}
            />
          </article>
        ))}
      </div>
    </section>
  );
}
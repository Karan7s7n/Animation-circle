"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Each industry panel — label, description, big word, and a canvas-rendered generative image
const industries = [
  {
    label: "LEGAL & TAX",
    description:
      "Review contracts, draft briefs, access client knowledge — locally and in full compliance.",
    word: "Legal",
    // Color palette for the generative art — matching the video's blue/pink heatmap
    palette: {
      bg: "#0a0a1a",
      colors: ["#1a1aff", "#6644cc", "#cc44aa", "#ff88bb", "#ffffff"],
    },
  },
  {
    label: "HEALTHCARE",
    description:
      "Summarize findings, draft referral letters, speed up documentation — GDPR-compliant, right in your practice.",
    word: "Healthcare",
    // Yellow/orange/blue streaks
    palette: {
      bg: "#050510",
      colors: ["#0a0a2a", "#2244aa", "#4488dd", "#ddaa22", "#ffee66"],
    },
  },
  {
    label: "BUSINESS",
    description:
      "Leverage internal knowledge, analyze contracts, accelerate processes — without sharing data with third parties.",
    word: "Enterprises",
    // Red/orange/blue heatmap
    palette: {
      bg: "#0a0000",
      colors: ["#110000", "#880000", "#dd2200", "#ff6600", "#ffaa44", "#4488ff"],
    },
  },
  {
    label: "TECH",
    description:
      "Generate code, write tests, create documentation — locally, with full control over models and data.",
    word: "Developers",
    // Purple/violet with orange core
    palette: {
      bg: "#08000f",
      colors: ["#0a0015", "#3300aa", "#6600cc", "#9922ee", "#ff6600", "#ffaa22"],
    },
  },
];

// Draw a generative vertical-stripe heatmap on a canvas
function drawHeatmap(
  canvas: HTMLCanvasElement,
  palette: { bg: string; colors: string[] },
  seed: number
) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const W = canvas.width;
  const H = canvas.height;

  // Fill background
  ctx.fillStyle = palette.bg;
  ctx.fillRect(0, 0, W, H);

  const numStripes = 18;
  const stripeW = W / numStripes;

  // Seeded pseudo-random
  const rand = (n: number) => {
    const x = Math.sin(seed * 9301 + n * 49297 + 233) * 43758.5453;
    return x - Math.floor(x);
  };

  for (let s = 0; s < numStripes; s++) {
    const x = s * stripeW;
    const centerY = H * (0.3 + rand(s * 3) * 0.4);
    const intensity = 0.4 + rand(s * 3 + 1) * 0.6;
    const spread = H * (0.15 + rand(s * 3 + 2) * 0.35);

    // Draw each stripe as a vertical gradient blob
    const grad = ctx.createLinearGradient(x, centerY - spread, x, centerY + spread);

    const colors = palette.colors;
    const numColors = colors.length;

    grad.addColorStop(0, "transparent");
    if (intensity > 0.7) {
      // Bright core stripe
      grad.addColorStop(0.2, hexAlpha(colors[Math.floor(rand(s + 10) * (numColors - 2))], 0.3));
      grad.addColorStop(0.45, hexAlpha(colors[numColors - 2], 0.7 * intensity));
      grad.addColorStop(0.5, hexAlpha(colors[numColors - 1], intensity));
      grad.addColorStop(0.55, hexAlpha(colors[numColors - 2], 0.7 * intensity));
      grad.addColorStop(0.8, hexAlpha(colors[Math.floor(rand(s + 11) * (numColors - 2))], 0.3));
    } else {
      const ci = Math.floor(rand(s + 20) * (numColors - 1));
      grad.addColorStop(0.3, hexAlpha(colors[ci], 0.2 * intensity));
      grad.addColorStop(0.5, hexAlpha(colors[Math.min(ci + 1, numColors - 1)], 0.5 * intensity));
      grad.addColorStop(0.7, hexAlpha(colors[ci], 0.2 * intensity));
    }
    grad.addColorStop(1, "transparent");

    ctx.fillStyle = grad;
    ctx.fillRect(x, centerY - spread, stripeW * (0.6 + rand(s * 7) * 0.8), spread * 2);
  }

  // Overlay a soft radial "hot spot" in center
  const spotX = W * (0.3 + rand(seed * 7) * 0.4);
  const spotY = H * (0.35 + rand(seed * 8) * 0.3);
  const spotR = Math.min(W, H) * (0.2 + rand(seed * 9) * 0.2);
  const spot = ctx.createRadialGradient(spotX, spotY, 0, spotX, spotY, spotR);
  spot.addColorStop(0, hexAlpha(palette.colors[palette.colors.length - 1], 0.25));
  spot.addColorStop(0.5, hexAlpha(palette.colors[palette.colors.length - 2], 0.1));
  spot.addColorStop(1, "transparent");
  ctx.fillStyle = spot;
  ctx.fillRect(0, 0, W, H);
}

function hexAlpha(hex: string, alpha: number): string {
  // Convert hex color to rgba
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}

function GenerativeCanvas({
  palette,
  seed,
}: {
  palette: { bg: string; colors: string[] };
  seed: number;
}) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.width = 620;
      ref.current.height = 620;
      drawHeatmap(ref.current, palette, seed);
    }
  }, [palette, seed]);

  return (
    <canvas
      ref={ref}
      style={{
        width: "100%",
        height: "100%",
        display: "block",
      }}
    />
  );
}

export default function IndustryScrollSection() {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const panels = gsap.utils.toArray<HTMLElement>(".industry-panel");
    if (!panels.length || !wrapperRef.current) return;

    const ctx = gsap.context(() => {
      panels.forEach((panel) => {
        const label = panel.querySelector<HTMLElement>(".panel-label");
        const desc = panel.querySelector<HTMLElement>(".panel-desc");
        const word = panel.querySelector<HTMLElement>(".panel-word");
        const image = panel.querySelector<HTMLElement>(".panel-image");

        // Set initial states
        gsap.set(word, { yPercent: 110, opacity: 0 });
        gsap.set(label, { opacity: 0, y: 12 });
        gsap.set(desc, { opacity: 0, y: 16 });
        gsap.set(image, { opacity: 0, scale: 0.97 });

        // Animate in on scroll
        ScrollTrigger.create({
          trigger: panel,
          start: "top 75%",
          end: "bottom 25%",
          onEnter: () => {
            gsap.timeline()
              .to(label, { opacity: 1, y: 0, duration: 0.55, ease: "power2.out" })
              .to(desc, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }, "-=0.3")
              .to(image, { opacity: 1, scale: 1, duration: 0.8, ease: "power2.out" }, "-=0.4")
              .to(word, { yPercent: 0, opacity: 1, duration: 0.85, ease: "power3.out" }, "-=0.5");
          },
          onLeaveBack: () => {
            gsap.timeline()
              .to(word, { yPercent: 110, opacity: 0, duration: 0.5, ease: "power2.in" })
              .to(image, { opacity: 0, scale: 0.97, duration: 0.4, ease: "power2.in" }, "-=0.3")
              .to(label, { opacity: 0, y: 12, duration: 0.3 }, "-=0.3")
              .to(desc, { opacity: 0, y: 16, duration: 0.3 }, "-=0.3");
          },
        });
      });
    }, wrapperRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={wrapperRef}
      style={{
        backgroundColor: "#e8e8e8",
        fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif",
      }}
    >
      {industries.map((industry, i) => (
        <section
          key={industry.label}
          className="industry-panel"
          style={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            padding: "80px 0",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* LEFT: label + desc top, big word bottom */}
          <div
            style={{
              width: "52%",
              paddingLeft: "clamp(32px, 4vw, 56px)",
              paddingRight: "24px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              alignSelf: "stretch",
              paddingTop: "32px",
              paddingBottom: "24px",
            }}
          >
            {/* Top-left content */}
            <div>
              <p
                className="panel-label"
                style={{
                  fontSize: "11px",
                  letterSpacing: "0.18em",
                  color: "#111",
                  marginBottom: "14px",
                  fontWeight: 500,
                }}
              >
                {industry.label}
              </p>
              <p
                className="panel-desc"
                style={{
                  fontSize: "clamp(15px, 1.4vw, 17px)",
                  lineHeight: 1.65,
                  color: "#1a1a1a",
                  maxWidth: 380,
                  fontWeight: 400,
                }}
              >
                {industry.description}
              </p>
            </div>

            {/* Bottom-left: giant word */}
            <div style={{ overflow: "hidden", paddingTop: "32px" }}>
              <h2
                className="panel-word"
                style={{
                  fontSize: "clamp(64px, 9vw, 128px)",
                  fontWeight: 700,
                  color: "#0a0a0a",
                  lineHeight: 0.88,
                  letterSpacing: "-0.03em",
                  margin: 0,
                  fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif",
                }}
              >
                {industry.word}
              </h2>
            </div>
          </div>

          {/* RIGHT: generative art image */}
          <div
            style={{
              width: "48%",
              paddingRight: "clamp(24px, 3vw, 40px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
            }}
          >
            <div
              className="panel-image"
              style={{
                width: "min(620px, 100%)",
                aspectRatio: "1 / 1",
                borderRadius: "4px",
                overflow: "hidden",
                boxShadow: "0 8px 48px rgba(0,0,0,0.18)",
              }}
            >
              <GenerativeCanvas palette={industry.palette} seed={i + 1} />
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}

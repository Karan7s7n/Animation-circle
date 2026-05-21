"use client";

import Image from "next/image";
import Link from "next/link";
import { FiInstagram, FiLinkedin } from "react-icons/fi";

const services = [
  "Consulting",
  "Audits",
  "Search & Selection",
  "Training",
];

const quickLinks = [
  "About",
  "Contact",
  "Case Studies",
  "Press & Media",
  "Blogs",
  "Careers",
];

const legalLinks = [
  "Terms & Conditions",
  "Privacy Policy",
  "Cookie Policy",
];

export default function Footer() {
  return (
    <footer
      className="relative overflow-hidden border-t border-white/5 bg-[#0A0F14]"
      style={{
        fontFamily: '"Test Söhne", sans-serif',
      }}
    >
      {/* BG GLOW */}
      <div className="absolute left-1/2 top-0 h-[400px] w-[400px] -translate-x-1/2 rounded-full bg-cyan-400/[0.03] blur-[140px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-10 py-20">
        <div className="grid grid-cols-1 gap-16 md:grid-cols-[1.5fr_1fr_1fr_1fr_1fr]">
          {/* LEFT */}
          <div className="flex flex-col justify-between">
            <div>
              {/* LOGO */}
              <div className="flex items-center gap-4">
                <div className="relative h-14 w-14">
                  <Image
                    src="/logo2.png"
                    alt="Logo"
                    fill
                    sizes="56px"
                    className="object-contain brightness-[12]"
                  />
                </div>

                <h2 className="text-5xl font-light tracking-[-0.05em] text-white">
                  RRxCo.
                </h2>
              </div>

              {/* GREY TEXT = 14 */}
              <p className="mt-12 max-w-[240px] text-[14px] leading-7 text-white/75">
                Regulatory Confidence.
                <br />
                Built for Life Sciences.
              </p>
            </div>

            {/* GREY TEXT = 14 */}
            <p className="mt-20 text-[14px] text-white/35">
              © 2025 RRxCo. All Rights Reserved
            </p>
          </div>

          {/* SERVICES */}
          <div>
            {/* WHITE TEXT = 16 */}
            <h3 className="mb-8 text-[16px] font-medium text-white">
              Services
            </h3>

            <div className="space-y-5">
              {services.map((item) => (
                <Link
                  key={item}
                  href="#"
                  className="
                    block
                    text-[14px]
                    text-white/55
                    transition-colors
                    duration-300
                    hover:text-white
                  "
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>

          {/* QUICK LINKS */}
          <div>
            {/* WHITE TEXT = 16 */}
            <h3 className="mb-8 text-[16px] font-medium text-white">
              Quick Links
            </h3>

            <div className="space-y-5">
              {quickLinks.map((item) => (
                <Link
                  key={item}
                  href="#"
                  className="
                    block
                    text-[14px]
                    text-white/55
                    transition-colors
                    duration-300
                    hover:text-white
                  "
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>

          {/* LEGAL */}
          <div>
            {/* WHITE TEXT = 16 */}
            <h3 className="mb-8 text-[16px] font-medium text-white">
              Legal
            </h3>

            <div className="space-y-5">
              {legalLinks.map((item) => (
                <Link
                  key={item}
                  href="#"
                  className="
                    block
                    text-[14px]
                    text-white/55
                    transition-colors
                    duration-300
                    hover:text-white
                  "
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>

          {/* CONTACT */}
          <div>
            {/* WHITE TEXT = 16 */}
            <h3 className="mb-8 text-[16px] font-medium text-white">
              Get in Touch
            </h3>

            <div className="space-y-5">
              <a
                href="mailto:info@rrxco.com"
                className="
                  block
                  text-[14px]
                  text-white/55
                  transition-colors
                  duration-300
                  hover:text-white
                "
              >
                info@rrxco.com
              </a>

              <a
                href="tel:+4401256961200"
                className="
                  block
                  text-[14px]
                  text-white/55
                  transition-colors
                  duration-300
                  hover:text-white
                "
              >
                +44 (0) 1256 961 200
              </a>

              {/* SOCIALS */}
              <div className="flex items-center gap-5 pt-2">
                <Link
                  href="#"
                  className="
                    text-white/60
                    transition-all
                    duration-300
                    hover:scale-110
                    hover:text-white
                  "
                >
                  <FiInstagram className="h-5 w-5" />
                </Link>

                <Link
                  href="#"
                  className="
                    text-white/60
                    transition-all
                    duration-300
                    hover:scale-110
                    hover:text-white
                  "
                >
                  <FiLinkedin className="h-5 w-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
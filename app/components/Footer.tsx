"use client";

import Image from "next/image";
import Link from "next/link";
import { FiInstagram, FiLinkedin } from "react-icons/fi";

const services = ["Consulting", "Audits", "Search & Selection", "Training"];
const quickLinks = ["About", "Contact", "Case Studies", "Press & Media", "Blogs", "Careers"];
const legalLinks = ["Terms & Conditions", "Privacy Policy", "Cookie Policy"];

export default function Footer() {
  return (
    <footer className="relative w-full overflow-hidden border-t border-white/5 bg-[rgb(14,19,26)]">
      
      {/* GLOW */}
      <div className="absolute left-1/2 top-0 h-[350px] w-[350px] -translate-x-1/2 rounded-full bg-cyan-400/[0.03] blur-[140px]" />

      {/* FULL WIDTH WRAPPER */}
      <div className="relative z-10 w-full px-6 sm:px-10 lg:px-16 xl:px-24 py-16 lg:py-24">
        
        {/* RESPONSIVE GRID */}
  
  <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16 w-full">

    {/* LEFT (3 cols) */}
    <div className="md:col-span-3 flex flex-col justify-between">
      <div>
        <div className="flex items-center gap-4">
          <div className="relative h-14 w-14">
            <Image
              src="/logo2.png"
              alt="Logo"
              fill
              className="object-contain brightness-[12]"
            />
          </div>

          <h2 className="text-4xl lg:text-5xl font-light text-white">
            RRxCo.
          </h2>
        </div>

        <p className="mt-10 text-[14px] leading-7 text-white/75 max-w-[260px]">
          Regulatory Confidence.
          <br />
          Built for Life Sciences.
        </p>
      </div>

      <p className="mt-16 text-[14px] text-white/35">
        © 2025 RRxCo. All Rights Reserved
      </p>
    </div>

    {/* SERVICES (2 cols) */}
    <div className="md:col-span-2">
      <h3 className="mb-6 text-[15px] font-medium text-white">Services</h3>
      <div className="space-y-3">
        {services.map((item) => (
          <Link key={item} href="#" className="block text-[14px] text-white/55 hover:text-white">
            {item}
          </Link>
        ))}
      </div>
    </div>

    {/* QUICK LINKS (2 cols) */}
    <div className="md:col-span-2">
      <h3 className="mb-6 text-[15px] font-medium text-white">Quick Links</h3>
      <div className="space-y-3">
        {quickLinks.map((item) => (
          <Link key={item} href="#" className="block text-[14px] text-white/55 hover:text-white">
            {item}
          </Link>
        ))}
      </div>
    </div>

    {/* LEGAL (2 cols) */}
    <div className="md:col-span-2">
      <h3 className="mb-6 text-[15px] font-medium text-white">Legal</h3>
      <div className="space-y-3">
        {legalLinks.map((item) => (
          <Link key={item} href="#" className="block text-[14px] text-white/55 hover:text-white">
            {item}
          </Link>
        ))}
      </div>
    </div>

    {/* GET IN TOUCH (3 cols) */}
    <div className="md:col-span-3">
      <h3 className="mb-6 text-[15px] font-medium text-white">Get in Touch</h3>

      <div className="space-y-3">
        <a href="mailto:info@rrxco.com" className="block text-[14px] text-white/60 hover:text-white">
          info@rrxco.com
        </a>

        <a href="tel:+4401256961200" className="block text-[14px] text-white/60 hover:text-white">
          +44 (0) 1256 961 200
        </a>

        <div className="flex gap-4 pt-2">
          <Link href="#" className="text-white/60 hover:text-white">
            <FiInstagram className="h-5 w-5" />
          </Link>

          <Link href="#" className="text-white/60 hover:text-white">
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
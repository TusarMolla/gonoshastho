"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { LinkButton } from "@/app/components/ui/Button";

export default function ContactHero() {
  const [pageLoaded, setPageLoaded] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Mark as loaded after a tiny delay to ensure we're past the first render cycle
    setTimeout(() => {
      setPageLoaded(true);
    }, 50);

    const ctx = gsap.context(() => {
      // Animate heading
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
        }
      );

      // Animate text
      gsap.fromTo(
        textRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.2,
          ease: "power2.out",
        }
      );

      // Animate CTA
      gsap.fromTo(
        ctaRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.4,
          ease: "power2.out",
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={sectionRef}
      className={`relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden bg-gradient-to-b from-green-50 to-white ${
        pageLoaded ? "gsap-init-visible" : "gsap-init-invisible"
      }`}
    >
      {/* Background elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="absolute top-20 right-20 w-64 h-64 rounded-full bg-green-200/30 blur-3xl"></div>
      <div className="absolute bottom-10 left-10 w-72 h-72 rounded-full bg-green-100/20 blur-3xl"></div>

      {/* Decorative elements */}
      <div className="absolute top-[20%] left-[10%] w-16 h-16 rounded-full border-2 border-green-200 opacity-30 animate-spin-slow"></div>
      <div className="absolute bottom-[20%] right-[10%] w-24 h-24 rounded-full border border-green-300 opacity-20 animate-spin-slow-reverse"></div>
      <div className="absolute top-[30%] right-[20%] w-8 h-8 bg-green-400/20 rounded-full animate-float"></div>

      <div className="container mx-auto px-4 md:px-6 text-center max-w-4xl">
        <h1
          ref={headingRef}
          className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
        >
          আমাদের সাথে <span className="text-green-600">যোগাযোগ করুন</span>
        </h1>
        <p
          ref={textRef}
          className="text-lg md:text-xl text-gray-700 mb-8 leading-relaxed"
        >
          গণস্বাস্থ্য হোমিও'তে আপনাকে স্বাগতম। আপনার প্রশ্ন, মতামত বা
          অ্যাপয়েন্টমেন্ট সম্পর্কিত যেকোনো বিষয়ে আমাদের সাথে যোগাযোগ করুন।
          আমরা সর্বদা আপনাকে সাহায্য করতে প্রস্তুত।
        </p>

        <div ref={ctaRef} className="flex flex-wrap gap-4 justify-center">
          <LinkButton href="#contact-form" variant="primary" size="lg">
            মেসেজ পাঠান
          </LinkButton>
          <LinkButton href="tel:+8801338541445" variant="secondary" size="lg">
            কল করুন
          </LinkButton>
        </div>

        {/* Contact stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 text-center">
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <div className="w-12 h-12 mx-auto mb-3 flex items-center justify-center bg-green-100 text-green-600 rounded-full">
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">২৪ঘন্টা</h3>
            <p className="text-sm text-gray-600">সেবা প্রদানের সময়</p>
          </div>

          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <div className="w-12 h-12 mx-auto mb-3 flex items-center justify-center bg-green-100 text-green-600 rounded-full">
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">২টি</h3>
            <p className="text-sm text-gray-600">সরাসরি কল লাইন</p>
          </div>

          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <div className="w-12 h-12 mx-auto mb-3 flex items-center justify-center bg-green-100 text-green-600 rounded-full">
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">২৪ ঘন্টা</h3>
            <p className="text-sm text-gray-600">ইমেইল রেসপন্স</p>
          </div>

          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <div className="w-12 h-12 mx-auto mb-3 flex items-center justify-center bg-green-100 text-green-600 rounded-full">
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">১২+</h3>
            <p className="text-sm text-gray-600">সহায়তা কর্মী</p>
          </div>
        </div>
      </div>
    </div>
  );
}

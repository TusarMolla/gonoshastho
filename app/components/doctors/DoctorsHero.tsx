"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { LinkButton } from "@/app/components/ui/Button";

export default function DoctorsHero() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);
      setIsVisible(true);
    }
  }, []);

  useEffect(() => {
    if (isVisible && sectionRef.current && !tl.current) {
      tl.current = gsap.timeline();

      // Animate the heading
      if (headingRef.current) {
        tl.current.fromTo(
          headingRef.current,
          {
            opacity: 0,
            y: 30,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
          }
        );
      }

      // Animate the text
      if (textRef.current) {
        tl.current.fromTo(
          textRef.current,
          {
            opacity: 0,
            y: 20,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
          },
          "-=0.6"
        );
      }

      // Animate the image
      if (imageRef.current) {
        tl.current.fromTo(
          imageRef.current,
          {
            opacity: 0,
            scale: 0.95,
          },
          {
            opacity: 1,
            scale: 1,
            duration: 1,
            ease: "power2.out",
          },
          "-=0.5"
        );
      }
    }

    return () => {
      if (tl.current) {
        tl.current.kill();
      }
    };
  }, [isVisible]);

  return (
    <div
      ref={sectionRef}
      className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden bg-gradient-to-b from-green-50 to-white"
    >
      {/* Background elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="absolute top-20 right-20 w-64 h-64 rounded-full bg-green-200/30 blur-3xl"></div>
      <div className="absolute bottom-10 left-10 w-72 h-72 rounded-full bg-green-100/20 blur-3xl"></div>

      {/* Floating Elements */}
      <div className="absolute top-[15%] right-[10%] w-12 h-12 bg-gradient-to-b from-green-300/20 to-transparent rounded-full animate-float"></div>
      <div className="absolute bottom-[20%] left-[15%] w-8 h-8 bg-gradient-to-b from-green-400/20 to-transparent rounded-full animate-float delay-300"></div>

      {/* Circular Elements */}
      <div className="absolute top-[25%] left-[5%] w-24 h-24">
        <div className="absolute inset-0 rounded-full border-2 border-green-300/30 animate-spin-slow"></div>
        <div className="absolute inset-[20%] rounded-full border border-green-200/20 animate-spin-slow-reverse"></div>
      </div>

      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-1 gap-16 items-center">
            <div className="text-center lg:text-left flex flex-col items-center">
              <h1
                ref={headingRef}
                className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
              >
                আমাদের অভিজ্ঞ <span className="text-green-600">চিকিৎসকদল</span>
              </h1>
              <p
                ref={textRef}
                className="text-lg md:text-xl text-gray-700 mb-8 leading-relaxed text-center"
              >
                গণস্বাস্থ্য হোমিও'তে আমাদের রয়েছে দেশসেরা হোমিওপ্যাথিক
                চিকিৎসকদের একটি দল। তারা আধুনিক এবং প্রমাণিত হোমিওপ্যাথিক
                পদ্ধতিতে আপনার স্বাস্থ্য সমস্যার সমাধানে নিবেদিত।
              </p>

              <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                <LinkButton href="#doctors-list" variant="primary" size="md">
                  চিকিৎসকদের দেখুন
                </LinkButton>
                <LinkButton href="/appointment" variant="secondary" size="md">
                  অ্যাপয়েন্টমেন্ট নিন
                </LinkButton>
              </div>
            </div>

            <div
              ref={imageRef}
              className="relative rounded-2xl overflow-hidden aspect-square max-w-md mx-auto"
            >
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-tr from-green-50 to-green-100">
                {/* Doctor illustration */}
                <div className="relative w-4/5 h-4/5 flex items-center justify-center">
                  <div className="absolute w-full h-full rounded-full border-2 border-green-200/50 animate-spin-slow"></div>
                  <div className="absolute w-[90%] h-[90%] rounded-full border border-green-300/30 animate-spin-slow-reverse"></div>
                  <div className="absolute w-[80%] h-[80%] rounded-full border border-green-400/20 animate-spin-slow"></div>

                  <div className="relative z-10 bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 w-[80%] h-[80%] flex flex-col items-center justify-center border border-green-100">
                    <svg
                      className="w-20 h-20 text-green-600 mb-4"
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
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      অভিজ্ঞ চিকিৎসক
                    </h3>
                    <p className="text-gray-600 text-center">
                      দীর্ঘদিনের অভিজ্ঞতা ও দক্ষতা
                    </p>
                  </div>
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute top-6 right-6 w-12 h-12 bg-green-500/10 rounded-full animate-pulse"></div>
              <div className="absolute bottom-8 left-8 w-8 h-8 border-2 border-green-300/20 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

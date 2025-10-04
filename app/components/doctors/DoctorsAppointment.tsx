"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

export default function DoctorsAppointment() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Animate the entire section
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-16 md:py-24 bg-white overflow-hidden"
    >
      <div className="container mx-auto px-4 md:px-6">
        <div
          ref={contentRef}
          className="max-w-6xl mx-auto bg-gradient-to-r from-green-600 to-green-700 rounded-2xl shadow-xl overflow-hidden"
        >
          <div className="relative">
            {/* Background decorative elements */}
            <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-green-500/30 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-40 h-40 bg-green-500/20 rounded-full blur-3xl"></div>

            {/* Content */}
            <div className="relative p-10 md:p-16 text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                আমাদের অভিজ্ঞ চিকিৎসকদের সাথে অ্যাপয়েন্টমেন্ট নিন
              </h2>
              <p className="text-lg text-green-100 mb-10 max-w-3xl mx-auto">
                আপনার স্বাস্থ্য সমস্যা সমাধানে আমাদের হোমিওপ্যাথিক চিকিৎসকের
                পরামর্শ নিন। আপনার সুবিধামত সময়ে এবং চিকিৎসকের সাথে
                অ্যাপয়েন্টমেন্ট বুক করুন।
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 flex flex-col items-center">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-4">
                    <svg
                      className="h-8 w-8 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    অনলাইন অ্যাপয়েন্টমেন্ট
                  </h3>
                  <p className="text-green-100 text-center">
                    সহজে আমাদের ওয়েবসাইটে অ্যাপয়েন্টমেন্ট বুক করুন
                  </p>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 flex flex-col items-center">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-4">
                    <svg
                      className="h-8 w-8 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    ফোন কনসালটেশন
                  </h3>
                  <p className="text-green-100 text-center">
                    ফোনে চিকিৎসকের সাথে কথা বলে পরামর্শ নিন
                  </p>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 flex flex-col items-center">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-4">
                    <svg
                      className="h-8 w-8 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    ভিজিট করুন
                  </h3>
                  <p className="text-green-100 text-center">
                    আমাদের ক্লিনিকে এসে সরাসরি চিকিৎসা নিন
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center">
                <Link
                  href="/appointment"
                  className="inline-flex items-center justify-center px-8 py-4 bg-white text-green-700 text-lg font-medium rounded-md shadow-md hover:bg-green-50 transition-colors duration-300"
                >
                  <span>অ্যাপয়েন্টমেন্ট নিন</span>
                  <svg
                    className="ml-2 w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </Link>
                <Link
                  href="tel:+8801338541445"
                  className="inline-flex items-center justify-center px-8 py-4 bg-green-500/20 text-white border border-white/30 text-lg font-medium rounded-md hover:bg-green-500/30 transition-colors duration-300"
                >
                  <svg
                    className="mr-2 w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  <span>+৮৮০১৩৩৮৫৪১৪৪৫</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

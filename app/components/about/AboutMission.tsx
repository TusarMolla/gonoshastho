"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { LinkButton } from "@/app/components/ui/Button";

export default function AboutMission() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-16 md:py-24 bg-white relative overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 h-full w-1/2 bg-green-50 rounded-l-[5rem] -z-10 transform translate-x-1/4"></div>
      <div className="absolute bottom-20 left-10 w-20 h-20 border-2 border-green-200 rounded-full animate-spin-slow"></div>
      <div className="absolute top-20 right-10 w-32 h-32 border border-green-100 rounded-full animate-spin-slow-reverse"></div>

      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 items-center">
          {/* Content Section */}
          <div
            className={`transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-10"
            }`}
          >
            <div className="mb-4">
              <span className="px-4 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                আমাদের লক্ষ্য ও উদ্দেশ্য
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              আমাদের <span className="text-green-600">মিশন ও ভিশন</span>
            </h2>

            <div className="space-y-6 mb-8">
              <div className="bg-green-50 p-6 rounded-lg transition-transform hover:scale-105 duration-300">
                <h3 className="text-xl font-semibold text-green-700 mb-2">
                  আমাদের দর্শন
                </h3>
                <p className="text-gray-700">
                  "রোগ নয়, মানুষকে দেখি আমরা।" আমরা বিশ্বাস করি, প্রতিটি
                  ক্যান্সার রোগীর যন্ত্রণা, ভয় এবং প্রতিদিনের লড়াই আলাদা।
                  চিকিৎসা শুধু প্রেসক্রিপশন নয় — এটি সহানুভূতি, শ্রবণশক্তি ও
                  আত্মবিশ্বাস দেওয়ার একটি যাত্রা। গণস্বাস্থ্য হোমিও সেই
                  যাত্রায় একটি স্নেহভরা সাথী।
                </p>
              </div>

              <div className="bg-green-50 p-6 rounded-lg transition-transform hover:scale-105 duration-300">
                <h3 className="text-xl font-semibold text-green-700 mb-2">
                  আমাদের মিশন
                </h3>
                <p className="text-gray-700">
                  সারা বিশ্বের ক্যান্সার রোগীদের জন্য একটি প্রমাণিত, সাশ্রয়ী ও
                  পার্শ্বপ্রতিক্রিয়াহীন চিকিৎসা পদ্ধতি তৈরি করা — যেটি শুধু
                  ওষুধ নয়, বরং আশার আলো। গণস্বাস্থ্য হোমিও আজ শুধু বাংলাদেশে
                  নয়, আন্তর্জাতিক রোগীদের জন্যও একটি বিকল্প নয় — একটি
                  জীবনদায়ী সমাধান।
                </p>
              </div>

              <div className="bg-green-50 p-6 rounded-lg transition-transform hover:scale-105 duration-300">
                <h3 className="text-xl font-semibold text-green-700 mb-2">
                  আমাদের লক্ষ্য
                </h3>
                <p className="text-gray-700">
                  "বিশ্বের প্রতিটি ক্যান্সার রোগীর কাছে হোমিওপ্যাথির শক্তি পৌঁছে
                  দেওয়া।" ২০৩০ সালের মধ্যে, আমরা চাই প্রতিটি মহাদেশে আমাদের
                  প্রতিনিধিত্ব থাকুক — যেখানে রোগী চিকিৎসার আগে বিশ্বাস পায়,
                  এবং প্রতিটি ক্যান্সার কেসের জন্য নিরাপদ বিকল্প খুঁজে পায়
                  গণস্বাস্থ্য হোমিওতে।
                </p>
              </div>
            </div>

            <LinkButton href="/appointment" variant="primary">
              অ্যাপয়েন্টমেন্ট নিন
            </LinkButton>
          </div>

          {/* Image Section */}
          <div
            className={`relative transition-all duration-1000 delay-300 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-10"
            }`}
          >
            <div className="relative rounded-2xl overflow-hidden bg-white p-3 shadow-xl">
              <div className="aspect-square relative rounded-xl overflow-hidden bg-green-100">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="p-8 text-center">
                    <svg
                      className="h-20 w-20 mx-auto mb-4 text-green-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                      />
                    </svg>
                    <p className="text-xl font-semibold text-green-800">
                      "প্রকৃতির শক্তি, আমাদের বিশ্বাস"
                    </p>
                    <p className="text-green-700 mt-2">- গণস্বাস্থ্য হোমিও</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating badge */}
            <div className="absolute -bottom-6 -right-6 bg-white rounded-lg shadow-xl p-5 animate-float">
              <div className="bg-green-50 p-2 rounded-full">
                <svg
                  className="h-8 w-8 text-green-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

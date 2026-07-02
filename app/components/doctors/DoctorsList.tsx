"use client";

import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";

// Enhanced doctors data with more details
const doctors = [
  {
    id: 1,
    name: "ডাঃ মাহমুদ হাসান",
    title: "প্রধান চিকিৎসক এবং পরিচালক",
    specialization: "৩০+ বছরের অভিজ্ঞতা সম্পন্ন হোমিওপ্যাথিক চিকিৎসক",
    expertise: [
      "থাইরয়েড সমস্যা",
      "অটোইমিউন রোগ",
      "দীর্ঘমেয়াদী রোগ",
      "হরমোনাল সমস্যা",
    ],
    education: "লন্ডন স্কুল অফ হোমিওপ্যাথি থেকে স্নাতকোত্তর",
    image: "/images/doctors/doctor-1.jpg",
    scheduleDays: ["রবিবার", "মঙ্গলবার", "বৃহস্পতিবার"],
    scheduleTime: "সকাল ১০টা - দুপুর ২টা",
    phoneNumber: "+৮৮০১৭১২-৩৪৫৬৭৮",
    featured: true,
  },
  {
    id: 2,
    name: "ডাঃ শামীমা আক্তার",
    title: "সিনিয়র চিকিৎসক",
    specialization: "২৫+ বছরের অভিজ্ঞতা, মহিলা ও শিশু রোগ বিশেষজ্ঞ",
    expertise: [
      "মহিলাদের হরমোনাল সমস্যা",
      "শিশুরোগ",
      "প্রজনন স্বাস্থ্য",
      "মানসিক স্বাস্থ্য",
    ],
    education: "ন্যাশনাল ইনস্টিটিউট অফ হোমিওপ্যাথি থেকে স্নাতক",
    image: "/images/doctors/doctor-2.jpg",
    scheduleDays: ["সোমবার", "বুধবার", "শুক্রবার"],
    scheduleTime: "দুপুর ৩টা - রাত ৮টা",
    phoneNumber: "+৮৮০১৮২১-৯৮৭৬৫৪",
    featured: true,
  },
  {
    id: 3,
    name: "ডাঃ আবদুল্লাহ খান",
    title: "সিনিয়র কনসালটেন্ট",
    specialization: "২০+ বছরের অভিজ্ঞতা, দীর্ঘমেয়াদী রোগ বিশেষজ্ঞ",
    expertise: ["ডায়াবেটিস", "উচ্চ রক্তচাপ", "হৃদরোগ", "কিডনির সমস্যা"],
    education: "ঢাকা হোমিওপ্যাথিক মেডিকেল কলেজ থেকে স্নাতক",
    image: "/images/doctors/doctor-3.jpg",
    scheduleDays: ["রবিবার", "মঙ্গলবার", "বৃহস্পতিবার"],
    scheduleTime: "সকাল ৯টা - দুপুর ১টা",
    phoneNumber: "+৮৮০১৬১১-৭৮৯১২৩",
    featured: false,
  },
  {
    id: 4,
    name: "ডাঃ ফারিহা রহমান",
    title: "কনসালটেন্ট",
    specialization: "১৫+ বছরের অভিজ্ঞতা, ত্বক ও এলার্জি বিশেষজ্ঞ",
    expertise: ["ত্বকের রোগ", "এলার্জি", "সাইনাস", "অ্যাজমা"],
    education: "বাংলাদেশ হোমিওপ্যাথিক মেডিকেল কলেজ থেকে স্নাতক",
    image: "/images/doctors/doctor-4.jpg",
    scheduleDays: ["সোমবার", "বুধবার", "শনিবার"],
    scheduleTime: "বিকাল ৪টা - রাত ৯টা",
    phoneNumber: "+৮৮০১৯১১-৫৬৭৮৯০",
    featured: false,
  },
  {
    id: 5,
    name: "ডাঃ তানভীর আহমেদ",
    title: "চিকিৎসক",
    specialization: "১২+ বছরের অভিজ্ঞতা, গ্যাস্ট্রিক ও পেটের রোগ বিশেষজ্ঞ",
    expertise: ["আইবিএস", "অ্যাসিডিটি", "কোলাইটিস", "লিভারের সমস্যা"],
    education: "গভর্নমেন্ট হোমিওপ্যাথিক মেডিকেল কলেজ থেকে স্নাতক",
    image: "/images/doctors/doctor-5.jpg",
    scheduleDays: ["রবিবার", "মঙ্গলবার", "বৃহস্পতিবার"],
    scheduleTime: "সকাল ১১টা - বিকাল ৫টা",
    phoneNumber: "+৮৮০১৫১৭-৪৫৬৭৮৯",
    featured: false,
  },
  {
    id: 6,
    name: "ডাঃ নাজমুল হাসান",
    title: "চিকিৎসক",
    specialization: "১০+ বছরের অভিজ্ঞতা, মানসিক স্বাস্থ্য বিশেষজ্ঞ",
    expertise: ["উদ্বেগ", "বিষণ্ণতা", "অনিদ্রা", "মাইগ্রেন"],
    education: "ইন্টারন্যাশনাল হোমিওপ্যাথিক ইনস্টিটিউট থেকে স্নাতক",
    image: "/images/doctors/doctor-6.jpg",
    scheduleDays: ["সোমবার", "বুধবার", "শনিবার"],
    scheduleTime: "সকাল ১০টা - বিকাল ৪টা",
    phoneNumber: "+৮৮০১৭৫৬-৩৪৫৬৭৮",
    featured: false,
  },
];

export default function DoctorsList() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRefs = useRef<HTMLDivElement[]>([]);

  const assignCardRef = (el: HTMLDivElement | null, index: number) => {
    if (el) cardsRefs.current[index] = el;
  };

  const filteredDoctors =
    activeFilter === "all"
      ? doctors
      : activeFilter === "featured"
      ? doctors.filter(doctor => doctor.featured)
      : doctors;

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Heading animation
    gsap.fromTo(
      headingRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: headingRef.current,
          start: "top 80%",
        },
      }
    );

    // Only animate cards that have been assigned refs
    const cards = cardsRefs.current.filter(card => card !== undefined);

    // Staggered card animations
    gsap.fromTo(
      cards,
      { opacity: 0, y: 50, scale: 0.95 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: "back.out(1.5)",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section
      id="doctors-list"
      ref={sectionRef}
      className="py-16 md:py-24 bg-white"
    >
      <div className="container mx-auto px-4 md:px-6">
        <div ref={headingRef} className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium mb-4">
            আমাদের চিকিৎসক
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            হোমিওপ্যাথিক চিকিৎসক দল
          </h2>
          <p className="text-lg text-gray-600">
            গণস্বাস্থ্য হোমিও'তে আমরা দেশের সেরা হোমিওপ্যাথিক চিকিৎসকদের নিয়ে
            কাজ করি, যারা তাদের ক্ষেত্রে বহু বছরের অভিজ্ঞতা অর্জন করেছেন।
          </p>
        </div>

        {/* Filtering options */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setActiveFilter("all")}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                activeFilter === "all"
                  ? "bg-white text-green-700 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              সকল চিকিৎসক
            </button>
            <button
              onClick={() => setActiveFilter("featured")}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                activeFilter === "featured"
                  ? "bg-white text-green-700 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              প্রধান চিকিৎসক
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {filteredDoctors.map((doctor, index) => (
            <div
              key={doctor.id}
              ref={el => assignCardRef(el, index)}
              className={`bg-white rounded-xl overflow-hidden transition-all duration-300 border border-gray-100 hover:shadow-xl ${
                doctor.featured ? "ring-2 ring-green-100" : ""
              }`}
              onMouseEnter={() => setHoveredId(doctor.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <div className="flex flex-col h-full">
                {/* Doctor Image */}
                <div className="relative h-64 bg-green-100 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-green-900/30 z-10"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    {doctor.image.startsWith("/images") ? (
                      <div className="text-center">
                        <div className="w-28 h-28 mx-auto bg-green-600 rounded-full flex items-center justify-center text-white">
                          <svg
                            className="h-16 w-16"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={1}
                              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                            />
                          </svg>
                        </div>
                      </div>
                    ) : (
                      <Image
                        src={doctor.image}
                        alt={doctor.name}
                        fill
                        className="object-cover"
                      />
                    )}
                  </div>

                  {/* Doctor designation banner */}
                  {doctor.featured && (
                    <div className="absolute top-4 left-0 bg-green-600 text-white text-sm font-medium py-1 px-3 rounded-r-full shadow-md z-20">
                      প্রধান চিকিৎসক
                    </div>
                  )}
                </div>

                {/* Doctor Info */}
                <div className="p-6 flex-grow flex flex-col">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">
                    {doctor.name}
                  </h3>
                  <p className="text-green-600 font-medium mb-2">
                    {doctor.title}
                  </p>
                  <p className="text-gray-600 text-sm mb-4">
                    {doctor.specialization}
                  </p>

                  {/* Expertise */}
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-gray-800 mb-2">
                      বিশেষজ্ঞতাঃ
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {doctor.expertise.map((item, idx) => (
                        <span
                          key={idx}
                          className="inline-block px-2 py-1 bg-green-50 text-green-700 text-xs rounded-full"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Schedule */}
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-gray-800 mb-1">
                      চেম্বার সময়ঃ
                    </h4>
                    <div className="flex gap-1 mb-1">
                      {doctor.scheduleDays.map((day, idx) => (
                        <span
                          key={idx}
                          className="inline-block px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
                        >
                          {day}
                        </span>
                      ))}
                    </div>
                    <p className="text-sm text-gray-600">
                      {doctor.scheduleTime}
                    </p>
                  </div>

                  {/* Contact */}
                  <div className="mt-auto">
                    <div className="flex items-center text-sm text-gray-600 mb-4">
                      <svg
                        className="h-4 w-4 text-green-600 mr-2"
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
                      <span>{doctor.phoneNumber}</span>
                    </div>

                    <Link
                      href="/appointment"
                      className="inline-flex items-center justify-center w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
                    >
                      <span>অ্যাপয়েন্টমেন্ট নিন</span>
                      <svg
                        className="ml-2 w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 7l5 5m0 0l-5 5m5-5H6"
                        />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

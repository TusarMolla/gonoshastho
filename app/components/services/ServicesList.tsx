"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { LinkButton } from "@/app/components/ui/Button";
import { useRouter } from "next/navigation";

const servicesData = [
  {
    category: "জটিল ও দীর্ঘস্থায়ী রোগসমূহ",
    options: ["ক্যান্সার", "থ্যালাসেমিয়া", "কিডনি রোগ", "এইডস (AIDS)"],
  },
  {
    category: "ভাইরাল ও সংক্রামক রোগ",
    options: ["হেপাটাইটিস বি (HBV)"],
  },
  {
    category: "ব্যথা ও অস্থি সমস্যাসমূহ",
    options: [
      "হাঁটুর ব্যথা",
      "কোমরের ব্যথা",
      "ঘাড়ের ব্যথা / টান",
      "পিঠে ব্যথা",
      "স্পন্ডিলাইটিস",
      "হাড়ের ব্যথা",
      "গেঁটে বাত",
    ],
  },
  {
    category: "স্নায়ু ও মস্তিষ্ক সম্পর্কিত সমস্যা",
    options: [
      "স্নায়ুর সমস্যা",
      "সাইনাস",
      "মাইগ্রেন",
      "মাথাব্যথা",
      "স্ট্রোক পরবর্তী জটিলতা",
    ],
  },
  {
    category: "হজম ও অভ্যন্তরীণ রোগ",
    options: [
      "গ্যাস্ট্রিক",
      "আলসার",
      "অজীর্ণতা",
      "কোষ্ঠকাঠিন্য",
      "পেট ব্যথা",
      "লিভার সমস্যা",
      "কিডনি সমস্যা",
    ],
  },
  {
    category: "প্রস্রাব ও মূত্রনালীর সমস্যা",
    options: ["প্রস্রাবে জ্বালা", "প্রস্রাব আটকে যাওয়া", "অতিরিক্ত প্রস্রাব"],
  },
  {
    category: "দীর্ঘমেয়াদী ও সিস্টেমিক রোগ",
    options: ["ডায়াবেটিস", "উচ্চ রক্তচাপ", "হৃদরোগ", "রক্তের সমস্যা"],
  },
  {
    category: "পাইলস / গুদার রোগ",
    options: ["পাইলস (আন্ত্রিক)", "পাইলস (রক্তপাতযুক্ত)"],
  },
  {
    category: "চুল ও চর্ম সমস্যা",
    options: ["চুল পড়া"],
  },
  {
    category: "পুরুষদের যৌন ও বন্ধ্যাত্ব সমস্যা",
    options: ["যৌন দুর্বলতা", "হস্তমৈথুনজনিত সমস্যা", "সন্তান না হওয়া"],
  },
  {
    category: "নারীদের স্ত্রীরোগ ও প্রজনন সমস্যা",
    options: [
      "শ্বেতপ্রদর",
      "মাসিকের অনিয়ম",
      "নারীদের বন্ধ্যাত্ব",
      "স্ত্রীরোগ",
      "সন্তান ধারণে সমস্যা",
    ],
  },
];

export default function ServicesList() {
  const router = useRouter();

  const handleServiceSelect = (symptom: string) => {
    // Navigate to appointment page with the selected symptom
    router.push(`/appointment?symptom=${encodeURIComponent(symptom)}`);
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
          আমাদের সেবাসমূহ
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesData.map((service, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              <h3 className="text-xl font-semibold mb-4 text-green-700">
                {service.category}
              </h3>
              <ul className="space-y-2">
                {service.options.map((option, optionIndex) => (
                  <li key={optionIndex}>
                    <button
                      onClick={() => handleServiceSelect(option)}
                      className="w-full text-left px-4 py-2 rounded-md hover:bg-green-50 text-gray-700 hover:text-green-700 transition-colors"
                    >
                      {option}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

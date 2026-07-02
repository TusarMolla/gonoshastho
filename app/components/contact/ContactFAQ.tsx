"use client";

import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { LinkButton } from "@/app/components/ui/Button";

// FAQ items
const faqItems = [
  {
    id: 1,
    question: "গণস্বাস্থ্য হোমিও'তে অ্যাপয়েন্টমেন্ট কিভাবে নিতে পারি?",
    answer:
      "আপনি অনলাইনে আমাদের ওয়েবসাইটের মাধ্যমে অ্যাপয়েন্টমেন্ট নিতে পারেন অথবা সরাসরি আমাদের হটলাইন নম্বরে কল করে অ্যাপয়েন্টমেন্ট নিতে পারেন। আপনি চাইলে কেন্দ্রে এসেও অ্যাপয়েন্টমেন্ট নিতে পারেন।",
  },
  {
    id: 2,
    question: "আপনাদের সেবা প্রদানের সময় কী?",
    answer:
      "আমরা শনিবার থেকে বৃহস্পতিবার সকাল ৯টা থেকে রাত ৮টা পর্যন্ত এবং শুক্রবার সকাল ১০টা থেকে বিকেল ৫টা পর্যন্ত খোলা থাকি। সরকারি ছুটির দিনে আমরা বন্ধ থাকি।",
  },
  {
    id: 3,
    question: "হোমিওপ্যাথিক চিকিৎসার জন্য কত ফি দিতে হয়?",
    answer:
      "আমাদের চিকিৎসা ফি রোগের ধরন, ডাক্তারের অভিজ্ঞতা এবং চিকিৎসার পদ্ধতি অনুযায়ী পরিবর্তিত হয়। সাধারণত, প্রথম ভিজিটে ৫০০-১০০০ টাকা এবং ফলোআপ ভিজিটে ৩০০-৫০০ টাকা লাগতে পারে। বিস্তারিত জানতে অফিসে যোগাযোগ করুন।",
  },
  {
    id: 4,
    question: "অনলাইনে কি চিকিৎসা নেওয়া যায়?",
    answer:
      "হ্যাঁ, আমরা অনলাইন ভিডিও কনসালটেশন প্রদান করি। আপনি আমাদের ওয়েবসাইটের মাধ্যমে অ্যাপয়েন্টমেন্ট নিয়ে অনলাইনে ডাক্তারের সাথে পরামর্শ করতে পারেন। তবে, সব ক্ষেত্রে সরাসরি ভিজিট করাই উত্তম।",
  },
  {
    id: 5,
    question: "হোমিওপ্যাথিক ওষুধের পার্শ্বপ্রতিক্রিয়া আছে কি?",
    answer:
      "হোমিওপ্যাথিক ওষুধ প্রাকৃতিক উপাদান থেকে তৈরি এবং অত্যন্ত লঘুকৃত হওয়ায় এর পার্শ্বপ্রতিক্রিয়া খুব কম। তবে, প্রথম দিকে কিছু লক্ষণ বাড়তে পারে যা সাময়িক এবং রোগ নিরাময়ের প্রক্রিয়ার অংশ।",
  },
  {
    id: 6,
    question: "আমি কি আপনাদের কাছে জরুরি চিকিৎসা পেতে পারি?",
    answer:
      "হোমিওপ্যাথি সাধারণত দীর্ঘমেয়াদি চিকিৎসা পদ্ধতি। জরুরি চিকিৎসার জন্য আমরা আপনাকে নিকটস্থ হাসপাতালে যাওয়ার পরামর্শ দিব। তবে, হালকা জরুরি অবস্থার জন্য আমরা প্রাথমিক সেবা দিয়ে থাকি।",
  },
  {
    id: 7,
    question: "কত দিন পর ফলোআপ ভিজিট করতে হবে?",
    answer:
      "ফলোআপ ভিজিটের সময় রোগের ধরন, তীব্রতা এবং রোগীর প্রতিক্রিয়ার উপর নির্ভর করে। সাধারণত, ১-৪ সপ্তাহের মধ্যে ফলোআপ ভিজিট করার পরামর্শ দেওয়া হয়। আপনার ডাক্তার আপনাকে সঠিক সময় জানাবেন।",
  },
];

const FAQItem = ({
  question,
  answer,
  isOpen,
  onClick,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
}) => {
  const answerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (answerRef.current) {
      if (isOpen) {
        gsap.to(answerRef.current, {
          height: "auto",
          opacity: 1,
          duration: 0.3,
          ease: "power2.out",
        });
      } else {
        gsap.to(answerRef.current, {
          height: 0,
          opacity: 0,
          duration: 0.3,
          ease: "power2.in",
        });
      }
    }
  }, [isOpen]);

  return (
    <div className="border-b border-gray-200 last:border-0">
      <button
        className="flex justify-between items-center w-full py-4 text-left focus:outline-none"
        onClick={onClick}
      >
        <h3 className="text-lg font-medium text-gray-900">{question}</h3>
        <div
          className={`w-6 h-6 flex items-center justify-center transition-transform duration-300 ${
            isOpen ? "transform rotate-180" : ""
          }`}
        >
          <svg
            className="w-4 h-4 text-green-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </button>
      <div ref={answerRef} className="overflow-hidden opacity-0 h-0">
        <p className="pb-4 text-gray-600">{answer}</p>
      </div>
    </div>
  );
};

export default function ContactFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const faqRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Heading animation
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 30 },
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

      // FAQ animation
      gsap.fromTo(
        faqRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: faqRef.current,
            start: "top 75%",
          },
        }
      );

      // CTA animation
      gsap.fromTo(
        ctaRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.4,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ctaRef.current,
            start: "top 80%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      ref={sectionRef}
      className="py-16 md:py-24 bg-green-50 overflow-hidden"
    >
      <div className="container mx-auto px-4 md:px-6">
        <div ref={headingRef} className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium mb-4">
            সাধারণ জিজ্ঞাসা
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            প্রায়শই জিজ্ঞাসিত প্রশ্নাবলী
          </h2>
          <p className="text-lg text-gray-600">
            আমাদের সেবা সম্পর্কে সাধারণ জিজ্ঞাসা ও উত্তর এখানে দেওয়া হয়েছে।
            আপনার প্রশ্নের উত্তর না পেলে আমাদের সাথে যোগাযোগ করুন।
          </p>
        </div>

        <div
          ref={faqRef}
          className="max-w-3xl mx-auto bg-white rounded-xl shadow-md p-6 md:p-8"
        >
          <div className="space-y-1">
            {faqItems.map((item, index) => (
              <FAQItem
                key={item.id}
                question={item.question}
                answer={item.answer}
                isOpen={openIndex === index}
                onClick={() => toggleFaq(index)}
              />
            ))}
          </div>
        </div>

        <div ref={ctaRef} className="mt-16 text-center">
          <h3 className="text-xl font-bold text-gray-900 mb-4">
            আপনার প্রশ্নের উত্তর পাননি?
          </h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            আপনার যেকোনো প্রশ্ন বা অনুসন্ধানের জন্য আমাদের সাথে সরাসরি যোগাযোগ
            করুন। আমাদের দক্ষ টিম সর্বদা আপনাকে সাহায্য করতে প্রস্তুত।
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <LinkButton href="tel:+8801338541445" variant="secondary" size="lg">
              কল করুন
            </LinkButton>
            <LinkButton href="#contact-form" variant="primary" size="lg">
              মেসেজ পাঠান
            </LinkButton>
          </div>
        </div>
      </div>
    </section>
  );
}

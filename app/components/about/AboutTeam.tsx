"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { LinkButton } from "@/app/components/ui/Button";
import Image from "next/image";
import doctor from "@/public/doctors/doctor.jpg";

export default function AboutTeam() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
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
      { threshold: 0.1 }
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

  useEffect(() => {
    if (isVisible && cardsRef.current) {
      const cards = cardsRef.current.querySelectorAll(".team-card");

      gsap.fromTo(
        cards,
        {
          opacity: 0,
          y: 50,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "back.out(1.7)",
        }
      );
    }
  }, [isVisible]);

  return (
    <section
      ref={sectionRef}
      className="py-16 md:py-24 bg-white relative overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-green-50 rounded-bl-[10rem] -z-10"></div>
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-green-50 rounded-tr-[10rem] -z-10"></div>

      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="mb-4">
            <span className="px-4 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
              আমাদের চিকিৎসক
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            অভিজ্ঞ <span className="text-green-600">হোমিওপ্যাথিক চিকিৎসক</span>
          </h2>
          <p className="text-lg text-gray-700">
            গণস্বাস্থ্য হোমিও'র প্রধান চিকিৎসক ডাঃ এস. এম. সারোয়ার ২৫ বছরের
            বেশি অভিজ্ঞতা সম্পন্ন একজন প্রশিক্ষিত হোমিওপ্যাথিক চিকিৎসক।
          </p>
        </div>

        <div
          ref={cardsRef}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto"
        >
          {/* Doctor Profile */}
          <div className="team-card bg-white rounded-xl shadow-md overflow-hidden group hover:shadow-xl transition-shadow duration-300">
            <div className="h-80 bg-white relative overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                {/* <div className="p-4 text-center">
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
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div> */}
                <div className="flex items-center justify-center">
                  <Image
                    src={doctor}
                    alt="গণস্বাস্থ্য হোমিও"
                    priority
                    className="max-w-80"
                  />
                </div>
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                ডাঃ এস. এম. সারোয়ার
              </h3>

              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">
                    অভিজ্ঞতা ও যোগ্যতা
                  </h4>
                  <ul className="list-disc list-inside space-y-2 text-gray-700">
                    <li>২৫ বছরের বেশি হোমিওপ্যাথিক চিকিৎসার অভিজ্ঞতা</li>
                    <li>
                      প্রশিক্ষিত ও সনদপ্রাপ্ত নিম্নলিখিত প্রতিষ্ঠানসমূহ থেকে:
                    </li>
                    <li className="ml-4">বি.এইচ.বি ঢাকা</li>
                    <li className="ml-4">এল.এম.এ.এফ.সি ঢাকা</li>
                    <li className="ml-4">এইচ.ইউ.এ.এন.সি ঢাকা</li>
                    <li className="ml-4">এল.এম.এইচ.পি রাজশাহী</li>
                    <li className="ml-4">রেড ক্রিসেন্ট সোসাইটি</li>
                    <li className="ml-4">বাংলাদেশ মেডিকেল লীগ</li>
                    <li className="ml-4">
                      এফ.ডব্লিউ.ভি ট্রেনিং সেন্টার, নরসিংদী
                    </li>
                  </ul>
                </div>

                <LinkButton
                  href="/appointment"
                  variant="outline"
                  className="w-full"
                >
                  অ্যাপয়েন্টমেন্ট নিন
                </LinkButton>
              </div>
            </div>
          </div>

          {/* Chamber Information */}
          <div className="team-card bg-white rounded-xl shadow-md overflow-hidden group hover:shadow-xl transition-shadow duration-300">
            <div className="p-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                চেম্বারের ঠিকানা
              </h3>

              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">
                    ঢাকা চেম্বার
                  </h4>
                  <p className="text-gray-700">
                     56/1, বায়তুল ভিউ টাওয়ার, (বায়তুল মোকাররম উত্তর গেটের বিপরীতে) লিফট 11
                    <br />
                    পুরানা পল্টন, ঢাকা-১০০০
                  </p>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">
                    হবিগঞ্জ চেম্বার
                  </h4>
                  <p className="text-gray-700">পপুলার জেনারেল হসপিটাল, নতুন বাসস্টান্ড, হবিগঞ্জ</p>
                </div>

                <div className="pt-4">
                  <LinkButton
                    href="/contact"
                    variant="secondary"
                    className="w-full"
                  >
                    যোগাযোগ করুন
                  </LinkButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

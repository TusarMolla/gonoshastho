// app/(pages)/appointment/page.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export const dynamic = 'auto';

const AppointmentPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    contact_no: "",
    address: "",
    note: "",
    date: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [submittedData, setSubmittedData] = useState({
    name: "",
    contact_no: "",
    date: "",
  });

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    
    // পেজ ভিউ ট্র্যাক করুন (ঐচ্ছিক)
    if (typeof window !== 'undefined' && (window as any).fbq) {
      (window as any).fbq('track', 'ViewContent', {
        content_name: 'Appointment Page',
        content_category: 'Booking'
      });
    }
  }, []);

  if (!isMounted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-green-50/50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-700 mx-auto"></div>
          <p className="mt-4 text-gray-600">লোড হচ্ছে...</p>
        </div>
      </div>
    );
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const API_URL = "https://app.gonosasthohomeo.com.bd/api/appointment/submit";

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        const msg = result.message || "অ্যাপয়েন্টমেন্ট সফলভাবে জমা দেওয়া হয়েছে!";

        setSubmittedData({
          name: formData.name,
          contact_no: formData.contact_no,
          date: formData.date,
        });

        setSuccessMessage(msg);
        setShowSuccessModal(true);

        // ফেসবুক পিক্সেল ইভেন্ট ট্র্যাক
        if (typeof window !== 'undefined' && (window as any).fbq) {
          (window as any).fbq('track', 'Lead', {
            content_name: 'Appointment Booking',
            content_category: 'Health',
            currency: 'BDT',
            value: 0
          });

          (window as any).fbq('track', 'CompleteRegistration', {
            content_name: 'Appointment Booking',
            status: 'success'
          });
        }

        // ফর্ম রিসেট
        setFormData({ 
          name: "", 
          age: "", 
          contact_no: "", 
          address: "", 
          note: "", 
          date: "" 
        });

      } else {
        setError(result.message || "কোথাও একটি সমস্যা হয়েছে।");
      }
    } catch (err) {
      setError("সার্ভারের সাথে যোগাযোগ করা যাচ্ছে না।");
      console.error("Appointment submission error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass = "w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors text-gray-900 bg-white block font-sans";
  const inputStyle = { color: "#111827", backgroundColor: "#ffffff" };

  return (
    <div className="min-h-screen bg-green-50/50 py-12 px-4 sm:px-6 lg:px-8 pt-28">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-green-100">
        <div className="bg-green-900 text-white px-6 py-8 text-center">
          <h1 className="text-3xl font-bold text-white">অনলাইন অ্যাপয়েন্টমেন্ট</h1>
          <p className="text-green-100 mt-2">সহজেই ঘরে বসে ডাক্তারের সিরিয়াল নিন।</p>
        </div>

        <div className="p-6 sm:p-10">
          {error && (
            <div className="mb-6 p-4 bg-red-100 border-l-4 border-red-600 text-red-800 rounded">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                রোগীর নাম <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className={inputClass}
                style={inputStyle}
                placeholder="যেমন: মোঃ করিম আলী"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  বয়স (ঐচ্ছিক)
                </label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  className={inputClass}
                  style={inputStyle}
                  placeholder="যেমন: ৩৫"
                  min="1"
                  max="150"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  মোবাইল নাম্বার <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  name="contact_no"
                  required
                  value={formData.contact_no}
                  onChange={handleChange}
                  className={inputClass}
                  style={inputStyle}
                  placeholder="017XXXXXXXX"
                  pattern="[0-9]{11}"
                  title="সঠিক মোবাইল নাম্বার দিন (০১১ সংখ্যা)"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                তারিখ (ঐচ্ছিক)
              </label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className={inputClass}
                style={inputStyle}
                min={new Date().toISOString().split('T')[0]}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                ঠিকানা (ঐচ্ছিক)
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className={inputClass}
                style={inputStyle}
                placeholder="গ্রাম/শহর, থানা, জেলা"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                নোট / শারীরিক সমস্যা (ঐচ্ছিক)
              </label>
              <textarea
                name="note"
                rows={3}
                value={formData.note}
                onChange={handleChange}
                className={inputClass}
                style={inputStyle}
                placeholder="আপনার শারীরিক সমস্যার কথা সংক্ষেপে লিখতে পারেন..."
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3.5 rounded-md text-lg shadow-md transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "পাঠানো হচ্ছে..." : "অ্যাপয়েন্টমেন্ট নিশ্চিত করুন"}
            </button>
          </form>

          <div className="text-center mt-6">
            <Link href="/" className="text-sm text-green-700 hover:text-green-950 font-medium">
              ← হোম পেইজে ফিরে যান
            </Link>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowSuccessModal(false)}
          />
          <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 sm:p-8 animate-in fade-in zoom-in duration-300">
            <div className="flex justify-center mb-4">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>

            <h3 className="text-2xl font-bold text-center text-gray-900 mb-2">
              অ্যাপয়েন্টমেন্ট সফল!
            </h3>
            <p className="text-center text-gray-600 mb-6">
              {successMessage}
            </p>

            <div className="bg-green-50 rounded-lg p-4 mb-6 text-sm">
              {submittedData.name && (
                <p className="text-gray-700">
                  <span className="font-semibold">রোগীর নাম:</span> {submittedData.name}
                </p>
              )}
              {submittedData.contact_no && (
                <p className="text-gray-700">
                  <span className="font-semibold">মোবাইল:</span> {submittedData.contact_no}
                </p>
              )}
              {submittedData.date && (
                <p className="text-gray-700">
                  <span className="font-semibold">তারিখ:</span> {new Date(submittedData.date).toLocaleDateString('bn-BD')}
                </p>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => setShowSuccessModal(false)}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white font-medium py-2.5 rounded-lg transition-colors"
              >
                ঠিক আছে
              </button>
              <Link
                href="/"
                className="flex-1 text-center bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2.5 rounded-lg transition-colors"
              >
                হোম পেইজে যান
              </Link>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes zoom-in {
          from { transform: scale(0.95); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .animate-in {
          animation: fade-in 0.3s ease-out;
        }
        .zoom-in {
          animation: zoom-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default AppointmentPage;
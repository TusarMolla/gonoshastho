"use client";

import { useState } from "react";
import Link from "next/link";

const AppointmentPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    contact_no: "",
    address: "",
    note: "",
    date: "", // লারাভেলের $table->dateTime("date") এ শুধু YYYY-MM-DD ফরম্যাটে ডাটা যাবে
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSuccess(null);
    setError(null);

    // আপনার লারাভেল API URL এখানে দিন
    const API_URL = "http://127.0.0.1:8000/api/appointment/submit"; 

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
        setSuccess(result.message || "অ্যাপয়েন্টমেন্ট সফলভাবে জমা দেওয়া হয়েছে!");
        setFormData({ name: "", age: "", contact_no: "", address: "", note: "", date: "" });
      } else {
        setError(result.message || "কোথাও একটি সমস্যা হয়েছে।");
      }
    } catch (err) {
      setError("সার্ভারের সাথে যোগাযোগ করা যাচ্ছে না।");
    } finally {
      setIsSubmitting(false);
    }
  };

  // ইনপুটের টেক্সট কালার শতভাগ নিশ্চিত করতে কালার এবং ব্যাকগ্রাউন্ড ইনলাইন স্টাইল করা হয়েছে
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
          {success && <div className="mb-6 p-4 bg-green-100 border-l-4 border-green-600 text-green-800 rounded">{success}</div>}
          {error && <div className="mb-6 p-4 bg-red-100 border-l-4 border-red-600 text-red-800 rounded">{error}</div>}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* নাম */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">রোগীর নাম <span className="text-red-500">*</span></label>
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
              {/* বয়স */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">বয়স (ঐচ্ছিক)</label>
                <input 
                  type="number" 
                  name="age" 
                  value={formData.age} 
                  onChange={handleChange} 
                  className={inputClass} 
                  style={inputStyle}
                  placeholder="যেমন: ৩৫" 
                />
              </div>
              {/* মোবাইল নাম্বার */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">মোবাইল নাম্বার <span className="text-red-500">*</span></label>
                <input 
                  type="tel" 
                  name="contact_no" 
                  required 
                  value={formData.contact_no} 
                  onChange={handleChange} 
                  className={inputClass} 
                  style={inputStyle}
                  placeholder="017XXXXXXXX" 
                />
              </div>
            </div>

            {/* তারিখ (শুধু ডেট সিলেক্ট করা যাবে, সময় থাকবে না) */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">তারিখ (ঐচ্ছিক)</label>
              <input 
                type="date" 
                name="date" 
                value={formData.date} 
                onChange={handleChange} 
                className={inputClass}
                style={inputStyle} 
              />
            </div>

            {/* ঠিকানা */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">ঠিকানা (ঐচ্ছিক)</label>
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

            {/* নোট */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">নোট / শারীরিক সমস্যা (ঐচ্ছিক)</label>
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

            <button type="submit" disabled={isSubmitting} className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3.5 rounded-md text-lg shadow-md transition-colors cursor-pointer disabled:opacity-50">
              {isSubmitting ? "পাঠানো হচ্ছে..." : "অ্যাপয়েন্টমেন্ট নিশ্চিত করুন"}
            </button>
          </form>

          <div className="text-center mt-6">
            <Link href="/" className="text-sm text-green-700 hover:text-green-950 font-medium">← হোম পেইজে ফিরে যান</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentPage;
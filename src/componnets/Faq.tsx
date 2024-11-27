"use client";
import React, { useState } from "react";
import FaqData from "@/utils";

// type for faq item
type faqItem = {
  id: number;
  question: string;
  answer: string;
};

const Faq = () => {
  const [faqList] = useState<faqItem[]>(FaqData);
  const [faqOpen, setFaqOpen] = useState<number[]>([]);

  // for search query
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredFaqs, setFilteredFaqs] = useState<faqItem[]>(FaqData);

  // Handle toggling FAQ visibility
  const handleToggle = (index: number): void => {
    if (faqOpen.includes(index)) {
      setFaqOpen(faqOpen.filter((item) => item !== index));
    } else {
      setFaqOpen([...faqOpen, index]);
    }
  };

  // Handle search query and filter FAQs
  const handleSearch = (query: string): void => {
    setSearchQuery(query);
    if (query.trim() === "") {
      setFilteredFaqs(faqList);
    } else {
      const filtered = faqList.filter((faq) =>
        faq.question.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredFaqs(filtered);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 flex flex-col items-center p-6">
      <h1 className="text-4xl font-extrabold text-blue-900 mb-8 text-center">
        Frequently Asked Questions
      </h1>

      <div className="mb-6 w-full max-w-xl">
        {/* Search bar */}
        <input
          type="text"
          className="w-full text-gray-700 rounded-lg p-4 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
          value={searchQuery}
          placeholder="Search for a question..."
          onChange={(event) => handleSearch(event.target.value)}
        />
      </div>

      <div className="w-full max-w-xl">
        {filteredFaqs.map((faq, index) => (
          <div
            key={faq.id}
            className="bg-white rounded-lg shadow-lg mb-4 overflow-hidden"
          >
            <div
              className={`cursor-pointer p-4 flex justify-between items-center ${
                faqOpen.includes(index) ? "bg-blue-100" : "bg-white"
              }`}
              onClick={() => handleToggle(index)}
            >
              <h2
                className={`text-lg font-semibold ${
                  faqOpen.includes(index)
                    ? "text-blue-800"
                    : "text-gray-900"
                }`}
              >
                {faq.question}
              </h2>
              <span
                className={`transition-transform duration-200 ${
                  faqOpen.includes(index) ? "rotate-180" : ""
                } text-blue-500`}
              >
                ▼
              </span>
            </div>
            {faqOpen.includes(index) && (
              <div className="p-4 bg-blue-50 text-gray-700">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
        {filteredFaqs.length === 0 && (
          <div className="text-gray-500 text-center">
            No FAQs match your search query.
          </div>
        )}
      </div>
    </div>
  );
};

export default Faq;

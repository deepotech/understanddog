"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

export interface FaqItem {
  question: string;
  answer: string;
}

interface FaqAccordionProps {
  items: FaqItem[];
}

export function FaqAccordion({ items }: FaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className="divide-y divide-stone-200 rounded-2xl border border-stone-200 bg-white overflow-hidden shadow-xs">
      {items.map((item, idx) => {
        const isOpen = openIndex === idx;
        return (
          <div key={idx} className="transition-colors">
            <h3>
              <button
                type="button"
                onClick={() => toggle(idx)}
                aria-expanded={isOpen}
                aria-controls={`faq-answer-${idx}`}
                className="flex w-full items-center justify-between p-5 sm:p-6 text-left text-sm sm:text-base font-serif font-bold text-stone-900 hover:text-amber-800 transition-colors focus:outline-none focus-visible:bg-stone-50"
              >
                <span>{item.question}</span>
                <ChevronDown
                  className={`w-5 h-5 text-stone-500 transition-transform duration-200 flex-shrink-0 ml-4 ${
                    isOpen ? "rotate-180 text-amber-700" : ""
                  }`}
                  aria-hidden="true"
                />
              </button>
            </h3>
            {isOpen && (
              <div
                id={`faq-answer-${idx}`}
                className="px-5 pb-6 sm:px-6 text-xs sm:text-sm text-stone-600 leading-relaxed animate-in fade-in-50 duration-200"
              >
                {item.answer}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

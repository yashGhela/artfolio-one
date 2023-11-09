'use client'

import { useState } from "react";

export default function LandingFaq(){

    const [activeIndex, setActiveIndex] = useState(null);

  const questions = [
    'What do I get exactly?',
    'Can I change things after the first setup?',
    'Can I get a refund?',
    'How long does it take?',
    'Are my artworks protected?',
    'How many artworks can I upload?',
  ];

  const answers = [
    'You will get a fully functional, responsive portfolio website that allows you to display all works currated by you, with contact modals, about sections and more. On the pro plan you will also get custom domains, analytics and more customization options.',
    'Artfolio allows you to change all aspects of your site on the Pro plan, while on the free plan changes are limited.',
    'Artfolio is built by one guy, me, Yash! As such we do not offer refunds to keep the site running!',
    'Building a site with Artfolio takes about 5 minutes! This site will be built in such a way that no further customization will be needed, it is ready out of the box!',
    'Yes! Artworks on your site are non downloadable, protecting your works from AI scrapers and non-credit pages',
    'As many as you\'d like!',
  ];

  const toggleAccordion = (index) => {
    if (index === activeIndex) {
      setActiveIndex(null);
    } else {
      setActiveIndex(index);
    }
  };

    return(
        <div className="mt-[10%] flex-col md:grid md:grid-cols-2 text-gray-500">
            <div>
            <p className="font-lighter text-gray-400 py-3 ">FAQ</p>
            <p className="font-bold text-3xl text-left mt-10 text-pink-400 py-3 ">Frequently Asked Questions</p>

            </div>
            <div className="w-full mt-[20%] mx-auto">
      {questions.map((question, index) => (
        <div
          key={index}
          className="mb-4 bg-gray-800 rounded-lg "
        >
          <div
            className="flex justify-between p-4 cursor-pointer"
            onClick={() => toggleAccordion(index)}
          >
            <h3 className="text-lg font-semibold text-gray-300 ">{question}</h3>
            <svg
              className={`${
                activeIndex === index
                  ? 'transform rotate-180'
                  : 'transform rotate-0'
              } w-6 h-6 transition-transform duration-300`}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M6.293 7.293a1 1 0 011.414 0L10 9.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          {activeIndex === index && (
            <div className="p-4 text-left">
              <p>{answers[index]}</p>
            </div>
          )}
        </div>
      ))}
    </div>

        </div>
    )
}
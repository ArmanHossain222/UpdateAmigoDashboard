

import React, { useState } from "react";

const HelpSupportPage = () => {
  const [faqActive, setFaqActive] = useState(null);

  const toggleFaq = (index) => {
    setFaqActive(faqActive === index ? null : index);
  };

  const faqs = [
    {
      question: "How do I track my order?",
      answer:
        "You can track your order by logging into your account and navigating to the 'My Orders' section. You will find tracking information there.",
    },
    {
      question: "What is the return policy?",
      answer:
        "We accept returns within 30 days of delivery. Please ensure the product is unused and in its original packaging. Visit the 'Returns' section for more details.",
    },
    {
      question: "How do I change my password?",
      answer:
        "Log in to your account, go to 'Account Settings', and update your password under the 'Security' section.",
    },
    {
      question: "How do I contact customer support?",
      answer:
        "You can contact us via email at support@myecommerce.com or call us at +1234567890.",
    },
  ];

  return (
    <div className="bg-gray-900 text-white min-h-screen p-6">
      {/* Page Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Help & Support</h1>
      </div>

      {/* FAQs Section */}
      <div className="bg-gray-800 p-6 rounded-lg mb-8">
        <h2 className="text-xl font-semibold mb-4">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`bg-gray-700 p-4 rounded ${
                faqActive === index ? "ring-2 ring-blue-500" : ""
              }`}
            >
              <button
                onClick={() => toggleFaq(index)}
                className="flex justify-between items-center w-full text-left font-semibold"
              >
                {faq.question}
                <span>
                  {faqActive === index ? "-" : "+"}
                </span>
              </button>
              {faqActive === index && (
                <p className="mt-2 text-sm text-gray-300">{faq.answer}</p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Contact Support */}
      <div className="bg-gray-800 p-6 rounded-lg mb-8">
        <h2 className="text-xl font-semibold mb-4">Contact Support</h2>
        <p className="mb-4 text-gray-300">
          Need more help? Contact us directly through email or phone, or fill out the support form below.
        </p>
        <form className="grid grid-cols-1 gap-4">
          <input
            type="text"
            placeholder="Your Name"
            className="bg-gray-700 text-white px-4 py-2 rounded"
          />
          <input
            type="email"
            placeholder="Your Email"
            className="bg-gray-700 text-white px-4 py-2 rounded"
          />
          <textarea
            placeholder="Your Message"
            className="bg-gray-700 text-white px-4 py-2 rounded"
            rows="4"
          ></textarea>
          <button
            type="submit"
            className="bg-blue-600 px-4 py-2 rounded text-white font-bold hover:bg-blue-700"
          >
            Submit
          </button>
        </form>
      </div>

      {/* Resources */}
      <div className="bg-gray-800 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Additional Resources</h2>
        <ul className="space-y-2">
          <li>
            <a
              href="/documentation"
              className="text-blue-400 hover:underline"
            >
              Documentation
            </a>
          </li>
          <li>
            <a
              href="/community-forum"
              className="text-blue-400 hover:underline"
            >
              Community Forum
            </a>
          </li>
          <li>
            <a
              href="/return-policy"
              className="text-blue-400 hover:underline"
            >
              Return Policy
            </a>
          </li>
          <li>
            <a
              href="/terms-and-conditions"
              className="text-blue-400 hover:underline"
            >
              Terms & Conditions
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default HelpSupportPage;

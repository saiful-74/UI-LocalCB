import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPlus, FiMinus } from 'react-icons/fi';

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "How fast is your delivery?",
      answer: "We deliver most orders within 30 minutes. Our chefs prepare fresh meals and our delivery partners ensure quick and safe delivery to your doorstep."
    },
    {
      question: "Are the ingredients fresh and organic?",
      answer: "Yes! We work with local suppliers to source the freshest ingredients. Many of our chefs use organic produce and we clearly mark organic options on our menu."
    },
    {
      question: "Can I customize my meal preferences?",
      answer: "Absolutely! You can specify dietary restrictions, allergies, and preferences when ordering. Our chefs are happy to accommodate special requests whenever possible."
    },
    {
      question: "What if I'm not satisfied with my order?",
      answer: "Customer satisfaction is our priority. If you're not happy with your meal, contact us within 24 hours and we'll provide a full refund or replacement meal."
    },
    {
      question: "Do you offer meal subscriptions?",
      answer: "Yes! We offer weekly and monthly meal subscription plans with discounts. You can customize your meal frequency and pause or cancel anytime."
    },
    {
      question: "How do I become a chef partner?",
      answer: "We're always looking for talented local chefs! Apply through our website, pass our quality assessment, and start sharing your culinary creations with our community."
    }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 px-4 ">
      <div className="max-w-4xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl ">
            Got questions? We've got answers!
          </p>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-300"
              >
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white pr-4">
                  {faq.question}
                </h3>
                <div className="flex-shrink-0">
                  {openIndex === index ? (
                    <FiMinus className="text-2xl text-orange-500" />
                  ) : (
                    <FiPlus className="text-2xl text-orange-500" />
                  )}
                </div>
              </button>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-8 pb-6 text-gray-600 dark:text-gray-300 leading-relaxed">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
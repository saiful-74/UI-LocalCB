import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiCheck } from 'react-icons/fi';
import toast from 'react-hot-toast';

const NewsletterSection = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      toast.error('Please enter your email address');
      return;
    }

    setTimeout(() => {
      setIsSubscribed(true);
      toast.success('Successfully subscribed to our newsletter!');
      setEmail('');
    }, 1000);
  };

  return (
    <section className="py-20 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {/* Title */}
          <h2 className="text-4xl font-bold mb-4 ">
            Stay Updated with LocalChefBazaar
          </h2>

          {/* Subtitle */}
          <p className="text-lg mb-10 max-w-2xl mx-auto">
            Get the latest updates on new chefs, special offers, and delicious recipes delivered straight to your inbox
          </p>

          {!isSubscribed ? (
            <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
              <div className="flex flex-col sm:flex-row gap-4">
                
                {/* Input */}
                <div className="relative flex-1">
                  <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="
                      w-full pl-12 pr-4 py-4
                      rounded-xl
                      bg-white dark:bg-gray-800
                      text-gray-900 dark:text-gray-100
                      placeholder-gray-500 dark:placeholder-gray-400
                      border border-gray-200 dark:border-gray-700
                      shadow-sm
                      focus:outline-none
                      focus:ring-4 focus:ring-orange-500/20
                    "
                  />
                </div>

           <motion.button
  type="submit"
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  className="
    px-8 py-4
    bg-orange-500 text-white
    font-bold rounded-xl
    shadow-lg
    cursor-pointer
    hover:bg-orange-600
    transition-all
    whitespace-nowrap
  "
>
  Subscribe Now
</motion.button>

              </div>
            </form>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center justify-center gap-3 text-green-600 dark:text-green-400 text-xl font-semibold"
            >
              <FiCheck className="text-2xl bg-green-100 dark:bg-green-900/40 rounded-full p-2" />
              <span>Thank you for subscribing!</span>
            </motion.div>
          )}

          {/* Benefits */}
          <div className="mt-10 flex flex-wrap justify-center gap-6 text-sm sm:text-base text-gray-600 dark:text-gray-400">
            {[
              'Weekly Recipe Updates',
              'Exclusive Offers',
              'New Chef Spotlights'
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="w-2 h-2 bg-orange-500 rounded-full" />
                <span>{item}</span>
              </div>
            ))}
          </div>

        </motion.div>
      </div>
    </section>
  );
};

export default NewsletterSection;

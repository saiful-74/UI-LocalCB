import React from 'react';
import { motion } from 'framer-motion';
import { FiClock, FiShield, FiHeart, FiTruck, FiStar, FiUsers } from 'react-icons/fi';

const FeaturesSection = () => {
  const features = [
    {
      icon: <FiClock className="text-4xl text-orange-500" />,
      title: "Fast Delivery",
      description: "Get your meals delivered in under 30 minutes with our express delivery service."
    },
    {
      icon: <FiShield className="text-4xl text-green-500" />,
      title: "Quality Assured",
      description: "All our meals are prepared with fresh ingredients and highest quality standards."
    },
    {
      icon: <FiHeart className="text-4xl text-red-500" />,
      title: "Made with Love",
      description: "Every dish is crafted with passion by our talented local chefs."
    },
    {
      icon: <FiTruck className="text-4xl text-blue-500" />,
      title: "Free Delivery",
      description: "Enjoy free delivery on orders above $25. No hidden charges, just great food."
    },
    {
      icon: <FiStar className="text-4xl text-yellow-500" />,
      title: "Top Rated",
      description: "Consistently rated 4.9/5 by our satisfied customers across the city."
    },
    {
      icon: <FiUsers className="text-4xl text-purple-500" />,
      title: "Local Chefs",
      description: "Supporting local talent and bringing authentic flavors to your doorstep."
    }
  ];

  return (
    <section className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold mb-4">
            Why Choose LocalChefBazaar?
          </h2>
          <p className="text-xl  max-w-2xl mx-auto">
            We're committed to delivering exceptional dining experiences right to your doorstep
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 text-center group hover:-translate-y-2"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="mb-6 group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
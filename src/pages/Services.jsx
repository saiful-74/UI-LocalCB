import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiShoppingCart, FiInfo } from "react-icons/fi";

import {
  FiHome,
  FiCalendar,
  FiGift,
  FiCoffee,
  FiTruck,
  FiClock,
  FiShield,
  FiHeart,
  FiCheck
} from 'react-icons/fi';

const Services = () => {
  const mainServices = [
    {
      icon: <FiHome className="text-6xl text-orange-500" />,
      title: "Home Delivery",
      description: "Fresh meals delivered straight to your doorstep within 30 minutes",
      features: ["Real-time tracking", "Contactless delivery", "Temperature controlled", "GPS enabled"],
      price: "Free delivery on orders $25+",
      gradient: "from-orange-500 to-red-500"
    },
    {
      icon: <FiCalendar className="text-6xl text-blue-500" />,
      title: "Meal Subscriptions",
      description: "Weekly and monthly meal plans customized to your preferences",
      features: ["Custom meal plans", "Dietary accommodations", "Flexible scheduling", "Cancel anytime"],
      price: "Starting from $99/week",
      gradient: "from-blue-500 to-purple-500"
    },
    {
      icon: <FiGift className="text-6xl text-purple-500" />,
      title: "Catering Services",
      description: "Perfect for events, parties, and corporate meetings",
      features: ["Bulk orders", "Event planning", "Custom menus", "Professional setup"],
      price: "Custom pricing available",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: <FiCoffee className="text-6xl text-green-500" />,
      title: "Chef Consultation",
      description: "Personal cooking sessions and culinary guidance",
      features: ["1-on-1 sessions", "Recipe development", "Cooking techniques", "Nutrition advice"],
      price: "$75/hour session",
      gradient: "from-green-500 to-teal-500"
    }
  ];

  const additionalServices = [
    { icon: <FiTruck className="text-4xl text-orange-500" />, title: "Express Delivery", desc: "15-minute delivery for urgent orders" },
    { icon: <FiClock className="text-4xl text-blue-500" />, title: "Scheduled Orders", desc: "Plan your meals up to a week in advance" },
    { icon: <FiShield className="text-4xl text-green-500" />, title: "Quality Guarantee", desc: "100% satisfaction or money back" },
    { icon: <FiHeart className="text-4xl text-red-500" />, title: "Dietary Support", desc: "Specialized meals for all dietary needs" }
  ];

  return (
    <div className="min-h-screen ">

      {/* Hero */}
      <section className="py-16 px-4 ">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1
            className="text-5xl font-bold mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Our Services
          </motion.h1>
          <motion.p
            className="text-xl opacity-90"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            From quick deliveries to personalized meal planning, we make dining exceptional
          </motion.p>
        </div>
      </section>

      {/* Main Services */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">

          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold  mb-4">
              Premium Services
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Comprehensive solutions designed for you
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {mainServices.map((service, index) => (
              <motion.div
                key={index}
                className="bg-white dark:bg-gray-800
                           p-8 rounded-3xl shadow-lg
                           border border-gray-200 dark:border-gray-700
                           hover:shadow-2xl transition-all"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="flex justify-center mb-6">{service.icon}</div>

                <h3 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-4">
                  {service.title}
                </h3>

                <p className="text-gray-600 dark:text-gray-300 text-center mb-6">
                  {service.description}
                </p>

                <div className="space-y-3 mb-6">
                  {service.features.map((feature, i) => (
                    <div key={i} className="flex items-center text-gray-700 dark:text-gray-300">
                      <FiCheck className="text-green-500 mr-3" />
                      {feature}
                    </div>
                  ))}
                </div>

                <div className="text-center">
                  <span className={`inline-block px-6 py-3 rounded-xl text-white font-bold bg-gradient-to-r ${service.gradient}`}>
                    {service.price}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">

          <h2 className="text-4xl font-bold text-center  mb-12">
            Additional Services
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {additionalServices.map((service, index) => (
              <motion.div
                key={index}
                className="bg-white dark:bg-gray-800
                           p-8 rounded-2xl text-center
                           border border-gray-200 dark:border-gray-700
                           hover:shadow-xl transition-all"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="flex justify-center mb-6">{service.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {service.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 ">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Experience Our Services?
          </h2>
          <p className="text-xl opacity-90 mb-8">
            Join thousands of happy customers today
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
           <Link to="/allmeals">
  <button
    className="
      px-8 py-4
      bg-white text-orange-500
      font-bold rounded-xl
      shadow-lg
      cursor-pointer
      hover:bg-gray-100
      hover:shadow-xl
      hover:-translate-y-0.5
      active:scale-95
      transition-all duration-300
      focus:outline-none focus:ring-4 focus:ring-white/40
      flex items-center gap-2
    "
  >
    <FiShoppingCart className="text-xl" />
    Order Now
  </button>
</Link>

<Link to="/about">
  <button
    className="
      px-8 py-4
      bg-white text-orange-500
      font-bold rounded-xl
      shadow-lg
      cursor-pointer
      hover:bg-gray-100
      hover:shadow-xl
      hover:-translate-y-0.5
      active:scale-95
      transition-all duration-300
      focus:outline-none focus:ring-4 focus:ring-white/40
      flex items-center gap-2
    "
  >
    <FiInfo className="text-xl" />
    Learn More
  </button>
</Link>

          </div>
        </div>
      </section>

    </div>
  );
};

export default Services;

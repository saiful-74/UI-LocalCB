import React from 'react';
import { motion } from 'framer-motion';
import { FiCalendar, FiGift, FiCoffee, FiHome } from 'react-icons/fi';

const ServicesSection = () => {
  const services = [
    {
      icon: <FiHome className="text-5xl text-orange-500" />,
      title: "Home Delivery",
      description: "Fresh meals delivered straight to your doorstep",
      features: ["30-min delivery", "Real-time tracking", "Contactless delivery"]
    },
    {
      icon: <FiCalendar className="text-5xl text-blue-500" />,
      title: "Meal Planning",
      description: "Weekly meal subscriptions tailored to your taste",
      features: ["Custom meal plans", "Dietary preferences", "Flexible scheduling"]
    },
    {
      icon: <FiGift className="text-5xl text-purple-500" />,
      title: "Catering Services",
      description: "Perfect for events, parties, and corporate meetings",
      features: ["Bulk orders", "Event planning", "Custom menus"]
    },
    {
      icon: <FiCoffee className="text-5xl text-green-500" />,
      title: "Chef Consultation",
      description: "Personal cooking sessions with professional chefs",
      features: ["1-on-1 sessions", "Recipe sharing", "Cooking tips"]
    }
  ];

  return (
    <section className="py-16 px-4 ">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold mb-4 ">
            Our Services
          </h2>
          <p className="text-xl  max-w-2xl mx-auto">
            From quick deliveries to personalized meal planning, we've got you covered
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="bg-gray-50 dark:bg-gray-700 p-8 rounded-2xl hover:shadow-xl transition-all duration-300 group hover:-translate-y-2"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="text-center mb-6 group-hover:scale-110 transition-transform duration-300">
                {service.icon}
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white text-center">
                {service.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6 text-center">
                {service.description}
              </p>
              <ul className="space-y-2">
                {service.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center text-gray-600 dark:text-gray-300">
                    <span className="w-2 h-2 bg-orange-500 rounded-full mr-3"></span>
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
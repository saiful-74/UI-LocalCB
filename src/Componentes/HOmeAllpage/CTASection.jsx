import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiStar, FiUsers, FiTruck } from 'react-icons/fi';

const CTASection = () => {
  return (
    <section className="py-20 px-4 bg-gradient-to-br from-gray-900 via-gray-800 to-black relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-orange-500/20 to-red-500/20"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-red-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl font-bold mb-6 text-white">
            Ready to Experience Amazing Food?
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Join thousands of food lovers who trust LocalChefBazaar for their daily meals. 
            Fresh ingredients, talented chefs, and lightning-fast delivery - all in one place.
          </p>

          {/* Stats Row */}
          <div className="flex flex-wrap justify-center gap-8 mb-12">
            <motion.div 
              className="flex items-center gap-3 text-white"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <FiStar className="text-2xl text-yellow-400" />
              <div>
                <div className="text-2xl font-bold">4.9/5</div>
                <div className="text-sm text-gray-400">Customer Rating</div>
              </div>
            </motion.div>
            
            <motion.div 
              className="flex items-center gap-3 text-white"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <FiUsers className="text-2xl text-blue-400" />
              <div>
                <div className="text-2xl font-bold">50K+</div>
                <div className="text-sm text-gray-400">Happy Customers</div>
              </div>
            </motion.div>
            
            <motion.div 
              className="flex items-center gap-3 text-white"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              viewport={{ once: true }}
            >
              <FiTruck className="text-2xl text-green-400" />
              <div>
                <div className="text-2xl font-bold">30 min</div>
                <div className="text-sm text-gray-400">Avg Delivery</div>
              </div>
            </motion.div>
          </div>

          {/* CTA Buttons */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            viewport={{ once: true }}
          >
            <Link to="/allmeals">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 text-lg"
              >
                Order Now
                <FiArrowRight className="text-xl" />
              </motion.button>
            </Link>
            
            <Link to="/signup">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-3 px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-xl hover:bg-white hover:text-gray-900 transition-all duration-300 text-lg"
              >
                Join as Chef
                <FiArrowRight className="text-xl" />
              </motion.button>
            </Link>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div 
            className="mt-12 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
            viewport={{ once: true }}
          >
            <p className="text-gray-400 mb-4">Trusted by food lovers across the city</p>
            <div className="flex justify-center items-center gap-8 opacity-60">
              <div className="text-white font-semibold">✓ Fresh Ingredients</div>
              <div className="text-white font-semibold">✓ Quality Assured</div>
              <div className="text-white font-semibold">✓ Fast Delivery</div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
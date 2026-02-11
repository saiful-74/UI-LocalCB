import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiArrowDown, FiPlay, FiStar } from 'react-icons/fi';
import burBlob from '../../assets/bur.png';
import gemBlob from '../../assets/gem.png';

const HeroBanner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const heroSlides = [
    {
      title: "Delicious Meals, Delivered Fresh",
      subtitle: "Healthy, tasty, and made with love just for you!",
      cta: "Explore Our Menu"
    },
    {
      title: "Local Chefs, Global Flavors",
      subtitle: "Experience authentic home-cooked meals from talented local chefs",
      cta: "Meet Our Chefs"
    },
    {
      title: "Fresh Ingredients, Fast Delivery",
      subtitle: "From kitchen to your doorstep in under 30 minutes",
      cta: "Order Now"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  return (
    <section
      className="mt-[-20px] relative w-full 
                 min-h-screen h-screen
                 flex items-center justify-center overflow-hidden 
                 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-700 dark:bg-gray-900"
      aria-label="Hero banner"
    >
      {/* Animated Background Elements */}
      <motion.div
        className="absolute w-72 h-72 rounded-full top-10 left-10 bg-center bg-cover opacity-20"
        style={{ backgroundImage: `url(${burBlob})` }}
        animate={{ y: [0, 40, 0], x: [0, 20, 0] }}
        transition={{
          duration: 10,
          repeat: Infinity,
          repeatType: 'mirror',
          ease: 'linear',
        }}
        aria-hidden="true"
      />
      <motion.div
        className="absolute w-96 h-96 rounded-full bottom-10 right-10 bg-center bg-cover opacity-20"
        style={{ backgroundImage: `url(${gemBlob})` }}
        animate={{ y: [0, -50, 0], x: [0, -30, 0] }}
        transition={{
          duration: 12,
          repeat: Infinity,
          repeatType: 'mirror',
          ease: 'linear',
        }}
        aria-hidden="true"
      />

      {/* Main Content */}
      <motion.div
        className="relative text-center px-4 max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: 'linear' }}
      >
        <motion.h1
          key={currentSlide}
          className="text-4xl md:text-6xl font-extrabold mb-4 bg-clip-text text-transparent font-heading
             dark:bg-gradient-to-r dark:from-pink-500 dark:via-purple-500 dark:to-yellow-400
             bg-gradient-to-r from-red-500 via-orange-400 to-yellow-400"
          style={{
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textShadow: '2px 2px 8px rgba(0,0,0,0.25)',
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {heroSlides[currentSlide].title}
        </motion.h1>

        <motion.p
          key={`subtitle-${currentSlide}`}
          className="text-md md:text-xl mb-8 font-semibold bg-clip-text text-transparent font-body
                     dark:bg-gradient-to-r dark:from-pink-400 dark:to-yellow-300
                     bg-gradient-to-r from-red-500 to-yellow-400"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          {heroSlides[currentSlide].subtitle}
        </motion.p>

        {/* Stats Row */}
        <motion.div 
          className="flex justify-center items-center gap-8 mb-8 text-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <div className="flex items-center gap-2">
            <FiStar className="text-yellow-400" />
            <span className="font-semibold">4.9 Rating</span>
          </div>
          <div className="hidden md:block w-px h-6 bg-gray-400"></div>
          <div className="flex items-center gap-2">
            <span className="font-semibold">500+ Meals</span>
          </div>
          <div className="hidden md:block w-px h-6 bg-gray-400"></div>
          <div className="flex items-center gap-2">
            <span className="font-semibold">30min Delivery</span>
          </div>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div 
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8 }}
        >
          <Link to={'allmeals'}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="font-semibold px-8 py-4 rounded-xl shadow-lg text-white 
               bg-gradient-to-r from-red-500 via-orange-500 to-yellow-400
               bg-[length:200%_100%] bg-left hover:bg-right transition-all duration-500
               cursor-pointer text-xl"
            >
              {heroSlides[currentSlide].cta}
            </motion.button>
          </Link>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-2 font-semibold px-8 py-4 rounded-xl 
             bg-transparent border-2 border-white text-white hover:bg-white hover:text-gray-900
             transition-all duration-300 text-xl"
          >
            <FiPlay size={20} />
            Watch Video
          </motion.button>
        </motion.div>

        {/* Slide Indicators */}
        <div className="flex justify-center gap-2 mt-8">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide ? 'bg-yellow-400 w-8' : 'bg-gray-400'
              }`}
            />
          ))}
        </div>
      </motion.div>

      {/* Scroll Down Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <FiArrowDown className="text-white text-2xl" />
        <p className="text-white text-sm mt-2">Scroll Down</p>
      </motion.div>
    </section>
  );
};

export default HeroBanner;

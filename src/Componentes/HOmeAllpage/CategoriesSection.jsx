import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const CategoriesSection = () => {
  const categories = [
    {
      name: "Mexican Flavors",
      image: "https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=400&h=300&fit=crop",
      count: "35+ dishes",
      color: "from-yellow-500 to-red-500"
    },
    {
      name: "Mediterranean",
      image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400&h=300&fit=crop",
      count: "40+ dishes",
      color: "from-blue-500 to-purple-500"
    },
    {
      name: "Indian Spices",
      image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&h=300&fit=crop",
      count: "55+ dishes",
      color: "from-orange-500 to-pink-500"
    },
    {
      name: "American Classic",
      image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400&h=300&fit=crop",
      count: "30+ dishes",
      color: "from-purple-500 to-indigo-500"
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
            Explore Cuisines
          </h2>
          <p className="text-xl  max-w-2xl mx-auto">
            Discover flavors from around the world, prepared by local chefs with authentic recipes
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <motion.div
              key={index}
              className="relative group cursor-pointer overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${category.color} opacity-60 group-hover:opacity-70 transition-opacity duration-300`}></div>
              </div>
              
              <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                <h3 className="text-2xl font-bold mb-2 transform group-hover:translate-y-[-4px] transition-transform duration-300">
                  {category.name}
                </h3>
                <p className="text-lg opacity-90 transform group-hover:translate-y-[-4px] transition-transform duration-300">
                  {category.count}
                </p>
                <Link to="/allmeals">
                  <button className="mt-4 px-6 py-2 bg-white text-gray-800 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-300 transform group-hover:translate-y-[-4px] opacity-0 group-hover:opacity-100">
                    Explore Now
                  </button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
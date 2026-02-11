import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiCalendar, FiUser, FiArrowRight } from 'react-icons/fi';

const BlogSection = () => {
  const blogPosts = [
    {
      id: 1,
      title: "10 Healthy Meal Prep Ideas for Busy Professionals",
      excerpt: "Discover time-saving meal prep strategies that will keep you eating healthy even during your busiest weeks.",
      image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=250&fit=crop",
      author: "Chef Maria Rodriguez",
      date: "Jan 10, 2026",
      readTime: "5 min read",
      category: "Health & Nutrition"
    },
    {
      id: 2,
      title: "The Art of Italian Pasta: From Nonna's Kitchen",
      excerpt: "Learn the secrets behind authentic Italian pasta dishes from our featured chef who trained in Tuscany.",
      image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=400&h=250&fit=crop",
      author: "Chef Giuseppe Bianchi",
      date: "Jan 8, 2026",
      readTime: "7 min read",
      category: "Cooking Tips"
    },
    {
      id: 3,
      title: "Sustainable Cooking: Local Ingredients, Global Impact",
      excerpt: "How choosing local ingredients can make a difference for both your health and the environment.",
      image: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=250&fit=crop",
      author: "Chef Sarah Green",
      date: "Jan 5, 2026",
      readTime: "6 min read",
      category: "Sustainability"
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
            From Our Kitchen Blog
          </h2>
          <p className="text-xl  max-w-2xl mx-auto">
            Discover cooking tips, recipes, and stories from our talented chef community
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <motion.article
              key={post.id}
              className="bg-gray-50 dark:bg-gray-700 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group hover:-translate-y-2"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="relative overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-orange-500 text-white text-sm font-semibold rounded-full">
                    {post.category}
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3 text-gray-800 dark:text-white line-clamp-2 group-hover:text-orange-500 transition-colors duration-300">
                  {post.title}
                </h3>
                
                <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
                
                <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
                  <div className="flex items-center gap-2">
                    <FiUser className="text-orange-500" />
                    <span>{post.author}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <FiCalendar className="text-orange-500" />
                      <span>{post.date}</span>
                    </div>
                    <span>{post.readTime}</span>
                  </div>
                </div>
                
                <Link to={`/blog/${post.id}`}>
                  <button className="flex items-center gap-2 text-orange-500 font-semibold hover:text-orange-600 transition-colors duration-300 group-hover:gap-3">
                    Read More
                    <FiArrowRight className="transition-all duration-300" />
                  </button>
                </Link>
              </div>
            </motion.article>
          ))}
        </div>

        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <Link to="/blog">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-orange-500 text-white font-bold rounded-xl hover:bg-orange-600 transition-colors duration-300"
            >
              View All Articles
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default BlogSection;
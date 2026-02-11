import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiCalendar, FiUser, FiClock, FiArrowLeft, FiTag, FiShare2 } from 'react-icons/fi';

const BlogPost = () => {
  const { id } = useParams();

  // Sample blog posts data (same as in Blog.jsx)
  const blogPosts = [
    {
      id: 1,
      title: "10 Healthy Meal Prep Ideas for Busy Professionals",
      excerpt: "Discover time-saving meal prep strategies that will keep you eating healthy even during your busiest weeks.",
      content: `
        <p>In today's fast-paced world, maintaining a healthy diet can be challenging, especially for busy professionals. Meal prepping is a game-changer that can help you stay on track with your nutrition goals while saving time and money.</p>
        
        <h2>Why Meal Prep Works</h2>
        <p>Meal preparation isn't just about cooking in bulk – it's about creating a sustainable system that fits your lifestyle. When you prep meals in advance, you eliminate the daily decision fatigue of "what should I eat?" and reduce the temptation to order takeout.</p>
        
        <h2>Top 10 Meal Prep Ideas</h2>
        <ol>
          <li><strong>Mason Jar Salads:</strong> Layer your ingredients strategically to keep everything fresh for up to 5 days.</li>
          <li><strong>Protein Power Bowls:</strong> Combine lean proteins with quinoa, roasted vegetables, and healthy fats.</li>
          <li><strong>Overnight Oats:</strong> Prepare 5 different flavors for a week's worth of healthy breakfasts.</li>
          <li><strong>Sheet Pan Meals:</strong> Cook proteins and vegetables together for easy, balanced dinners.</li>
          <li><strong>Freezer-Friendly Soups:</strong> Make large batches and freeze in individual portions.</li>
          <li><strong>Energy Balls:</strong> No-bake snacks packed with nuts, seeds, and dried fruits.</li>
          <li><strong>Veggie Wraps:</strong> Use large lettuce leaves or whole grain tortillas for portable lunches.</li>
          <li><strong>Bento Box Style:</strong> Portion out proteins, carbs, and vegetables in compartmented containers.</li>
          <li><strong>Smoothie Packs:</strong> Pre-portion frozen fruits and vegetables for quick morning smoothies.</li>
          <li><strong>Grain Bowls:</strong> Cook grains in bulk and mix with different toppings throughout the week.</li>
        </ol>
        
        <h2>Pro Tips for Success</h2>
        <p>Start small with just 2-3 meals per week, invest in quality containers, and don't forget to include variety to prevent boredom. Remember, the best meal prep system is the one you'll actually stick to!</p>
      `,
      image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&h=400&fit=crop",
      author: "Chef Maria Rodriguez",
      date: "Jan 10, 2026",
      readTime: "5 min read",
      category: "Health & Nutrition"
    },
    {
      id: 2,
      title: "The Art of Italian Pasta: From Nonna's Kitchen",
      excerpt: "Learn the secrets behind authentic Italian pasta dishes from our featured chef who trained in Tuscany.",
      content: `
        <p>There's something magical about authentic Italian pasta that goes beyond just the ingredients – it's about tradition, technique, and the love that goes into every dish. Having trained in the hills of Tuscany, I've learned that true Italian cooking is about simplicity and respect for each ingredient.</p>
        
        <h2>The Foundation: Perfect Pasta</h2>
        <p>Great pasta starts with quality ingredients. Use 00 flour for the silkiest texture, fresh eggs from pasture-raised chickens, and a pinch of sea salt. The dough should be kneaded until smooth and elastic, then rested to develop the gluten properly.</p>
        
        <h2>Essential Techniques</h2>
        <p>The key to restaurant-quality pasta at home lies in these fundamental techniques:</p>
        <ul>
          <li><strong>Salt your water generously:</strong> It should taste like the sea</li>
          <li><strong>Save pasta water:</strong> The starchy liquid is liquid gold for binding sauces</li>
          <li><strong>Finish in the pan:</strong> Always complete cooking the pasta in the sauce</li>
          <li><strong>Mantecatura:</strong> The vigorous stirring that creates creamy, emulsified sauces</li>
        </ul>
        
        <h2>Classic Recipes to Master</h2>
        <p>Start with these timeless dishes that showcase proper technique:</p>
        <ul>
          <li>Cacio e Pepe - Just cheese, pepper, and pasta water</li>
          <li>Aglio e Olio - Garlic, olive oil, and chili flakes</li>
          <li>Carbonara - Eggs, pecorino, guanciale, and black pepper</li>
          <li>Amatriciana - Tomatoes, guanciale, and pecorino</li>
        </ul>
        
        <p>Remember, Italian cooking is about letting each ingredient shine. Don't overcomplicate – focus on quality and technique, and you'll create pasta dishes that would make any nonna proud.</p>
      `,
      image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=800&h=400&fit=crop",
      author: "Chef Giuseppe Bianchi",
      date: "Jan 8, 2026",
      readTime: "7 min read",
      category: "Cooking Tips"
    },
    {
      id: 3,
      title: "Sustainable Cooking: Local Ingredients, Global Impact",
      excerpt: "How choosing local ingredients can make a difference for both your health and the environment.",
      content: `
        <p>Sustainable cooking isn't just a trend – it's a responsibility we all share as consumers and food lovers. By making conscious choices about where our ingredients come from, we can create positive impacts that extend far beyond our kitchens.</p>
        
        <h2>The Local Advantage</h2>
        <p>When you choose local ingredients, you're supporting your community's economy while reducing the environmental impact of long-distance transportation. Local produce is often fresher, more nutritious, and bursting with flavor because it's harvested at peak ripeness.</p>
        
        <h2>Building Relationships</h2>
        <p>Getting to know your local farmers and producers creates a connection to your food that's both meaningful and educational. Visit farmers markets, join a CSA (Community Supported Agriculture), or even start a small herb garden at home.</p>
        
        <h2>Seasonal Cooking Benefits</h2>
        <ul>
          <li><strong>Better Flavor:</strong> Seasonal ingredients are at their peak taste</li>
          <li><strong>Lower Cost:</strong> Abundant seasonal produce is typically more affordable</li>
          <li><strong>Nutritional Value:</strong> Fresh, local produce retains more nutrients</li>
          <li><strong>Environmental Impact:</strong> Reduced transportation and storage needs</li>
        </ul>
        
        <h2>Simple Swaps for Sustainability</h2>
        <p>Start small with these easy changes:</p>
        <ul>
          <li>Choose seasonal vegetables for your weekly meal planning</li>
          <li>Buy herbs in pots instead of plastic packages</li>
          <li>Reduce food waste by using vegetable scraps for stock</li>
          <li>Compost kitchen scraps to enrich your garden soil</li>
          <li>Choose sustainably sourced proteins and seafood</li>
        </ul>
        
        <p>Every small choice adds up to make a significant difference. By cooking sustainably, we're not just nourishing our bodies – we're nurturing our planet for future generations.</p>
      `,
      image: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&h=400&fit=crop",
      author: "Chef Sarah Green",
      date: "Jan 5, 2026",
      readTime: "6 min read",
      category: "Sustainability"
    },
    {
      id: 4,
      title: "Spice It Up: A Guide to Asian Flavor Profiles",
      excerpt: "Explore the complex world of Asian spices and learn how to balance sweet, sour, salty, and umami flavors in your cooking.",
      content: `
        <p>Asian cuisine is renowned for its complex flavor profiles that dance on your palate. Understanding how to balance sweet, sour, salty, bitter, and umami flavors is the key to creating authentic and delicious Asian dishes at home.</p>
        
        <h2>The Five Flavor Foundation</h2>
        <p>Traditional Asian cooking recognizes five fundamental tastes, each playing a crucial role in creating harmony:</p>
        <ul>
          <li><strong>Sweet:</strong> Palm sugar, rock sugar, mirin</li>
          <li><strong>Sour:</strong> Rice vinegar, tamarind, lime juice</li>
          <li><strong>Salty:</strong> Soy sauce, fish sauce, miso</li>
          <li><strong>Bitter:</strong> Dark leafy greens, bitter melon</li>
          <li><strong>Umami:</strong> Mushrooms, fermented pastes, dried seafood</li>
        </ul>
        
        <h2>Essential Spice Pantry</h2>
        <p>Build your Asian spice collection with these versatile ingredients:</p>
        <ul>
          <li>Star anise and five-spice powder</li>
          <li>Szechuan peppercorns</li>
          <li>White and black pepper</li>
          <li>Dried chilies and chili oil</li>
          <li>Fresh ginger and galangal</li>
          <li>Lemongrass and kaffir lime leaves</li>
        </ul>
        
        <h2>Regional Variations</h2>
        <p>Each Asian cuisine has its own signature flavor combinations:</p>
        <ul>
          <li><strong>Thai:</strong> Sweet, sour, and spicy with coconut and herbs</li>
          <li><strong>Chinese:</strong> Balance of all five flavors with emphasis on umami</li>
          <li><strong>Japanese:</strong> Subtle, clean flavors highlighting natural ingredients</li>
          <li><strong>Korean:</strong> Fermented flavors with heat and garlic</li>
          <li><strong>Vietnamese:</strong> Fresh herbs with fish sauce and lime</li>
        </ul>
        
        <p>Start experimenting with small amounts and taste as you go. The beauty of Asian cooking lies in finding the perfect balance that suits your palate while respecting traditional flavor principles.</p>
      `,
      image: "https://images.unsplash.com/photo-1563379091339-03246963d51a?w=800&h=400&fit=crop",
      author: "Chef David Kim",
      date: "Jan 3, 2026",
      readTime: "8 min read",
      category: "World Cuisine"
    },
    {
      id: 5,
      title: "The Science of Baking: Perfect Bread Every Time",
      excerpt: "Understanding the chemistry behind bread making will help you achieve consistent, delicious results every time you bake.",
      content: `
        <p>Baking bread is both an art and a science. While the artistry comes with experience, understanding the scientific principles behind bread making will dramatically improve your consistency and results.</p>
        
        <h2>The Four Pillars of Bread</h2>
        <p>Every great loaf starts with four essential ingredients:</p>
        <ul>
          <li><strong>Flour:</strong> Provides structure through gluten development</li>
          <li><strong>Water:</strong> Hydrates flour and activates yeast</li>
          <li><strong>Yeast:</strong> Creates fermentation and leavening</li>
          <li><strong>Salt:</strong> Controls fermentation and enhances flavor</li>
        </ul>
        
        <h2>Understanding Gluten</h2>
        <p>Gluten is the protein network that gives bread its structure and chew. Proper kneading develops this network, creating the elasticity needed to trap gas bubbles from fermentation. Under-kneaded dough won't rise properly, while over-kneaded dough becomes tough.</p>
        
        <h2>The Magic of Fermentation</h2>
        <p>Yeast fermentation does more than just make bread rise – it develops flavor and improves digestibility. Longer, slower fermentation creates more complex flavors and better texture. This is why artisan breads often use preferments or cold fermentation techniques.</p>
        
        <h2>Temperature Matters</h2>
        <p>Every stage of bread making is temperature-sensitive:</p>
        <ul>
          <li><strong>Water temperature:</strong> Affects yeast activity (75-85°F is ideal)</li>
          <li><strong>Dough temperature:</strong> Controls fermentation speed</li>
          <li><strong>Proofing temperature:</strong> Determines rise time and flavor development</li>
          <li><strong>Oven temperature:</strong> Creates proper crust and crumb structure</li>
        </ul>
        
        <h2>Troubleshooting Common Issues</h2>
        <ul>
          <li><strong>Dense bread:</strong> Usually under-fermented or insufficient gluten development</li>
          <li><strong>Flat loaves:</strong> Over-proofed dough or weak gluten structure</li>
          <li><strong>Gummy texture:</strong> Under-baked or cut too soon after baking</li>
          <li><strong>Poor crust:</strong> Insufficient steam or wrong oven temperature</li>
        </ul>
        
        <p>Remember, bread making is forgiving. Each "mistake" is a learning opportunity that brings you closer to understanding the beautiful science behind this ancient craft.</p>
      `,
      image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&h=400&fit=crop",
      author: "Chef Isabella Santos",
      date: "Dec 28, 2025",
      readTime: "10 min read",
      category: "Baking"
    },
    {
      id: 6,
      title: "Farm-to-Table: Building Relationships with Local Farmers",
      excerpt: "Learn how to source the freshest ingredients directly from local farms and build lasting relationships with producers in your area.",
      content: `
        <p>The farm-to-table movement isn't just about fresh ingredients – it's about building a community around food, supporting local agriculture, and creating meaningful connections between producers and consumers.</p>
        
        <h2>Why Go Direct to Farmers?</h2>
        <p>When you buy directly from farmers, you're getting ingredients at their peak freshness and flavor. You also have the opportunity to learn about growing practices, seasonal availability, and even influence what farmers grow based on your needs.</p>
        
        <h2>Finding Local Producers</h2>
        <p>Start your farm-to-table journey with these resources:</p>
        <ul>
          <li><strong>Farmers Markets:</strong> The best place to meet producers face-to-face</li>
          <li><strong>CSA Programs:</strong> Community Supported Agriculture boxes</li>
          <li><strong>Farm Stands:</strong> Direct sales at the farm location</li>
          <li><strong>Online Directories:</strong> Local food hub websites and apps</li>
          <li><strong>Restaurant Recommendations:</strong> Ask chefs about their suppliers</li>
        </ul>
        
        <h2>Building Relationships</h2>
        <p>Successful farm-to-table cooking is built on relationships. Get to know your farmers by:</p>
        <ul>
          <li>Asking about their growing practices and philosophy</li>
          <li>Learning about seasonal availability and planning accordingly</li>
          <li>Providing feedback on quality and preferences</li>
          <li>Being flexible and open to trying new varieties</li>
          <li>Paying promptly and treating farmers as partners</li>
        </ul>
        
        <h2>Seasonal Menu Planning</h2>
        <p>Working with local farms means embracing seasonality. This approach offers several benefits:</p>
        <ul>
          <li>Ingredients are at peak flavor and nutrition</li>
          <li>Costs are lower when produce is in season</li>
          <li>Menus stay fresh and exciting with natural variety</li>
          <li>You develop a deeper connection to the growing cycle</li>
        </ul>
        
        <h2>Storage and Preservation</h2>
        <p>Make the most of seasonal abundance by learning preservation techniques:</p>
        <ul>
          <li>Freezing peak-season fruits and vegetables</li>
          <li>Canning and pickling surplus produce</li>
          <li>Dehydrating herbs and vegetables</li>
          <li>Root cellaring for long-term storage</li>
        </ul>
        
        <p>Building relationships with local farmers enriches your cooking and connects you to your community. It's an investment in better food, environmental sustainability, and the preservation of local agriculture.</p>
      `,
      image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&h=400&fit=crop",
      author: "Chef Michael Chen",
      date: "Dec 25, 2025",
      readTime: "6 min read",
      category: "Sustainability"
    }
  ];

  const post = blogPosts.find(p => p.id === parseInt(id));

  if (!post) {
    return (
      <div className="min-h-screen  flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">Post Not Found</h1>
          <p className="text-gray-600 dark:text-gray-300 mb-8">The blog post you're looking for doesn't exist.</p>
          <Link to="/blog">
            <button className="px-6 py-3 bg-orange-500 text-white font-bold rounded-xl hover:bg-orange-600 transition-colors duration-300">
              Back to Blog
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen ">
      {/* Back Button */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Link to="/blog">
          <button className="flex items-center gap-2 text-orange-500 hover:text-orange-600 transition-colors duration-300 mb-8">
            <FiArrowLeft />
            Back to Blog
          </button>
        </Link>
      </div>

      {/* Hero Image */}
      <div className="max-w-6xl mx-auto px-4 mb-8">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-96 object-cover rounded-2xl shadow-xl"
        />
      </div>

      {/* Article Content */}
      <article className="max-w-4xl mx-auto px-4 pb-16">
        {/* Article Header */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center gap-4 mb-6">
            <span className="px-4 py-2 bg-orange-500 text-white text-sm font-semibold rounded-full flex items-center gap-2">
              <FiTag size={14} />
              {post.category}
            </span>
            <button className="flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-orange-500 transition-colors duration-300">
              <FiShare2 />
              Share
            </button>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-6 leading-tight">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-gray-600 dark:text-gray-400 mb-8">
            <div className="flex items-center gap-2">
              <FiUser className="text-orange-500" />
              <span className="font-medium">{post.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <FiCalendar className="text-orange-500" />
              <span>{post.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <FiClock className="text-orange-500" />
              <span>{post.readTime}</span>
            </div>
          </div>

          <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
            {post.excerpt}
          </p>
        </motion.div>

        {/* Article Body */}
        <motion.div
          className="prose prose-lg dark:prose-invert max-w-none"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          dangerouslySetInnerHTML={{ __html: post.content }}
          style={{
            color: 'inherit',
          }}
        />

        {/* Author Bio */}
        <motion.div
          className="mt-12 p-8 bg-gray-50 dark:bg-gray-800 rounded-2xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">About the Author</h3>
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
              {post.author.split(' ').map(n => n[0]).join('')}
            </div>
            <div>
              <h4 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">{post.author}</h4>
              <p className="text-gray-600 dark:text-gray-300">
                A passionate chef dedicated to sharing culinary knowledge and inspiring home cooks to create amazing dishes. 
                Follow along for more cooking tips, recipes, and kitchen wisdom.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Related Articles */}
        <motion.div
          className="mt-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">More Articles</h3>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/blog" className="flex-1">
              <button className="w-full px-6 py-3 bg-orange-500 text-white font-bold rounded-xl hover:bg-orange-600 transition-colors duration-300">
                View All Articles
              </button>
            </Link>
            <Link to="/blog" className="flex-1">
              <button className="w-full px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white font-bold rounded-xl hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-300">
                Back to Blog
              </button>
            </Link>
          </div>
        </motion.div>
      </article>
    </div>
  );
};

export default BlogPost;
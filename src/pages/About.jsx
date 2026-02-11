import React from 'react';
import { motion } from 'framer-motion';
import {
  FiHeart,
  FiUsers,
  FiTruck,
  FiAward,
  FiTarget,
  FiEye,
  FiShield,
  FiTrendingUp,
  FiGlobe,
  FiThumbsUp
} from 'react-icons/fi';

/*
  Updated About page tuned for both Light and Dark modes:
  - Uses neutral page background (transparent) so the app's global background controls light/dark.
  - Cards use subtle translucent/backdrop-blur panels that adapt: bg-white/80 in light, dark:bg-gray-900/70 in dark.
  - Text colors use text-gray-900 dark:text-gray-100 for good contrast in both modes.
  - Buttons and accent colors also adapt for readability.
  - Retains simple, responsive layout and subtle motion.
*/

const stats = [
  { icon: <FiUsers />, number: '50K+', label: 'Happy Customers', color: 'text-blue-600 dark:text-blue-400' },
  { icon: <FiTruck />, number: '100K+', label: 'Deliveries Made', color: 'text-green-600 dark:text-green-400' },
  { icon: <FiHeart />, number: '200+', label: 'Local Chefs', color: 'text-red-600 dark:text-red-400' },
  { icon: <FiAward />, number: '4.9', label: 'Average Rating', color: 'text-yellow-600 dark:text-yellow-400' }
];

const team = [
  {
    name: 'Sarah Johnson',
    role: 'Founder & CEO',
    image:
      'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face',
    bio: 'Former chef turned entrepreneur, passionate about connecting local talent with food lovers.',
    experience: '15+ years in culinary industry'
  },
  {
    name: 'Michael Chen',
    role: 'Head of Operations',
    image:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
    bio: 'Logistics expert ensuring every meal reaches you fresh and on time.',
    experience: '12+ years in operations'
  },
  {
    name: 'Emily Rodriguez',
    role: 'Chef Relations Manager',
    image:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face',
    bio: 'Building relationships with talented chefs and maintaining our quality standards.',
    experience: '10+ years in hospitality'
  },
  {
    name: 'David Park',
    role: 'Technology Director',
    image:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
    bio: 'Leading our tech innovation to create seamless food delivery experiences.',
    experience: '8+ years in tech'
  },
  {
    name: 'Lisa Thompson',
    role: 'Marketing Director',
    image:
      'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop&crop=face',
    bio: 'Connecting our brand with communities and spreading the love for local cuisine.',
    experience: '11+ years in marketing'
  },
  {
    name: 'James Wilson',
    role: 'Quality Assurance Lead',
    image:
      'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop&crop=face',
    bio: 'Ensuring every meal meets our high standards for quality and freshness.',
    experience: '9+ years in quality control'
  }
];

const milestones = [
  {
    year: '2020',
    title: 'The Beginning',
    description:
      'LocalChefBazaar was founded with 5 local chefs and a dream to revolutionize food delivery.',
    icon: <FiHeart className="text-2xl text-red-500" />
  },
  {
    year: '2021',
    title: 'Rapid Growth',
    description:
      'Expanded to 50+ chefs and launched our mobile app with 10,000+ downloads.',
    icon: <FiTrendingUp className="text-2xl text-green-500" />
  },
  {
    year: '2022',
    title: 'Community Focus',
    description: 'Introduced chef training programs and sustainability initiatives.',
    icon: <FiUsers className="text-2xl text-blue-500" />
  },
  {
    year: '2023',
    title: 'Quality Excellence',
    description:
      'Achieved 4.9-star rating and launched premium chef certification program.',
    icon: <FiAward className="text-2xl text-yellow-500" />
  },
  {
    year: '2024',
    title: 'Innovation Leader',
    description: 'Introduced AI-powered meal recommendations and eco-friendly packaging.',
    icon: <FiGlobe className="text-2xl text-purple-500" />
  },
  {
    year: '2025',
    title: 'Future Vision',
    description: 'Expanding to new cities while maintaining our commitment to local communities.',
    icon: <FiTarget className="text-2xl text-orange-500" />
  }
];

const values = [
  {
    icon: <FiShield className="text-4xl text-blue-600 dark:text-blue-400" />,
    title: 'Quality First',
    description:
      'We maintain the highest standards for ingredients, preparation, and delivery to ensure every meal exceeds expectations.',
    features: ['Fresh ingredients', 'Rigorous quality checks', 'Temperature controlled delivery']
  },
  {
    icon: <FiUsers className="text-4xl text-green-600 dark:text-green-400" />,
    title: 'Community Support',
    description:
      "We're committed to supporting local chefs and building a stronger, more connected food community.",
    features: ['Local chef partnerships', 'Community events', 'Skill development programs']
  },
  {
    icon: <FiTrendingUp className="text-4xl text-purple-600 dark:text-purple-400" />,
    title: 'Innovation',
    description:
      'We continuously improve our platform and services to provide the best possible experience for everyone.',
    features: ['Advanced technology', 'User feedback integration', 'Sustainable practices']
  }
];

const About = () => {
  return (
    <div className="min-h-screen ">
      {/* Hero */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-3 px-4 py-2 rounded-full text-sm bg-gray-100/50 dark:bg-gray-800/50"
          >
            <FiHeart className="text-xl" />
            <span className="font-medium">Our Story</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="mt-6 text-4xl sm:text-5xl font-bold leading-tight"
          >
            About LocalChefBazaar
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-4 text-lg max-w-3xl mx-auto leading-relaxed "
          >
            Connecting food lovers with talented local chefs, one delicious meal at a time.
            We're building a community where culinary passion meets convenience.
          </motion.p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          <motion.div
            initial={{ opacity: 0, x: -8 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="mb-4 inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm bg-gray-100/50 dark:bg-gray-800/50">
              <FiTarget />
              <span className="font-semibold">Our Mission</span>
            </div>
            <h2 className="text-2xl font-bold mb-4">Revolutionizing Home-Cooked Meals</h2>
            <p className=" leading-relaxed mb-3">
              LocalChefBazaar was born from a simple idea: everyone deserves access to delicious,
              home-cooked meals made with love and fresh ingredients.
            </p>
            <p className="leading-relaxed">
              We started in 2020 with a handful of chefs and a local focus. Today, we proudly support
              hundreds of chefs and serve thousands of customers — always with quality and community at the core.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 8 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="mb-4 inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm bg-gray-100/50 dark:bg-gray-800/50">
              <FiEye />
              <span className="font-semibold">Our Vision</span>
            </div>
            <h2 className="text-2xl font-bold mb-4">Building Food Communities</h2>
            <p className=" leading-relaxed mb-3">
              We envision a world where local culinary talent thrives and communities are connected through food.
            </p>
            <p className=" leading-relaxed">
              Our goal is to create lasting relationships between chefs and customers while preserving culinary traditions.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            className="text-2xl sm:text-3xl font-bold text-center mb-8"
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Our Impact in Numbers
          </motion.h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.06 }}
                viewport={{ once: true }}
                className="text-center p-6 rounded-xl shadow-sm bg-white/80 dark:bg-gray-900/70 backdrop-blur-sm"
              >
                <div className={`${stat.color} text-2xl mb-2 flex justify-center`}>{stat.icon}</div>
                <div className="text-xl font-bold text-gray-900 dark:text-gray-100">{stat.number}</div>
                <div className="text-sm text-gray-600 dark:text-gray-300 mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <h3 className="text-2xl font-bold">Our Journey</h3>
            <p className=" max-w-2xl mx-auto mt-2">From a small startup to a community platform — how we grew together.</p>
          </motion.div>

          <div className="space-y-6">
            {milestones.map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -8 : 8 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: i * 0.04 }}
                viewport={{ once: true }}
                className="flex flex-col md:flex-row md:items-start md:gap-6"
              >
                <div className="md:w-32 flex-shrink-0 text-gray-700 dark:text-gray-300 font-semibold">{m.year}</div>
                <div className="flex-1 p-4 rounded-xl shadow-sm bg-white/80 dark:bg-gray-900/70 backdrop-blur-sm">
                  <div className="flex items-center gap-3 mb-2">
                    <div>{m.icon}</div>
                    <h4 className="font-bold text-lg text-gray-900 dark:text-gray-100">{m.title}</h4>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300">{m.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold">Our Core Values</h3>
            <p className=" max-w-2xl mx-auto mt-2">Principles that guide everything we do.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {values.map((val, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.06 }}
                viewport={{ once: true }}
                className="p-6 rounded-xl shadow-sm bg-white/80 dark:bg-gray-900/70 backdrop-blur-sm text-center"
              >
                <div className="mb-4 flex justify-center">{val.icon}</div>
                <h4 className="font-bold text-lg mb-2 text-gray-900 dark:text-gray-100">{val.title}</h4>
                <p className="text-gray-600 dark:text-gray-300 mb-4">{val.description}</p>
                <ul className="space-y-2">
                  {val.features.map((f, j) => (
                    <li key={j} className="flex items-center justify-center gap-2 text-gray-600 dark:text-gray-300">
                      <FiThumbsUp className="text-green-500" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold">Meet Our Team</h3>
            <p className="  max-w-2xl mx-auto mt-2">The people who make LocalChefBazaar possible.</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {team.map((member, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.06 }}
                viewport={{ once: true }}
                className="rounded-xl overflow-hidden shadow-sm bg-white/80 dark:bg-gray-900/70 backdrop-blur-sm"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-56 object-cover"
                />
                <div className="p-6">
                  <h4 className="text-lg font-bold text-gray-900 dark:text-gray-100">{member.name}</h4>
                  <div className="text-sm text-orange-500 font-medium mb-2">{member.role}</div>
                  <p className="text-gray-600 dark:text-gray-300 mb-3">{member.bio}</p>
                  <div className="text-sm text-gray-500 dark:text-gray-400">{member.experience}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <motion.h3
            className="text-2xl font-bold mb-4 "
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Ready to Join Our Story?
          </motion.h3>
          <motion.p
            className=" mb-6"
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.06 }}
            viewport={{ once: true }}
          >
            Whether you're a food lover or a chef, LocalChefBazaar is your platform to connect and celebrate great food.
          </motion.p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href="#order"
              className="inline-block px-6 py-3 rounded-lg bg-orange-600 dark:bg-orange-500 text-white font-semibold hover:opacity-95 transition"
            >
              Order Amazing Food
            </a>
            <a
              href="#become-chef"
              className="inline-block px-6 py-3 rounded-lg border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-800 transition"
            >
              Become a Chef Partner
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
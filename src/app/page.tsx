'use client';
import { LoginLink, LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { getGameImageByTitle } from '@/lib/getGameImage';
import {
  Search,
  Bell,
  User,
  Home,
  ListFilter,
  TrendingUp,
} from 'lucide-react';
// Interfaces
interface Game {
  id: number;
  title: string;
  image: string;
  currentPrice: number;
  originalPrice: number;
  discount: number;
  platform: string;
}

interface NavItemProps {
  icon: React.ReactNode;
  text: string;
}

const NavItem: React.FC<NavItemProps> = ({ icon, text }) => (
  <a
    href="#"
    className="flex items-center text-gray-300 hover:text-white transition duration-300 transform hover:scale-105"
  >
    {icon}
    {text}
  </a>
);

interface GameCardProps {
  game: Game;
}

const GameCard: React.FC<GameCardProps> = ({ game }) => (
  <motion.div
    className="bg-gray-800 rounded-xl shadow-2xl overflow-hidden transform hover:scale-105 transition duration-300 ease-in-out border border-gray-700"
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <img
      src={game.image}
      alt={game.title}
      className="w-full h-48 object-cover"
    />
    <div className="p-6">
      <h3 className="text-xl font-semibold text-white mb-2">{game.title}</h3>
      <p className="text-gray-400 text-sm mb-4">Platform: {game.platform}</p>
      <div className="flex items-baseline mb-4">
        <span className="text-3xl font-bold text-green-400 mr-3">
          ${game.currentPrice.toFixed(2)}
        </span>
        <span className="text-lg text-gray-500 line-through mr-3">
          ${game.originalPrice.toFixed(2)}
        </span>
        <span className="text-lg font-bold text-yellow-400">
          {game.discount}% OFF
        </span>
      </div>
      <div className="flex justify-between items-center">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg text-sm transition duration-300 transform hover:shadow-lg"
        >
          Track Game
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-lg text-sm transition duration-300 transform hover:shadow-lg"
        >
          View Details
        </motion.button>
      </div>
    </div>
  </motion.div>
);

interface HowItWorksStepProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  index: number;
}

const howItWorksVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.6 },
  }),
};

const HowItWorksStep: React.FC<HowItWorksStepProps> = ({
  icon,
  title,
  description,
  index,
}) => (
  <motion.div
    variants={howItWorksVariant}
    initial="hidden"
    animate="visible"
    custom={index}
    className="bg-gray-700 p-8 rounded-xl shadow-lg flex flex-col items-center border border-gray-600"
  >
    {icon}
    <h3 className="text-2xl font-bold text-white mb-3">{title}</h3>
    <p className="text-gray-300 text-center">{description}</p>
  </motion.div>
);

// Dummy Games
const DummyData: Game[] = [
  {
    id: 1,
    title: 'Cyberpunk 2077',
    image: '',
    currentPrice: 29.99,
    originalPrice: 59.99,
    discount: 50,
    platform: 'Steam',
  },
  {
    id: 2,
    title: 'Elden Ring',
    image: '',
    currentPrice: 35.99,
    originalPrice: 59.99,
    discount: 40,
    platform: 'Epic Games Store',
  },
  {
    id: 3,
    title: "Baldur's Gate 3",
    image: '',
    currentPrice: 49.99,
    originalPrice: 59.99,
    discount: 17,
    platform: 'GOG.com',
  },
  {
    id: 4,
    title: 'Starfield',
    image: '',
    currentPrice: 41.99,
    originalPrice: 69.99,
    discount: 40,
    platform: 'Steam',
  },
];

// Page Component
const Page: React.FC = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const enhanceDataWithImages = async () => {
      try {
        const enhanced = await Promise.all(
          DummyData.map(async (game) => {
            const fetchedImg = await getGameImageByTitle(game.title);
            return {
              ...game,
              image:
                fetchedImg ||
                game.image ||
                `https://placehold.co/600x400?text=${game.title.replace(/\s/g, '+')}`,
            };
          })
        );
        setGames(enhanced);
      } catch (e) {
        setError('Failed to load game data.');
      } finally {
        setLoading(false);
      }
    };

    enhanceDataWithImages();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="relative min-h-screen font-inter antialiased"
    >
      {/* Background layers */}
      <div
        className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1920&h=1080&fit=crop')",
        }}
      ></div>
      <div className="fixed inset-0 z-0 bg-gradient-to-br from-gray-900/90 to-gray-800/90"></div>

      {/* Content */}
      <div className="relative z-10 min-h-screen text-white">
        {/* Header */}
        <header className="py-4 px-6 md:px-12 bg-gray-900 shadow-lg fixed w-full z-20">
          <nav className="container mx-auto flex justify-between items-center">
            <div className="text-3xl font-bold text-blue-500 tracking-tight">
              🎮 DealHunt
            </div>
            <div className="hidden md:flex space-x-8">
              <NavItem icon={<Home className="w-5 h-5 mr-2" />} text="Home" />
              <NavItem icon={<ListFilter className="w-5 h-5 mr-2" />} text="Tracked Games" />
              <NavItem icon={<TrendingUp className="w-5 h-5 mr-2" />} text="Suggestions" />
              <NavItem icon={<Bell className="w-5 h-5 mr-2" />} text="News" />
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="bg-gray-700 hover:bg-gray-600 py-2 px-4 rounded-lg flex items-center transition duration-300 shadow-md"
              >
                <User className="w-5 h-5 mr-2" /><LoginLink>Login</LoginLink>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="bg-blue-600 hover:bg-blue-700 py-2 px-4 rounded-lg transition duration-300 shadow-md"
              >
                <LogoutLink>Logout</LogoutLink>
              </motion.button>
            </div>
          </nav>
        </header>

        {/* Hero Section */}
        <section className="pt-32 pb-20 text-center container mx-auto px-6">
          <motion.h1
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-6xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600"
          >
            Never Miss A Deal on PC Games
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-xl text-gray-300 max-w-xl mx-auto mb-10"
          >
            Track prices across multiple platforms, get notifications, and discover new deals.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.4 }}
            className="max-w-xl mx-auto relative mb-6"
          >
            <input
              type="text"
              placeholder="Search for a game..."
              className="w-full py-4 pl-14 pr-6 bg-gray-800 border border-gray-700 rounded-full text-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-lg placeholder-gray-400"
            />
            <Search className="absolute w-6 h-6 text-gray-400 left-5 top-1/2 -translate-y-1/2" />
          </motion.div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-full text-lg font-semibold transition hover:scale-105 shadow-xl"
          >
            Get Started
          </motion.button>
        </section>

        {/* Featured Deals */}
        <section className="py-16 bg-gray-900">
          <div className="container mx-auto px-6">
            <h2 className="text-4xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-teal-500">
              {loading ? 'Loading Deals...' : 'Featured Deals'}
            </h2>
            {error && (
              <p className="text-center text-red-400 mb-8">{error}</p>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {games.map((game, i) => (
                <GameCard key={game.id} game={game} />
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-20 bg-gray-800 text-center">
          <div className="container mx-auto px-6">
            <h2 className="text-4xl font-bold mb-12 bg-clip-text text-transparent bg-gradient-to-r from-red-400 to-orange-500">
              How It Works
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {[
                {
                  icon: <Search className="w-12 h-12 text-blue-400 mb-4" />,
                  title: '1. Search & Track',
                  description: 'Find any PC game and add it to your personal watchlist across platforms.',
                },
                {
                  icon: <Bell className="w-12 h-12 text-green-400 mb-4" />,
                  title: '2. Instant Alerts',
                  description: 'Get instant notification when a price drops or a bundle is live.',
                },
                {
                  icon: <TrendingUp className="w-12 h-12 text-purple-400 mb-4" />,
                  title: '3. Discover & Save',
                  description: 'Explore game suggestions based on your interests and save big.',
                },
              ].map((step, i) => (
                <HowItWorksStep key={i} index={i} {...step} />
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 bg-gray-950 text-gray-400 text-center text-sm">
          <div className="container mx-auto px-6">
            <p>&copy; {new Date().getFullYear()} DealHunt. All rights reserved.</p>
            <div className="flex justify-center space-x-6 mt-4">
              <a href="#" className="hover:text-white transition duration-300">Privacy Policy</a>
              <a href="#" className="hover:text-white transition duration-300">Terms of Service</a>
              <a href="#" className="hover:text-white transition duration-300">Contact Us</a>
            </div>
          </div>
        </footer>
      </div>
    </motion.div>
  );
};

export default Page;
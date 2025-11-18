"use client";
import React, { useState } from "react";
import {
  Search,
  Menu,
  X,
  Heart,
  Clock,
  Users,
  Star,
  MapPin,
  ChefHat,
  Utensils,
  MessageCircle,
  BookOpen,
  TrendingUp,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Mail,
  Section,
} from "lucide-react";

//sample data

const foodImages = [
  "https://images.unsplash.com/photo-1600891964599-f61ba0e24092", // pizza
  "https://thecozycook.com/wp-content/uploads/2023/02/Homemade-Ramen-f.jpg", // ramen
  "https://www.thecookierookie.com/wp-content/uploads/2024/05/street-tacos-recipe-2.jpg", // tacos
  "https://ichef.bbci.co.uk/food/ic/food_16x9_1600/recipes/chicken_curry_61994_16x9.jpg", // curry
  "https://insanelygoodrecipes.com/wp-content/uploads/2024/12/Chocolate-Almond-Croissants-Recipe-500x500.jpg", // croissant
  "https://yujinizakaya.com.sg/wp-content/uploads/2025/06/japanese-nigiri-sushi-recipe-1749130962.jpg", // sushi
  "https://www.recipetineats.com/tachyon/2019/03/Greek-Moussaka_3-re-edited-SQ.jpg", // moussaka
  "https://omnivorescookbook.com/wp-content/uploads/2022/11/221102_Singapore-Noodles_2.jpg", // singapore noodles
  "https://images.unsplash.com/photo-1504674900247-0877df9cc836", // salad
];

const topRecipes = [
  {
    id: 1,
    title: "Authentic Italian Carbonara",
    image:
      "https://www.recipesfromitaly.com/wp-content/uploads/2021/04/authentic-carbonara-recipe-1x1-1200x1200-1.jpg",
    author: "Maria Ronano",
    time: "30 mins",
    rating: 4.9,
    likes: 1245,
    difficulty: "Medium",
  },
  {
    id: 2,
    title: "Japanese Ramen Bowl",
    image:
      "https://lh6.googleusercontent.com/proxy/8mn6G7jVa-ZMyi6Hn_eCRA9BizWevDfmHePgS18GHjWZ7iu09rROECkS0vGrhZvr0aNWIT6r4z6sV4_BbjQ_dNFNQp1AzJuZUTr4Pv_MmgfXp-PJPU8BAT-gGmgUmWyUHy7M8OxbJBVz3WdwDUhRnr6Dfx_1ENzG3CE9EdNfdbLrBq4k2gUURqvQV_Js2pc6m4qP3Dnhq7LZwlA2nZDK",
    author: "kenji Tanaka",
    time: "45 mins",
    rating: 4.5,
    likes: 546,
    difficulty: "Hard",
  },
  {
    id: 3,
    title: "Mexican Street Tacos",
    image:
      "https://s23209.pcdn.co/wp-content/uploads/2019/04/Mexican-Street-TacosIMG_9091-760x1140.jpg",
    author: "Carlos Rodriguez",
    time: "20 mins",
    rating: 4.7,
    likes: 2285,
    difficulty: "Easy",
  },
  {
    id: 4,
    title: "French Croissants",
    image:
      "https://insanelygoodrecipes.com/wp-content/uploads/2022/10/Buttery-Croissant-French-Toast-with-Raspberries-and-Powdered-Sugar.jpg",
    author: "Sophie Laurent",
    time: "120 mins",
    rating: 4.9,
    likes: 1495,
    difficulty: "Hard",
  },
  {
    id: 5,
    title: "Greek Moussaka",
    image:
      "https://easyworldrecipes.com/wp-content/uploads/2025/06/Moussaka-.jpg",
    author: "Dimitri Papadopoulos",
    time: "90 mins",
    rating: 4.8,
    likes: 845,
    difficulty: "Hard",
  },
  {
    id: 6,
    title: "Thai Green Curry",
    image:
      "https://www.simplyrecipes.com/thmb/gekuuKcpqvcrUCdl4dic52pgFFU=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/__opt__aboutcom__coeus__resources__content_migration__simply_recipes__uploads__2016__08__2016-09-05-Green-Curry-10-7ea9533588de499d861aa56714604f7a.jpg",
    author: "Ploy Somchai",
    time: "35 mins",
    rating: 4.6,
    likes: 945,
    difficulty: "Medium",
  },
];

const restaurants = [
  {
    id: 1,
    name: "La Bella Vita",
    cuisine: "Italian",
    image:
      "https://i.insider.com/55bf8f242acae70f008bc7fd?width=1200&format=jpeg",
    rating: 4.8,
    distance: "0.5 km",
    priceRange: "$$",
  },
  {
    id: 2,
    name: "Sakura Sushi",
    cuisine: "Japanese",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/5/55/Restaurant%2C_Roppongi%2C_Tokyo%2C_Japan_1_%28133461680%29.jpg",
    rating: 4.9,
    distance: "1.2 km",
    priceRange: "$$",
  },
  {
    id: 3,
    name: "El Mariachi",
    cuisine: "Mexican",
    image:
      "https://patch.com/img/cdn20/users/24423246/20231110/123216/styles/patch_image/public/unnamed-54___10123038855.jpg",
    rating: 4.6,
    distance: "0.8 km",
    priceRange: "$$",
  },
  {
    id: 4,
    name: "Spice Garden",
    cuisine: "Indian",
    image:
      "https://www.poojn.in/wp-content/uploads/2025/04/The-Business-of-Indian-Cuisine-Restaurants-Catering-Explained.jpeg.jpg",
    rating: 4.6,
    distance: "2.1 Km",
    priceRange: "$$",
  },
];

const foodies = [
  {
    id: 1,
    name: "Emma Chen",
    avatar: "👩‍🍳",
    specialty: "Asian Fusion",
    recipes: 127,
    followers: "15.2k",
  },
  {
    id: 2,
    name: "Marco Rossi",
    avatar: "👨‍🍳",
    specialty: "Italian Classics",
    recipes: 98,
    followers: "12.8k",
  },
  {
    id: 3,
    name: "Aisha Patal",
    avatar: "👩‍🍳",
    specialty: "Indian Cuisine",
    recipes: 156,
    followers: "18.5k",
  },
  {
    id: 4,
    name: "Luis Santos",
    avatar: "👨‍🍳",
    specialty: "Latin American",
    recipes: 89,
    followers: "10.2k",
  },
];

export default function Page() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState<number>(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % restaurants.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + restaurants.length) % restaurants.length
    );
  };

  return (
    <section className="min-h-screen bg-linear-to-b from-amber-50 via-white to-orange-50">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <span className="text-3xl">🍽️</span>
              <span className="text-2xl font-bold bg-linear-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">
                TasteSphere
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              <a
                href="#"
                className="text-gray-700 hover:text-orange-500 font-medium transition-colors"
              >
                Recipes
              </a>
              <a
                href="#"
                className="text-gray-700 hover:text-orange-500 font-medium transition-colors"
              >
                Restaurants
              </a>
              <a
                href="#"
                className="text-gray-700 hover:text-orange-500 font-medium transition-colors"
              >
                Community
              </a>
              <a
                href="#"
                className="text-gray-700 hover:text-orange-500 font-medium transition-colors"
              >
                About
              </a>

              {/* Search & Authentication */}
              <div className="hidden md:flex items-center gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search recipes..."
                    className="pl-10 pr-4 py-2 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-400 w-64"
                  />
                </div>
                <button className="px-4 py-2 text-orange-600 hover:text-orange-700 font-medium">
                  Sign In
                </button>
                <button className="px-6 py-2 bg-linear-to-r from-orange-500 to-amber-500 text-white rounded-full hover:from-orange-600 hover:to-amber-600 transition-all shadow-lg shadow-orange-200 font-medium">
                  Get Started
                </button>
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 text-gray-700"
              >
                {mobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden border-t border-gray-100 bg-white">
              <div className="px-4 py-4 space-y-3">
                <a
                  href="#"
                  className="block text-gray-700 hover:text-orange-500 font-medium"
                >
                  Recipes
                </a>
                <a
                  href="#"
                  className="block text-gray-700 hover:text-orange-500 font-medium"
                >
                  Restaurants
                </a>
                <a
                  href="#"
                  className="block text-gray-700 hover:text-orange-500 font-medium"
                >
                  Community
                </a>
                <a
                  href="#"
                  className="block text-gray-700 hover:text-orange-500 font-medium"
                >
                  About
                </a>
                <div className="pt-3 border-t border-gray-100 space-y-2">
                  <button className="w-full px-4 py-2 text-orange-600 border border-orange-500 rounded-full  font-medium">
                    Sign In
                  </button>
                  <button className="w-full px-4 py-2 bg-linear-to-r from-orange-500 to-amber-500 text-white rounded-full font-medium">
                    Get Started
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-r from-orange-500/20 to-amber-500/20"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 relative">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="text-center md:text-left">
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Discover. Share.
                <br />
                <span className="bg-linear-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">
                  Taste the World
                </span>
                <br />
                Together
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-lg">
                Join a global community of food lovers. Explore authentic
                recipes, discover amazing restaurants, and connect with fellow
                foodies.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <button className="px-8 py-4 bg-linear-to-r from-orange-500 to-amber-500 text-white rounded-full hover:from-orange-600 hover:to-amber-600 transition-all shadow-lg shadow-orange-200 font-semibold text-lg flex items-center justify-center gap-2">
                  <BookOpen className="w-5 h-5" />
                  Explore Recipes
                </button>
                <button className="px-8 py-4 bg-white text-gray-800 border-2 border-gray-200 rounded-full hover:border-orange-400 hover:bg-orange-50 transition-all font-semibold text-lg flex items-center justify-center gap-2">
                  <Users className="w-5 h-5 " />
                  Join the Community
                </button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 mt-12">
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900">10K+</div>
                  <div className="text-sm text-gray-600 mt-1">Recipes</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900">50K+</div>
                  <div className="text-sm text-gray-600 mt-1">Food Lovers</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900">150K+</div>
                  <div className="text-sm text-gray-600 mt-1">Countries</div>
                </div>
              </div>
            </div>

            {/* Hero Image - Food Images Grid */}
            <div className="relative">
              <div className="grid grid-cols-3 gap-4">
                {foodImages.map((image, idx) => (
                  <div
                    key={idx}
                    className="aspect-square bg-white rounded-3xl shadow-lg flex items-center justify-center text-6xl hover:scale-110 transition-transform cursor-pointer"
                    style={{
                      animation: `float ${3 + idx * 0.3}s ease-in-out infinite`,
                      animationDelay: `${idx * 0.2}s`,
                    }}
                  >
                    <img
                      src={image}
                      alt={`Food ${idx + 1}`}
                      className="w-full h-full object-cover rounded-3xl"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Top Recipes Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-4xl font-bold  text-gray-900 mb-2">
                Top Recipes This Week
              </h2>
              <p className="text-gray-600">
                Discover the most loved dishes from our community
              </p>
            </div>
            <button className="hidden md:flex items-center gap-2 text-orange-600 hover:text-orange-700 font-semibold">
              View All <TrendingUp className="w-5 h-5" />
            </button>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {topRecipes.map((recipe) => (
              <div
                key={recipe.id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2 overflow-hidden group cursor-pointer"
              >
                <div className="aspect-video bg-linear-to-br from-orange-100 to-amber-100 flex items-center justify-center text-8xl relative overflow-hidden">
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors"></div>
                  <img
                    src={recipe.image}
                    className="w-full h-full object-cover"
                  />
                  <button className="absolute top-4 right-4 p-2 bg-white/90 rounded-full hover:bg-white transition-colors">
                    <Heart className="w-5 h-5 text-gray-600 hover:text-red-500 hover:fill-red-500 transition-colors" />
                  </button>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        recipe.difficulty === "Easy"
                          ? "bg-green-100 text-green-700"
                          : recipe.difficulty === "Medium"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {recipe.difficulty}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors">
                    {recipe.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    by {recipe.author}
                  </p>
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {recipe.time}
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      {recipe.rating}
                    </div>
                    <div className="flex items-center gap-1">
                      <Heart className="w-4 h-4 " />
                      {recipe.likes}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Restaurants Carousel */}
      <section className="py-20 bg-linear-to-b from-orange-50 to-amber-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-2">
              Popular Restaurants Near You
            </h2>
            <p className="text-gray-600">
              Explore the best dining experiences in your area
            </p>
          </div>

          <div className="relative">
            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {restaurants.map((restaurants) => (
                  <div key={restaurants.id} className="w-full shrink-0 px-2">
                    <div className="bg-white rounded-2xl shadow-xl overflow-hidden max-w-2xl mx-auto">
                      <div className="grid md:grid-cols-2">
                        <div className="aspect-square bg-linear-to-br from-orange-100 to-amber-100 flex items-center justify-center text-9xl">
                          <img
                            src={restaurants.image}
                            alt={restaurants.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="p-8 flex flex-col justify-center">
                          <div className="flex items-center gap-2 mb-3">
                            <span className="text-sm px-3 py-1 bg-orange-100 text-orange-700 rounded-full font-medium">
                              {restaurants.cuisine}
                            </span>
                            <span className="text-sm text-gray-600">
                              {restaurants.priceRange}
                            </span>
                          </div>
                          <h3 className="text-3xl font-bold text-gray-900 mb-4">
                            {restaurants.name}
                          </h3>

                          <div className="space-y-3 mb-6">
                            <div className="flex items-center gap-2 text-gray-600">
                              <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                              <span className="font-semibold">
                                {restaurants.rating}
                              </span>
                              <span className="text-sm">(250+ reviews)</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-600">
                              <MapPin className="w-5 h-5" />
                              <span>{restaurants.distance} away</span>
                            </div>
                          </div>
                          <button className="w-full px-6 py-3 bg-linear-to-r from-orange-500 to-amber-500 text-white rounded-xl hover:from-orange-600 hover:to-amber-600 transition-all shadow-lg font-semibold">
                            View Details
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Carousel Controls */}
            <button
              onClick={prevSlide}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 bg-white p-3 rounded-full shadow-lg hover:bg-gray-50 transition-colors"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            <button
              onClick={nextSlide}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 bg-white p-3 rounded-full shadow-lg hover:bg-gray-50 transition-colors"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>

            {/* Carousel Indicators */}
            <div className="flex justify-center gap-2 mt-6">
              {restaurants.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    currentSlide === idx ? "bg-orange-500 w-8" : "bg-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Meet Our Foodies */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-2">
              Meet Our Foodies
            </h2>
            <p className="text-gray-600">
              Connect with talented chefs and food enthusiasts from around the
              globe
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {foodies.map((foodie) => (
              <div
                key={foodie.id}
                className="bg-linear-to-br from-orange-50 to-amber-50 rounded-2xl p-6 text-center hover:shadow-xl transition-all transform hover:-translate-y-2 cursor-pointer"
              >
                <div className="text-xl font-bold text-gray-900">
                  {foodie.avatar}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">
                  {foodie.name}
                </h3>
                <p className="text-orange-600 font-medium mb-4">
                  {foodie.specialty}
                </p>
                <div className="flex justify-center gap-6 mb-4 text-sm text-gray-600">
                  <div>
                    <div className="font-bold text-gray-900">
                      {foodie.recipes}
                    </div>
                    <div>Recipes</div>
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">
                      {foodie.followers}
                    </div>
                    <div>Followers</div>
                  </div>
                </div>
                <button className="w-full px-4 py-2 bg-white border-2 border-orange-400 text-orange-600 rounded-xl hover:bg-orange-500 hover:text-white transition-all font-semibold">
                  Follow
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-linear-to-r from-orange-500 to-amber-500">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready To Start Your Culinary Journey?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Join thousands of food lovers sharing and discovering amazing
            recipes worldwide
          </p>
          <button className="px-8 py-4 bg-white text-orange-600 rounded-full hover:bg-gray-50 transition-all shadow-xl font-semibold text-lg">
            Create Free Account
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-3xl">🍽️</span>
                <span className="text-xl font-bold text-white">
                  TasteSphere
                </span>
              </div>
              <p className="text-sm mb-4">
                Discover, share, and taste the world together.
              </p>
              <div className="flex gap-3">
                <a
                  href="#"
                  className="p-2 bg-gray-800 rounded-full hover:bg-orange-500 transition-colors"
                >
                  <Facebook className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="p-2 bg-gray-800 rounded-full hover:bg-orange-500 transition-colors"
                >
                  <Twitter className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="p-2 bg-gray-800 rounded-full hover:bg-orange-500 transition-colors"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="p-2 bg-gray-800 rounded-full hover:bg-orange-500 transition-colors"
                >
                  <Youtube className="w-5 h-5" />
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-4">Explore</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href="#"
                    className="hover:text-orange-400 transition-colors"
                  >
                    Browse Recipes
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-orange-400 transition-colors"
                  >
                    Find Restaurants
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-orange-400 transition-colors"
                  >
                    Join Community
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-orange-400 transition-colors"
                  >
                    Popular Cuisines
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href="#"
                    className="hover:text-orange-400 transition-colors"
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-orange-400 transition-colors"
                  >
                    Careers
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-orange-400 transition-colors"
                  >
                    Press
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-orange-400 transition-colors"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-4">Newsletter</h3>
              <p className="text-sm mb-3">Get weekly recipe and tips</p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-orange-500 text-sm"
                />
                <button className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors">
                  <Mail className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
            <p>© 2025 TasteSphere. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-orange-400 transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-orange-400 transition-colors">
                Terms of Service
              </a>
              <a href="#" className="hover:text-orange-400 transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </footer>

      <style jsx>
        {`
          @keyframes float {
            0%,
            100% {
              transform: translateY(0px);
            }
            50% {
              transform: translateY(-20px);
            }
          }
        `}
      </style>
    </section>
  );
}

"use client";
import React, { useState } from "react";
import {
  Settings,
  Bell,
  MapPin,
  Calendar,
  Award,
  Heart,
  Bookmark,
  Users,
  MessageCircle,
  TrendingUp,
  ChefHat,
  Utensils,
  Star,
  Eye,
  Clock,
  Plus,
  Edit,
  Share2,
  MoreVertical,
  X,
  Camera,
  Upload,
} from "lucide-react";

const userProfile = {
  name: "Emma Chen",
  username: "@emmachen",
  avatar: "👩‍🍳",
  coverImage:
    "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=1200",
  bio: "Food enthusiast | Recipe creator | Exploring Asian fusion cuisine 🍜",
  location: "San Francisco, CA",
  joinDate: "January 2024",
  stats: {
    recipes: 127,
    followers: 15234,
    following: 892,
    likes: 45678,
  },
  badges: [
    {
      id: 1,
      name: "Top Chef",
      icon: "👨‍🍳",
      color: "bg-orange-100 text-orange-700",
    },
    {
      id: 2,
      name: "Recipe Master",
      icon: "📖",
      color: "bg-blue-100 text-blue-700",
    },
    {
      id: 3,
      name: "Community Star",
      icon: "⭐",
      color: "bg-yellow-100 text-yellow-700",
    },
  ],
};

const myRecipes = [
  {
    id: 1,
    title: "Spicy Korean Ramen",
    image:
      "https://www.killingthyme.net/wp-content/uploads/2015/10/homemade-ramen-bowls-01.jpg",
    category: "Asian Fusion",
    likes: 234,
    views: 1245,
    time: "30 min",
    difficulty: "Medium",
    date: "2 days ago",
  },
  {
    id: 2,
    title: "Homemade Dumplings",
    image:
      "https://www.seriouseats.com/thmb/BJlIwZDz8JK6BdP1W8uFLYvQxkE=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/20210326-dumpling-wrappers-vicky-wasik-34-d55a14f8dd064b8dbe8b1cfa89a2f494.jpg",
    category: "Asian",
    likes: 456,
    views: 2134,
    time: "45 min",
    difficulty: "Hard",
    date: "5 days ago",
  },
  {
    id: 3,
    title: "Matcha Tiramisu",
    image:
      "https://www.justonecookbook.com/wp-content/uploads/2023/03/Matcha-Tiramisu-8055-I.jpg",
    category: "Dessert",
    likes: 789,
    views: 3421,
    time: "20 min",
    difficulty: "Easy",
    date: "1 week ago",
  },
];

const savedRecipes = [
  {
    id: 1,
    title: "Italian Carbonara",
    author: "Maria Romano",
    image:
      "https://www.allrecipes.com/thmb/axhH9DPkfGYBPooMrwmyUqP4sEc=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/245775-spaghetti-alla-carbonara-the-traditional-italian-recipe-DDMFS-4x3-879c32ee3cfb463582e3e6230e311029.jpg",
    rating: 4.9,
  },
  {
    id: 2,
    title: "Thai Green Curry",
    author: "Ploy Somchai",
    image:
      "https://sixhungryfeet.com/wp-content/uploads/2021/01/THAI-GREEN-CURRY-WITH-TOFU-5.jpg",
    rating: 4.7,
  },
];

const reviews = [
  {
    id: 1,
    recipe: "French Croissants",
    author: "Sophie Laurent",
    rating: 5,
    comment: "Amazing recipe! The croissants turned out perfectly flaky.",
    date: "3 days ago",
  },
  {
    id: 2,
    recipe: "Mexican Tacos",
    author: "Carlos Rodriguez",
    rating: 4,
    comment: "Great recipe, I added some extra lime juice.",
    date: "1 week ago",
  },
];

const activityFeed = [
  {
    id: 1,
    type: "recipe",
    text: 'You posted a new recipe: "Spicy Korean Ramen"',
    time: "2 days ago",
    icon: ChefHat,
  },
  {
    id: 2,
    type: "like",
    text: "Marco Rossi liked your recipe",
    time: "3 days ago",
    icon: Heart,
  },
  {
    id: 3,
    type: "follow",
    text: "Aisha Patel started following you",
    time: "4 days ago",
    icon: Users,
  },
  {
    id: 4,
    type: "comment",
    text: 'New comment on "Homemade Dumplings"',
    time: "5 days ago",
    icon: MessageCircle,
  },
  {
    id: 5,
    type: "review",
    text: 'You reviewed "French Croissants"',
    time: "1 week ago",
    icon: Star,
  },
];

export default function Page() {
  const [activeTab, setActiveTab] = useState("posts");
  const [showPostModal, setShowPostModal] = useState(false);
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [notificationCount] = useState(5);

  return (
    <section className="min-h-screen bg-linear-to-b from-orange-50 via-white to-amber-50 ">
      {/* Cover Image & Profile Header */}
      <div className="relative">
        <div className="h-64 bg-linear-to-b from-orange-400 to-amber-400 relative overflow-hidden">
          <img
            src={userProfile.coverImage}
            alt="Cover"
            className="w-full h-full object-cover opacity-50"
          />
          <button className="absolute top-4 right-4 px-4 py-2 bg-white/90 backdrop-blur-sm rounded-lg hover:bg-white transition-colors flex items-center gap-2 font-medium">
            <Camera className="w-4 h-4" />
            Change Cover
          </button>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative -mt-20 pb-6">
            <div className="flex flex-col md:flex-row gap-6 items-start md:items-end">
              {/* Avatar */}
              <div className="relative">
                <div className="w-40 h-40 bg-white rounded-2xl shadow-2xl flex items-center justify-center text-8xl border-4 border-white">
                  {userProfile.avatar}
                </div>
                <button className="absolute bottom-2 right-2 p-2 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition-colors shadow-lg">
                  <Camera className="w-4 h-4" />
                </button>
              </div>

              {/* Profile Info */}
              <div className="flex-1">
                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                    <div>
                      <h1 className="text-3xl font-bold text-gray-900 mb-1">
                        {userProfile.name}
                      </h1>
                      <p className="text-gray-600 mb-2">
                        {userProfile.username}
                      </p>
                      <p className="text-gray-700 mb-3 max-w-2xl">
                        {userProfile.bio}
                      </p>
                      <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          {" "}
                          <MapPin className="w-4 h-4" />
                          {userProfile.location}
                        </div>
                        <div className="flex items-center gap-1">
                          {" "}
                          <Calendar className="w-4 h-4" />
                          Joined {userProfile.joinDate}
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => setShowEditProfile(true)}
                        className="px-4 py-2 bg-linear-to-r from-orange-500 to-amber-500 text-white rounded-xl hover:from-orange-600 hover:to-amber-600 transition-all shadow-lg font-medium flex items-center gap-2"
                      >
                        <Edit className="w-4 h-4" /> Edit Profile
                      </button>
                      <button className="p-2 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors relative">
                        <Bell className="w-5 h-5 text-gray-700" />
                        {notificationCount > 0 && (
                          <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                            {notificationCount}
                          </span>
                        )}
                      </button>
                      <button className="p-2 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors">
                        <Settings className="w-5 h-5 text-gray-700" />
                      </button>
                    </div>
                  </div>

                  {/* Starts */}
                  <div className="grid grid-cols-4 gap-4 mt-6 pt-6 border-t border-gray-200">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-900">
                        {userProfile.stats.recipes}
                      </div>
                      <div className="text-sm text-gray-600">Recipes</div>
                    </div>

                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-900">
                        {userProfile.stats.followers.toLocaleString()}
                      </div>
                      <div className="text-sm text-gray-600">Followers</div>
                    </div>

                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-900">
                        {userProfile.stats.following}
                      </div>
                      <div className="text-sm text-gray-600">Following</div>
                    </div>

                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-900">
                        {userProfile.stats.likes.toLocaleString()}
                      </div>
                      <div className="text-sm text-gray-600">Total</div>
                    </div>
                  </div>

                  {/* Badges */}
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <h3 className="text-sm font-semibold text-gray-500 uppercase mb-3">
                      Achievements
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {userProfile.badges.map((badge) => (
                        <div
                          key={badge.id}
                          className={`px-3 py-2 ${badge.color} rounded-lg font-medium text-sm flex items-center gap-2`}
                        >
                          <span className="text-lg">{badge.icon}</span>
                          {badge.name}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main column */}
          <div className="lg:col-span-2">
            {/* Create Post Button */}
            <button
              onClick={() => setShowPostModal(true)}
              className="w-full mb-6 p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all border-2 border-dashed border-gray-300 hover:border-orange-400 flex items-center justify-center gap-3 text-gray-600 hover:text-orange-600 font-semibold"
            >
              <Plus className="w-6 h-6" />
              Share a New Recipe or Post
            </button>

            {/* Tabs */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-6">
              <div className="flex border-b border-gray-200">
                <button
                  onClick={() => setActiveTab("posts")}
                  className={`flex-1 px-6 py-4 font-semibold transition-all ${
                    activeTab === "posts"
                      ? "text-orange-600 border-b-2 border-orange-600 bg-orange-50"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  My Recipes ({myRecipes.length})
                </button>

                <button
                  onClick={() => setActiveTab("saved")}
                  className={`flex-1 px-6 py-4 font-semibold transition-all ${
                    activeTab === "posts"
                      ? "text-orange-600 border-b-2 border-orange-600 bg-orange-50"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  Saved ({savedRecipes.length})
                </button>

                <button
                  onClick={() => setActiveTab("reviews")}
                  className={`flex-1 px-6 py-4 font-semibold transition-all ${
                    activeTab === "posts"
                      ? "text-orange-600 border-b-2 border-orange-600 bg-orange-50"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  Reviews ({reviews.length})
                </button>
              </div>

              {/* Tab Content */}
              <div className="p-6">
                {/* My Recipes Tab */}
                {activeTab === "posts" && (
                  <div className="space-y-4">
                    {myRecipes.map((recipe) => (
                      <div
                        key={recipe.id}
                        className="bg-linear-to-br from-gray-50 to-white rounded-xl p-4 hover:shadow-lg transition-all border border-gray-100"
                      >
                        <div className="flex gap-4">
                          <img
                            src={recipe.image}
                            alt={recipe.title}
                            className="w-32 h-32 object-cover rounded-xl"
                          />
                          <div className="flex-1">
                            <div className="flex items-start justify-between mb-2">
                              <div>
                                <h3 className="text-xl font-bold text-gray-900 mb-1">
                                  {recipe.title}
                                </h3>
                                <span className="text-sm px-3 py-1 bg-orange-100 text-orange-700 rounded-full">
                                  {recipe.category}
                                </span>
                              </div>
                              <button className="text-gray-400 hover:text-gray-600">
                                <MoreVertical className="w-5 h-5" />
                              </button>
                            </div>

                            <div className="flex flex-wrap gap-4 text-sm text-gray-600 mt-3">
                              <div className="flex items-center gap-1">
                                <Heart className="w-4 h-4 " /> {recipe.likes}
                              </div>

                              <div className="flex items-center gap-1">
                                <Eye className="w-4 h-4" /> {recipe.views}
                              </div>

                              <div className="flex items-center gap-1">
                                <Clock className="w-4 h-4" /> {recipe.time}
                              </div>
                              <span
                                className={`px-2 py-1 rounded-full text-xs ${
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
                            <div className="flex gap-2 mt-3">
                              <button className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors text-sm font-medium">
                                View Recipe
                              </button>
                              <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium">
                                Edit
                              </button>
                              <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium">
                                <Share2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Saved Recipes Tab  */}
                {activeTab === "saved" && (
                  <div className="grid sm:grid-cols-2 gap-4">
                    {savedRecipes.map((recipe) => (
                      <div
                        key={recipe.id}
                        className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all"
                      >
                        <img
                          src={recipe.image}
                          alt={recipe.title}
                          className="w-full h-48 object-cover"
                        />
                        <div className="p-4">
                          <h3 className="font-bold text-gray-900 mb-1">
                            {recipe.title}
                          </h3>
                          <p className="text-sm text-gray-600 mb-2">
                            by {recipe.author}
                          </p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                              <span className="font-semibold">
                                {recipe.rating}
                              </span>
                            </div>
                            <button className="text-red-500 hover:text-red-600">
                              <Bookmark className="w-5 h-5 fill-current" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Reviews Tab */}
                {activeTab == "reviews" && (
                  <div className="space-y-4">
                    {reviews.map((review) => (
                      <div
                        key={review.id}
                        className="bg-linear-to-br from-gray-50 to-white rounded-xl p-4 border border-gray-100"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="font-bold text-gray-900">
                              {review.recipe}
                            </h3>
                            <p className="text-sm text-gray-600">
                              {review.author}
                            </p>
                          </div>
                          <div className="flex gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                  i < review.rating
                                    ? "fill-yellow-400 text-yellow-400"
                                    : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-gray-700 mb-2">{review.comment}</p>
                        <span className="text-xs text-gray-500">
                          {review.date}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                Quick Stats
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-green-500" />
                    <span className="text-gray-700">Profile Views</span>
                  </div>
                  <span className="font-bold text-gray-900">2.3k</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ChefHat className="w-5 h-5 text-orange-500" />
                    <span className="text-gray-700">Recipes This Month</span>
                  </div>
                  <span className="font-bold text-gray-900">12</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Heart className="w-5 h-5 text-red-500" />
                    <span className="text-gray-700">Likes This Week</span>
                  </div>
                  <span className="font-bold text-gray-900">456</span>
                </div>
              </div>
            </div>

            {/* Activity Feed */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                Recent Activity
              </h3>
              <div className="space-y-3">
                {activityFeed.map((activity) => {
                  const Icon = activity.icon;
                  return (
                    <div key={activity.id} className="flex gap-3">
                      <div className="p-2 bg-orange-100 rounded-lg">
                        <Icon className="w-4 h-4 text-orange-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-700">{activity.text}</p>
                        <span className="text-xs text-gray-500">
                          {activity.time}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Create Post Modal */}
      {showPostModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white z-10">
              <h2 className="text-2xl font-bold text-gray-900">
                Create New Recipe
              </h2>
              <button
                onClick={() => setShowPostModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-6 space-y-6">
              {/* Basic Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                  <span className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    1
                  </span>
                  Basic Information
                </h3>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Recipe Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Authentic Italian Carbonara"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Share what makes this recipe special..."
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent resize-none"
                  />
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Cuisine Type<span className="text-red-500">*</span>
                    </label>
                    <select className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent">
                      <option>Select cuisine...</option>
                      <option>Italian</option>
                      <option>Japanese</option>
                      <option>Mexican</option>
                      <option>Indian</option>
                      <option>French</option>
                      <option>Thai</option>
                      <option>Chinese</option>
                      <option>American</option>
                      <option>Mediterranean</option>
                      <option>Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Difficulty
                      <span className="text-red-500">*</span>
                    </label>
                    <select className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent">
                      <option>Select difficulty...</option>
                      <option>Easy</option>
                      <option>Medium</option>
                      <option>Hard</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Dietary Options
                    </label>
                    <select className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent">
                      <option>None</option>
                      <option>Vegetarian</option>
                      <option>Vegan</option>
                      <option>Gluten-Free</option>
                      <option>Dairy-Free</option>
                    </select>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Servings <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      min="1"
                      placeholder="4"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Prep Time <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="e.g., 15 min"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Cook Time <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="e.g., 30 min"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              {/* Upload Photos */}
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                  <span className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    2
                  </span>
                  Recipe photos
                </h3>
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-orange-400 transition-colors cursor-pointer">
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-600 font-medium">
                    Click to upload or drag and drop
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    PNG, JPG up to 10MB (Required)
                  </p>
                </div>
              </div>

              {/* Ingredients */}
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                  <span className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    3
                  </span>
                  Ingredients <span className="text-red-500">*</span>
                </h3>
                <p className="text-sm text-gray-600">
                  Add each ingredient with its measurement
                </p>

                <div className="space-y-3">
                  {[1, 2, 3].map((num) => (
                    <div key={num} className="flex gap-3">
                      <input
                        type="text"
                        placeholder="Amount (e.g., 2 cups)"
                        className="w-1/3 px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
                      />
                      <input
                        type="text"
                        placeholder="Ingredient name"
                        className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
                      />
                      <button className="px-4 py-3 bg-red-100 text-red-600 rounded-xl hover:bg-red-200 transition-colors">
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                </div>

                <button className="w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-xl hover:border-orange-400 transition-colors flex items-center justify-center gap-2 text-gray-600 hover:text-orange-600 font-medium">
                  <Plus className="w-5 h-5" /> Add Another Ingredient
                </button>
              </div>

              {/* Instructions */}
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                  <span className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    4
                  </span>
                  Cooking Instructions <span className="text-red-500">*</span>
                </h3>
                <p className="text-sm text-gray-600">
                  Write step-by-step instructions
                </p>

                <div className="space-y-3">
                  {[1, 2, 3].map((num) => (
                    <div key={num} className="flex gap-3 items-start">
                      <div className="w-10 h-10 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center font-bold shrink-0 mt-2">
                        {num}
                      </div>
                      <textarea
                        rows={2}
                        placeholder={`Step ${num}: Describe this cooking step in detail...`}
                        className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent resize-none"
                      />
                      <button className="px-4 py-3 bg-red-100 text-red-600 rounded-xl hover:bg-red-200 transition-colors mt-2">
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                </div>

                <button className="w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-xl hover:border-orange-400 transition-colors flex items-center justify-center gap-2 text-gray-600 hover:text-orange-600 font-medium">
                  <Plus className="w-5 h-5" /> Add Another Step
                </button>
              </div>

              {/* Tags (Optional) */}
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                  <span className="w-8 h-8 bg-gray-300 text-gray-700 rounded-full flex items-center justify-center text-sm font-bold">
                    5
                  </span>
                  Tags (Optional)
                </h3>
                <input
                  type="text"
                  placeholder="Add tags separated by commas (e.g., pasta, quick dinner, comfort food)"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4 border-t border-gray-200 sticky bottom-0 bg-white">
                <button className="flex-1 px-6 py-4 bg-linear-to-r from-orange-500 to-amber-500 text-white rounded-xl hover:from-orange-600 hover:to-amber-600 transition-all shadow-lg font-semibold text-lg">
                  Publish Recipe
                </button>
                <button className="px-6 py-4 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition-colors font-semibold">
                  Save as Draft
                </button>
                <button
                  onClick={() => setShowPostModal(false)}
                  className="px-6 py-4 bg-white border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-semibold"
                >
                  Cancel
                </button>
              </div>

              {/* Required Fields  Notice*/}
              <p className="text-sm text-gray-500 text-center pb-4">
                <span className="text-red-500">*</span> Required fields
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Edit Profile Modal  */}
      {showEditProfile && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Edit Profile</h2>
              <button
                onClick={() => setShowEditProfile(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Display Name
                </label>
                <input
                  type="text"
                  defaultValue={userProfile.name}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Bio
                </label>
                <textarea
                  rows={3}
                  defaultValue={userProfile.bio}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location
                </label>
                <input
                  type="text"
                  defaultValue={userProfile.location}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
                />
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowEditProfile(false)}
                  className="flex-1 px-6 py-3 bg-linear-to-r from-orange-500 to-amber-500 text-white rounded-xl hover:from-orange-600 hover:to-amber-600 transition-all shadow-lg font-semibold"
                >
                  Save Changes
                </button>
                <button
                  onClick={() => setShowEditProfile(false)}
                  className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors font-semibold"
                >
                  cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

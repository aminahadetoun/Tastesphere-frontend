"use client";
import React, { use, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  Filter,
  Heart,
  Clock,
  Users,
  Star,
  Bookmark,
  Share2,
  X,
  Plus,
  Minus,
  Check,
  MessageCircle,
  Eye,
} from "lucide-react";

const recipes = [
  {
    id: 1,
    title: "Authentic Italian Carbonara",
    image:
      "https://www.allrecipes.com/thmb/axhH9DPkfGYBPooMrwmyUqP4sEc=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/245775-spaghetti-alla-carbonara-the-traditional-italian-recipe-DDMFS-4x3-879c32ee3cfb463582e3e6230e311029.jpg",
    author: "Maria Romano",
    authorAvatar: "👩‍🍳",
    time: "30 min",
    servings: 4,
    difficulty: "Medium",
    rating: 4.9,
    reviews: 234,
    likes: 1234,
    views: 5678,
    cuisine: "Italian",
    dietary: "None",
    description:
      "Classic Roman pasta dish with eggs, pecorino cheese, guanciale, and black pepper. Simple yet elegant.",
    ingredients: [
      { item: "Spaghetti", amount: "400g" },
      { item: "Guanciale (or pancetta)", amount: "200g" },
      { item: "Egg yolks", amount: "4 large" },
      { item: "Pecorino Romano cheese", amount: "100g, grated" },
      { item: "Black pepper", amount: "To taste" },
      { item: "Salt", amount: "For pasta water" },
    ],
    steps: [
      "Bring a large pot of salted water to boil and cook spaghetti according to package directions.",
      "While pasta cooks, cut guanciale into small strips and cook in a large pan over medium heat until crispy.",
      "In a bowl, whisk together egg yolks, grated pecorino, and a generous amount of black pepper.",
      "Reserve 1 cup of pasta water, then drain pasta. Remove pan from heat.",
      "Add hot pasta to the pan with guanciale, toss to coat.",
      "Add egg mixture and toss quickly, adding pasta water as needed to create a creamy sauce.",
      "Serve immediately with extra pecorino and black pepper.",
    ],
    tags: ["Pasta", "Quick Dinner", "Italian Classic"],
    prepTime: "10 min",
    cookTime: "20 min",
  },
  {
    id: 2,
    title: "Japanese Ramen Bowl",
    image:
      "https://www.killingthyme.net/wp-content/uploads/2015/10/homemade-ramen-bowls-01.jpg",
    author: "Kenji Tanaka",
    authorAvatar: "👨‍🍳",
    time: "45 min",
    servings: 2,
    difficulty: "Hard",
    rating: 4.8,
    reviews: 189,
    likes: 892,
    views: 4321,
    cuisine: "Japanese",
    dietary: "None",
    description:
      "Rich tonkotsu-style ramen with tender chashu pork, soft-boiled egg, and flavorful broth.",
    ingredients: [
      { item: "Ramen noodles", amount: "200g" },
      { item: "Pork belly", amount: "300g" },
      { item: "Chicken broth", amount: "1L" },
      { item: "Soy sauce", amount: "3 tbsp" },
      { item: "Mirin", amount: "2 tbsp" },
      { item: "Eggs", amount: "2" },
      { item: "Green onions", amount: "2, sliced" },
      { item: "Nori sheets", amount: "2" },
    ],
    steps: [
      "Prepare the chashu pork by marinating pork belly in soy sauce and mirin for 30 minutes.",
      "Sear pork on all sides, then simmer in broth for 2 hours until tender.",
      "Prepare soft-boiled eggs: boil for 6 minutes, then ice bath.",
      "Cook ramen noodles according to package instructions.",
      "Heat the broth and season with soy sauce and mirin.",
      "Assemble bowls with noodles, sliced pork, halved eggs, green onions, and nori.",
      "Pour hot broth over everything and serve immediately.",
    ],
    tags: ["Ramen", "Japanese", "Comfort Food"],
    prepTime: "15 min",
    cookTime: "30 min",
  },
  {
    id: 3,
    title: "Mexican Street Tacos",
    image:
      "https://slowcookergourmet.net/wp-content/uploads/2023/05/Street-Tacos-with-Slow-Cooker-Carnitas-44-of-13.jpg",
    author: "Carlos Rodriguez",
    authorAvatar: "👨‍🍳",
    time: "20 min",
    servings: 4,
    difficulty: "Easy",
    rating: 4.7,
    reviews: 456,
    likes: 2103,
    views: 8765,
    cuisine: "Mexican",
    dietary: "Gluten-Free",
    description:
      "Authentic street-style tacos with marinated meat, fresh cilantro, and lime.",
    ingredients: [
      { item: "Flank steak", amount: "500g" },
      { item: "Corn tortillas", amount: "12" },
      { item: "White onion", amount: "1, diced" },
      { item: "Fresh cilantro", amount: "1 bunch, chopped" },
      { item: "Limes", amount: "3, cut into wedges" },
      { item: "Garlic", amount: "3 cloves, minced" },
      { item: "Cumin", amount: "1 tsp" },
      { item: "Chili powder", amount: "1 tsp" },
    ],
    steps: [
      "Marinate steak with garlic, cumin, chili powder, and lime juice for 15 minutes.",
      "Heat a cast-iron skillet or grill to high heat.",
      "Cook steak for 3-4 minutes per side for medium-rare.",
      "Let meat rest for 5 minutes, then slice thinly against the grain.",
      "Warm tortillas on the grill or in a dry pan.",
      "Assemble tacos with meat, onion, and cilantro.",
      "Serve with lime wedges and your favorite salsa.",
    ],
    tags: ["Tacos", "Mexican", "Quick"],
    prepTime: "10 min",
    cookTime: "10 min",
  },
  {
    id: 4,
    title: "French Croissants",
    image:
      "https://www.modernhoney.com/wp-content/uploads/2024/03/Easy-Chocolate-Almond-Croissants-2-crop.jpg",
    author: "Sophie Laurent",
    authorAvatar: "👩‍🍳",
    time: "120 min",
    servings: 12,
    difficulty: "Hard",
    rating: 4.9,
    reviews: 321,
    likes: 1567,
    views: 6543,
    cuisine: "French",
    dietary: "Vegetarian",
    description:
      "Buttery, flaky, golden croissants made from scratch with laminated dough.",
    ingredients: [
      { item: "All-purpose flour", amount: "500g" },
      { item: "Butter (cold)", amount: "280g" },
      { item: "Milk (warm)", amount: "250ml" },
      { item: "Sugar", amount: "50g" },
      { item: "Salt", amount: "10g" },
      { item: "Instant yeast", amount: "10g" },
      { item: "Egg", amount: "1, for egg wash" },
    ],
    steps: [
      "Mix flour, sugar, salt, yeast, and warm milk. Knead into smooth dough.",
      "Refrigerate dough for 1 hour.",
      "Roll out dough and place cold butter in center. Fold dough over butter.",
      "Roll and fold dough 3 times, chilling between each fold.",
      "Roll dough into rectangle, cut into triangles.",
      "Roll each triangle from wide end to tip to form croissant shape.",
      "Proof for 2 hours, brush with egg wash, bake at 200°C for 15-20 minutes.",
    ],
    tags: ["Pastry", "French", "Breakfast"],
    prepTime: "90 min",
    cookTime: "30 min",
  },
  {
    id: 5,
    title: "Thai Green Curry",
    image:
      "https://sixhungryfeet.com/wp-content/uploads/2021/01/THAI-GREEN-CURRY-WITH-TOFU-5.jpg",
    author: "Ploy Somchai",
    authorAvatar: "👩‍🍳",
    time: "35 min",
    servings: 4,
    difficulty: "Medium",
    rating: 4.6,
    reviews: 198,
    likes: 934,
    views: 3456,
    cuisine: "Thai",
    dietary: "Gluten-Free",
    description:
      "Aromatic and spicy Thai curry with coconut milk, vegetables, and your choice of protein.",
    ingredients: [
      { item: "Green curry paste", amount: "3 tbsp" },
      { item: "Coconut milk", amount: "400ml" },
      { item: "Chicken breast", amount: "400g, sliced" },
      { item: "Thai eggplant", amount: "200g" },
      { item: "Bamboo shoots", amount: "100g" },
      { item: "Thai basil", amount: "1 bunch" },
      { item: "Fish sauce", amount: "2 tbsp" },
      { item: "Palm sugar", amount: "1 tbsp" },
    ],
    steps: [
      "Heat 2 tbsp coconut cream in a wok until oil separates.",
      "Add curry paste and fry until fragrant, about 2 minutes.",
      "Add chicken and cook until no longer pink.",
      "Pour in remaining coconut milk and bring to simmer.",
      "Add eggplant and bamboo shoots, cook for 10 minutes.",
      "Season with fish sauce and palm sugar.",
      "Add Thai basil leaves and serve with jasmine rice.",
    ],
    tags: ["Curry", "Thai", "Spicy"],
    prepTime: "15 min",
    cookTime: "20 min",
  },
  {
    id: 6,
    title: "Greek Moussaka",
    image:
      "https://www.mygreekodyssey.com/wp-content/uploads/2020/02/6f0a1285-f83c-4413-997b-cb45e7e4d3ac-1.jpg",
    author: "Dimitri Papadopoulos",
    authorAvatar: "👨‍🍳",
    time: "90 min",
    servings: 8,
    difficulty: "Hard",
    rating: 4.8,
    reviews: 167,
    likes: 756,
    views: 2987,
    cuisine: "Greek",
    dietary: "None",
    description:
      "Layered Mediterranean casserole with eggplant, spiced meat sauce, and creamy béchamel.",
    ingredients: [
      { item: "Eggplants", amount: "3 large, sliced" },
      { item: "Ground lamb", amount: "500g" },
      { item: "Tomato sauce", amount: "400g" },
      { item: "Onion", amount: "1 large, diced" },
      { item: "Cinnamon", amount: "1 tsp" },
      { item: "Butter", amount: "50g" },
      { item: "Flour", amount: "50g" },
      { item: "Milk", amount: "500ml" },
    ],
    steps: [
      "Slice eggplants, salt them, and let drain for 30 minutes. Pat dry.",
      "Fry eggplant slices until golden. Set aside.",
      "Cook lamb with onion, add tomato sauce and cinnamon. Simmer 20 minutes.",
      "Make béchamel: melt butter, add flour, gradually whisk in milk until thick.",
      "Layer eggplant, meat sauce, and repeat in baking dish.",
      "Top with béchamel sauce and grated cheese.",
      "Bake at 180°C for 45 minutes until golden and bubbling.",
    ],
    tags: ["Greek", "Casserole", "Mediterranean"],
    prepTime: "40 min",
    cookTime: "50 min",
  },
];

export default function Page() {
  const router = useRouter();
  const [selectedRecipe, setSelectedRecipe] = useState<any>(null);
  const [savedRecipes, setSavedRecipes] = useState<string[]>([]);
  const [likedRecipes, setLikedRecipes] = useState<string[]>([]);
  const [checkedIngredients, setCheckedIngredients] = useState<number[]>([]);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [servings, setServings] = useState(4);
  const [filters, setFilters] = useState({
    cuisine: "all",
    difficulty: "all",
    time: "all",
    dietary: "all",
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState("grid"); //"grid" or "masonry"

  const cuisineTypes = [
    "All",
    "Italian",
    "Japanese",
    "Mexican",
    "French",
    "Thai",
    "Greek",
    "Indian",
    "Chinese",
  ];
  const difficulties = ["All", "Easy", "Medium", "Hard"];
  const timeRanges = ["All", "< 30 min", "30-60 min", "> 60 min"];
  const dietaryOptions = [
    "All",
    "Vegetarian",
    "Vegan",
    "Gluten-Free",
    "Dairy-Free",
  ];

  const toggleSave = (recipeId: string) => {
    setSavedRecipes((prev) =>
      prev.includes(recipeId)
        ? prev.filter((id) => id !== recipeId)
        : [...prev, recipeId]
    );
  };

  const toggleLike = (recipeId: string) => {
    setLikedRecipes((prev) =>
      prev.includes(recipeId)
        ? prev.filter((id) => id !== recipeId)
        : [...prev, recipeId]
    );
  };

  const toggleIngredient = (index: number) => {
    setCheckedIngredients((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const toggleStep = (index: number) => {
    setCompletedSteps((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const adjustServings = (amount: number) => {
    const newServings = Math.max(1, servings + amount);
    setServings(newServings);
  };

  const filteredRecipes = recipes.filter((recipe) => {
    if (
      searchQuery &&
      !recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !recipe.cuisine.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }
    if (
      filters.cuisine !== "all" &&
      recipe.cuisine.toLowerCase() !== filters.cuisine
    )
      return false;
    if (
      filters.difficulty !== "all" &&
      recipe.difficulty.toLowerCase() !== filters.difficulty
    )
      return false;
    if (filters.time !== "all") {
      const timeInMin = parseInt(recipe.time);
      if (filters.time === "< 30 min" && timeInMin >= 30) return false;
      if (filters.time === "30-60 min" && (timeInMin < 30 || timeInMin > 60))
        return false;
      if (filters.time === "> 60 min" && timeInMin <= 60) return false;
    }
    if (
      filters.dietary !== "all" &&
      recipe.dietary.toLowerCase() !== filters.dietary
    )
      return false;
    return true;
  });

  return (
    <section className="min-h-screen bg-linear-to-b  from-orange-50 via-white to-amber-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl">📖</span>
              <h1 className="text-2xl font-bold bg-linear-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">
                Recipe Hub
              </h1>
            </div>
            <button
              onClick={() => router.push("/recipe/add")}
              className="px-6 py-2 bg-linear-to-r from-orange-500 to-amber-500 text-white rounded-full hover:from-orange-600 hover:to-amber-600 transition-all shadow-lg font-medium flex items-center gap-2"
            >
              <Plus className="w-5 h-5" /> Add Recipe
            </button>
          </div>

          {/* Search and Filter Bar */}
          <div className="flex gap-3 mb-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />{" "}
              <input
                type="text"
                placeholder="Search recipes, cuisines, ingredients..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="px-6 py-3 bg-white border-2 border-gray-200 rounded-xl hover:border-orange-400 transition-all flex items-center gap-2 font-medium"
            >
              <Filter className="w-5 h-5" />
              Filters
            </button>
          </div>

          {/* Filter Panel */}
          {showFilters && (
            <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
              <div className="grid md:grid-cols-4 gap-4">
                {/* filter by Cuisine */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cuisine
                  </label>
                  <select
                    value={filters.cuisine}
                    onChange={(e) =>
                      setFilters({
                        ...filters,
                        cuisine: e.target.value.toLowerCase(),
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                  >
                    {cuisineTypes.map((type) => (
                      <option key={type} value={type.toLowerCase()}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Filter by Difficulty */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Difficulty
                  </label>
                  <select
                    value={filters.difficulty}
                    onChange={(e) =>
                      setFilters({
                        ...filters,
                        difficulty: e.target.value.toLowerCase(),
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                  >
                    {difficulties.map((diff) => (
                      <option key={diff} value={diff.toLowerCase()}>
                        {diff}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Filter by Time */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Time
                  </label>
                  <select
                    value={filters.time}
                    onChange={(e) =>
                      setFilters({
                        ...filters,
                        time: e.target.value.toLowerCase(),
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                  >
                    {timeRanges.map((time) => (
                      <option key={time} value={time.toLowerCase()}>
                        {time}
                      </option>
                    ))}
                  </select>
                </div>

                {/* filter by Dietary */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Dietary
                  </label>
                  <select
                    value={filters.dietary}
                    onChange={(e) =>
                      setFilters({
                        ...filters,
                        dietary: e.target.value.toLowerCase(),
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                  >
                    {dietaryOptions.map((diet) => (
                      <option key={diet} value={diet.toLowerCase()}>
                        {diet}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!selectedRecipe ? (
          <>
            {/* Recipe Grid Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                {filteredRecipes.length} Recipes Found
              </h2>
              <div className="flex gap-2">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    viewMode === "grid"
                      ? "bg-orange-500 text-white"
                      : "bg-white text-gray-700 border border-gray-200 hover:border-orange-400"
                  }`}
                >
                  Grid
                </button>
                <button
                  onClick={() => setViewMode("masonry")}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    viewMode === "masonry"
                      ? "bg-orange-500 text-white"
                      : "bg-white text-gray-700 border border-gray-200 hover:border-orange-400"
                  }`}
                >
                  Masonry
                </button>
              </div>
            </div>

            {/* Recipe Grid*/}
            <div
              className={`grid gap-6 ${
                viewMode === "grid"
                  ? "sm:grid-cols-2 lg:grid-cols-3"
                  : "sm:grid-cols-2 lg:grid-cols-3"
              }`}
            >
              {filteredRecipes.map((recipe) => (
                <div
                  key={recipe.id}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2 overflow-hidden group cursor-pointer"
                  onClick={() => {
                    setSelectedRecipe(recipe);
                    setServings(recipe.servings);
                    setCheckedIngredients([]);
                    setCompletedSteps([]);
                  }}
                >
                  {/* Recipe Image */}
                  <div className="aspect-video bg-linear-to-br from-orange-100 to-amber-100 flex items-center justify-center text-8xl relative overflow-hidden">
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors"></div>
                    <img
                      src={recipe.image}
                      alt={recipe.title}
                      className="w-full h-full object-cover"
                    />
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleSave(recipe.id.toString());
                      }}
                      className="absolute top-4 right-4 p-2 bg-white/90 rounded-full hover:bg-white transition-colors"
                    >
                      <Bookmark
                        className={`w-5 h-5 ${
                          savedRecipes.includes(recipe.id.toString())
                            ? "fill-orange-500 text-orange-500"
                            : "text-gray-600"
                        }`}
                      />
                    </button>
                    <div className="absolute top-4 left-4 flex gap-2">
                      <span
                        className={`text-xs px-3 py-1 rounded-full font-medium ${
                          recipe.difficulty === "Easy"
                            ? "bg-green-500 text-white"
                            : recipe.difficulty === "Medium"
                            ? "bg-yellow-500 text-white"
                            : "bg-red-500 text-white"
                        }`}
                      >
                        {recipe.difficulty}
                      </span>
                    </div>
                  </div>

                  {/* Recipe Info */}
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xs px-3 py-1 bg-orange-100 text-orange-700 rounded-full font-medium">
                        {recipe.cuisine}
                      </span>{" "}
                      {recipe.dietary !== "None" && (
                        <span className="text-xs px-3 py-1 bg-green-100 text-green-700 rounded-full font-medium">
                          {recipe.dietary}
                        </span>
                      )}
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors">
                      {recipe.title}
                    </h3>

                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-2xl">{recipe.authorAvatar}</span>
                      <span className="text-sm text-gray-600">
                        {recipe.author}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {recipe.time}
                      </div>

                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        {recipe.servings} servings
                      </div>

                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        {recipe.rating}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Heart className="w-4 h-4" /> {recipe.likes}
                        </div>

                        <div className="flex items-center gap-1">
                          <MessageCircle className="w-4 h-4" /> {recipe.reviews}
                        </div>

                        <div className="flex items-center gap-1">
                          <Eye className="w-4 h-4" /> {recipe.views}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredRecipes.length === 0 && (
              <div className="text-center py-20">
                <div className="text-8xl mb-6">🔍</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  No recipes found
                </h3>
                <p className="text-gray-600">
                  Try adjusting your filters or search query
                </p>
              </div>
            )}
          </>
        ) : (
          /* Recipe Detail View */
          <div className="max-w-5xl mx-auto">
            <button
              onClick={() => setSelectedRecipe(null)}
              className="mb-6 py-2 bg-white border-2 border-gray-200 rounded-xl hover:border-orange-400 transition-all flex items-center gap-2 font-medium"
            >
              <X className="w-5 h-5 " /> Back to Recipes
            </button>

            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
              {/* Recipe Header */}
              <div className="relative aspect-21/9 bg-linear-to-br from-orange-100 to-amber-100 flex items-center justify-center">
                <img
                  src={selectedRecipe.image}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-6 right-6 flex gap-3">
                  <button
                    onClick={() => toggleSave(selectedRecipe.id)}
                    className="p-3 bg-white rounded-full shadow-lg hover:bg-gray-50 transition-colors"
                  >
                    <Bookmark
                      className={`w-6 h-6 ${
                        savedRecipes.includes(selectedRecipe.id)
                          ? "fill-orange-500 text-orange-500"
                          : "text-gray-600"
                      }`}
                    />
                  </button>

                  <button className="p-3 bg-white rounded-full shadow-lg hover:bg-gray-50 transition-colors">
                    <Share2 className="w-6 h-6 text-gray-600" />
                  </button>
                </div>
              </div>

              <div className="p-8">
                {/* Title and Meta */}
                <div className="mb-6 pb-6 border-b border-gray-200">
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm font-medium">
                      {selectedRecipe.cuisine}
                    </span>

                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        selectedRecipe.difficulty === "Easy"
                          ? "bg-green-500 text-white"
                          : selectedRecipe.difficulty === "Medium"
                          ? "bg-yellow-500 text-white"
                          : "bg-red-500 text-white"
                      }`}
                    >
                      {selectedRecipe.difficulty}
                    </span>
                    {selectedRecipe.dietary !== "None" && (
                      <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                        {selectedRecipe.dietary}
                      </span>
                    )}
                  </div>

                  <h1 className="text-4xl font-bold text-gray-900 mb-4">
                    {selectedRecipe.title}
                  </h1>

                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-3xl">
                      {selectedRecipe.authorAvatar}
                    </span>
                    <div>
                      <div className="font-semibold text-gray-900">
                        {selectedRecipe.author}
                      </div>
                      <div className="text-sm text-gray-600">
                        Recipe Creator
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-700 leading-relaxed mb-6">
                    {selectedRecipe.description}
                  </p>

                  {/* Stats */}
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-1 text-gray-600 mb-1">
                        <Clock className="w-5 h-5" />
                      </div>
                      <div className="font-bold text-gray-900">
                        {selectedRecipe.time}
                      </div>
                      <div className="text-xs text-gray-900">Total Time</div>
                    </div>

                    <div className="text-center">
                      <div className="flex items-center justify-center gap-1 text-gray-600 mb-1">
                        <Users className="w-5 h-5" />
                      </div>
                      <div className="font-bold text-gray-900">
                        {selectedRecipe.servings} servings
                      </div>
                      <div className="text-xs text-gray-600">Serves</div>
                    </div>

                    <div className="text-center">
                      <div className="flex items-center justify-center gap-1 text-gray-600 mb-1">
                        <Star className="W-5 h-5 fill-yellow-400 text-yellow-400" />
                      </div>
                      <div className="font-bold text-gray-900">
                        {selectedRecipe.rating}
                      </div>
                      <div className="text-xs text-gray-600">
                        {selectedRecipe.reviews} reviews
                      </div>
                    </div>

                    <div className="text-center">
                      <button
                        onClick={() => toggleLike(selectedRecipe.id)}
                        className="flex flex-col items-center w-full"
                      >
                        <Heart
                          className={`w-5 h-5 mb-1 ${
                            likedRecipes.includes(selectedRecipe.id)
                              ? "fill-red-500 text-red-500"
                              : "text-gray-600"
                          }`}
                        />
                        <div className="font-bold text-gray-900">
                          {selectedRecipe.likes}
                        </div>
                        <div className="text-xs text-gray-600">Likes</div>
                      </button>
                    </div>

                    <div className="text-center">
                      <div className="flex items-center justify-center gap-1 text-gray-600 mb-1">
                        <Eye className="w-5 h-5" />
                      </div>
                      <div className="font-bold text-gray-900">
                        {selectedRecipe.views}
                      </div>
                      <div className="text-xs text-gray-600">Views</div>
                    </div>
                  </div>
                </div>
                {/* ***** */}
                {/* ingredients Section */}
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-bold text-gray-900">
                      Ingredients
                    </h2>
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-gray-600">Servings:</span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => adjustServings(-1)}
                          className="p-1 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="font-bold text-lg w-8 text-center">
                          {servings}
                        </span>
                        <button
                          onClick={() => adjustServings(1)}
                          className="p-1 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="bg-linear-to-br from-orange-50 to-amber-50 rounded-xl p-6">
                    <div className="space-y-3">
                      {selectedRecipe.ingredients.map(
                        (ingredient: any, index: number) => {
                          const multiplier = servings / selectedRecipe.servings;
                          const adjustedAmount = ingredient.amount.replace(
                            /\d+/g,
                            (match: any) =>
                              Math.round(parseInt(match) * multiplier)
                          );

                          return (
                            <label
                              key={index}
                              className="flex items-start gap-3 p-3 bg-white rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                            >
                              <input
                                type="checkbox"
                                checked={checkedIngredients.includes(index)}
                                onChange={() => toggleIngredient(index)}
                                className="mt-1 w-5 h-5 text-orange-500 rounded focus:ring-2 focus:ring-orange-400"
                              />
                              <div className="flex-1">
                                <span
                                  className={`font-medium ${
                                    checkedIngredients.includes(index)
                                      ? "line-through text-gray-400"
                                      : "text-gray-900"
                                  }`}
                                >
                                  {ingredient.item}
                                </span>
                                <span
                                  className={`ml-2 ${
                                    checkedIngredients.includes(index)
                                      ? "line-through text-gray-400"
                                      : "text-gray-600"
                                  }`}
                                >
                                  - {adjustedAmount}
                                </span>
                              </div>
                            </label>
                          );
                        }
                      )}
                    </div>
                  </div>
                </div>
                {/* Instructions Section */}
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    Instructions
                  </h2>
                  <div className="space-y-4">
                    {selectedRecipe.steps.map((step: string, index: number) => (
                      <div
                        key={index}
                        className="flex gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                      >
                        {" "}
                        <div className="shrink-0">
                          {" "}
                          <button
                            onClick={() => toggleStep(index)}
                            className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${
                              completedSteps.includes(index)
                                ? "bg-green-500 text-white"
                                : "bg-white border-2 border-gray-300 text-gray-700"
                            }`}
                          >
                            {completedSteps.includes(index) ? (
                              <Check className="w-5 h-5" />
                            ) : (
                              index + 1
                            )}
                          </button>
                        </div>
                        <p
                          className={`flex-1 leading-relaxed ${
                            completedSteps.includes(index)
                              ? "line-through text-gray-400"
                              : "text-gray-700"
                          }`}
                        >
                          {step}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
                {/* Tags */}.
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    Tags
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedRecipe.tags.map((tag: string, index: number) => (
                      <span
                        key={index}
                        className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 transition-colors cursor-pointer"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
                {/* Comments Section */}
                <div className="border-t border-gray-200 pt-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    Reviews ({selectedRecipe.reviews})
                  </h2>

                  <div className="mb-6">
                    <textarea
                      placeholder="Share your thoughts about this recipe..."
                      rows={4}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent resize-none"
                    />
                    <div className="flex justify-between items-center mt-3">
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            className="hover:scale-110 transition-transform"
                          >
                            <Star className="w-6 h-6 text-gray-300 hover:text-yellow-400 hover:fill-yellow-400" />
                          </button>
                        ))}
                      </div>
                      <button className="px-6 py-2 bg-linear-to-r from-orange-500 to-amber-500 text-white rounded-xl hover:from-orange-600 hover:to-amber-600 transition-all font-medium">
                        Post Review
                      </button>
                    </div>
                  </div>

                  {/* Sample Reviews */}
                  <div className="space-y-4">
                    {[
                      {
                        name: "John Smith",
                        avatar: "👨",
                        rating: 5,
                        comment:
                          "Absolutely delicious! The instructions were clear and easy to follow.",
                        time: "2 days ago",
                      },
                      {
                        name: "Sarah Lee",
                        avatar: "👩",
                        rating: 4,
                        comment:
                          "Great recipe! I added some extra garlic and it was perfect.",
                        time: "1 week ago",
                      },
                      {
                        name: "Mike Chen",
                        avatar: "👨",
                        rating: 5,
                        comment:
                          "Best recipe I've tried in a while. My family loved it!",
                        time: "2 weeks ago",
                      },
                    ].map((review, index) => (
                      <div key={index} className="p-4 bg-gray-50 rounded-xl">
                        <div className="flex items-start gap-3 mb-2">
                          <span className="text-3xl">{review.avatar}</span>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                              <span className="font-semibold text-gray-900">
                                {review.name}
                              </span>
                              <span className="text-xs text-gray-500">
                                {review.time}
                              </span>
                            </div>
                            <div className="flex gap-1 mb-2">
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
                            <p className="text-gray-700 text-sm">
                              {review.comment}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                {/* Related Recipes */}
                <div className="mt-12 pt-8 border-t border-gray-200">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    You Might Also Like
                  </h2>
                  <div className="grid sm:grid-cols-3 gap-4">
                    {recipes
                      .filter(
                        (r) =>
                          r.id !== selectedRecipe.id &&
                          r.cuisine === selectedRecipe.cuisine
                      )
                      .slice(0, 3)
                      .map((recipe) => (
                        <div
                          key={recipe.id}
                          onClick={() => {
                            setSelectedRecipe(recipe);
                            setServings(recipe.servings);
                            setCheckedIngredients([]);
                            setCompletedSteps([]);
                            window.scrollTo(0, 0);
                          }}
                          className="bg-linear-to-br from-orange-50 to-amber-50 rounded-xl p-4 cursor-pointer hover:shadow-lg transition-all"
                        >
                          <div className="text-5xl mb-2 text-center">
                            {recipe.image}
                          </div>
                          <h3 className="font-bold text-gray-900 text-center mb-1">
                            {recipe.title}
                          </h3>
                          <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                            <Clock className="w-4 h-4" />
                            {recipe.time}
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

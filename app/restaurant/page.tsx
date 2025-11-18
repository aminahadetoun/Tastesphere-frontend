"use client";
import React, { useState } from "react";
import {
  Search,
  Filter,
  MapPin,
  Star,
  Clock,
  DollarSign,
  Phone,
  Navigation,
  Heart,
  Share2,
  Bookmark,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { features } from "process";

const restaurants = [
  {
    id: 1,
    name: "La Bella Vita",
    cuisine: "Italian",
    image:
      "https://thesaucemag.com/wp-content/uploads/2024/04/best-italian-restaurants-in-london-sette-circolo-popolare.jpg",
    images: [
      "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/13/dd/63/0e/live-cooking-station.jpg?w=900&h=500&s=1",
      "https://www.foodandwine.com/thmb/fVmYbaQzXCz1Prx8VxrW9sMcjMU=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Braciole-FT-RECIPE1122-66acf49cef0e4390bec780945709e7f3.jpg",
      "https://www.eatthis.com/wp-content/uploads/sites/4/2022/09/friends-having-pasta-dinner-white-wine.jpg?quality=82&strip=1",
      "https://x1075lasvegas.com/uploads/2025/07/GettyImages-2201499922.jpg?format=auto&optimize=high&width=1440",
    ],
    rating: 4.8,
    reviews: 324,
    distance: "0.5 km",
    priceRange: "$$",
    address: "123 Main Street, Downtown",
    phone: "+1 (555) 123-4567",
    hours: "11:00 AM - 10:00 PM",
    openNow: true,
    description:
      "Authentic Italian cuisine with a modern twist. Family-owned restaurant serving traditional recipes passed down through generations.",
    features: ["Outdoor Seating", "Delivery", "Takeout", "Reservations"],
    lat: 40.7128,
    lng: -74.006,
  },
  {
    id: 2,
    name: "Sakura Sushi",
    cuisine: "Japanese",
    image:
      "https://www.upmenu.com/wp-content/uploads/2023/10/10-japanese-restaurant-names-japanese-restaurant-interior.jpg",
    images: [
      "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/03/84/7c/17/nagomi.jpg?w=900&h=500&s=1",
      "https://hotel-chinzanso-tokyo.com/wp/wp-content/uploads/68A5700-1024x683.jpg",
      "https://www.upmenu.com/wp-content/uploads/2023/10/12-japanese-restaurant-names-japanese-restaurant.jpg",
      "https://www.upmenu.com/wp-content/uploads/2023/10/10-japanese-restaurant-names-japanese-restaurant-interior.jpg",
    ],
    rating: 4.9,
    reviews: 512,
    distance: "1.2 km",
    priceRange: "$$$",
    address: "456 Oak Avenue, Midtown",
    phone: "+1 (555) 234-5678",
    hours: "12:00 PM - 11:00 PM",
    openNow: true,
    description:
      "Fresh sushi and authentic Japanese dishes. Our master chefs bring traditional techniques with premium ingredients.",
    features: ["Dine-in", "Takeout", "Bar", "Private Rooms"],
    lat: 40.758,
    lng: -73.9855,
  },
  {
    id: 3,
    name: "El Mariachi",
    cuisine: "Mexican",
    image:
      "https://f7e5m2b4.delivery.rocketcdn.me/wp-content/uploads/2019/01/Mi-Chola-Mexican-Restaurant-2.jpg",
    images: [
      "https://i0.wp.com/houstonfoodfinder.com/wp-content/uploads/2024/05/Lounge-Credit_-Monochrome.jpg?resize=1200%2C800&ssl=1",
      "https://cdn.theatlantic.com/thumbor/6q9c2S7xV8Jh0MBru5oqrO5c_8c=/1613x1080:5002x3622/1200x900/media/img/mt/2016/04/selects_08/original.jpg",
      "https://images.getbento.com/accounts/10f4b75502e54ca1704240e3c54cf494/media/images/Tezza-1968.JPG?w=1000&fit=max&auto=compress,format&cs=origin&h=1000",
      "https://www.themexican.com/wp-content/uploads/2022/03/The_Mexican_Edit_March8th-1-web-1024x517.jpg",
    ],
    rating: 4.7,
    reviews: 289,
    distance: "0.8 km",
    priceRange: "$",
    address: "789 Elm Street, West End",
    phone: "+1 (555) 345-6789",
    hours: "10:00 AM - 9:00 PM",
    openNow: true,
    description:
      "Vibrant Mexican street food and traditional dishes. Experience the authentic flavors of Mexico in every bite.",
    features: ["Outdoor Seating", "Takeout", "Catering", "Live Music"],
    lat: 40.7489,
    lng: -73.968,
  },
  {
    id: 4,
    name: "Spice Garden",
    cuisine: "Indian",
    image:
      "https://www.poojn.in/wp-content/uploads/2025/04/The-Business-of-Indian-Cuisine-Restaurants-Catering-Explained.jpeg.jpg",
    images: [
      "https://hotelandcatering.com/wp-content/uploads/2025/01/WhatsApp-Image-2025-01-23-at-12.21.54_c951becc-1.jpg",
      "https://media.timeout.com/images/106162018/image.jpg",
      "https://media-cdn.tripadvisor.com/media/photo-m/1280/31/34/e3/4f/ganesha-ek-sanskriti.jpg",
      "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2f/3d/3c/ef/caption.jpg?w=900&h=-1&s=1",
    ],
    rating: 4.6,
    reviews: 198,
    distance: "2.1 km",
    priceRange: "$$",
    address: "321 Pine Road, East Side",
    phone: "+1 (555) 456-7890",
    hours: "11:30 AM - 10:30 PM",
    openNow: false,
    description:
      "Aromatic Indian curries and tandoori specialties. A journey through the diverse regions of Indian cuisine.",
    features: ["Delivery", "Takeout", "Vegetarian Options", "Buffet"],
    lat: 40.7614,
    lng: -73.9776,
  },
  {
    id: 5,
    name: "Le Petit Bistro",
    cuisine: "French",
    image:
      "https://cdn.shopify.com/s/files/1/0489/7544/6170/files/Capture_d_ecran_2022-05-03_a_13.20.49_600x600.png?v=1651580465",
    images: [
      "https://www.timeoutdubai.com/cloud/timeoutdubai/2024/12/10/Tete-a-Tete.jpg",
      "https://images.squarespace-cdn.com/content/v1/5e32ab1a44a8b143b36cad96/3e322623-664f-4be1-81bd-9e0eeb81b394/FRENCH+CUISINE+%282%29.png",
      "https://www.theworlds50best.com/discovery/filestore/jpg/LeCinq3.jpg",
      "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2a/2e/9f/93/caption.jpg",
    ],
    rating: 4.9,
    reviews: 421,
    distance: "1.5 km",
    priceRange: "$$$",
    address: "555 Maple Avenue, Arts District",
    phone: "+1 (555) 567-8901",
    hours: "10:00 AM - 11:00 PM",
    openNow: true,
    description:
      "Classic French bistro fare in an intimate setting. Enjoy wine pairings and artisanal pastries.",
    features: ["Wine Bar", "Outdoor Seating", "Brunch", "Reservations"],
    lat: 40.7505,
    lng: -73.9934,
  },
  {
    id: 6,
    name: "Dragon Wok",
    cuisine: "Chinese",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbaS41gZyEU_rKpjIiS9CTwGNy0QpteIzr0w&s",
    images: [
      "https://hokkaidoguide.com/wp-content/uploads/2020/07/126A0393-scaled.jpg",
      "https://static.stacker.com/s3fs-public/182FSBF.png",
      "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/29/88/4c/3e/historic-dining-room.jpg?w=900&h=500&s=1",
      "https://mspmag.com/downloads/62454/download/tea-house-full.jpg?cb=502ecb96f1f0f85b6ad8f52d9b1c6c00`",
    ],
    rating: 4.5,
    reviews: 367,
    distance: "0.9 km",
    priceRange: "$",
    address: "888 Dragon Lane, Chinatown",
    phone: "+1 (555) 678-9012",
    hours: "11:00 AM - 10:00 PM",
    openNow: true,
    description:
      "Authentic Chinese cuisine with a focus on Szechuan and Cantonese flavors. Family recipes since 1985.",
    features: ["Delivery", "Takeout", "Dine-in", "Family Style"],
    lat: 40.7178,
    lng: -73.997,
  },
];

export default function Page() {
  const [selectedRestaurant, setSelectedRestaurant] = useState<any>(null);
  const [savedRestaurants, setSavedRestaurants] = useState<string[]>([]);
  const [filters, setFilters] = useState({
    cuisine: "all",
    priceRange: "all",
    rating: "all",
    distance: "all",
    openNow: false,
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const cuisineTypes = [
    "All",
    "Italian",
    "Japanese",
    "Mexican",
    "Indian",
    "French",
    "Chinese",
  ];
  const priceRanges = ["All", "$", "$$", "$$$"];
  const ratingFilters = ["All", "4.5+", "4.0+", "3.5+"];
  const distanceFilters = ["All", "< 1 km", "< 2 km", "< 5 km"];

  const toggleSave = (restaurantId: string) => {
    setSavedRestaurants((prev) =>
      prev.includes(restaurantId)
        ? prev.filter((id) => id !== restaurantId)
        : [...prev, restaurantId]
    );
  };

  const filteredRestaurants = restaurants.filter((restaurant) => {
    // Search filter
    if (
      searchQuery &&
      !restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !restaurant.cuisine.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }

    // Cuisine filter - compare in lowercase
    if (
      filters.cuisine !== "all" &&
      restaurant.cuisine.toLowerCase() !== filters.cuisine.toLowerCase()
    ) {
      return false;
    }

    // Price range filter - compare in lowercase
    if (
      filters.priceRange !== "all" &&
      restaurant.priceRange.toLowerCase() !== filters.priceRange.toLowerCase()
    ) {
      return false;
    }

    // Rating filter
    if (filters.rating !== "all") {
      // Extract the number from strings like "4.5+", "4.0+", etc.
      const minRating = parseFloat(filters.rating.replace("+", ""));
      if (restaurant.rating < minRating) return false;
    }

    // Distance filter
    if (filters.distance !== "all") {
      // Extract number from strings like "< 1 km", "< 2 km", etc.
      const maxDistanceMatch = filters.distance.match(/[\d.]+/);
      if (maxDistanceMatch) {
        const maxDistance = parseFloat(maxDistanceMatch[0]);
        const restaurantDistance = parseFloat(restaurant.distance);
        if (restaurantDistance > maxDistance) return false;
      }
    }

    // Open now filter
    if (filters.openNow && !restaurant.openNow) {
      return false;
    }

    return true;
  });
  const nextImage = () => {
    if (selectedRestaurant) {
      setCurrentImageIndex(
        (prev) => (prev + 1) % selectedRestaurant.images.length
      );
    }
  };

  const prevImage = () => {
    if (selectedRestaurant) {
      setCurrentImageIndex(
        (prev) =>
          (prev - 1 + selectedRestaurant.images.length) %
          selectedRestaurant.images.length
      );
    }
  };
  return (
    <section className="h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm z-20">
        <div className="px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🍽️ </span>
              <h1 className="text-2xl font-bold bg-linear-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">
                Restaurant Explorer
              </h1>
            </div>
            <button className="px-4 py-2 bg-linear-to-r from-orange-500 to-amber-500 text-white rounded-full hover:from-orange-600 hover:to-amber-600 transition-all shadow-lg font-medium">
              Add Restaurant
            </button>
          </div>

          {/* search and Filter Bar */}
          <div className="flex gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search restaurants, cuisines, or locations..."
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

          {/* Filter panel */}
          {showFilters && (
            <div className="mt-4 p-4 bg-gray-50 rounded-xl border border-gray-200">
              <div className="grid md:grid-cols-5 gap-4">
                <div>
                  {/* Cuisine */}
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cuisine
                  </label>
                  <select
                    value={filters.cuisine}
                    onChange={(e) =>
                      setFilters({ ...filters, cuisine: e.target.value })
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

                {/* price range */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price Range
                  </label>
                  <select
                    value={filters.priceRange}
                    onChange={(e) =>
                      setFilters({ ...filters, priceRange: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                  >
                    {priceRanges.map((range) => (
                      <option key={range} value={range.toLowerCase()}>
                        {range}
                      </option>
                    ))}
                  </select>
                </div>
                {/* rating */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Rating
                  </label>
                  <select
                    value={filters.rating}
                    onChange={(e) =>
                      setFilters({ ...filters, rating: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                  >
                    {ratingFilters.map((rating) => (
                      <option key={rating} value={rating}>
                        {rating}
                      </option>
                    ))}
                  </select>
                </div>
                {/* Distance */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Distance
                  </label>
                  <select
                    value={filters.distance}
                    onChange={(e) =>
                      setFilters({ ...filters, distance: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                  >
                    {distanceFilters.map((dist) => (
                      <option key={dist} value={dist}>
                        {dist}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Open Now
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filters.openNow}
                      onChange={(e) =>
                        setFilters({ ...filters, openNow: e.target.checked })
                      }
                      className="w-5 h-5 text-orange-500 rounded focus:ring-2 focus:ring-orange-400"
                    />
                    <span>Only show open</span>
                  </label>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Main content */}
      <div className=" flex-1 flex overflow-hidden">
        {/* sidebar - Restaurant List */}
        <div className="w-full md:w-2/5 lg:w-1/3 bg-white border-r border-gray-200 overflow-y-auto">
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">
                {filteredRestaurants.length} Restaurants Found
              </h2>
            </div>

            <div className="space-y-3">
              {filteredRestaurants.map((restaurant) => (
                <div
                  key={restaurant.id}
                  onClick={() => {
                    setSelectedRestaurant(restaurant);
                    setCurrentImageIndex(0);
                  }}
                  className={`p-4 rounded-xl cursor-pointer transition-all ${
                    selectedRestaurant?.id === restaurant.id
                      ? "bg-linear-to-r from-orange-50 to-amber-50 border-2 border-orange-400"
                      : "bg-gray-50 hover:bg-gray-100 border-2 border-transparent"
                  }`}
                >
                  <div className="flex gap-4">
                    <img
                      src={restaurant.image}
                      className="w-20 h-20 bg-linear-to-br from-orange-100 to-amber-100 rounded-xl flex items-center justify-center text-4xl shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h3 className="font-bold text-gray-900 truncate">
                          {restaurant.name}
                        </h3>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleSave(restaurant.id.toString());
                          }}
                          className="shrink-0"
                        >
                          <Heart
                            className={`w-5 h-5 ${
                              savedRestaurants.includes(
                                restaurant.id.toString()
                              )
                                ? "fill-red-500 text-red-500"
                                : "text-gray-400 hover:text-red-500"
                            }`}
                          />
                        </button>
                      </div>
                      <div className="flex items-center gap-2 mb-2">
                        <span>{restaurant.cuisine}</span>
                        <span>{restaurant.priceRange}</span>
                        {restaurant.openNow && (
                          <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full font-medium">
                            Open
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="font-semibold">
                            {restaurant.rating}
                          </span>
                          <span className="text-xs">{restaurant.reviews}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          <span>{restaurant.distance}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {filteredRestaurants.length === 0 && (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">🔍</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    No restaurant found
                  </h3>
                  <p className="text-gray-600">
                    Try adjusting your filters or search query
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Map/Detail View */}
        <div className="flex-1 relative bg-linear-to-br from-orange-50 via-amber-50 to-yellow-50">
          {selectedRestaurant ? (
            <div className="absolute inset-0 overflow-y-auto">
              <div className="max-w-4xl mx-auto p-6">
                {/* Close Button */}
                <button
                  onClick={() => setSelectedRestaurant(null)}
                  className="mb-4 p-2 bg-white rounded-full shadow-lg hover:bg-gray-50 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>

                {/* Restaurant detail card */}
                <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
                  {/* Image Gallery */}
                  <div className="relative aspect-video bg-linear-to-br from-orange-100 to-amber-100">
                    <div className="absolute inset-0 flex items-center justify-center text-9xl">
                      <img
                        src={selectedRestaurant.images[currentImageIndex]}
                        alt={`Image ${currentImageIndex + 1} of ${
                          selectedRestaurant.name
                        }`}
                        className="w-full h-full object-cover rounded-2xl"
                      />
                    </div>
                    {selectedRestaurant.images.length > 1 && (
                      <>
                        <button
                          onClick={prevImage}
                          className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 bg-white/90 rounded-full shadow-lg hover:bg-white transition-colors"
                        >
                          <ChevronLeft className="w-6 h-6" />
                        </button>
                        <button
                          onClick={nextImage}
                          className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 bg-white/90 rounded-full shadow-lg hover:bg-white transition-colors"
                        >
                          <ChevronRight className="w-6 h-6" />
                        </button>
                        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                          {selectedRestaurant.images.map(
                            (_: any, idx: number) => (
                              <div
                                key={idx}
                                className={`w-2 h-2 rounded-full ${
                                  idx === currentImageIndex
                                    ? "bg-white w-6"
                                    : "bg-white/50"
                                }`}
                              />
                            )
                          )}
                        </div>
                      </>
                    )}
                  </div>

                  {/* Restaurant Info */}
                  <div className="p-8">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">
                          {selectedRestaurant.name}
                        </h2>
                        <div className="flex items-center gap-3 flex-wrap">
                          <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm font-medium">
                            {selectedRestaurant.cuisine}
                          </span>
                          <span className="text-gray-600">
                            {selectedRestaurant.priceRange}
                          </span>
                          {selectedRestaurant.openNow && (
                            <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                              Open Now
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <button
                          onClick={() => toggleSave(selectedRestaurant.id)}
                          className="p-3 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
                        >
                          <Bookmark
                            className={`w-5 h-5 ${
                              savedRestaurants.includes(selectedRestaurant.id)
                                ? "fill-orange-500 text-orange-500"
                                : "text-gray-600"
                            }`}
                          />
                        </button>
                        <button className="p-3 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
                          <Share2 className="w-5 h-5 text-gray-600" />
                        </button>
                      </div>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center gap-2 mb-6 pb-6 border-b border-gray-200">
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-5 h-5 ${
                              i < Math.floor(selectedRestaurant.rating)
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="font-bold text-xl">
                        {selectedRestaurant.rating}
                      </span>
                      <span className="text-gray-600">
                        {selectedRestaurant.reviews}
                      </span>
                    </div>

                    {/* Description */}
                    <p className="text-gray-700 mb-6 leading-relaxed">
                      {selectedRestaurant.description}
                    </p>

                    {/* Details Grid */}
                    <div className="grid md:grid-cols-2 gap-4 mb-6">
                      <div className="flex items-start gap-3">
                        <MapPin className="w-5 h-5 text-orange-500 mt-1 shrink-0" />
                        <div>
                          <div className="font-semibold text-gray-900">
                            Address
                          </div>
                          <div className="text-gray-600">
                            {selectedRestaurant.address}
                          </div>
                          <div className="text-sm text-orange-600 mt-1">
                            {selectedRestaurant.distance} away
                          </div>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <Clock className="w-5 h-5 text-orange-500 mt-1 shrink-0" />
                        <div>
                          <div className="font-semibold text-gray-900">
                            Hours
                          </div>
                          <div className="text-gray-600">
                            {selectedRestaurant.hours}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <Phone className="w-5 h-5 text-orange-500 mt-1 shrink-0" />
                        <div>
                          <div className="font-semibold text-gray-900">
                            Phone
                          </div>
                          <div className="text-gray-600">
                            {selectedRestaurant.phone}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <DollarSign className="w-5 h-5 text-orange-500 mt-1 shrink-0" />
                        <div>
                          <div className="font-semibold text-gray-900">
                            Price Range
                          </div>
                          <div className="text-gray-600">
                            {selectedRestaurant.priceRange}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Features */}
                    <div className="mb-6">
                      <h3 className="font-semibold text-gray-900 mb-3">
                        Features
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedRestaurant.features.map(
                          (features: any, idx: number) => (
                            <span
                              key={idx}
                              className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                            >
                              {features}
                            </span>
                          )
                        )}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="grid md:grid-cols-2 gap-4">
                      <button className="px-6 py-3 bg-linear-to-r from-orange-500 to-amber-500 text-white rounded-xl hover:from-orange-600 hover:to-amber-600 transition-all shadow-lg font-semibold flex items-center justify-center gap-2">
                        <Navigation className="w-5 h-6" /> Get Directions
                      </button>
                      <button className="px-6 py-3 bg-white border-2 border-orange-400 text-orange-600 rounded-xl hover:bg-orange-50 transition-all font-semibold">
                        {" "}
                        Add Review
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              {/* Map Placeholder */}
              <div className="text-center">
                <div className="text-8xl mb-6">🗺️</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Select a restaurant to view details
                </h3>
                <p className="text-gray-600">
                  Click on any restaurant from the list to see more information
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

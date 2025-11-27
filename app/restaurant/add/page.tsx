"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  X,
  Plus,
  Upload,
  Utensils,
  MapPin,
  Clock,
  Phone,
  DollarSign,
  Star,
} from "lucide-react";

export default function AddRestaurantPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    cuisine: "",
    priceRange: "",
    address: "",
    phone: "",
    hours: "",
    openNow: false,
  });

  const [features, setFeatures] = useState([
    { name: "" },
    { name: "" },
    { name: "" },
  ]);

  const [images, setImages] = useState<string[]>([]);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(false);

  const cuisineTypes = [
    "Italian",
    "Japanese",
    "Mexican",
    "Indian",
    "French",
    "Thai",
    "Chinese",
    "American",
    "Mediterranean",
    "Korean",
    "Vietnamese",
    "Other",
  ];

  const priceRanges = ["$", "$$", "$$$", "$$$$"];

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleFeatureChange = (index: number, value: string) => {
    const newFeatures = [...features];
    newFeatures[index] = { name: value };
    setFeatures(newFeatures);
  };

  const addFeature = () => {
    setFeatures([...features, { name: "" }]);
  };

  const removeFeature = (index: number) => {
    if (features.length > 1) {
      setFeatures(features.filter((_, i) => i !== index));
    }
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.name.trim()) newErrors.name = "Restaurant name is required";
    if (!formData.description.trim())
      newErrors.description = "Description is required";
    if (!formData.cuisine) newErrors.cuisine = "Cuisine type is required";
    if (!formData.priceRange) newErrors.priceRange = "Price range is required";
    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    if (!formData.hours.trim())
      newErrors.hours = "Operating hours are required";

    const validFeatures = features.filter((f) => f.name.trim());
    if (validFeatures.length === 0) {
      newErrors.features = "At least one feature/amenity is required";
    }

    return newErrors;
  };

  const handleSubmit = async () => {
    const newErrors = validateForm();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    setIsLoading(true);

    try {
      const validFeatures = features
        .filter((f) => f.name.trim())
        .map((f) => f.name);

      const restaurantData = {
        ...formData,
        features: validFeatures,
        images: images,
      };

      console.log("Restaurant Data:", restaurantData);

      // TODO: Call your API to save the restaurant
      // await saveRestaurant(restaurantData);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      alert("Restaurant added successfully!");
      router.push("/restaurant");
    } catch (error) {
      console.error("Error saving restaurant:", error);
      alert("Failed to add restaurant. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveDraft = () => {
    console.log("Saving as draft...");
    alert("Restaurant saved as draft!");
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-orange-50 via-white to-amber-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-gray-600 hover:text-orange-600 mb-4 transition-colors"
          >
            <X className="w-5 h-5" />
            Cancel
          </button>
          <div className="flex items-center gap-3 mb-2">
            <Utensils className="w-8 h-8 text-orange-500" />
            <h1 className="text-3xl font-bold text-gray-900">
              Add New Restaurant
            </h1>
          </div>
          <p className="text-gray-600">
            Share an amazing dining spot with the TasteSphere community
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 space-y-8">
          {/* Error Summary */}
          {Object.keys(errors).length > 0 && (
            <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4">
              <p className="text-red-800 font-semibold mb-2">
                Please fix the following errors:
              </p>
              <ul className="list-disc list-inside text-red-700 text-sm space-y-1">
                {Object.values(errors).map((error, idx) => (
                  <li key={idx}>{error}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Section 1: Basic Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <span className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                1
              </span>
              Basic Information
            </h3>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Restaurant Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="e.g., La Bella Vita"
                className={`w-full px-4 py-3 border-2 ${
                  errors.name ? "border-red-400" : "border-gray-200"
                } rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent`}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={3}
                placeholder="Describe the restaurant, its atmosphere, and what makes it special..."
                className={`w-full px-4 py-3 border-2 ${
                  errors.description ? "border-red-400" : "border-gray-200"
                } rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent resize-none`}
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cuisine Type <span className="text-red-500">*</span>
                </label>
                <select
                  name="cuisine"
                  value={formData.cuisine}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border-2 ${
                    errors.cuisine ? "border-red-400" : "border-gray-200"
                  } rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent`}
                >
                  <option value="">Select cuisine...</option>
                  {cuisineTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price Range <span className="text-red-500">*</span>
                </label>
                <select
                  name="priceRange"
                  value={formData.priceRange}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border-2 ${
                    errors.priceRange ? "border-red-400" : "border-gray-200"
                  } rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent`}
                >
                  <option value="">Select price range...</option>
                  {priceRanges.map((range) => (
                    <option key={range} value={range}>
                      {range} -{" "}
                      {range === "$"
                        ? "Budget-friendly"
                        : range === "$$"
                        ? "Moderate"
                        : range === "$$$"
                        ? "Expensive"
                        : "Fine Dining"}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Section 2: Location & Contact */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <span className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                2
              </span>
              Location & Contact
            </h3>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Address <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="123 Main Street, Downtown"
                  className={`w-full pl-12 pr-4 py-3 border-2 ${
                    errors.address ? "border-red-400" : "border-gray-200"
                  } rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent`}
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+1 (555) 123-4567"
                    className={`w-full pl-12 pr-4 py-3 border-2 ${
                      errors.phone ? "border-red-400" : "border-gray-200"
                    } rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent`}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Operating Hours <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Clock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    name="hours"
                    value={formData.hours}
                    onChange={handleInputChange}
                    placeholder="11:00 AM - 10:00 PM"
                    className={`w-full pl-12 pr-4 py-3 border-2 ${
                      errors.hours ? "border-red-400" : "border-gray-200"
                    } rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent`}
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="openNow"
                  checked={formData.openNow}
                  onChange={handleInputChange}
                  className="w-5 h-5 text-orange-500 rounded focus:ring-2 focus:ring-orange-400"
                />
                <span className="text-sm font-medium text-gray-700">
                  Restaurant is currently open
                </span>
              </label>
            </div>
          </div>

          {/* Section 3: Photos */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <span className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                3
              </span>
              Restaurant Photos
            </h3>
            <p className="text-sm text-gray-600">
              Upload multiple photos to showcase the restaurant (interior,
              exterior, food, ambiance)
            </p>
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-orange-400 transition-colors cursor-pointer">
              <Upload className="w-12 h-12 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-600 font-medium">
                Click to upload or drag and drop
              </p>
              <p className="text-sm text-gray-500 mt-1">
                PNG, JPG up to 10MB (Upload 3-6 photos)
              </p>
            </div>
          </div>

          {/* Section 4: Features & Amenities */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <span className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                4
              </span>
              Features & Amenities <span className="text-red-500">*</span>
            </h3>
            {errors.features && (
              <p className="text-red-500 text-sm">{errors.features}</p>
            )}
            <p className="text-sm text-gray-600">
              Add features like Outdoor Seating, WiFi, Parking, etc.
            </p>

            <div className="space-y-3">
              {features.map((feature, index) => (
                <div key={index} className="flex gap-3">
                  <input
                    type="text"
                    placeholder="e.g., Outdoor Seating, WiFi, Parking, Delivery"
                    value={feature.name}
                    onChange={(e) => handleFeatureChange(index, e.target.value)}
                    className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
                  />
                  <button
                    onClick={() => removeFeature(index)}
                    className="px-4 py-3 bg-red-100 text-red-600 rounded-xl hover:bg-red-200 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>

            <button
              onClick={addFeature}
              className="w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-xl hover:border-orange-400 transition-colors flex items-center justify-center gap-2 text-gray-600 hover:text-orange-600 font-medium"
            >
              <Plus className="w-5 h-5" />
              Add Another Feature
            </button>
          </div>

          {/* Common Features Suggestions */}
          <div className="bg-orange-50 rounded-xl p-4">
            <p className="text-sm font-semibold text-gray-700 mb-2">
              Suggested Features:
            </p>
            <div className="flex flex-wrap gap-2">
              {[
                "Outdoor Seating",
                "WiFi",
                "Parking",
                "Delivery",
                "Takeout",
                "Reservations",
                "Wheelchair Accessible",
                "Pet Friendly",
                "Live Music",
                "Private Dining",
                "Bar",
                "Vegan Options",
              ].map((suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => {
                    const emptyIndex = features.findIndex(
                      (f) => !f.name.trim()
                    );
                    if (emptyIndex !== -1) {
                      handleFeatureChange(emptyIndex, suggestion);
                    } else {
                      setFeatures([...features, { name: suggestion }]);
                    }
                  }}
                  className="px-3 py-1 bg-white text-orange-600 text-sm rounded-full hover:bg-orange-100 transition-colors border border-orange-200"
                >
                  + {suggestion}
                </button>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4 border-t border-gray-200">
            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className="flex-1 px-6 py-4 bg-linear-to-r from-orange-500 to-amber-500 text-white rounded-xl hover:from-orange-600 hover:to-amber-600 transition-all shadow-lg font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Adding Restaurant...
                </span>
              ) : (
                "Add Restaurant"
              )}
            </button>
            <button
              onClick={handleSaveDraft}
              disabled={isLoading}
              className="px-6 py-4 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Save as Draft
            </button>
            <button
              onClick={() => router.back()}
              disabled={isLoading}
              className="px-6 py-4 bg-white border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

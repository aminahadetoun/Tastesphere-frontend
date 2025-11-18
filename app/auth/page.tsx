"use client";
import React, { useState } from "react";
import { Mail, Lock, User, MapPin, Eye, EyeOff } from "lucide-react";

export default function Page() {
  const [isUserLogin, setIsUserLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    location: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: any = {};

    if (!isUserLogin && !formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!isUserLogin && !formData.location.trim()) {
      newErrors.location = "Location is required";
    }

    return newErrors;
  };

  const handleSubmit = () => {
    const newErrors = validateForm();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      alert(`Successfully ${isUserLogin} ? 'signed in' : 'created account'}!`);
    }, 1500);
  };

  const toggleForm = () => {
    setIsUserLogin(!isUserLogin);
    setFormData({ name: "", email: "", password: "", location: "" });
    setErrors({});
  };

  return (
    <section className="min-h-screen flex">
      {/* Left side - Image/Illustration */}
      <section className="hidden lg:flex lg:w-1/2 bg-linear-to-br from-orange-100 via-amber-50 to-yellow-50 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-32 h-32 bg-orange-400 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-40 h-40 bg-yellow-400 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 w-36 h-36 bg-amber-400 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 flex flex-col items-center justify-center w-full p-12">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-gray-800 mb-4">
              🍽️TasteSphere
            </h1>
            <p className="text-xl text-gray-600 max-w-md">
              Discover. Share. Taste the world Together.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6 max-w-lg">
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 text-center transform hover:scale-105 transition-transform">
              <div className="text-4xl mb-2">🍕</div>
              <p className="text-sm font-medium text-gray-700">10K+ Recipes</p>
            </div>
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 text-center transform hover:scale-105 transition-transform">
              <div className="text-4xl mb-2">🌍</div>
              <p className="text-sm font-medium text-gray-700">
                Global Community
              </p>
            </div>
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 text-center transform hover:scale-105 transition-transform">
              <div className="text-4xl mb-2">🍴</div>
              <p className="text-sm font-medium text-gray-700">
                Restaurant Guide
              </p>
            </div>
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 text-center transform hover:scale-105 transition-transform">
              <div className="text-4xl mb-2">💬</div>
              <p className="text-sm font-medium text-gray-700">
                Connect & Chat
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* Right side- Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              🍽️TasteSphere
            </h1>
            <p className="text-sm text-gray-600">
              Your culinary journey starts here
            </p>
          </div>
          {/* Form Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              {isUserLogin ? "Welcome Back!" : "Join TasteSphere"}
            </h2>
            <p className="text-gray-600">
              {isUserLogin
                ? "Sign in to continue your culinary journey"
                : "Create an account to start exploring"}{" "}
            </p>
          </div>
          {/* ****** */}
          {/* Form For Signup and SignIn */}
          <div className="space-y-5">
            {/* Name Field(Signup only) */}
            {!isUserLogin && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`w-full pl-12 pr-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all ${
                      errors.name ? "border-red-400" : "border-gray-200"
                    }`}
                    placeholder="Your Name"
                  />
                </div>
                {errors.name && (
                  <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                )}
              </div>
            )}

            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full pl-12 pr-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all ${
                    errors.email ? "border-red-400" : "border-gray-200"
                  }`}
                  placeholder="you@example.com"
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`w-full pl-12 pr-12 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all ${
                    errors.password ? "border-red-400" : "border-gray-200"
                  }`}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">{errors.password}</p>
              )}
            </div>

            {/* Location Field (Signup only) */}
            {!isUserLogin && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb2">
                  {" "}
                  Location{" "}
                </label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    className={`w-full pl-12 pr-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all ${
                      errors.location ? "border-red-400" : "border-gray-200"
                    }`}
                    placeholder="New York, USA"
                  />
                </div>
                {errors.name && (
                  <p className="text-red-500 text-xs mt-1">{errors.location}</p>
                )}
              </div>
            )}

            {/* Forgot Password (Login only) */}
            {isUserLogin && (
              <div className="flex justify-end">
                <button
                  type="button"
                  className="text-sm text-orange-600 hover:text-orange-700 font-medium"
                >
                  Forgot password
                </button>
              </div>
            )}

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className="w-full bg-linear-to-r from-orange-500 to-amber-500 text-white font-semibold py-3 px-4 rounded-xl hover:from-orange-600 hover:to-amber-600 transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-orange-200 disabled:opacity-50 disabled:cursor-not-allowed"
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
                  Processing...
                </span>
              ) : isUserLogin ? (
                "Sign In"
              ) : (
                "Create Account"
              )}
            </button>
          </div>
          {/* ******* */}
          {/* Toggle form */}
          <div className="text-center mt-6">
            <p className="text-gray-600">
              {isUserLogin
                ? "Don't have an account?"
                : "Already have an account?"}
              <button
                onClick={toggleForm}
                className="text-orange-600 hover:text-orange-700 font-semibold"
              >
                {isUserLogin ? "Sign up" : "Sign In"}
              </button>
            </p>
          </div>
          {/* Terms & Privacy (Signup Only) */}
          {!isUserLogin && (
            <p className="text-xs text-gray-500 text-center mt-6">
              By creating an account, you agree to our{" "}
              <a href="#" className="text-orange-600 hover:underline">
                Terms Of Services
              </a>{" "}
              and{" "}
              <a href="#" className="text-orange-600 hover:underline">
                Privacy Policy
              </a>
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

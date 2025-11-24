"use client";
import React, { useState } from "react";
import { Search, Menu, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-sm">
      <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8">
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
            <Link
              href="/"
              className="text-gray-700 hover:text-orange-500 font-medium transition-colors"
            >
              Home
            </Link>
            <Link
              href="/user-profile"
              className="text-gray-700 hover:text-orange-500 font-medium transition-colors"
            >
              Dashboard
            </Link>
            <Link
              href="/recipe"
              className="text-gray-700 hover:text-orange-500 font-medium transition-colors"
            >
              Recipes
            </Link>
            <Link
              href="/restaurant"
              className="text-gray-700 hover:text-orange-500 font-medium transition-colors"
            >
              Restaurants
            </Link>
            <Link
              href="/community-chat"
              className="text-gray-700 hover:text-orange-500 font-medium transition-colors"
            >
              Community
            </Link>

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
              <button
                onClick={() => router.push("/auth")}
                className="px-4 py-2 text-orange-600 hover:text-orange-700 font-medium"
              >
                Sign In
              </button>
              <button
                onClick={() => router.push("/auth")}
                className="px-6 py-2 bg-linear-to-r from-orange-500 to-amber-500 text-white rounded-full hover:from-orange-600 hover:to-amber-600 transition-all shadow-lg shadow-orange-200 font-medium"
              >
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
  );
};

export default Navbar;

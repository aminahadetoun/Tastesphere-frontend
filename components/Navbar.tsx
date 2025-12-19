"use client";

import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated, logout } = useAuth();

  const linkClass = (path: string) =>
    `block font-medium transition-colors ${
      pathname === path
        ? "text-orange-500"
        : "text-gray-700 hover:text-orange-500"
    }`;

  const loginLogoutFunc = () => {
    if (isAuthenticated) {
      logout();
      router.push("/");
    } else {
      router.push("/signin");
    }
    setMobileMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-sm">
      <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* TOP BAR */}
        <div className="flex items-center justify-between h-16">
          {/* LOGO */}
          <div className="flex items-center gap-2">
            <span className="text-3xl">🍽️</span>
            <span className="text-2xl font-bold bg-linear-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">
              TasteSphere
            </span>
          </div>

          {/* DESKTOP NAV */}
          <div className="hidden md:flex items-center gap-8 mx-auto">
            <Link href="/" className={linkClass("/")}>
              Home
            </Link>
            <Link href="/recipe" className={linkClass("/recipe")}>
              Recipes
            </Link>
            <Link href="/restaurant" className={linkClass("/restaurant")}>
              Restaurants
            </Link>
            <Link
              href="/community-chat"
              className={linkClass("/community-chat")}
            >
              Community
            </Link>
            <Link href="/user-profile" className={linkClass("/user-profile")}>
              Dashboard
            </Link>
          </div>

          {/* DESKTOP AUTH */}
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={loginLogoutFunc}
              className="px-4 py-2 text-orange-600 hover:text-orange-700 font-medium"
            >
              {isAuthenticated ? "Sign out" : "Sign in"}
            </button>

            {!isAuthenticated && (
              <button
                onClick={() => router.push("/signup")}
                className="px-6 py-2 bg-linear-to-r from-orange-500 to-amber-500 text-white rounded-full font-medium shadow-lg"
              >
                Get Started
              </button>
            )}
          </div>

          {/* MOBILE TOGGLE */}
          <button
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="md:hidden p-2 text-gray-700"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* MOBILE DROPDOWN */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            mobileMenuOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="px-4 pb-4 space-y-4 border-t border-gray-100">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className={linkClass("/")}
            >
              Home
            </Link>

            <Link
              href="/recipe"
              onClick={() => setMobileMenuOpen(false)}
              className={linkClass("/recipe")}
            >
              Recipes
            </Link>

            <Link
              href="/restaurant"
              onClick={() => setMobileMenuOpen(false)}
              className={linkClass("/restaurant")}
            >
              Restaurants
            </Link>

            <Link
              href="/community-chat"
              onClick={() => setMobileMenuOpen(false)}
              className={linkClass("/community-chat")}
            >
              Community
            </Link>

            <Link
              href="/user-profile"
              onClick={() => setMobileMenuOpen(false)}
              className={linkClass("/user-profile")}
            >
              Dashboard
            </Link>

            <div className="pt-4 border-t border-gray-100 space-y-2">
              <button
                onClick={loginLogoutFunc}
                className="w-full px-4 py-2 border border-orange-500 text-orange-600 rounded-full font-medium"
              >
                {isAuthenticated ? "Sign out" : "Sign in"}
              </button>

              {!isAuthenticated && (
                <button
                  onClick={() => {
                    router.push("/signin");
                    setMobileMenuOpen(false);
                  }}
                  className="w-full px-4 py-2 bg-linear-to-r from-orange-500 to-amber-500 text-white rounded-full font-medium"
                >
                  Get Started
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

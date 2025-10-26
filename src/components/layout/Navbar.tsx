"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, Bell, Sun, Moon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import { Raleway, Orbitron } from "next/font/google";
import { orbitron, raleway } from "@/app/layout";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [userloggedIn, setUserLoggedIn] = useState(false);

  const toggleMobile = () => setMobileOpen(!mobileOpen);
  const toggleTheme = () => setDarkMode(!darkMode);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Browse", href: "/browse" },
    { name: "Deals", href: "/deals" },
  ];

  return (
    <nav
      className="fixed top-0 w-full z-50 
                    backdrop-blur-md
                    bg-[var(--bg-dark)]/75
                    hover:bg-[var(--bg-dark)]/75
                    border-b border-[var(--bg)]/8
                    transition-all duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/">
            <div className="md:flex items-center gap-2">
              <img
                src="/logo2.png"
                alt="GamePriceTracker Logo"
                className="h-10 w-auto"
              />
              <p
                className={`hidden md:inline text-3xl font-bold uppercase ${orbitron.className}`}
              >
                Deal
                <span className=" italic text-[var(--secondary)]">hunt</span>
              </p>
            </div>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-18">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className=" text-[var(--text)] transition-colors text-base hover:text-[var(--primary)] font-medium"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Search + Actions */}
          <div className="flex items-center gap-4">
            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-white/10 transition"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            {/* Notifications */}
            {userloggedIn && (
              <button className="p-2 rounded-full hover:bg-white/10 transition">
                <Bell size={20} />
              </button>
            )}
            {/* login and register Links */}
            {!userloggedIn && (
              <div className="hidden md:flex gap-4">
                <Link
                  className={`tracking-wider hover:underline   underline-offset-8 decoration-2 ${raleway.className}`}
                  href={"/login"}
                >
                  login
                </Link>
                <Link
                  className={`tracking-wider hover:underline underline-offset-8 decoration-2 ${raleway.className}`}
                  href={"/register"}
                >
                  Register
                </Link>
              </div>
            )}

            {/* Mobile Hamburger */}
            <button
              onClick={toggleMobile}
              className="md:hidden p-2 rounded-full hover:bg-white/10 transition"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>

            {/* user avatar */}
            {userloggedIn && (
              <Avatar className="hidden md:block">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            // initial={{ height: 0, opacity: 0 }}
            // animate={{ height: "auto", opacity: 1 }}
            // exit={{ height: 0, opacity: 0 }}
            initial={{ scaleY: 0, opacity: 0 }}
            animate={{ scaleY: 1, opacity: 1 }}
            exit={{ scaleY: 0, opacity: 0 }}
            style={{ originY: 0 }}
            className="md:hidden border-t border-white/10 bg-[var(--bg)]"
          >
            <div className="px-4 py-3 space-y-2">
              {navLinks.map((link) => (
                <div key={link.name}>
                  <Link
                    href={link.href}
                    className="pl-4  tracking-wide"
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.name}
                  </Link>
                  <Separator className="my-4 bg-[var(--text-muted)]" />
                </div>
              ))}
              {mobileOpen && userloggedIn && (
                <div className="flex items-center gap-3 px-4 py-2 mt-5">
                  <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-[var(--text)] font-medium">John Doe</p>
                  </div>
                </div>
              )}

              {!userloggedIn && (
                <div className="md:hidden flex  gap-4 pl-3 mt-5">
                  <Link href={"/login"}>
                    <Button className=" rounded-full bg-[var(--primary)]">
                      Login{" "}
                    </Button>
                  </Link>
                  <Link href={"/register"}>
                    <Button className=" rounded-full bg-[var(--primary)]">
                      {" "}
                      Register{" "}
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

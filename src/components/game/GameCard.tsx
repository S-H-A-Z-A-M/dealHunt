"use client";
import React from "react";
import { motion } from "framer-motion";

type GameCardProps = {
  name: string;
  image: string;
  price: string;
  discount: string;
  expiry: string;
  alltimeLow?: boolean;
};

export default function GameCard({
  name,
  image,
  price,
  discount,
  expiry,
  alltimeLow,
}: GameCardProps) {
  return (
    <motion.div
      whileHover={{ y: 4 }}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.15, ease: "easeOut" }}
      className="relative group cursor-pointer rounded-2xl overflow-hidden border border-[var(--border-muted)] bg-[var(--bg-light)] transition-all duration-200"
    >
      {/* Game Image */}
      <div className="relative overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
        />

        {/* Discount badge */}
        <div
          className="absolute top-3 right-3 text-sm font-semibold px-2 py-1 rounded-md shadow-sm"
          style={{
            backgroundColor: "var(--primary)",
            color: "var(--bg-light)",
          }}
        >
          {discount}
        </div>

        {/* Fade at bottom of image */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[var(--bg-dark)] via-[var(--bg-dark)]/40 to-transparent pointer-events-none"></div>
      </div>

      {/* Info Panel */}
      <div className="relative p-4 border-t border-[var(--border-muted)] group-hover:bg-[var(--bg)]/95 transition-colors duration-150">
        <h3
          className="text-base font-semibold truncate mb-1"
          style={{ color: "var(--primary)" }}
        >
          {name}
        </h3>

        <div className="flex justify-between items-center mb-2">
          <span
            className="text-sm font-medium"
            style={{ color: "var(--text)" }}
          >
            {price}
          </span>
          {alltimeLow && (
            <span className="text-xs px-2 py-0.5 rounded font-medium bg-[var(--secondary)] text-black">
              All Time Low
            </span>
          )}
        </div>

        <p className="text-sm flex items-center gap-1 text-[var(--text-muted)]">
          ⏰ {expiry}
        </p>
      </div>
    </motion.div>
  );
}

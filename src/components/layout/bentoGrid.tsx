"use client";
import React from "react";
import { motion, Variants } from "framer-motion";

export default function BentoGrid() {
  const images = Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    src: `https://picsum.photos/800/800?random=${i + 1}`,
    alt: `Image ${i + 1}`,
  }));

  const containerVariants: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.08 } },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <div className="flex justify-center items-center h-132 w-full">
      {/* Hidden on small screens */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="hidden md:grid w-full h-full gap-3 grid-cols-6 grid-rows-4"
      >
        {images.map((img, i) => {
          const layout = [
            "col-span-2 row-span-2",
            "col-span-2 row-span-1",
            "col-span-1 row-span-1",
            "col-span-1 row-span-2",
            "col-span-2 row-span-1",
            "col-span-1 row-span-1",
            "col-span-2 row-span-2",
            "col-span-1 row-span-1",
            "col-span-1 row-span-2",
            "col-span-2 row-span-1",
            "col-span-1 row-span-1",
            "col-span-2 row-span-2",
          ];

          return (
            <motion.div
              key={img.id}
              variants={itemVariants}
              className={`overflow-hidden rounded-2xl shadow-lg group relative ${layout[i]}`}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover transition-transform duration-500  grayscale-80 group-hover:scale-120 group-hover:grayscale-0 opacity-70 hover:opacity-100"
              />
              <div className="absolute inset-0 bg-[var(--bg-dark)]/60 opacity-100 group-hover:opacity-0 transition-opacity duration-500" />
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}

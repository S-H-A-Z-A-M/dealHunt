"use client";
import React from "react";
import GameCard from "./GameCard";

const dummyGames = [
  {
    name: "Cyberpunk 2077",
    image: "https://picsum.photos/800/800?random=1",
    price: "$29.99",
    discount: "-50%",
    expiry: "Ends in 2 days",
    alltimeLow: true,
  },
  {
    name: "Elden Ring",
    image: "https://picsum.photos/800/800?random=2",
    price: "$49.99",
    discount: "-20%",
    expiry: "Ends in 5 days",
  },
  {
    name: "Red Dead Redemption 2",
    image: "https://picsum.photos/800/800?random=3",
    price: "$19.99",
    discount: "-67%",
    expiry: "Ends in 1 day",
    alltimeLow: true,
  },
  {
    name: "God of War",
    image: "https://picsum.photos/800/800?random=4",
    price: "$29.99",
    discount: "-40%",
    expiry: "Ends in 3 days",
  },
  {
    name: "Horizon Forbidden West",
    image: "https://picsum.photos/800/800?random=5",
    price: "$59.99",
    discount: "-30%",
    expiry: "Ends in 4 days",
  },
  {
    name: "The Witcher 3: Wild Hunt",
    image: "https://picsum.photos/800/800?random=6",
    price: "$14.99",
    discount: "-70%",
    expiry: "Ends in 2 days",
    alltimeLow: true,
  },
  {
    name: "Assassin’s Creed Valhalla",
    image: "https://picsum.photos/800/800?random=7",
    price: "$39.99",
    discount: "-55%",
    expiry: "Ends in 1 day",
  },
];

export default function PopularGameSection() {
  return (
    <section className="mt-48 mb-48 px-6">
      <h2 className="text-3xl font-bold mb-6" style={{ color: "var(--text)" }}>
        Popular Deals <span style={{ color: "var(--secondary)" }}></span>
      </h2>

      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {dummyGames.map((game, i) => (
          <GameCard key={i} {...game} />
        ))}

        {/* View More Card */}
        <div className="aspect-square rounded-2xl border-2 border-dashed border-gray-500 flex items-center justify-center cursor-pointer hover:bg-gray-800 transition-colors duration-200">
          <span
            className="text-xl font-semibold"
            style={{ color: "var(--text)" }}
          >
            View all the deals ➡️
          </span>
        </div>
      </div>
    </section>
  );
}

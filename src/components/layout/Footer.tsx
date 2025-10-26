import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 mt-12">
      <div className="container mx-auto py-6 px-4 sm:px-6 lg:px-8 text-center text-gray-400">
        <p>
          &copy; {new Date().getFullYear()} DealPredict. All rights reserved.
        </p>
        <p className="text-sm mt-2">
          Powered by data from RAWG, IGDB, and IsThereAnyDeal.
        </p>
      </div>
    </footer>
  );
};

export default Footer;

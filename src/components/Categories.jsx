import React from "react";
import { Link } from "@tanstack/react-router";
import booksImg from "../assets/category/books.png";
import image1 from "../assets/category/project.png";
import gadgetsImg from "../assets/category/gadget.png";

const Categories = () => {
  const items = [
    {
      title: "Buy Products",
      description: "Find gadgets, books, instruments and more from your campus.",
      to: "/browse",
      img: gadgetsImg,
      cta: "Shop Now",
      accent: "#111111",
    },
    {
      title: "Buy Projects",
      description: "Explore final-year projects across branches and technologies.",
      to: "/projects",
      img: image1,
      cta: "Explore Projects",
      accent: "#0f172a",
    },
    {
      title: "Access Campus Notes",
      description: "Get curated notes and study materials by and for students.",
      to: "/notes",
      img: booksImg,
      cta: "View Notes",
      accent: "#111827",
    },
  ];

  return (
    <section className="relative w-full bg-neutral-900 text-white py-20 lg:py-24 overflow-hidden">
      {/* Decorative background glows */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full filter blur-[100px]"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full filter blur-[100px]"></div>
      
      <div className="container mx-auto w-full px-6 md:px-20 relative z-10">
        <div className="flex flex-col items-center text-center justify-center mb-10 md:mb-12">
          <p className="text-xs md:text-sm tracking-[0.2em] font-bold text-blue-400 uppercase mb-2 md:mb-3">Discover</p>
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-neutral-400">
            Browse by Category
          </h2>
          <p className="text-sm md:text-base text-neutral-400 mt-3 md:mt-4 max-w-lg px-4">
            Everything you need for your campus life, organized perfectly for you.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {items.map((card) => (
            <Link
              key={card.title}
              to={card.to}
              className="group relative flex flex-col h-full bg-neutral-800/50 backdrop-blur-sm border border-neutral-700/50 rounded-2xl md:rounded-3xl overflow-hidden hover:border-neutral-500 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-900/20"
            >
              {/* Subtle hover gradient inside card */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              <div className="h-40 md:h-56 w-full flex items-center justify-center relative p-6 md:p-8">
                {/* Glow behind image */}
                <div className="absolute inset-x-8 inset-y-8 bg-gradient-to-t from-black/0 to-white/5 rounded-full blur-xl md:blur-2xl group-hover:bg-white/10 transition-colors"></div>
                <img 
                  src={card.img} 
                  alt={card.title} 
                  className="h-full w-auto object-contain relative z-10 group-hover:scale-110 group-hover:rotate-2 transition-transform duration-500 drop-shadow-2xl" 
                />
              </div>
              
              <div className="p-6 md:p-8 flex flex-col flex-1 relative z-10 bg-gradient-to-t from-neutral-900 to-transparent">
                <h3 className="text-xl md:text-2xl font-bold text-white mb-2">{card.title}</h3>
                <p className="text-xs md:text-sm text-neutral-400 mb-6 md:mb-8 flex-1 leading-relaxed">{card.description}</p>
                <div className="mt-auto">
                  <span className="inline-flex items-center gap-2 px-4 py-2 md:px-6 md:py-3 text-xs md:text-sm font-bold text-neutral-900 bg-white rounded-full group-hover:bg-blue-500 group-hover:text-white transition-colors duration-300">
                    {card.cta} 
                    <span className="group-hover:translate-x-1 transition-transform inline-block">→</span>
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;


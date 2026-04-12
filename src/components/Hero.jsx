import { Link } from "@tanstack/react-router";
import React from "react";
import { FaGraduationCap, FaArrowRight } from "react-icons/fa6";

const Hero = () => {
  // Check if token exists in localStorage
  const token = localStorage.getItem("token");

  return (
    <section className="relative w-full overflow-hidden bg-neutral-50 px-6 py-20 max-lg:py-16 md:px-20 lg:min-h-[80vh] flex items-center">
      {/* Dynamic Background Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-[-20%] left-[20%] w-96 h-96 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

      <div className="container mx-auto grid lg:grid-cols-2 gap-10 items-center relative z-10 w-full">
        {/* Left Content */}
        <div className="flex flex-col gap-4 md:gap-6 max-lg:items-center max-lg:text-center">
          <div className="inline-flex items-center gap-2 bg-white/60 backdrop-blur-md border border-white shadow-sm px-3 md:px-4 py-1.5 md:py-2 rounded-full w-max mt-4 hover:bg-white/80 transition-colors">
            <span className="text-blue-500 bg-blue-50 p-1 md:p-1.5 rounded-full"><FaGraduationCap className="text-[10px] md:text-sm" /></span>
            <span className="text-xs md:text-sm font-semibold text-neutral-800 tracking-tight">Join now to sell on your campus</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-neutral-900 tracking-tight leading-[1.1]">
            Your Campus <br className="hidden lg:block"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">Marketplace</span>
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-neutral-600 max-w-xl font-medium leading-relaxed">
            Buy and sell second-hand books, gadgets, lab coats, and instruments natively on your campus. Fast, secure, and made for students.
          </p>

          <div className="flex flex-wrap gap-3 mt-2 md:mt-4 max-lg:justify-center">
            {token ? (
              <>
                <Link
                  to="/sell"
                  className="group relative inline-flex items-center justify-center gap-2 px-6 py-2.5 md:px-8 md:py-3.5 text-sm md:text-base font-semibold text-white bg-neutral-900 rounded-xl overflow-hidden shadow-lg shadow-neutral-900/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                  <span className="relative z-10">Start Selling</span>
                  <FaArrowRight className="relative z-10 group-hover:translate-x-1 transition-transform" />
                  <div className="absolute inset-0 bg-gradient-to-r from-neutral-800 to-black opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </Link>
                <Link
                  to="/dashboard"
                  className="group inline-flex items-center justify-center gap-2 px-6 py-2.5 md:px-8 md:py-3.5 text-sm md:text-base font-semibold text-neutral-900 bg-white border-2 border-neutral-200 rounded-xl hover:border-neutral-900 hover:bg-neutral-50 transition-all shadow-sm"
                >
                  Dashboard
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/sell-project"
                  className="group relative inline-flex items-center justify-center gap-2 px-6 py-2.5 md:px-8 md:py-3.5 text-sm md:text-base font-semibold text-white bg-neutral-900 rounded-xl overflow-hidden shadow-lg shadow-neutral-900/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                  <span className="relative z-10">Sell a Project</span>
                  <FaArrowRight className="relative z-10 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/browse"
                  className="group inline-flex items-center justify-center gap-2 px-6 py-2.5 md:px-8 md:py-3.5 text-sm md:text-base font-semibold text-neutral-900 bg-white border-2 border-neutral-200 rounded-xl hover:border-neutral-900 hover:bg-neutral-50 transition-all shadow-sm"
                >
                  Browse Products
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Right Content / Image Area */}
        <div className="hidden lg:block relative w-full h-[500px]">
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-100 to-purple-50 rounded-3xl transform rotate-3 scale-105 opacity-50 blur-xl"></div>
          <div 
            className="absolute inset-0 rounded-3xl bg-cover bg-center shadow-2xl border-4 border-white/40 backdrop-blur-sm"
            style={{
              backgroundImage: "url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1171&auto=format&fit=crop')",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent rounded-[1.75rem]"></div>
            
            {/* Floating UI Element Container to show it's a marketplace */}
            <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-white flex items-center justify-between animate-bounce" style={{ animationDuration: '3s' }}>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-neutral-100 rounded-lg flex items-center justify-center">
                  📚
                </div>
                <div>
                  <p className="text-sm font-bold text-neutral-900">Engineering Physics</p>
                  <p className="text-xs font-semibold text-green-600">Successfully Sold!</p>
                </div>
              </div>
              <p className="font-bold text-neutral-900">₹450</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

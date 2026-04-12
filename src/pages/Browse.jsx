import { useNavigate } from "@tanstack/react-router";
import React, { useState, useEffect } from "react";
import { IoSearch, IoLocationOutline } from "react-icons/io5";
import axios from "axios";
import SEOHead from "../components/SEOHead";
import { seoData } from "../utils/seoData";

const Browse = () => {
  const navigate = useNavigate();
  const [campuses, setCampuses] = useState([]);
  const [popularCampuses, setPopularCampuses] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const baseUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchCampuses = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${baseUrl}/api/campuses`);

        let data = res.data;
        if (data && data.items) data = data.items;
        else if (data && data.data) data = data.data;

        if (Array.isArray(data)) {
          setCampuses(data);
          setPopularCampuses(data.slice(0, 8)); // Grab top 8
        }
      } catch (err) {
        console.error("Failed to fetch campuses", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCampuses();
  }, []);

  // Smoothed Functionality: One-click navigation!
  const handleSelectCampus = (campus) => {
    localStorage.setItem("campusId", campus._id);
    localStorage.setItem("campus", campus.name);
    navigate({ to: `/browse/products` });
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);

    if (!value) {
      setSuggestions([]);
      return;
    }

    const filtered = campuses.filter((campus) =>
      campus.name.toLowerCase().includes(value.toLowerCase())
    );
    setSuggestions(filtered);
  };

  return (
    <div className="h-[calc(100vh-80px)] md:h-[calc(100vh-100px)] min-h-[600px] flex flex-col bg-neutral-50 font-display relative overflow-hidden">
      <SEOHead {...seoData.browse} />

      {/* Background Decorators */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-100 rounded-full mix-blend-multiply filter blur-[80px] opacity-60 translate-x-1/3 -translate-y-1/2 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-50 rounded-full mix-blend-multiply filter blur-[80px] opacity-60 -translate-x-1/3 translate-y-1/3 pointer-events-none"></div>

      <main className="flex-grow flex items-center justify-center p-4 md:p-6 relative z-10 w-full overflow-hidden">
        <div className="w-full max-w-2xl mx-auto flex flex-col bg-white/70 backdrop-blur-xl p-6 md:p-8 rounded-[2rem] shadow-xl border border-white/50 max-h-full overflow-y-auto scrollbar-hide">

          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-neutral-900 text-white shadow-lg mb-4 transform -rotate-3 hover:rotate-0 transition-transform duration-300">
              <IoLocationOutline size={26} />
            </div>
            <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight text-neutral-900 mb-2">
              Select Your Campus
            </h2>
            <p className="text-xs md:text-sm text-neutral-500 font-medium max-w-sm mx-auto">
              Find exclusive student deals on textbooks, gadgets, and projects right at your college.
            </p>
          </div>

          {/* Search Input Container */}
          <div className="w-full relative z-20">
            <div className="relative group">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 group-focus-within:text-blue-500 transition-colors">
                <IoSearch size={20} />
              </span>
              <input
                type="search"
                placeholder="Search for your campus..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="w-full bg-white border-2 border-neutral-100 rounded-2xl py-3 pl-12 pr-5 text-sm md:text-base shadow-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all font-medium placeholder:text-neutral-400"
              />
            </div>

            {/* Suggestions Dropdown */}
            {suggestions.length > 0 && searchQuery && (
              <ul className="absolute w-full bg-white border border-neutral-100 rounded-2xl mt-2 z-50 max-h-48 overflow-y-auto shadow-[0_20px_40px_rgba(0,0,0,0.08)] py-2">
                {suggestions.map((campus) => (
                  <li
                    key={campus._id}
                    className="px-4 py-2 hover:bg-neutral-50 cursor-pointer flex items-center gap-3 transition-colors"
                    onClick={() => handleSelectCampus(campus)}
                  >
                    <img
                      src={campus.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(campus.name)}&background=random`}
                      referrerPolicy="no-referrer"
                      className="w-8 h-8 rounded-full object-cover shadow-sm bg-neutral-100"
                      alt={campus.name}
                    />
                    <span className="font-bold text-sm text-neutral-800">{campus.name}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="w-full mt-6 md:mt-8 relative z-10 shrink-0">
            <div className="flex items-center gap-4 mb-4">
              <div className="h-px bg-neutral-200 flex-1"></div>
              <h3 className="text-[10px] md:text-xs font-bold text-neutral-400 uppercase tracking-widest">
                Popular Communities
              </h3>
              <div className="h-px bg-neutral-200 flex-1"></div>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 md:gap-3">
              {loading
                ? Array.from({ length: 8 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-12 rounded-2xl bg-neutral-100/80 animate-pulse border border-neutral-100"
                  ></div>
                ))
                : popularCampuses.map((campus) => (
                  <button
                    key={campus._id}
                    className="group flex flex-col items-center justify-center gap-1.5 py-2 px-1 border-2 border-neutral-100 rounded-2xl bg-white hover:border-neutral-900 hover:shadow-md transition-all duration-300 transform active:scale-95"
                    onClick={() => handleSelectCampus(campus)}
                  >
                    <img
                      src={campus.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(campus.name)}&background=random`}
                      referrerPolicy="no-referrer"
                      className="w-9 h-9 md:w-10 md:h-10 rounded-full object-cover shadow-sm group-hover:scale-110 transition-transform duration-300"
                      alt={campus.name}
                    />
                    <span className="font-bold text-[9px] md:text-[10px] text-center text-neutral-600 group-hover:text-neutral-900 line-clamp-1 w-full px-1">
                      {campus.name}
                    </span>
                  </button>
                ))}
            </div>

            {!loading && popularCampuses.length === 0 && (
              <p className="text-center text-sm font-medium text-neutral-500 mt-4">
                No campuses available globally at the moment.
              </p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Browse;

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
    <div className="min-h-screen flex flex-col bg-neutral-50 font-display relative overflow-hidden">
      <SEOHead {...seoData.browse} />
      
      {/* Background Decorators */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-100 rounded-full mix-blend-multiply filter blur-[100px] opacity-60 translate-x-1/3 -translate-y-1/2 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-50 rounded-full mix-blend-multiply filter blur-[100px] opacity-60 -translate-x-1/3 translate-y-1/3 pointer-events-none"></div>

      <main className="flex-grow flex items-start justify-center pt-[8vh] md:pt-[12vh] pb-10 px-4 sm:px-6 md:px-8 relative z-10 w-full overflow-y-auto">
        <div className="w-full max-w-4xl mx-auto flex flex-col">
          
          <div className="text-center mb-6 md:mb-8 w-full">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-neutral-900 mb-3 drop-shadow-sm">
              Where do you study?
            </h2>
            <p className="text-xs sm:text-sm text-neutral-500 font-medium max-w-xl mx-auto px-2">
              Select your campus to unlock exclusive student deals on textbooks, electronics, and projects available right at your college.
            </p>
          </div>

          {/* Search Input Container */}
          <div className="w-full max-w-2xl mx-auto relative z-30 mb-10 md:mb-12">
            <div className="relative group shadow-[0_5px_20px_rgba(0,0,0,0.04)] rounded-full bg-white transition-all hover:shadow-[0_10px_30px_rgba(37,99,235,0.08)]">
              <span className="absolute left-5 top-1/2 -translate-y-1/2 text-neutral-400 group-focus-within:text-blue-500 transition-colors">
                <IoSearch size={18} />
              </span>
              <input
                type="search"
                placeholder="Search for your campus..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="w-full bg-transparent border border-neutral-200 rounded-full py-3 md:py-4 pl-12 pr-6 text-sm md:text-base outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all font-medium placeholder:text-neutral-400"
              />
            </div>

            {/* Suggestions Dropdown */}
            {suggestions.length > 0 && searchQuery && (
              <ul className="absolute w-full bg-white border border-neutral-100 rounded-2xl mt-3 z-50 max-h-60 overflow-y-auto shadow-[0_20px_40px_rgba(0,0,0,0.12)] py-2">
                {suggestions.map((campus) => (
                  <li
                    key={campus._id}
                    className="px-4 py-3 hover:bg-neutral-50 cursor-pointer flex items-center gap-4 transition-colors"
                    onClick={() => handleSelectCampus(campus)}
                  >
                    <img
                      src={campus.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(campus.name)}&background=random`}
                      referrerPolicy="no-referrer"
                      className="w-8 h-8 md:w-10 md:h-10 rounded-full object-cover shadow-sm bg-neutral-100"
                      alt={campus.name}
                    />
                    <span className="font-bold text-sm md:text-base text-neutral-800">{campus.name}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="w-full relative z-10 text-center mt-2">
            <h3 className="text-[10px] md:text-xs font-extrabold text-neutral-400 uppercase tracking-widest mb-6">
              Popular Communities
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 lg:gap-5">
              {loading
                ? Array.from({ length: 8 }).map((_, i) => (
                    <div
                      key={i}
                      className="h-20 md:h-24 rounded-2xl bg-neutral-100/80 animate-pulse border border-neutral-100"
                    ></div>
                  ))
                : popularCampuses.map((campus) => (
                    <button
                      key={campus._id}
                      className="group flex flex-col items-center justify-center gap-2 p-3 md:p-4 border border-neutral-200 rounded-2xl bg-white hover:border-black hover:ring-1 hover:ring-black hover:shadow-lg hover:-translate-y-1 transition-all duration-300 transform"
                      onClick={() => handleSelectCampus(campus)}
                    >
                      <img
                        src={campus.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(campus.name)}&background=random`}
                        referrerPolicy="no-referrer"
                        className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover shadow-sm group-hover:scale-110 transition-transform duration-300"
                        alt={campus.name}
                      />
                      <span className="font-bold text-[10px] md:text-xs text-center text-neutral-600 group-hover:text-black line-clamp-2 w-full px-1">
                        {campus.name}
                      </span>
                    </button>
                  ))}
            </div>
            
            {!loading && popularCampuses.length === 0 && (
              <p className="text-center text-xs md:text-sm font-medium text-neutral-500 mt-8">
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

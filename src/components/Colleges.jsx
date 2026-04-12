import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "@tanstack/react-router";
import { BsBuildingAdd } from "react-icons/bs";
const Colleges = () => {
  const [colleges, setColleges] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const baseUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchCampuses = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${baseUrl}/api/campuses`);
        setColleges(res.data);
      } catch (err) {
        console.error("Failed to fetch campuses", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCampuses();
  }, []);

  const handleSelectCollege = (college) => {
    localStorage.setItem("campusId", college._id);
    localStorage.setItem("campus", college.name);
    navigate({ to: `/browse/products` });
  };

  const handleRequestCollege = () => {
    navigate({ to: "/contact" });
  };

  return (
    <section className="w-full relative px-6 md:px-20 py-24 max-lg:py-16 bg-white overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-50 via-white to-white pointer-events-none"></div>

      <div className="flex flex-col gap-12 items-center max-w-7xl mx-auto w-full relative z-10">
        {/* Heading */}
        <div className="text-center max-w-2xl px-4">
          <p className="text-xs md:text-sm font-bold text-blue-600 mb-2 md:mb-3 uppercase tracking-widest">Communities</p>
          <h1 className="font-extrabold text-2xl md:text-3xl lg:text-5xl text-neutral-900 mb-3 md:mb-4 bg-clip-text text-transparent bg-gradient-to-r from-neutral-900 to-neutral-600">
            Featured Campuses
          </h1>
          <p className="text-neutral-500 text-sm md:text-lg">
            Join thousands of students from top colleges actively buying, selling, and collaborating.
          </p>
        </div>

        {/* Cards container */}
        <div className="w-full relative px-2 md:px-0">
          <div className="flex gap-4 md:gap-6 overflow-x-auto scrollbar-hide py-4 px-2 snap-x snap-mandatory lg:grid lg:grid-cols-5 lg:gap-6 lg:overflow-visible">
            {loading
              ? Array.from({ length: 5 }).map((_, i) => (
                  <div
                    key={i}
                    className="flex flex-col items-center gap-3 md:gap-4 bg-white p-6 md:p-8 rounded-2xl md:rounded-3xl shadow-sm border border-neutral-100 min-w-[180px] md:min-w-[220px] snap-center animate-pulse"
                  >
                    <div className="w-16 h-16 md:w-24 md:h-24 rounded-full bg-neutral-200"></div>
                    <div className="h-3 md:h-4 w-20 md:w-24 bg-neutral-200 rounded mt-2"></div>
                  </div>
                ))
              : colleges.map((college) => (
                  <button
                    key={college._id}
                    onClick={() => handleSelectCollege(college)}
                    className="group flex flex-col items-center justify-center cursor-pointer gap-5 bg-white p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-neutral-100 hover:border-blue-100 hover:shadow-[0_8px_30px_rgb(59,130,246,0.12)] hover:-translate-y-2 transition-all duration-300 min-w-[220px] snap-center text-center relative overflow-hidden"
                  >
                    {/* Hover Effect Background */}
                    <div className="absolute inset-0 bg-gradient-to-b from-blue-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                    <div className="relative w-24 h-24 rounded-full bg-white shadow-md p-2 flex items-center justify-center group-hover:scale-110 transition-transform duration-500 z-10">
                      <div className="w-full h-full rounded-full overflow-hidden bg-neutral-50">
                        <img
                          src={
                            college.avatar ||
                            "https://img.freepik.com/premium-vector/college-logo-design-concept-vector-art-illustration_761413-39595.jpg"
                          }
                          alt={college.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                    <h2 className="font-bold text-lg text-neutral-800 group-hover:text-blue-600 transition-colors z-10">
                      {college.name}
                    </h2>
                  </button>
                ))}
          </div>
        </div>

        {/* Request College Button */}
        <button
          onClick={handleRequestCollege}
          className="mt-6 flex items-center gap-3 px-8 py-4 text-sm font-bold cursor-pointer text-neutral-700 bg-white border-2 border-neutral-200 rounded-full hover:border-neutral-900 hover:bg-neutral-900 hover:text-white transition-all duration-300 shadow-sm hover:shadow-xl"
        >
          <BsBuildingAdd size={18} />
          <span>Don't see your college? Request to add it</span>
        </button>
      </div>
    </section>
  );
};

export default Colleges;

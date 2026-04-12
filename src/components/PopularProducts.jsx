import { Link } from "@tanstack/react-router";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaArrowRight } from "react-icons/fa6";
const PopularProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const baseUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchPopular = async () => {
      try {
        const res = await axios.get(`${baseUrl}/api/products`);
        
        let data = res.data;
        if (data && data.products) data = data.products; // handling potential wrappings
        if (data && data.data) data = data.data;
        if (data && data.items) data = data.items; // handling paginated wrapping

        if (Array.isArray(data)) {
          // Clone the array before reversing to avoid mutating read-only objects
          setProducts([...data].reverse().slice(0, 7));
        } else {
          console.error("API returned non-array data:", res.data);
        }
      } catch (err) {
        console.error("Fetch products error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPopular();
  }, []);

  // Skeleton Loader
  const SkeletonCard = () => (
    <div className="flex flex-col overflow-hidden rounded-lg bg-white :bg-gray-800 shadow-sm min-w-[200px] animate-pulse">
      <div className="aspect-square w-full bg-gray-200 :bg-gray-700"></div>
      <div className="flex flex-col p-3 space-y-2">
        <div className="h-4 w-3/4 bg-gray-200 :bg-gray-700 rounded"></div>
        <div className="h-3 w-full bg-gray-200 :bg-gray-700 rounded"></div>
        <div className="h-3 w-1/2 bg-gray-200 :bg-gray-700 rounded"></div>
      </div>
    </div>
  );

  return (
    <section className="w-full px-6 md:px-20 py-16 max-lg:py-12 bg-white relative">
      <div className="absolute inset-0 bg-gradient-to-b from-neutral-50 to-white pointer-events-none"></div>
      
      {/* Heading */}
      <div className="relative flex justify-between mb-8 md:mb-10 items-end">
        <div>
          <p className="text-xs md:text-sm font-bold text-blue-600 mb-1 md:mb-2 uppercase tracking-wider">Trending</p>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-neutral-900 leading-tight">
            Popular Products
          </h2>
        </div>
        <Link 
          to="/browse"
          className="group text-xs md:text-sm font-semibold bg-neutral-900 text-white px-4 py-2 md:px-5 md:py-2.5 rounded-full cursor-pointer flex gap-1 md:gap-2 items-center hover:bg-black transition-colors shadow-md hover:shadow-lg" 
        >
          See All <FaArrowRight className="group-hover:translate-x-1 transition-transform"/>
        </Link>
      </div>

      {/* Horizontal Scroll */}
      <div className="relative w-full overflow-x-auto scrollbar-hide pb-8 -mb-8">
        <div className="flex gap-4 md:gap-6 min-w-max px-2">
          {loading ? (
            Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
          ) : products.length > 0 ? (
            products.map((product) => (
              <Link
                to={`/browse/product/${product._id}`}
                key={product._id}
                className="group flex flex-col relative w-[220px] sm:w-[260px] md:w-[320px] bg-white rounded-2xl shadow-sm border border-neutral-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden"
              >
                <div className="relative h-[220px] sm:h-[260px] md:h-[300px] w-full overflow-hidden bg-neutral-100">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                    style={{ backgroundImage: `url(${product.image})` }}
                  ></div>
                  {/* Subtle overlay on hover */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
                  
                  {/* Campus Badge */}
                  {product?.campus?.name && (
                    <div className="absolute top-3 left-3 md:top-4 md:left-4 bg-white/90 backdrop-blur-sm px-2 md:px-3 py-1 md:py-1.5 rounded-full shadow-sm">
                      <p className="font-semibold text-[9px] md:text-xs text-neutral-800 uppercase tracking-wide">
                        🎓 {product.campus.name}
                      </p>
                    </div>
                  )}
                </div>

                <div className="flex flex-col p-4 md:p-5 bg-white relative">
                  <h3 className="font-bold text-base md:text-lg text-neutral-900 truncate group-hover:text-blue-600 transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-xs md:text-sm text-neutral-500 line-clamp-2 mt-1 mb-3 h-8 md:h-10">
                    {product.description}
                  </p>
                  <div className="flex items-center justify-between border-t border-neutral-100 pt-3 md:pt-4 mt-auto">
                    <p className="text-lg md:text-xl font-extrabold text-neutral-900">
                      ₹{product.price}
                    </p>
                    <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-neutral-100 text-neutral-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
                      <FaArrowRight className="-rotate-45 text-[10px] md:text-xs" />
                    </div>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="text-center mt-10 w-full text-neutral-500">No products found</div>
          )}
        </div>
      </div>
    </section>
  );
};

export default PopularProducts;

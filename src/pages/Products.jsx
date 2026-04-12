// src/pages/Products.jsx
import { Link } from "@tanstack/react-router";
import React, { useEffect, useState } from "react";
import axios from "axios";
import book from "../assets/books.png";
import store from "../assets/store.png";
import all from "../assets/all.png";
import instrument from "../assets/instrument.png";
import coat from "../assets/lab-coat.png";
import menu from "../assets/menu.png";
import { IoSearch } from "react-icons/io5";

const Products = () => {
  const campusId = localStorage.getItem("campusId");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const baseUrl = import.meta.env.VITE_API_URL;

  const categories = [
    { name: "All", image: all },
    { name: "Books", image: book },
    { name: "Gadgets", image: store },
    { name: "Lab Coats", image: coat },
    { name: "Instruments", image: instrument },
    { name: "Others", image: menu },
  ];

  useEffect(() => {
    if (!campusId) return;

    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${baseUrl}/api/products/campus/${campusId}`);

        let data = res.data;
        if (data && data.items) data = data.items;
        else if (data && data.products) data = data.products;
        else if (data && data.data) data = data.data;

        if (Array.isArray(data)) {
          setProducts([...data].reverse());
        } else {
          console.error("fetchProducts returned non-array:", res.data);
          setProducts([]);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [campusId]);

  const campus = localStorage.getItem("campus");

  if (!campusId)
    return <div className="text-center mt-10 font-bold text-neutral-500">No campus selected</div>;

  // Skeleton Loader for Grid
  const SkeletonCard = () => (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm border border-neutral-100 animate-pulse">
      <div className="aspect-square w-full bg-neutral-200"></div>
      <div className="flex flex-1 flex-col p-3 md:p-4 space-y-3">
        <div className="h-4 w-3/4 bg-neutral-200 rounded"></div>
        <div className="h-3 w-full bg-neutral-200 rounded"></div>
        <div className="h-5 w-1/2 bg-neutral-300 rounded mt-auto"></div>
      </div>
    </div>
  );

  const filteredProducts = products.filter(
    (product) =>
      (selectedCategory === "All" || product.category === selectedCategory) &&
      product.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-neutral-50 min-h-screen flex flex-col relative overflow-hidden">
      {/* Decorative gradient */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-100/50 rounded-full mix-blend-multiply blur-[80px] -translate-y-1/2 pointer-events-none"></div>

      <main className="flex-1 relative z-10 pb-20">

        {/* Sticky Header area: Search + Campus */}
        <div className="sticky top-0 z-20 bg-white/90 backdrop-blur-xl border-b border-neutral-200/60 shadow-sm px-4 py-3 md:px-6 lg:px-20">
          <div className="mx-auto w-full max-w-7xl flex flex-col sm:flex-row items-center justify-between gap-3 md:gap-6">
            <div className="flex w-full sm:w-auto flex-col">
              <span className="text-[10px] md:text-xs font-bold text-blue-600 uppercase tracking-widest flex mt-2 mb-2 items-center gap-2">
                <Link to="/browse" className="bg-blue-50 text-blue-600 p-1 rounded-md hover:bg-blue-100 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
                </Link>
                Browsing
              </span>
              <h1 className="font-extrabold text-lg md:text-xl text-neutral-900 truncate">
                {campus}
              </h1>
            </div>

            <div className="w-full sm:w-80 md:w-96 bg-neutral-100 border border-neutral-200 flex items-center px-4 py-2.5 rounded-full focus-within:bg-white focus-within:border-blue-400 focus-within:ring-2 focus-within:ring-blue-100 transition-all">
              <IoSearch className="text-neutral-400 text-lg mr-2" />
              <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-transparent text-sm font-medium outline-none text-neutral-900 placeholder:text-neutral-400"
              />
            </div>
          </div>
        </div>

        <div className="mx-auto w-full max-w-7xl px-3 md:px-6 lg:px-20 mt-4 md:mt-6">

          {/* Categories Bar */}
          <div className="flex gap-3 overflow-x-auto md:flex-wrap scrollbar-hide pb-2 mb-6">
            {categories.map((cat) => (
              <button
                key={cat.name}
                onClick={() => setSelectedCategory(cat.name)}
                className={`flex items-center gap-2 flex-shrink-0 px-4 py-2 rounded-full transition-all duration-300 border shadow-sm ${selectedCategory === cat.name
                  ? "bg-neutral-900 border-neutral-900 text-white shadow-md"
                  : "bg-white border-neutral-200 text-neutral-600 hover:border-neutral-300 hover:bg-neutral-50"
                  }`}
              >
                <img src={cat.image} className="w-5 h-5 object-contain" alt={cat.name} />
                <span className="text-xs sm:text-sm font-bold whitespace-nowrap">{cat.name}</span>
              </button>
            ))}
          </div>

          {/* Heading */}
          <div className="flex justify-between items-end mb-4 md:mb-6 px-1">
            <h2 className="text-xl md:text-3xl font-extrabold text-neutral-900">
              {search ? "Search Results" : "Featured Items"}
            </h2>
            <span className="text-xs font-bold text-neutral-400">{filteredProducts.length} items</span>
          </div>

          {/* Product Grid (Dense mobile, spacious desktop) */}
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 md:gap-5 lg:gap-6">
            {loading ? (
              Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)
            ) : filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <Link
                  to={`/browse/product/${product._id}`}
                  key={product._id}
                  className="group flex flex-col bg-white rounded-2xl shadow-sm border border-neutral-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden"
                >
                  <div className="relative aspect-square w-full overflow-hidden bg-neutral-100">
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                      style={{ backgroundImage: `url(${product.image})` }}
                    ></div>
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300"></div>
                  </div>

                  <div className="flex flex-col p-3 md:p-4 bg-white relative flex-1">
                    <h3 className="font-bold text-sm md:text-base text-neutral-900 truncate group-hover:text-blue-600 transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-[10px] md:text-xs text-neutral-500 line-clamp-2 mt-1 mb-3">
                      {product.description}
                    </p>
                    <div className="mt-auto">
                      <p className="text-base md:text-lg font-extrabold text-neutral-900">
                        ₹{product.price}
                      </p>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <div className="col-span-full py-16 flex flex-col items-center justify-center bg-white rounded-3xl border border-neutral-100 shadow-sm">
                <p className="text-xl font-bold text-neutral-900 mb-2">No items found</p>
                <p className="text-sm font-medium text-neutral-500">Try adjusting your search or category filter.</p>
                <button onClick={() => { setSearch(""); setSelectedCategory("All"); }} className="mt-4 px-6 py-2 bg-neutral-100 text-neutral-900 font-bold rounded-full hover:bg-neutral-200 transition-colors">
                  Clear Filters
                </button>
              </div>
            )}
          </div>

        </div>
      </main>
    </div>
  );
};

export default Products;

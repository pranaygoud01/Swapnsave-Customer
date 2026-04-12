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
        
        // Handle common API wrappings safely
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
    return <div className="text-center mt-10">No campus selected</div>;

  // Skeleton Loader
  const SkeletonCard = () => (
    <div className="group relative flex flex-col overflow-hidden rounded-lg bg-white shadow-sm animate-pulse">
      <div className="aspect-square w-full bg-gray-200"></div>
      <div className="flex flex-1 flex-col p-3 space-y-2">
        <div className="h-4 w-3/4 bg-gray-200 rounded"></div>
        <div className="h-3 w-full bg-gray-200 rounded"></div>
        <div className="h-3 w-1/2 bg-gray-200 rounded"></div>
      </div>
    </div>
  );

  // Filter products
  const filteredProducts = products.filter(
    (product) =>
      (selectedCategory === "All" || product.category === selectedCategory) &&
      product.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-white min-h-screen flex flex-col">
      <main className="flex-1">
        <div className="mx-auto w-full px-4 py-6 sm:px-6 lg:px-20">

          {/* Campus Heading + Search Bar (Sticky) */}
          <div className="mb-4 flex flex-col items-center gap-4 sm:flex-row sm:justify-between sticky top-15 z-20 bg-white py-2">
            <h1 className="font-semibold text-lg text-neutral-900">
               {campus}
            </h1>

            <div className="flex items-center max-lg:w-full gap-2 p-2 rounded-xl border border-neutral-300">
              <IoSearch />
              <input
                type="text"
                placeholder={`Search products of ${campus}`}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full sm:w-64 text-xs outline-0"
              />
            </div>
          </div>

          {/* Categories Bar (Sticky below search) */}
          <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-4 mb-6 sticky lg:top-22 top-38 pt-2 z-10 bg-white">
            {categories.map((cat) => (
              <button
                key={cat.name}
                onClick={() => setSelectedCategory(cat.name)}
                className={`flex flex-col items-center min-w-20 border border-neutral-200 cursor-pointer flex-shrink-0 px-3 py-2 rounded-lg transition ${
                  selectedCategory === cat.name
                    ? "bg-black text-white"
                    : "bg-white text-neutral-500"
                }`}
              >
                
                <span className="text-sm max-lg:text-xs font-medium ">{cat.name}</span>
              </button>
            ))}
          </div>

          {/* Products */}
          <h2 className="mb-6 text-2xl font-bold text-gray-900">
            Featured Items
          </h2>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:gap-6">
            {loading ? (
              Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)
            ) : filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <Link
                  to={`/browse/product/${product._id}`}
                  key={product._id}
                  className="group relative flex flex-col overflow-hidden rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow duration-300"
                >
                  <div
                    className="aspect-square w-full bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
                    style={{ backgroundImage: `url(${product.image})` }}
                  ></div>
                  <div className="flex flex-1 flex-col p-3">
                    <h3 className="font-medium max-lg:text-sm text-gray-900">
                      {product.name}
                    </h3>
                    <p className="text-sm max-lg:text-xs line-clamp-2 text-gray-500">
                      {product.description}
                    </p>
                    <p className="mt-2 text-lg max-lg:text-sm font-semibold text-black">
                      ₹{product.price}
                    </p>
                  </div>
                </Link>
              ))
            ) : (
              <div className="text-center mt-10 col-span-full">
                No products found
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Products;

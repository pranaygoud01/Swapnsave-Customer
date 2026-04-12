// pages/SingleProduct.jsx
import React, { useEffect, useState } from "react";
import { useParams, Link } from "@tanstack/react-router";
import axios from "axios";
import { FaWhatsapp, FaPhone, FaArrowLeft } from "react-icons/fa6";

const baseUrl = import.meta.env.VITE_API_URL;

const SingleProduct = () => {
  const { id } = useParams({ from: "/browse/product/$id" });
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userAvatar, setUserAvatar] = useState("");

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      try {
        const parsedUser = JSON.parse(user);
        setUserAvatar(parsedUser.avatar || "");
      } catch (error) {
        console.error("Failed to parse user data", error);
      }
    }

    axios
      .get(`${baseUrl}/api/products/${id}`)
      .then((res) => {
        let data = res.data;
        if (data && data.item) data = data.item;
        else if (data && data.data) data = data.data;

        setProduct(data);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="bg-neutral-50 min-h-screen pt-4 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-8 animate-pulse mt-8">
          <div className="lg:col-span-3">
            <div className="w-full h-[400px] md:h-[600px] rounded-3xl bg-neutral-200 shadow-sm border border-neutral-100"></div>
          </div>
          <div className="lg:col-span-2 flex flex-col space-y-6 pt-4">
            <div>
              <div className="h-4 w-24 bg-neutral-200 rounded-full mb-6"></div>
              <div className="h-10 w-3/4 bg-neutral-200 rounded-lg mb-4"></div>
              <div className="h-10 w-1/3 bg-neutral-200 rounded-lg"></div>
            </div>
            <div className="space-y-3 mt-8">
              <div className="h-4 w-full bg-neutral-200 rounded"></div>
              <div className="h-4 w-5/6 bg-neutral-200 rounded"></div>
              <div className="h-4 w-2/3 bg-neutral-200 rounded"></div>
            </div>
            <div className="rounded-2xl bg-white border border-neutral-100 p-5 flex items-center gap-4 mt-8">
              <div className="h-14 w-14 rounded-full bg-neutral-200"></div>
              <div className="flex-1 space-y-2">
                <div className="h-4 w-1/2 bg-neutral-200 rounded"></div>
                <div className="h-3 w-1/3 bg-neutral-200 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="bg-neutral-50 min-h-screen flex flex-col items-center justify-center p-6">
        <div className="bg-white p-8 rounded-3xl shadow-sm text-center max-w-md w-full border border-neutral-100">
          <h2 className="text-2xl font-extrabold text-neutral-900 mb-2">Product Not Found</h2>
          <p className="text-neutral-500 mb-6">This item may have been sold or removed by the seller.</p>
          <Link to="/browse" className="inline-flex justify-center items-center w-full bg-neutral-900 text-white font-semibold py-3 px-6 rounded-xl hover:bg-black transition-colors">
            Back to Browse
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-neutral-50 min-h-screen flex flex-col relative overflow-x-hidden">
      {/* Decorative gradient background */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-100 rounded-full mix-blend-multiply filter blur-[100px] opacity-40 translate-x-1/3 -translate-y-1/2 pointer-events-none"></div>

      {/* Embedded Product Header */}
      <header className="fixed top-0 z-50 bg-white backdrop-blur-xl border-b border-neutral-200/60  w-full px-4 sm:px-6 lg:px-20 py-3 flex items-center justify-between transition-all">
        <div className="flex items-center gap-4">
          <Link to="/browse" className="group flex items-center justify-center w-8 h-8 rounded-md p-2 bg-blue-100/80 text-blue-600 hover:bg-blue-200 hover:text-blue-600 transition-all">
            <FaArrowLeft className="group-hover:-translate-x-0.5 transition-transform" />
          </Link>
          <Link to="/" className="flex items-center">
            <img src="/logo.png" alt="Swapnsave" className="h-12 md:h-12 object-contain" onError={(e) => e.target.style.display = 'none'} />
          </Link>
        </div>

        <div className="flex items-center gap-3">
          {userAvatar ? (
            <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-neutral-200/50 shadow-sm bg-neutral-100 flex items-center justify-center">
              <img src={userAvatar} alt="User Menu" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            </div>
          ) : (
            <div className="w-9 h-9 rounded-full bg-neutral-200/80 flex items-center justify-center text-neutral-500 font-bold uppercase border-2 border-white shadow-sm overflow-hidden">
              U
            </div>
          )}
        </div>
      </header>

      <main className="container mx-auto px-4 mt-20 sm:px-6 lg:px-20 py-4 md:py-8 flex-1 relative z-10">
        <div className="max-w-7xl mx-auto">

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-10">

            {/* Hero Image */}
            <div className="lg:col-span-3 h-fit relative rounded-3xl overflow-hidden shadow-xl shadow-neutral-200/50 border border-neutral-200/60 group bg-white">

              {/* Campus Badge */}
              {product.campus?.name && (
                <div className="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full shadow-lg">
                  <p className="font-bold text-[10px] text-neutral-800 uppercase tracking-wide flex items-center gap-1.5">
                    🎓 {product.campus.name}
                  </p>
                </div>
              )}

              <div
                className="w-full h-[280px] sm:h-[400px] lg:h-[500px] bg-contain bg-no-repeat bg-center transition-transform duration-700 group-hover:scale-105"
                style={{
                  backgroundImage: `url(${product.image})`,
                }}
              ></div>

              {/* Subtle gradient overlay at bottom */}
              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/10 to-transparent pointer-events-none"></div>
            </div>

            {/* Details Section */}
            <div className="lg:col-span-2 flex flex-col space-y-4 md:space-y-6 pb-10">

              <div className="bg-white rounded-2xl p-5 md:p-6 shadow-sm border border-neutral-100">
                {product.category && (
                  <span className="inline-block px-3 py-1 bg-blue-50 text-blue-600 text-[10px] sm:text-xs font-bold uppercase tracking-wider rounded-md mb-3 border border-blue-100">
                    {product.category}
                  </span>
                )}

                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-neutral-900 leading-tight">
                  {product.name}
                </h1>

                <div className="mt-3 flex items-end gap-3">
                  <p className="text-3xl sm:text-4xl font-extrabold text-blue-600">
                    ₹{product.price}
                  </p>
                </div>
              </div>

              {/* Description */}
              <div className="bg-white rounded-2xl p-5 md:p-6 shadow-sm border border-neutral-100">
                <h3 className="text-base font-bold text-neutral-900 mb-2">About this item</h3>
                <p className="text-sm md:text-base text-neutral-600 leading-relaxed font-medium">
                  {product.description}
                </p>
              </div>

              {/* Seller Info */}
              <div className="bg-white rounded-2xl p-4 md:p-5 shadow-sm border border-neutral-100 flex items-center gap-4 relative overflow-hidden">
                <div className="absolute right-0 top-0 w-24 h-24 bg-neutral-50 rounded-full translate-x-1/2 -translate-y-1/2"></div>

                <div
                  className="h-12 w-12 rounded-full bg-cover bg-center shadow-inner relative z-10 border border-neutral-200"
                  style={{
                    backgroundImage: `url(${product.seller?.avatar ||
                      `https://ui-avatars.com/api/?name=${encodeURIComponent(product.seller?.name || "User")}`
                      })`,
                  }}
                ></div>
                <div className="relative z-10">
                  <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-0.5">Listed By</p>
                  <p className="font-extrabold text-base text-neutral-900">
                    {product.seller?.name || "Unknown Seller"}
                  </p>
                  {product.seller?.email && (
                    <p className="text-xs font-medium text-neutral-500">
                      {product.seller.email}
                    </p>
                  )}
                </div>
              </div>

              {/* Action Buttons (Desktop Only) */}
              <div className="hidden md:grid grid-cols-2 gap-3 mt-1">
                <a
                  href={`tel:${product?.contact || ""}`}
                  className="group relative flex items-center justify-center gap-2 w-full h-12 bg-neutral-900 text-white rounded-xl shadow-lg border-2 border-neutral-900 hover:bg-black hover:scale-[1.02] active:scale-[0.98] transition-all overflow-hidden"
                >
                  <FaPhone className="text-sm relative z-10" />
                  <span className="font-bold text-sm relative z-10">Buy Now</span>
                  <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </a>

                <a
                  href={`https://wa.me/${product.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative flex items-center justify-center gap-2 w-full h-12 bg-[#25D366] text-white rounded-xl shadow-lg border-2 border-[#25D366] hover:bg-[#20b858] hover:border-[#20b858] hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                  <FaWhatsapp className="text-xl" />
                  <span className="font-bold text-sm">WhatsApp</span>
                </a>
              </div>

              <p className="hidden md:block text-center text-[10px] md:text-xs font-semibold text-neutral-400 mt-1">
                Always meet securely on campus to verify items before paying.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Mobile Fixed Action Bar */}
      <div className="fixed bottom-0 left-0 w-full bg-white/95 backdrop-blur-xl border-t border-neutral-200/60 p-4 shadow-[0_-15px_30px_rgba(0,0,0,0.05)] z-50 md:hidden flex items-center justify-between gap-4 safe-area-bottom">
        <div className="flex flex-col flex-shrink-0">
          <span className="text-[10px] uppercase font-bold text-neutral-400 tracking-wider">Total Price</span>
          <span className="text-2xl font-extrabold text-blue-600 leading-none">₹{product.price}</span>
        </div>

        <div className="flex gap-2 w-full max-w-[220px]">
          <a
            href={`https://wa.me/${product.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-[48px] h-[48px] flex items-center justify-center bg-[#25D366] text-white rounded-[14px] flex-shrink-0 active:scale-95 transition-transform shadow-md"
          >
            <FaWhatsapp size={22} />
          </a>
          <a
            href={`tel:${product?.contact || ""}`}
            className="flex-1 h-[48px] flex items-center justify-center bg-neutral-900 text-white rounded-[14px] font-bold active:scale-95 transition-transform shadow-md gap-2"
          >
            <FaPhone size={12} />
            Buy Now
          </a>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;

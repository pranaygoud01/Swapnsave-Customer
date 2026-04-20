import { Link, useNavigate, useRouter } from "@tanstack/react-router";
import React, { useState, useEffect } from "react";
import { CiSearch } from "react-icons/ci";
import { IoClose, IoMenuOutline } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";
import logo from "../assets/logo.png";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState("");
  const [userAvatar, setUserAvatar] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Search state
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const navigate = useNavigate();
  const router = useRouter();
  const currentPath = router.state.location.pathname;

  const menu = ["Home", "Browse", "About", "Contact"];
  const browseCategories = [
    { name: "All Products", path: "/browse" },
    { name: "2nd Hand Books", path: "/browse/books" },
    { name: "Gadgets", path: "/browse/gadgets" },
    { name: "Projects", path: "/browse/projects" },
    { name: "Notes", path: "/browse/notes" },
  ];

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    if (token && user) {
      setIsAuthenticated(true);
      try {
        const parsedUser = JSON.parse(user);
        setUserName(parsedUser.name || "User");
        setUserAvatar(parsedUser.avatar || "");
      } catch (error) {
        console.error("Invalid user data in localStorage", error);
      }
    }
  }, []);

  const baseUrl = import.meta.env.VITE_API_URL || "https://api.swapnsave.tech";

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchQuery.trim().length > 1) {
        setIsSearching(true);
        axios
          .get(`${baseUrl}/api/products?search=${encodeURIComponent(searchQuery.trim())}`)
          .then((res) => {
            let data = res.data;
            if (data && data.data) data = data.data;
            else if (data && data.items) data = data.items;
            if (Array.isArray(data)) setSearchResults(data);
            else setSearchResults([]);
          })
          .catch((err) => {
            console.error("Search error:", err);
            setSearchResults([]);
          })
          .finally(() => setIsSearching(false));
      } else {
        setSearchResults([]);
      }
    }, 400);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery, baseUrl]);
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsAuthenticated(false);
    setDropdownOpen(false);

    if (window.location.pathname === "/") {
      window.location.reload();
    } else {
      navigate({ to: "/" });
    }
  };

  const onGoogleSuccess = async (tokenResponse) => {
    try {
      const res = await fetch(`${baseUrl}/api/auth/google`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ accessToken: tokenResponse.access_token }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.msg || "Google login failed");
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      setIsAuthenticated(true);
      setUserName(data.user?.name || "User");
      setUserAvatar(data.user?.avatar || "");
      if (currentPath.toLowerCase() === "/sell") {
        navigate({ to: "/sell" });
      }
    } catch (err) {
      alert(err.message);
    }
  };

  const loginWithGoogle = useGoogleLogin({
    onSuccess: onGoogleSuccess,
    onError: () => alert("Google login failed. Try again."),
    scope: "openid email profile",
    ux_mode: "popup",
  });

  if (
    currentPath === "/browse/products" ||
    currentPath === "/browse/products/" ||
    currentPath.startsWith("/browse/product/")
  ) {
    return null;
  }

  return (
    <div className="w-full sticky top-0 z-50 bg-white transition-all duration-300">
      {/* Main Navbar */}
      <div className="px-6 md:px-20 py-4 flex justify-between items-center">
        {/* Left Logo + Menu */}
        <div className="flex items-center gap-6">
          <Link
            to="/"
            className="font-bold text-black max-lg:text-lg text-xl flex items-center gap-1 hover:opacity-80 transition-opacity"
          >
            <img src={logo} className="h-[40px] max-lg:h-[35px] w-auto" alt="SwapnSave Logo - Campus Marketplace" />
          </Link>
        </div>
        {/* Desktop Menu */}
        <div className="hidden md:flex flex-1 ml-6 items-center border-l border-neutral-200 pl-6 gap-1">
          {menu.map((item) => {
            const path = item === "Home" ? "/" : `/${item.toLowerCase()}`;

            if (item === "Browse") {
              return (
                <div key={item} className="relative group">
                  <Link
                    to={path}
                    className="flex items-center gap-1 px-4 py-2  rounded-full text-neutral-500 text-sm hover:text-neutral-900 hover:bg-neutral-100/80 transition-colors"
                  >
                    {item} <IoIosArrowDown className="text-xs group-hover:rotate-180 transition-transform duration-300" />
                  </Link>
                  {/* Hover Dropdown */}
                  <div className="absolute top-full left-0 pt-2 w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                    <div className="bg-white border border-neutral-100 rounded-2xl shadow-xl overflow-hidden py-2">
                      {browseCategories.map((cat) => (
                        <Link
                          key={cat.name}
                          to={cat.path}
                          className="block px-5 py-2.5 text-sm font-semibold text-neutral-600 hover:text-blue-600 hover:bg-blue-50/50 transition-colors"
                        >
                          {cat.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              );
            }

            return (
              <Link
                key={item}
                to={path}
                className="px-4 py-2  rounded-full text-neutral-500 text-sm hover:text-neutral-900 hover:bg-neutral-100/80 transition-colors"
              >
                {item}
              </Link>
            );
          })}
        </div>

        {/* Right Section */}
        <div className="hidden md:flex items-center gap-6 relative">
          <div className="relative w-[300px]">
            <div className="w-full bg-neutral-100/70 border border-neutral-200 flex items-center px-4 py-2.5 rounded-full hover:bg-neutral-100 focus-within:bg-white focus-within:border-blue-400 focus-within:ring-4 focus-within:ring-blue-100/50 transition-all cursor-text">
              <span className="text-neutral-400">
                <CiSearch size={20} />
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setShowSearchDropdown(true)}
                onBlur={() => setTimeout(() => setShowSearchDropdown(false), 200)}
                className="px-2 bg-transparent outline-none text-sm w-full  text-neutral-800 placeholder:text-neutral-400"
                placeholder="Search products, projects, notes..."
              />
            </div>

            {/* Desktop Search Dropdown */}
            {showSearchDropdown && searchQuery.trim().length > 1 && (
              <div className="absolute top-full mt-3 w-full bg-white border border-neutral-100 rounded-3xl shadow-[0_20px_40px_rgba(0,0,0,0.08)] max-h-[350px] overflow-y-auto z-50 py-2">
                {isSearching ? (
                  <div className="px-4 py-6 text-center text-sm  text-neutral-500 animate-pulse">Searching...</div>
                ) : searchResults.length > 0 ? (
                  searchResults.map(product => (
                    <div
                      key={product._id}
                      onMouseDown={() => navigate({ to: `/browse/product/${product._id}` })}
                      className="px-4 py-3 hover:bg-neutral-50 cursor-pointer flex gap-4 items-center border-b border-neutral-50 last:border-0 transition-colors"
                    >
                      <img src={product.image} className="w-12 h-12 rounded-xl object-cover shadow-sm bg-neutral-100 flex-shrink-0" alt="" />
                      <div className="flex flex-col flex-1 overflow-hidden">
                        <span className="text-sm font-bold text-neutral-800 truncate mb-0.5">{product.name}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] font-extrabold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md uppercase">₹{product.price}</span>
                          <span className="text-[10px] uppercase font-bold text-neutral-400 truncate flex-1">{product.category}</span>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="px-4 py-6 text-center flex flex-col justify-center items-center">
                    <span className="text-2xl mb-2 grayscale opacity-50">🔍</span>
                    <span className="text-sm font-medium text-neutral-500">No results found for "{searchQuery}"</span>
                  </div>
                )}
              </div>
            )}
          </div>

          {!isAuthenticated ? (
            <div className="flex gap-2">
              <button
                onClick={() => loginWithGoogle()}
                className="group flex items-center gap-2 bg-neutral-900 border border-neutral-800 text-white px-5 py-2.5 rounded-full text-sm  hover:bg-black hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
              >
                {/* Google logo */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 48 48"
                  className="w-4 h-4 bg-white rounded-full p-0.5"
                >
                  <path
                    fill="#FFC107"
                    d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12
                  s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C33.412,6.053,28.965,4,24,4C12.955,4,4,12.955,4,24
                  s8.955,20,20,20s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                  />
                  <path
                    fill="#FF3D00"
                    d="M6.306,14.691l6.571,4.819C14.655,16.108,19.004,13,24,13c3.059,0,5.842,1.154,7.961,3.039
                  l5.657-5.657C33.412,6.053,28.965,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                  />
                  <path
                    fill="#4CAF50"
                    d="M24,44c4.874,0,9.292-1.851,12.625-4.868l-5.844-4.936C28.711,35.524,26.486,36,24,36
                  c-5.202,0-9.617-3.322-11.278-7.955l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                  />
                  <path
                    fill="#1976D2"
                    d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-3.978,5.612
                  c0.001-0.001,0.002-0.001,0.003-0.002l5.844,4.936C36.947,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                  />
                </svg>
                <span>Sign in with Google</span>
              </button>
            </div>
          ) : (
            <div className="relative">
              <button
                className="flex items-center gap-3 bg-neutral-50 border border-neutral-200 px-3 py-1.5 rounded-full hover:bg-neutral-100 hover:shadow-sm transition-all"
                onClick={() => setDropdownOpen((prev) => !prev)}
              >
                <span className="font-semibold text-xs text-neutral-700">
                  Hey, {userName}
                </span>
                <span className="flex items-center cursor-pointer gap-1">
                  <img
                    src={
                      userAvatar ||
                      "https://ui-avatars.com/api/?name=" +
                      encodeURIComponent(userName)
                    }
                    referrerPolicy="no-referrer"
                    className="w-8 h-8 rounded-full"
                    alt={`${userName} profile picture`}
                  />
                  <IoIosArrowDown className="text-xs" />
                </span>
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 font-semibold w-40 bg-white border border-neutral-200 rounded-lg shadow-lg p-2">
                  <Link
                    to="/dashboard"
                    className="block px-4 py-2 text-xs text-neutral-700 hover:bg-neutral-100 rounded"
                    onClick={(e) => {
                      const token = localStorage.getItem("token");
                      if (!token) {
                        e.preventDefault();
                        alert("Please sign in to open");
                        setDropdownOpen(false);
                        return;
                      }
                      setDropdownOpen(false);
                    }}
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left cursor-pointer px-4 py-2 text-xs text-red-600 hover:bg-neutral-100 rounded"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Hamburger Menu (Mobile) */}
        <div className="md:hidden flex items-center gap-2">
          {isAuthenticated ? (
            <div>
              <img
                src={
                  userAvatar ||
                  "https://ui-avatars.com/api/?name=" +
                  encodeURIComponent(userName)
                }
                referrerPolicy="no-referrer"
                className="w-6 h-6 rounded-full"
                alt={`${userName} profile picture`}
              />
            </div>
          ) : (
            <button
              onClick={() => loginWithGoogle()}
              className="flex items-center gap-1 bg-black text-white px-2 py-1 rounded-md text-xs font-semibold hover:bg-neutral-900"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 48 48"
                className="w-3 h-3"
              >
                <path
                  fill="#FFC107"
                  d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12
                s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C33.412,6.053,28.965,4,24,4C12.955,4,4,12.955,4,24
                s8.955,20,20,20s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                />
                <path
                  fill="#FF3D00"
                  d="M6.306,14.691l6.571,4.819C14.655,16.108,19.004,13,24,13c3.059,0,5.842,1.154,7.961,3.039
                l5.657-5.657C33.412,6.053,28.965,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                />
                <path
                  fill="#4CAF50"
                  d="M24,44c4.874,0,9.292-1.851,12.625-4.868l-5.844-4.936C28.711,35.524,26.486,36,24,36
                c-5.202,0-9.617-3.322-11.278-7.955l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                />
                <path
                  fill="#1976D2"
                  d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-3.978,5.612
                c0.001-0.001,0.002-0.001,0.003-0.002l5.844,4.936C36.947,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                />
              </svg>
              <span>Sign in</span>
            </button>
          )}
          {isAuthenticated && (
            <span className="text-xs font-semibold text-neutral-700">Hey, {userName}</span>
          )}
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <IoClose size={25} /> : <IoMenuOutline size={25} />}
          </button>
        </div>
      </div>






      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="absolute top-[75px] right-4 rounded-2xl w-64 bg-white/95 backdrop-blur-xl border border-neutral-200/60 shadow-2xl p-5 md:hidden z-50">
          
          {/* Menu Items */}
          <div className="flex flex-col gap-2 mb-4 pb-4 border-b border-neutral-100">
            {menu.map((item) => {
              const path = item === "Home" ? "/" : `/${item.toLowerCase()}`;
              const isActive = currentPath === path || (item === "Browse" && currentPath.startsWith("/browse"));

              return (
                <Link
                  key={item}
                  to={path}
                  onClick={() => setMenuOpen(false)}
                  className={`font-semibold text-sm py-2 px-3 rounded-lg transition-colors ${isActive ? "bg-blue-50 text-blue-600" : "text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900"}`}
                >
                  {item}
                </Link>
              );
            })}
          </div>

          {!isAuthenticated ? (
            <div className="flex flex-col gap-2">
              <button
                onClick={() => {
                  loginWithGoogle();
                  setMenuOpen(false);
                }}
                className="w-full text-center flex items-center justify-center gap-2 font-bold text-white bg-neutral-900 hover:bg-black rounded-full px-5 py-3 text-sm transition-all shadow-md"
              >
                Continue with Google
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3 pb-3 border-b border-neutral-100">
                <img
                  src={
                    userAvatar ||
                    "https://ui-avatars.com/api/?name=" +
                    encodeURIComponent(userName)
                  }
                  className="w-10 h-10 rounded-full border border-neutral-200"
                  alt={`${userName} profile picture`}
                />
                <div className="flex flex-col">
                  <span className="font-bold text-sm text-neutral-900 truncate max-w-[140px]">
                    {userName}
                  </span>
                  <span className="text-[10px] text-green-600 font-bold uppercase tracking-widest">Online</span>
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <Link
                  to="/dashboard"
                  className="font-bold text-neutral-600 text-sm py-2 px-3 rounded-lg hover:bg-neutral-100 hover:text-neutral-900 transition-colors"
                  onClick={() => setMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setMenuOpen(false);
                  }}
                  className="text-left font-bold text-red-500 text-sm py-2 px-3 rounded-lg hover:bg-red-50 hover:text-red-700 transition-colors"
                >
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default NavBar;

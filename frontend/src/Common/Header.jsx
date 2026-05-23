import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../Features/auth/authSlice";
import { HiOutlineShoppingBag, HiMenu, HiX } from "react-icons/hi";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    setIsMenuOpen(false);
    navigate("/");
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // 1. Added sticky top and backdrop blur for a premium glass effect
  return (
    <header className="sticky top-0 w-full bg-black/90 backdrop-blur-md text-stone-200 border-b border-[#D4AF37]/20 shadow-xl z-50">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-5 flex items-center justify-between">
        
        {/* LEFT - LOGO */}
        <div className="text-2xl md:text-3xl font-serif font-light text-white tracking-[0.15em] uppercase z-50 flex items-center">
          <Link to="/" onClick={closeMenu} className="group flex items-center">
            LUXE <span className="text-[#D4AF37] ml-2 font-medium">WATCHES</span>
          </Link>
        </div>

        {/* DESKTOP NAV & AUTH (Hidden on Mobile) */}
        <div className="hidden md:flex items-center space-x-10 text-sm font-sans tracking-widest uppercase">
          
          <nav className="flex items-center space-x-8">
            <Link to="/" className="relative group text-stone-300 hover:text-white transition-colors duration-300">
              Home
              <span className="absolute -bottom-1.5 left-0 w-0 h-[1px] bg-[#D4AF37] transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link to="/shop" className="relative group text-stone-300 hover:text-white transition-colors duration-300">
              Shop
              <span className="absolute -bottom-1.5 left-0 w-0 h-[1px] bg-[#D4AF37] transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link to="/about" className="relative group text-stone-300 hover:text-white transition-colors duration-300">
              About
              <span className="absolute -bottom-1.5 left-0 w-0 h-[1px] bg-[#D4AF37] transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </nav>

          {/* Subtle Divider */}
          <div className="h-5 w-[1px] bg-stone-700"></div>

          {/* 🛒 Cart */}
          <Link to="/cart" className="relative text-stone-300 hover:text-[#D4AF37] transition-all duration-300 hover:scale-110 flex items-center">
            <HiOutlineShoppingBag className="text-2xl" />
          </Link>

          {/* Auth Section */}
          <div className="flex items-center space-x-6">
            {isAuthenticated ? (
              <>
                <span className="text-[#D4AF37] tracking-wider capitalize">
                  Hi, {user?.name || "Guest"}
                </span>
                <Link to="/profile" className="text-stone-300 hover:text-white transition-colors duration-300">
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="border border-[#D4AF37]/50 text-[#D4AF37] px-6 py-2 text-xs font-medium tracking-widest hover:bg-[#D4AF37] hover:text-black transition-all duration-300"
                >
                  LOGOUT
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-stone-300 hover:text-white transition-colors duration-300">
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-[#D4AF37] text-black px-6 py-2 text-xs font-medium tracking-widest hover:bg-white transition-colors duration-300 shadow-[0_0_15px_rgba(212,175,55,0.1)] hover:shadow-[0_0_15px_rgba(255,255,255,0.3)]"
                >
                  REGISTER
                </Link>
              </>
            )}
          </div>
        </div>

        {/* MOBILE CONTROLS (Cart & Hamburger Menu) */}
        <div className="md:hidden flex items-center space-x-6 z-50">
          <Link to="/cart" className="text-stone-300 hover:text-[#D4AF37] transition-colors duration-300" onClick={closeMenu}>
            <HiOutlineShoppingBag className="text-2xl" />
          </Link>
          <button 
            onClick={toggleMenu} 
            className="text-stone-300 focus:outline-none hover:text-[#D4AF37] transition-colors"
          >
            {isMenuOpen ? <HiX className="text-3xl" /> : <HiMenu className="text-3xl" />}
          </button>
        </div>
      </div>

      {/* MOBILE DROPDOWN MENU */}
      <div 
        className={`md:hidden absolute top-full left-0 w-full bg-black/95 backdrop-blur-xl border-b border-[#D4AF37]/20 transition-all duration-500 ease-in-out overflow-hidden flex flex-col items-center uppercase text-sm tracking-widest font-sans ${
          isMenuOpen ? "max-h-[500px] opacity-100 py-8 space-y-6" : "max-h-0 opacity-0 py-0 space-y-0"
        }`}
      >
        <Link to="/" onClick={closeMenu} className="text-stone-300 hover:text-[#D4AF37] transition-colors duration-300 w-full text-center">
          Home
        </Link>
        <Link to="/shop" onClick={closeMenu} className="text-stone-300 hover:text-[#D4AF37] transition-colors duration-300 w-full text-center">
          Shop
        </Link>
        <Link to="/about" onClick={closeMenu} className="text-stone-300 hover:text-[#D4AF37] transition-colors duration-300 w-full text-center">
          About
        </Link>
        
        <div className="w-16 h-[1px] bg-stone-700 my-4"></div>

        {isAuthenticated ? (
          <>
            <span className="text-[#D4AF37] w-full text-center capitalize">
              Hi, {user?.name || "Guest"}
            </span>
            <Link to="/profile" onClick={closeMenu} className="text-stone-300 hover:text-[#D4AF37] transition-colors duration-300 w-full text-center">
              Profile
            </Link>
            <button
              onClick={handleLogout}
              className="border border-[#D4AF37]/50 text-[#D4AF37] px-8 py-2.5 mt-2 hover:bg-[#D4AF37] hover:text-black transition-all duration-300 inline-block"
            >
              LOGOUT
            </button>
          </>
        ) : (
          <div className="flex flex-col space-y-5 w-full items-center px-8">
            <Link to="/login" onClick={closeMenu} className="text-stone-300 hover:text-[#D4AF37] transition-colors duration-300">
              Login
            </Link>
            <Link 
              to="/register" 
              onClick={closeMenu}
              className="bg-[#D4AF37] text-black w-full max-w-[200px] text-center px-8 py-3 hover:bg-white transition-colors duration-300"
            >
              REGISTER
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
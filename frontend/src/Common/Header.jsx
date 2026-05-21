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
    setIsMenuOpen(false); // Close mobile menu on logout
    navigate("/");
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-black text-gray-200 border-b border-[#D4AF37]/30 shadow-md relative z-50">
      <div className="px-6 md:px-8 py-5 flex items-center justify-between">
        
        {/* LEFT - LOGO */}
        <div className="text-2xl md:text-3xl font-serif font-bold text-[#D4AF37] tracking-widest uppercase z-50">
          <Link to="/" onClick={closeMenu}>LUXE WATCHES</Link>
        </div>

        {/* DESKTOP NAV & AUTH (Hidden on Mobile) */}
        <div className="hidden md:flex items-center space-x-8 font-medium tracking-wide">
          
          <nav className="flex items-center space-x-8">
            <Link to="/" className="hover:text-[#D4AF37] transition-colors duration-300">
              Home
            </Link>
            <Link to="/shop" className="hover:text-[#D4AF37] transition-colors duration-300">
              Shop
            </Link>
            <Link to="/about" className="hover:text-[#D4AF37] transition-colors duration-300">
              About
            </Link>
          </nav>

          <div className="h-6 w-px bg-gray-700"></div>

          {/* 🛒 Cart */}
          <Link to="/cart" className="hover:text-[#D4AF37] transition-colors duration-300 flex items-center">
            <HiOutlineShoppingBag className="text-2xl" />
          </Link>

          {/* Auth Section */}
          <div className="flex items-center space-x-6">
            {isAuthenticated ? (
              <>
                <span className="text-[#D4AF37] tracking-wider">
                  Hi, {user?.name || "Guest"}
                </span>
                <Link to="/profile" className="hover:text-[#D4AF37] transition-colors duration-300">
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="border border-[#D4AF37] text-[#D4AF37] px-5 py-1.5 rounded-sm font-semibold hover:bg-[#D4AF37] hover:text-black transition-all duration-300"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="hover:text-[#D4AF37] transition-colors duration-300">
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-[#D4AF37] text-black px-6 py-2 rounded-sm font-semibold hover:bg-[#b5952f] transition-colors duration-300"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>

        {/* MOBILE CONTROLS (Cart & Hamburger Menu) */}
        <div className="md:hidden flex items-center space-x-5 z-50">
          <Link to="/cart" className="hover:text-[#D4AF37] transition-colors duration-300" onClick={closeMenu}>
            <HiOutlineShoppingBag className="text-2xl" />
          </Link>
          <button 
            onClick={toggleMenu} 
            className="text-[#D4AF37] focus:outline-none hover:text-[#b5952f] transition-colors"
          >
            {isMenuOpen ? <HiX className="text-3xl" /> : <HiMenu className="text-3xl" />}
          </button>
        </div>
      </div>

      {/* MOBILE DROPDOWN MENU */}
      <div 
        className={`md:hidden absolute top-full left-0 w-full bg-black border-b border-[#D4AF37]/30 transition-all duration-300 ease-in-out ${
          isMenuOpen ? "opacity-100 visible h-auto py-6 flex flex-col" : "opacity-0 invisible h-0 py-0"
        } items-center space-y-6 font-medium tracking-wide`}
      >
        <Link to="/" onClick={closeMenu} className="hover:text-[#D4AF37] transition-colors duration-300 w-full text-center">
          Home
        </Link>
        <Link to="/shop" onClick={closeMenu} className="hover:text-[#D4AF37] transition-colors duration-300 w-full text-center">
          Shop
        </Link>
        <Link to="/about" onClick={closeMenu} className="hover:text-[#D4AF37] transition-colors duration-300 w-full text-center">
          About
        </Link>
        
        <div className="w-24 h-px bg-gray-700 my-2"></div>

        {isAuthenticated ? (
          <>
            <span className="text-[#D4AF37] tracking-wider w-full text-center">
              Hi, {user?.name || "Guest"}
            </span>
            <Link to="/profile" onClick={closeMenu} className="hover:text-[#D4AF37] transition-colors duration-300 w-full text-center">
              Profile
            </Link>
            <button
              onClick={handleLogout}
              className="border border-[#D4AF37] text-[#D4AF37] px-8 py-2 rounded-sm font-semibold hover:bg-[#D4AF37] hover:text-black transition-all duration-300 inline-block"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" onClick={closeMenu} className="hover:text-[#D4AF37] transition-colors duration-300 w-full text-center">
              Login
            </Link>
            <Link 
              to="/register" 
              onClick={closeMenu}
              className="bg-[#D4AF37] text-black px-8 py-2 rounded-sm font-semibold hover:bg-[#b5952f] transition-colors duration-300 inline-block"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </header>
  );
}
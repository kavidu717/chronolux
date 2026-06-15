import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../Features/auth/authSlice";
import { HiOutlineShoppingBag, HiMenu, HiX, HiChevronDown, HiUserCircle } from "react-icons/hi";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    setIsMenuOpen(false);
    setIsProfileOpen(false);
    navigate("/");
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => {
    setIsMenuOpen(false);
    setIsProfileOpen(false);
  };

  return (
    <header className="sticky top-0 w-full bg-black/90 backdrop-blur-md text-stone-200 border-b border-[#D4AF37]/20 shadow-xl z-50">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-5 flex items-center justify-between">
        
        {/* LOGO */}
        <div className="text-2xl md:text-3xl font-serif font-light text-white tracking-[0.15em] uppercase z-50">
          <Link to="/" onClick={closeMenu} className="flex items-center">
            LUXE <span className="text-[#D4AF37] ml-2 font-medium">WATCHES</span>
          </Link>
        </div>

        {/* DESKTOP NAV */}
        <div className="hidden md:flex items-center space-x-10 text-sm font-sans tracking-widest uppercase">
          <nav className="flex items-center space-x-8">
            <Link to="/" className="text-stone-300 hover:text-white transition-colors">Home</Link>
            <Link to="/shop" className="text-stone-300 hover:text-white transition-colors">Shop</Link>
            <Link to="/about" className="text-stone-300 hover:text-white transition-colors">About</Link>
          </nav>

          <div className="h-5 w-[1px] bg-stone-700"></div>

          <Link to="/cart" className="text-stone-300 hover:text-[#D4AF37] transition-all duration-300 hover:scale-110">
            <HiOutlineShoppingBag className="text-2xl" />
          </Link>

          {/* AUTH / PROFILE */}
          <div className="relative flex items-center space-x-6">
            {isAuthenticated ? (
              <div className="relative">
                <button 
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center gap-2 text-stone-300 hover:text-[#D4AF37] transition-colors"
                >
                  <HiUserCircle className="text-3xl" />
                  <HiChevronDown className={`transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {isProfileOpen && (
                  <div className="absolute right-0 top-full mt-3 w-48 bg-[#0a0a0a] border border-[#D4AF37]/30 shadow-2xl py-2 z-50 rounded-sm">
                    <div className="px-6 py-2 text-[#D4AF37] text-xs uppercase tracking-widest border-b border-[#D4AF37]/10 mb-1">
                      {user?.name || "User"}
                    </div>
                    <Link to="/profile" onClick={closeMenu} className="block px-6 py-2 hover:bg-[#D4AF37]/10 hover:text-[#D4AF37] transition-colors">Profile</Link>
                    <Link to="/my-orders" onClick={closeMenu} className="block px-6 py-2 hover:bg-[#D4AF37]/10 hover:text-[#D4AF37] transition-colors">Bookings</Link>
                    <button onClick={handleLogout} className="block w-full text-left px-6 py-2 text-red-400 hover:bg-red-900/20 transition-colors">Logout</button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link to="/login" className="text-stone-300 hover:text-white transition-colors">Login</Link>
                <Link to="/register" className="bg-[#db6115] text-black px-6 py-2 text-xs font-medium tracking-widest hover:bg-white transition-colors">REGISTER</Link>
              </>
            )}
          </div>
        </div>

        {/* MOBILE CONTROLS */}
        <div className="md:hidden flex items-center space-x-6 z-50">
          <Link to="/cart" onClick={closeMenu}><HiOutlineShoppingBag className="text-2xl" /></Link>
          <button onClick={toggleMenu} className="text-stone-300 text-3xl">
            {isMenuOpen ? <HiX /> : <HiMenu />}
          </button>
        </div>
      </div>

      {/* MOBILE DROPDOWN */}
      <div className={`md:hidden absolute top-full left-0 w-full bg-black/95 backdrop-blur-xl border-b border-[#D4AF37]/20 overflow-hidden flex flex-col items-center space-y-6 transition-all duration-500 ${isMenuOpen ? "max-h-[500px] py-8" : "max-h-0 py-0"}`}>
        <Link to="/" onClick={closeMenu} className="text-stone-300">Home</Link>
        <Link to="/shop" onClick={closeMenu} className="text-stone-300">Shop</Link>
        
        {isAuthenticated ? (
          <div className="relative flex flex-col items-center w-full">
            <button 
              onClick={() => setIsProfileOpen(!isProfileOpen)} 
              className="flex items-center gap-2 text-[#D4AF37] border border-[#D4AF37] px-6 py-2 rounded-sm"
            >
              <HiUserCircle className="text-2xl" /> ACCOUNT
            </button>
            
            {isProfileOpen && (
              <div className="flex flex-col items-center mt-4 space-y-4 bg-[#111] w-full py-4">
                <Link to="/profile" onClick={closeMenu} className="text-stone-300">Profile</Link>
                <Link to="/my-orders" onClick={closeMenu} className="text-stone-300">Bookings</Link>
                <button onClick={handleLogout} className="text-red-400">Logout</button>
              </div>
            )}
          </div>
        ) : (
          <Link to="/login" onClick={closeMenu} className="text-stone-300">Login</Link>
        )}
      </div>
    </header>
  );
}
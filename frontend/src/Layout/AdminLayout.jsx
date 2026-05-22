import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet, Link, useNavigate } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi";
import { logout } from "../Features/auth/authSlice";


export default function AdminDashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  

  
  if (!user || user.role !== "admin") {
    return <Navigate to="/" />;
  }

  const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMenu = () => setIsMobileMenuOpen(false);
  const handleLogout = () => {
    dispatch(logout());
    closeMenu();
    navigate("/login");
  };

 

  return (
    <div className="flex h-screen bg-black font-sans text-gray-200 overflow-hidden">
      
      {/* ================= MOBILE OVERLAY ================= */}
      {/* Darkens the background when the sidebar is open on small screens */}
      {isMobileMenuOpen && (
        <div 
          onClick={closeMenu}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 md:hidden transition-opacity duration-300"
        ></div>
      )}

      {/* ================= SIDEBAR ================= */}
      <aside 
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#0a0a0a] border-r border-[#D4AF37]/30 flex flex-col shadow-[4px_0_24px_rgba(0,0,0,0.5)] transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Admin Brand Header */}
        <div className="h-20 md:h-24 flex items-center justify-between md:justify-center px-6 md:px-0 border-b border-gray-800 shrink-0">
          <h1 className="text-[#D4AF37] font-serif text-xl md:text-2xl tracking-widest uppercase font-bold drop-shadow-md text-center">
            Luxe<span className="hidden md:inline"><br/></span> <span className="md:hidden">Admin</span>
            <span className="hidden md:inline">Admin</span>
          </h1>
          
          {/* Mobile Close Button */}
          <button onClick={closeMenu} className="md:hidden text-gray-400 hover:text-[#D4AF37] transition-colors">
            <HiX className="text-2xl" />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 flex flex-col gap-2 p-6 overflow-y-auto">
          <p className="text-xs text-gray-500 uppercase tracking-[0.2em] font-bold mb-4">
            Management
          </p>

          <Link 
            to="/admin"
            onClick={closeMenu}
            className="px-4 py-3 text-sm tracking-widest uppercase font-medium rounded-sm border-l-2 border-transparent text-gray-400 hover:border-[#D4AF37] hover:text-[#D4AF37] hover:bg-white/5 transition-all duration-300"
          >
            Dashboard
          </Link>
          
          <Link 
            to="/admin/users"
            onClick={closeMenu}
            className="px-4 py-3 text-sm tracking-widest uppercase font-medium rounded-sm border-l-2 border-transparent text-gray-400 hover:border-[#D4AF37] hover:text-[#D4AF37] hover:bg-white/5 transition-all duration-300"
          >
            Users
          </Link>
          
          <Link 
            to="/admin/products"
            onClick={closeMenu}
            className="px-4 py-3 text-sm tracking-widest uppercase font-medium rounded-sm border-l-2 border-transparent text-gray-400 hover:border-[#D4AF37] hover:text-[#D4AF37] hover:bg-white/5 transition-all duration-300"
          >
            Products
          </Link>
          
          <Link 
            to="/admin/orders"
            onClick={closeMenu}
            className="px-4 py-3 text-sm tracking-widest uppercase font-medium rounded-sm border-l-2 border-transparent text-gray-400 hover:border-[#D4AF37] hover:text-[#D4AF37] hover:bg-white/5 transition-all duration-300"
          >
            Orders
          </Link>
          
          <Link 
            to="/admin/charts"
            onClick={closeMenu}
            className="px-4 py-3 text-sm tracking-widest uppercase font-medium rounded-sm border-l-2 border-transparent text-gray-400 hover:border-[#D4AF37] hover:text-[#D4AF37] hover:bg-white/5 transition-all duration-300"
          >
            Charts
          </Link>
        </nav>

        {/* Admin Footer / User Info */}
        <div className="p-6 border-t border-gray-800 bg-black/50 shrink-0">
          <div className="flex items-center gap-4">
            {/* Minimalist Avatar */}
            <div className="w-10 h-10 rounded-sm bg-[#D4AF37] flex items-center justify-center text-black font-bold uppercase text-lg shadow-[0_0_10px_rgba(212,175,55,0.3)]">
              {user?.name?.charAt(0) || "A"}
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold text-gray-200 tracking-wide line-clamp-1">
                {user?.name || "Admin"}
              </span>
              <span className="text-xs text-[#D4AF37] uppercase tracking-wider">
                System Admin
              </span>
              <div>
                <button 
                onClick={handleLogout}
                className="text-xs text-gray-400 hover:text-[#D4AF37] transition-colors">
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* ================= MAIN CONTENT WRAPPER ================= */}
      <div className="flex-1 flex flex-col w-full h-full">
        
        {/* Mobile Top Bar */}
        <header className="md:hidden flex items-center justify-between bg-[#0a0a0a] border-b border-[#D4AF37]/30 p-5 shrink-0 z-30 shadow-md">
          <div className="flex items-center gap-3">
            <button 
              onClick={toggleMenu} 
              className="text-[#D4AF37] focus:outline-none hover:text-[#b5952f] transition-colors"
            >
              <HiMenu className="text-3xl" />
            </button>
            <h1 className="text-[#D4AF37] font-serif text-lg tracking-widest uppercase font-bold">
              Luxe Admin
            </h1>
          </div>
          
          {/* Mobile Mini Avatar */}
          <div className="w-8 h-8 rounded-sm bg-[#D4AF37] flex items-center justify-center text-black font-bold uppercase text-sm">
            {user?.name?.charAt(0) || "A"}
          </div>
        </header>

        {/* Main Content Area (Scrollable) */}
        <main className="flex-1 bg-black overflow-y-auto">
          <div className="p-6 md:p-12">
            {/* Nested routes will render here */}
            <Outlet />
          </div>
        </main>

      </div>
      
    </div>
  );
}

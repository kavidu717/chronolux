import { useSelector } from "react-redux";
import { Navigate, Outlet, Link } from "react-router-dom";

export default function AdminDashboard() {
  const { user } = useSelector((state) => state.auth);


  if (!user || user.role !== "admin") {
    return <Navigate to="/" />;
  }

  return (
    <div className="flex min-h-screen bg-black font-sans text-gray-200">
      
      
      <aside className="w-64 flex-shrink-0 bg-[#0a0a0a] border-r border-[#D4AF37]/30 flex flex-col shadow-[4px_0_24px_rgba(0,0,0,0.5)] z-10">
        
        {/* Admin Brand Header */}
        <div className="h-24 flex items-center justify-center border-b border-gray-800">
          <h1 className="text-[#D4AF37] font-serif text-2xl tracking-widest uppercase font-bold drop-shadow-md text-center">
            Luxe<br/>Admin
          </h1>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 flex flex-col gap-2 p-6">
          <p className="text-xs text-gray-500 uppercase tracking-[0.2em] font-bold mb-4">
            Management
          </p>
          
          <Link 
            to="/admin/users"
            className="px-4 py-3 text-sm tracking-widest uppercase font-medium rounded-sm border-l-2 border-transparent text-gray-400 hover:border-[#D4AF37] hover:text-[#D4AF37] hover:bg-white/5 transition-all duration-300"
          >
            Users
          </Link>
          
          <Link 
            to="/admin/products"
            className="px-4 py-3 text-sm tracking-widest uppercase font-medium rounded-sm border-l-2 border-transparent text-gray-400 hover:border-[#D4AF37] hover:text-[#D4AF37] hover:bg-white/5 transition-all duration-300"
          >
            Products
          </Link>
          
          <Link 
            to="/admin/orders"
            className="px-4 py-3 text-sm tracking-widest uppercase font-medium rounded-sm border-l-2 border-transparent text-gray-400 hover:border-[#D4AF37] hover:text-[#D4AF37] hover:bg-white/5 transition-all duration-300"
          >
            Orders
          </Link>
          
          <Link 
            to="/admin/charts"
            className="px-4 py-3 text-sm tracking-widest uppercase font-medium rounded-sm border-l-2 border-transparent text-gray-400 hover:border-[#D4AF37] hover:text-[#D4AF37] hover:bg-white/5 transition-all duration-300"
          >
            Charts
          </Link>
        </nav>

        
        <div className="p-6 border-t border-gray-800 bg-black/50">
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
            </div>
          </div>
        </div>
      </aside>

      
      <main className="flex-1 bg-black overflow-y-auto">
        <div className="p-8 md:p-12">
         
          <Outlet />
        </div>
      </main>
      
    </div>
  );
}
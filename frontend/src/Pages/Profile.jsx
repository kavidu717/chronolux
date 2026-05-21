import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfile, logout } from "../Features/auth/authSlice";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, loading } = useSelector((state) => state.auth);

  // 🟢 LOAD PROFILE
  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  // 🚪 LOGOUT
  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  // 🟢 LOADING
  if (loading) {
    return (
      <div className="min-h-[calc(100vh-80px)] bg-black flex justify-center items-center">
        <p className="text-[#D4AF37] animate-pulse text-xl font-serif tracking-widest uppercase">
          Loading Profile...
        </p>
      </div>
    );
  }

  return (
    /* Changed items-start to items-center to perfectly center the card on the full screen */
    <div className="min-h-[calc(100vh-80px)] bg-black text-gray-200 py-12 px-6 flex justify-center items-center">
      
      <div className="w-full max-w-3xl">
        <h1 className="text-3xl md:text-4xl font-serif font-bold text-[#D4AF37] tracking-widest uppercase mb-10 text-center">
          My Account
        </h1>

        <div className="bg-[#0a0a0a] border border-[#D4AF37]/30 p-8 md:p-12 rounded-sm shadow-2xl">
          
          {/* ================= PROFILE TOP ================= */}
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-12">
            
            {/* IMAGE */}
            <div className="relative group flex-shrink-0">
              <div className="absolute inset-0 rounded-full border border-[#D4AF37]/50 scale-110 group-hover:scale-105 transition-transform duration-500"></div>
              <img
                src={
                  user?.profilePic ||
                  "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                }
                alt="Profile"
                className="w-32 h-32 md:w-40 md:h-40 rounded-full border-2 border-[#D4AF37] p-1 object-cover shadow-[0_0_15px_rgba(212,175,55,0.2)] bg-black"
              />
            </div>

            {/* INFO */}
            <div className="flex flex-col items-center md:items-start text-center md:text-left w-full pt-2">
              <p className="uppercase tracking-[0.2em] text-[#D4AF37] text-xs font-bold mb-2">
                Member Profile
              </p>
              
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-100 mb-2">
                {user?.name || "Guest User"}
              </h2>
              
              <p className="text-gray-400 text-sm tracking-wide mb-6">
                {user?.email || "No email provided"}
              </p>
              
              <div className="inline-flex items-center gap-2 border border-gray-800 px-4 py-1.5 rounded-sm bg-black/50">
                <span className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]"></span>
                <span className="uppercase text-gray-300 tracking-widest text-xs font-bold">
                  Active Account
                </span>
              </div>
            </div>

          </div>

          <div className="w-full h-px bg-gray-800 my-10"></div>

          {/* ================= BUTTONS ================= */}
          <div className="grid md:grid-cols-2 gap-6">
            
            {/* ORDERS */}
            <button
              onClick={() => navigate("/my-orders")}
              className="w-full border border-[#D4AF37] text-[#D4AF37] py-4 rounded-sm font-bold uppercase tracking-widest hover:bg-[#D4AF37] hover:text-black transition-all duration-300"
            >
              View My Orders
            </button>

            {/* LOGOUT */}
            <button
              onClick={handleLogout}
              className="w-full border border-red-900/50 text-red-500 py-4 rounded-sm font-bold uppercase tracking-widest hover:bg-red-950/40 hover:border-red-500 transition-all duration-300"
            >
              Sign Out
            </button>

          </div>

        </div>
      </div>
    </div>
  );
}
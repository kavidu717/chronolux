import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../Features/admin/adminSlice.js";

export default function AdminUsers() {
  const dispatch = useDispatch();

  const { users, loading, error } = useSelector((state) => state.admin);

  // 🟢 FETCH USERS
  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  // 🟢 LOADING
  if (loading) {
    return (
      <div className="h-full flex justify-center items-center py-20">
        <p className="text-[#D4AF37] animate-pulse text-xl font-serif tracking-widest uppercase">
          Loading Users...
        </p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="mb-8 border-b border-gray-800 pb-4">
        <h1 className="text-2xl md:text-3xl font-serif font-bold text-[#D4AF37] tracking-widest uppercase">
          User Management
        </h1>
        <p className="text-gray-500 text-sm tracking-wide mt-2">
          View and manage all registered accounts.
        </p>
      </div>

      {/* ERROR */}
      {error && (
        <div className="bg-red-950/40 border border-red-500/50 text-red-200 p-4 rounded-sm mb-6 text-sm">
          {error}
        </div>
      )}

      {/* TABLE CARD CONTAINER */}
      <div className="bg-[#0a0a0a] border border-[#D4AF37]/30 rounded-sm shadow-2xl overflow-hidden">
        
        {/* MOBILE RESPONSIVE WRAPPER */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[600px]">
            
            <thead className="bg-black border-b border-gray-800 text-xs uppercase tracking-widest text-gray-500">
              <tr>
                <th className="p-5 font-bold">Name</th>
                <th className="p-5 font-bold">Email</th>
                <th className="p-5 font-bold text-center">Role</th>
                <th className="p-5 font-bold text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-800">
              {users.map((user) => (
                <tr
                  key={user._id}
                  className="hover:bg-white/5 transition-colors duration-300"
                >
                  
                  {/* NAME */}
                  <td className="p-5 whitespace-nowrap">
                    <span className="text-gray-200 font-medium">
                      {user.name}
                    </span>
                  </td>

                  {/* EMAIL */}
                  <td className="p-5 whitespace-nowrap text-gray-400">
                    {user.email}
                  </td>

                  {/* ROLE BADGE */}
                  <td className="p-5 whitespace-nowrap text-center">
                    <span
                      className={`inline-block px-3 py-1 rounded-sm text-xs font-bold uppercase tracking-widest border ${
                        user.role === "admin"
                          ? "bg-[#D4AF37]/10 text-[#D4AF37] border-[#D4AF37]/50"
                          : "bg-gray-900 text-gray-400 border-gray-700"
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>

                  {/* ACTIONS (BLOCK BUTTON) */}
                  <td className="p-5 whitespace-nowrap text-right">
                    {/* Hide the block button if the user is an admin to prevent locking yourself out */}
                    {user.role !== "admin" && (
                      <button 
                        className="text-xs text-red-500 hover:text-red-400 border border-red-900/50 hover:border-red-500 px-4 py-1.5 rounded-sm uppercase tracking-widest transition-all duration-300"
                      >
                        Block
                      </button>
                    )}
                  </td>

                </tr>
              ))}
            </tbody>

          </table>
        </div>
        
        {/* EMPTY STATE */}
        {users.length === 0 && !loading && (
          <div className="p-10 text-center text-gray-500 tracking-widest uppercase text-sm">
            No users found.
          </div>
        )}

      </div>
    </div>
  );
}
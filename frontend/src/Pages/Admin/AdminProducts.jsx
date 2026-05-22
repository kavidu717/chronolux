import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAdminProducts } from "../../Features/admin/adminProductSlice.js";

export default function AdminProducts() {
  const dispatch = useDispatch();

  const { products, loading, error } = useSelector(
    (state) => state.adminProducts
  );

  // 🟢 FETCH PRODUCTS
  useEffect(() => {
    dispatch(getAdminProducts());
  }, [dispatch]);

  // 🟢 LOADING
  if (loading) {
    return (
      <div className="h-full flex justify-center items-center py-20">
        <p className="text-[#D4AF37] animate-pulse text-xl font-serif tracking-widest uppercase">
          Loading Inventory...
        </p>
      </div>
    );
  }

  return (
    <div className="w-full">
      
      {/* TITLE & HEADER ACTION */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 border-b border-gray-800 pb-4 gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-serif font-bold text-[#D4AF37] tracking-widest uppercase">
            Product Management
          </h1>
          <p className="text-gray-500 text-sm tracking-wide mt-2">
            View, edit, and manage your luxury timepiece inventory.
          </p>
        </div>
        
        <button className="bg-[#D4AF37] text-black px-6 py-2.5 rounded-sm font-bold uppercase tracking-widest text-xs hover:bg-[#b5952f] transition-all shadow-[0_0_10px_rgba(212,175,55,0.2)] whitespace-nowrap w-fit">
          + Add Product
        </button>
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
          <table className="w-full text-left border-collapse min-w-[900px]">
            
            <thead className="bg-black border-b border-gray-800 text-xs uppercase tracking-widest text-gray-500">
              <tr>
                <th className="p-5 font-bold">Image</th>
                <th className="p-5 font-bold">Name</th>
                <th className="p-5 font-bold text-center">Brand</th>
                <th className="p-5 font-bold text-center">Category</th>
                <th className="p-5 font-bold text-right">Price</th>
                <th className="p-5 font-bold text-center">Status</th>
                <th className="p-5 font-bold text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-800">
              {products.map((product) => (
                <tr
                  key={product._id}
                  className="hover:bg-white/5 transition-colors duration-300"
                >
                  
                  {/* IMAGE */}
                  <td className="p-5 whitespace-nowrap">
                    <div className="w-16 h-16 bg-black border border-gray-800 rounded-sm overflow-hidden p-1 flex items-center justify-center">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="max-w-full max-h-full object-contain"
                      />
                    </div>
                  </td>

                  {/* NAME */}
                  <td className="p-5 whitespace-nowrap">
                    <span className="text-gray-200 font-serif font-medium text-lg">
                      {product.name}
                    </span>
                  </td>

                  {/* BRAND */}
                  <td className="p-5 whitespace-nowrap text-center text-gray-400 uppercase tracking-widest text-xs">
                    {product.brand}
                  </td>

                  {/* CATEGORY */}
                  <td className="p-5 whitespace-nowrap text-center text-gray-400 uppercase tracking-widest text-xs">
                    {product.category}
                  </td>

                  {/* PRICE */}
                  <td className="p-5 whitespace-nowrap text-right">
                    <span className="text-[#D4AF37] font-bold tracking-wider">
                      ${product.price?.toLocaleString()}
                    </span>
                  </td>

                  {/* STOCK / STATUS BADGE */}
                  <td className="p-5 whitespace-nowrap text-center">
                    <span
                      className={`inline-block px-3 py-1 rounded-sm text-xs font-bold uppercase tracking-widest border ${
                        product.stock > 0
                          ? "bg-green-950/30 text-green-500 border-green-500/50"
                          : "bg-red-950/30 text-red-500 border-red-500/50"
                      }`}
                    >
                      {product.stock > 0 ? `${product.stock} In Stock` : "Out of Stock"}
                    </span>
                  </td>

                  {/* ACTIONS */}
                  <td className="p-5 whitespace-nowrap text-right">
                    <div className="flex items-center justify-end gap-4">
                      <button className="text-[#D4AF37] hover:text-[#b5952f] uppercase tracking-widest text-xs font-bold transition-colors">
                        Edit
                      </button>
                      <button className="text-red-500 hover:text-red-400 uppercase tracking-widest text-xs font-bold transition-colors">
                        Delete
                      </button>
                    </div>
                  </td>

                </tr>
              ))}
            </tbody>

          </table>
        </div>

        {/* EMPTY STATE */}
        {products.length === 0 && !loading && (
          <div className="p-10 text-center text-gray-500 tracking-widest uppercase text-sm">
            No products found in inventory.
          </div>
        )}

      </div>
    </div>
  );
}
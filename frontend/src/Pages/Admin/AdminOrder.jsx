import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllOrders,
  updateOrderStatus,
} from "../../Features/admin/adminOrderSlice.js";

export default function Orders() {
  const dispatch = useDispatch();

  const { orders, loading, error } = useSelector(
    (state) => state.adminOrders
  );

  useEffect(() => {
    dispatch(getAllOrders());
  }, [dispatch]);

  // 🟢 STATUS CHANGE HANDLER
  const handleStatusChange = (id, status) => {
    dispatch(updateOrderStatus({ id, status }));
  };

  // Helper function for status text colors
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "pending": return "text-yellow-500";
      case "paid": return "text-blue-400";
      case "shipped": return "text-purple-400";
      case "delivered": return "text-green-500";
      case "cancelled": return "text-red-500";
      default: return "text-gray-300";
    }
  };

  // 🟢 LOADING STATE
  if (loading) {
    return (
      <div className="h-full flex justify-center items-center py-20">
        <p className="text-[#D4AF37] animate-pulse text-xl font-serif tracking-widest uppercase">
          Loading Orders...
        </p>
      </div>
    );
  }

  return (
    <div className="w-full">
      
      {/* ================= HEADER ================= */}
      <div className="mb-8 border-b border-gray-800 pb-4">
        <h1 className="text-2xl md:text-3xl font-serif font-bold text-[#D4AF37] tracking-widest uppercase">
          Order Management
        </h1>
        <p className="text-gray-500 text-sm tracking-wide mt-2">
          Track, manage, and update customer orders.
        </p>
      </div>

      {/* ================= ERROR ================= */}
      {error && (
        <div className="bg-red-950/40 border border-red-500/50 text-red-200 p-4 rounded-sm mb-6 text-sm text-center">
          {error}
        </div>
      )}

      {/* ================= EMPTY STATE ================= */}
      {!loading && orders.length === 0 && (
        <div className="bg-[#0a0a0a] border border-gray-800 rounded-sm p-10 text-center">
          <p className="text-gray-500 tracking-widest uppercase text-sm">
            No orders found.
          </p>
        </div>
      )}

      {/* ================= ORDERS LIST ================= */}
      <div className="space-y-8">
        {orders.map((order) => (
          <div
            key={order._id}
            className="bg-[#0a0a0a] border border-[#D4AF37]/30 rounded-sm shadow-xl hover:border-[#D4AF37]/60 transition-colors duration-300 overflow-hidden"
          >
            
            {/* --- CARD HEADER (ID & STATUS) --- */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-black/50 p-6 border-b border-gray-800 gap-4">
              
              <div>
                <h2 className="text-[#D4AF37] text-xs uppercase tracking-[0.2em] font-bold mb-1">
                  Order Reference
                </h2>
                <p className="text-gray-300 font-mono text-sm tracking-wider">
                  #{order._id}
                </p>
              </div>

              <div className="flex items-center gap-4 w-full md:w-auto">
                <label className="text-xs text-gray-500 uppercase tracking-widest font-bold">
                  Status:
                </label>
                <div className="relative w-full md:w-40">
                  <select
                    value={order.status}
                    onChange={(e) => handleStatusChange(order._id, e.target.value)}
                    className={`w-full appearance-none bg-black border border-gray-700 px-4 py-2 rounded-sm focus:outline-none focus:border-[#D4AF37] uppercase tracking-widest text-xs font-bold cursor-pointer transition-colors shadow-sm ${getStatusColor(order.status)}`}
                  >
                    <option value="pending" className="text-yellow-500">Pending</option>
                    <option value="paid" className="text-blue-400">Paid</option>
                    <option value="shipped" className="text-purple-400">Shipped</option>
                    <option value="delivered" className="text-green-500">Delivered</option>
                    <option value="cancelled" className="text-red-500">Cancelled</option>
                  </select>
                  {/* Custom Dropdown Arrow */}
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </div>
                </div>
              </div>

            </div>

            {/* --- CARD BODY (DETAILS & ITEMS) --- */}
            <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
              
              {/* Left Column: Customer & Shipping Info */}
              <div className="space-y-6">
                
                {/* Account Details */}
                <div>
                  <h3 className="text-gray-500 text-xs uppercase tracking-widest mb-3 border-b border-gray-800 pb-2">
                    Account Details
                  </h3>
                  <p className="text-gray-200 text-sm mb-1">
                    <span className="text-gray-500 inline-block w-16">Name:</span> 
                    {order.userId?.name || "Guest"}
                  </p>
                  <p className="text-gray-200 text-sm">
                    <span className="text-gray-500 inline-block w-16">Email:</span> 
                    {order.userId?.email || "N/A"}
                  </p>
                </div>

                {/* Shipping Details */}
                <div>
                  <h3 className="text-gray-500 text-xs uppercase tracking-widest mb-3 border-b border-gray-800 pb-2">
                    Shipping Details
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-4">
                    <p className="text-gray-200 text-sm">
                      <span className="text-gray-500 block text-xs mb-0.5">Recipient</span> 
                      {order.customerInfo?.name || "N/A"}
                    </p>
                    <p className="text-gray-200 text-sm">
                      <span className="text-gray-500 block text-xs mb-0.5">Phone</span> 
                      {order.customerInfo?.phone || "N/A"}
                    </p>
                    <p className="text-gray-200 text-sm">
                      <span className="text-gray-500 block text-xs mb-0.5">City</span> 
                      {order.customerInfo?.city || "N/A"}
                    </p>
                    <p className="text-gray-200 text-sm">
                      <span className="text-gray-500 block text-xs mb-0.5">Address</span> 
                      {order.customerInfo?.address || "N/A"}
                    </p>
                  </div>
                </div>

              </div>

              {/* Right Column: Ordered Items */}
              <div>
                <h3 className="text-gray-500 text-xs uppercase tracking-widest mb-3 border-b border-gray-800 pb-2">
                  Order Summary ({order.items.length} items)
                </h3>
                <div className="space-y-3 max-h-[200px] overflow-y-auto pr-2 custom-scrollbar">
                  {order.items.map((item, index) => (
                    <div 
                      key={index}
                      className="flex justify-between items-center bg-black/40 border border-gray-800/60 p-3 rounded-sm"
                    >
                      <div className="flex flex-col">
                        <span className="text-gray-200 text-sm font-medium line-clamp-1">
                          {item.productId?.name || item.productId?._id || "Deleted product"}
                        </span>
                        <span className="text-gray-500 text-xs uppercase tracking-widest mt-1">
                          Qty: {item.quantity}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* --- CARD FOOTER (TOTAL) --- */}
            <div className="bg-black/50 p-6 border-t border-gray-800 flex justify-between items-center">
              <span className="text-gray-400 uppercase tracking-widest text-sm font-bold">
                Order Total
              </span>
              <h2 className="text-xl md:text-2xl font-bold text-[#D4AF37] tracking-wider">
                Rs. {order.totalAmount?.toLocaleString()}
              </h2>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}
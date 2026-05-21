import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMyOrders } from "../Features/orders/orderSlice";
import { Link } from "react-router-dom";

export default function MyOrders() {
  const dispatch = useDispatch();

  const { orders, loading } = useSelector((state) => state.orders);

  // 🟢 LOAD ORDERS
  useEffect(() => {
    dispatch(fetchMyOrders());
  }, [dispatch]);

  // 🟢 LOADING STATE
  if (loading) {
    return (
      <div className="min-h-[calc(100vh-80px)] bg-black flex justify-center items-center">
        <p className="text-[#D4AF37] animate-pulse text-xl font-serif tracking-widest uppercase">
          Loading Order History...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-80px)] bg-black text-gray-200 py-12 px-6 md:px-12 lg:px-24">
      
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-serif font-bold text-[#D4AF37] tracking-widest uppercase mb-10 border-b border-gray-800 pb-4">
          Order History
        </h1>

        {orders.length === 0 ? (
          
          <div className="flex flex-col items-center justify-center py-20 bg-[#0a0a0a] border border-gray-800 rounded-sm">
            <p className="text-gray-400 mb-6 tracking-widest uppercase text-center">
              You haven't placed any orders yet.
            </p>
            <Link 
              to="/shop" 
              className="border border-[#D4AF37] text-[#D4AF37] px-8 py-3 rounded-sm font-bold uppercase tracking-widest hover:bg-[#D4AF37] hover:text-black transition-all duration-300"
            >
              Start Shopping
            </Link>
          </div>

        ) : (
          
          <div className="space-y-10">
            {orders.map((order) => (
              <div
                key={order._id}
                className="bg-[#0a0a0a] border border-[#D4AF37]/30 rounded-sm shadow-xl hover:border-[#D4AF37]/60 transition-colors duration-300"
              >
                
                {/* ================= ORDER HEADER ================= */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-black/50 p-6 md:p-8 border-b border-gray-800">
                  <div className="mb-4 md:mb-0">
                    <h2 className="text-[#D4AF37] text-xs uppercase tracking-[0.2em] font-bold mb-1">
                      Order Reference
                    </h2>
                    <p className="text-gray-300 font-mono text-sm tracking-wider">
                      #{order._id}
                    </p>
                  </div>

                  <div>
                    <span className="inline-block bg-green-950/40 border border-green-500/50 text-green-400 px-4 py-1.5 rounded-sm uppercase tracking-widest text-xs font-bold shadow-[0_0_10px_rgba(34,197,94,0.1)]">
                      {order.status}
                    </span>
                  </div>
                </div>

                {/* ================= ORDER ITEMS ================= */}
                <div className="p-6 md:p-8 space-y-6">
                  {order.items.map((item) => (
                    <div
                      key={item._id}
                      className="flex flex-col sm:flex-row items-center sm:items-start gap-6 border-b border-gray-800/50 pb-6 last:border-0 last:pb-0"
                    >
                      {/* IMAGE */}
                      <div className="w-24 h-24 flex-shrink-0 bg-black border border-gray-800 rounded-sm overflow-hidden p-2">
                        <img
                          src={item.productId.image}
                          alt={item.productId.name}
                          className="w-full h-full object-contain"
                        />
                      </div>

                      {/* INFO */}
                      <div className="flex-1 text-center sm:text-left">
                        <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">
                          {item.productId.brand}
                        </p>
                        <h3 className="font-serif text-lg text-gray-200 mb-2 line-clamp-1">
                          {item.productId.name}
                        </h3>
                        <p className="text-gray-400 text-sm uppercase tracking-wider">
                          Qty: <span className="text-white">{item.quantity}</span>
                        </p>
                      </div>

                      {/* PRICE */}
                      <div className="text-[#D4AF37] font-bold text-lg tracking-wide mt-4 sm:mt-0">
                        ${(item.price * item.quantity).toLocaleString()}
                      </div>
                    </div>
                  ))}
                </div>

                {/* ================= ORDER TOTAL ================= */}
                <div className="bg-black/50 p-6 md:p-8 border-t border-gray-800 flex justify-between items-center">
                  <span className="text-gray-400 uppercase tracking-widest text-sm">
                    Order Total
                  </span>
                  <h2 className="text-2xl md:text-3xl font-bold text-[#D4AF37] tracking-wider">
                    ${order.totalAmount?.toLocaleString()}
                  </h2>
                </div>

              </div>
            ))}
          </div>
          
        )}
      </div>
    </div>
  );
}
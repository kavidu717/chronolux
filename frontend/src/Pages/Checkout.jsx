import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCart } from "../Features/cart/cartSlice";
import api from "../Services/api.js";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function Checkout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { cart, loading } = useSelector((state) => state.cart);
  const [isProcessing, setIsProcessing] = useState(false);

  const [form, setForm] = useState({
    name: "",
    address: "",
    city: "",
    phone: ""
  });

  // 🟢 LOAD CART
  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  // 🟢 HANDLE INPUT
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  // 💰 TOTAL PRICE
  const total = cart?.items?.reduce((sum, item) => {
      return sum + item.productId.price * item.quantity;
    }, 0) || 0;

  // 🚀 PLACE ORDER
  const handlePlaceOrder = async () => {
    // Basic validation
    if (!form.name || !form.address || !form.city || !form.phone) {
      toast.error("Please fill in all shipping details.", {
        style: { background: '#111', color: '#ef4444', border: '1px solid #ef4444' }
      });
      return;
    }

    setIsProcessing(true);
    try {
      const token = localStorage.getItem("token");

      const res = await api.post("/checkout", form, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      console.log("ORDER CREATED:", res.data);

      toast.success("Order placed successfully!", {
        style: { background: '#111', color: '#D4AF37', border: '1px solid #D4AF37' }
      });

      // 👉 go to orders page
      navigate("/my-orders");

    } catch (err) {
      console.log(err);
      toast.error("Failed to place order. Please try again.", {
        style: { background: '#111', color: '#ef4444', border: '1px solid #ef4444' }
      });
    } finally {
      setIsProcessing(false);
    }
  };

  // Loading State
  if (loading) {
    return (
      <div className="min-h-[calc(100vh-80px)] bg-black flex justify-center items-center">
        <p className="text-[#D4AF37] animate-pulse text-xl font-serif tracking-widest uppercase">
          Loading Checkout...
        </p>
      </div>
    );
  }

  // Empty Cart Fallback
  if (!cart || !cart.items?.length) {
    return (
      <div className="min-h-[calc(100vh-80px)] bg-black flex justify-center items-center flex-col">
        <p className="text-gray-400 mb-4 tracking-widest uppercase">No items to checkout.</p>
        <button 
          onClick={() => navigate('/shop')}
          className="text-[#D4AF37] hover:underline uppercase tracking-widest text-sm"
        >
          Return to Shop
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-80px)] bg-black text-gray-200 py-12 px-6 md:px-12 lg:px-24 flex flex-col lg:flex-row gap-12">
      
      {/* ================= LEFT: FORM ================= */}
      <div className="w-full lg:w-2/3">
        <h1 className="text-3xl md:text-4xl font-serif font-bold text-[#D4AF37] tracking-widest uppercase mb-10 border-b border-gray-800 pb-4">
          Shipping Details
        </h1>

        <div className="bg-[#0a0a0a] border border-gray-800 p-8 rounded-sm shadow-xl space-y-6">
          
          {/* NAME */}
          <div>
            <label className="block text-gray-400 text-sm tracking-wide mb-2 uppercase">Full Name</label>
            <input
              name="name"
              placeholder="Enter your full name"
              value={form.name}
              onChange={handleChange}
              className="w-full bg-black border border-gray-800 text-gray-200 px-4 py-3 rounded-sm focus:outline-none focus:border-[#D4AF37] transition-colors duration-300 placeholder-gray-700"
            />
          </div>

          {/* ADDRESS & CITY (Grid layout for larger screens) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-400 text-sm tracking-wide mb-2 uppercase">Street Address</label>
              <input
                name="address"
                placeholder="Enter your street address"
                value={form.address}
                onChange={handleChange}
                className="w-full bg-black border border-gray-800 text-gray-200 px-4 py-3 rounded-sm focus:outline-none focus:border-[#D4AF37] transition-colors duration-300 placeholder-gray-700"
              />
            </div>

            <div>
              <label className="block text-gray-400 text-sm tracking-wide mb-2 uppercase">City</label>
              <input
                name="city"
                placeholder="Enter your city"
                value={form.city}
                onChange={handleChange}
                className="w-full bg-black border border-gray-800 text-gray-200 px-4 py-3 rounded-sm focus:outline-none focus:border-[#D4AF37] transition-colors duration-300 placeholder-gray-700"
              />
            </div>
          </div>

          {/* PHONE */}
          <div>
            <label className="block text-gray-400 text-sm tracking-wide mb-2 uppercase">Phone Number</label>
            <input
              name="phone"
              placeholder="Enter your phone number"
              value={form.phone}
              onChange={handleChange}
              className="w-full bg-black border border-gray-800 text-gray-200 px-4 py-3 rounded-sm focus:outline-none focus:border-[#D4AF37] transition-colors duration-300 placeholder-gray-700"
            />
          </div>

        </div>
      </div>

      {/* ================= RIGHT: ORDER SUMMARY ================= */}
      <div className="w-full lg:w-1/3">
        <div className="bg-[#0a0a0a] border border-[#D4AF37]/30 p-8 rounded-sm lg:sticky top-24 shadow-2xl">
          
          <h2 className="text-xl font-serif text-[#D4AF37] tracking-widest uppercase mb-6 border-b border-gray-800 pb-4">
            Order Summary
          </h2>

          <div className="space-y-4 mb-6">
            {cart?.items?.map((item) => (
              <div key={item._id} className="flex justify-between items-center">
                <div className="flex flex-col">
                  <span className="font-serif text-gray-200 line-clamp-1">
                    {item.productId.name}
                  </span>
                  <span className="text-xs text-gray-500 uppercase tracking-widest">
                    Qty: {item.quantity}
                  </span>
                </div>
                <span className="text-gray-400 font-medium tracking-wider">
                  ${(item.productId.price * item.quantity).toLocaleString()}
                </span>
              </div>
            ))}
          </div>

          <div className="border-t border-gray-800 pt-6 mb-8">
            <div className="flex justify-between items-center">
              <span className="text-gray-200 font-bold uppercase tracking-wider text-lg">Total</span>
              <span className="text-[#D4AF37] font-bold text-3xl tracking-wider">
                ${total.toLocaleString()}
              </span>
            </div>
            <p className="text-right text-xs text-gray-500 mt-2 uppercase tracking-widest">
              Taxes and shipping included
            </p>
          </div>

          <button
            onClick={handlePlaceOrder}
            disabled={isProcessing}
            className="w-full bg-[#D4AF37] text-black py-4 rounded-sm font-bold uppercase tracking-widest hover:bg-[#b5952f] transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed flex justify-center items-center"
          >
            {isProcessing ? (
              <span className="animate-pulse">Processing...</span>
            ) : (
              "Confirm Order"
            )}
          </button>
          
          <p className="text-center text-xs text-gray-600 mt-6 tracking-wide flex items-center justify-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            Encrypted and secure payment
          </p>

        </div>
      </div>

    </div>
  );
}
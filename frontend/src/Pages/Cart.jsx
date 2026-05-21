import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchCart, removeFromCart } from "../Features/cart/cartSlice";
import { useNavigate } from "react-router-dom";

export default function Cart() {
    const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cart, loading } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  // Calculate Total Price
  

  // 1. Loading State
  if (loading) {
    return (
      <div className="min-h-[calc(100vh-80px)] bg-black flex justify-center items-center">
        <p className="text-[#D4AF37] animate-pulse text-xl font-serif tracking-widest uppercase">
          Loading Cart...
        </p>
      </div>
    );
  }

  // 2. Empty Cart State
  if (!cart || !cart.items?.length) {
    return (
      <div className="min-h-[calc(100vh-80px)] bg-black flex flex-col justify-center items-center px-4">
        <h1 className="text-3xl font-serif font-bold text-[#D4AF37] tracking-widest uppercase mb-4">
          Your Cart is Empty
        </h1>
        <p className="text-gray-400 mb-8 tracking-wide text-center">
          Looks like you haven't added any timepieces to your collection yet.
        </p>
        <Link 
          to="/shop" 
          className="bg-[#D4AF37] text-black px-8 py-3 rounded-sm font-bold uppercase tracking-widest hover:bg-[#b5952f] transition-all duration-300"
        >
          Explore Collection
        </Link>
      </div>
    );
  }

  // 3. Active Cart State
  return (
    <div className="min-h-[calc(100vh-80px)] bg-black text-gray-200 py-12 px-6 md:px-12 lg:px-24">
      
      <h1 className="text-3xl md:text-4xl font-serif font-bold text-[#D4AF37] tracking-widest uppercase mb-10">
        Shopping Bag
      </h1>

      <div className="flex flex-col lg:flex-row gap-10">
        
        {/* ================= LEFT: CART ITEMS ================= */}
        <div className="w-full lg:w-2/3 bg-[#0a0a0a] border border-gray-800 p-6 md:p-8 rounded-sm shadow-xl">
          
          <div className="hidden md:grid grid-cols-12 gap-4 text-xs text-gray-500 uppercase tracking-widest border-b border-gray-800 pb-4 mb-6">
            <div className="col-span-6">Product</div>
            <div className="col-span-2 text-center">Price</div>
            <div className="col-span-2 text-center">Quantity</div>
            <div className="col-span-2 text-right">Total</div>
          </div>

          <div className="space-y-6">
            {cart.items.map((item) => (
              <div
                key={item._id}
                className="flex flex-col md:grid md:grid-cols-12 gap-4 items-center border-b border-gray-800/50 pb-6 last:border-0 last:pb-0"
              >
                {/* Product Info */}
                <div className="col-span-6 flex items-center gap-6 w-full">
                  <div className="w-24 h-24 bg-black overflow-hidden flex-shrink-0 border border-gray-800">
                    <img
                      src={item.productId.image}
                      alt={item.productId.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex flex-col">
                    <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">
                      {item.productId.brand}
                    </p>
                    <h2 className="font-serif text-lg text-gray-200 hover:text-[#D4AF37] transition-colors duration-300 line-clamp-1">
                      {item.productId.name}
                    </h2>
                    
                    {/* Mobile Only Remove Button */}
                    <button
                      onClick={() => dispatch(removeFromCart(item.productId._id))}
                      className="md:hidden text-left text-sm text-red-500/80 hover:text-red-500 uppercase tracking-wider mt-3 transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                </div>

                {/* Price */}
                <div className="col-span-2 text-center hidden md:block text-gray-400">
                  ${item.productId.price?.toLocaleString()}
                </div>

                {/* Quantity */}
                <div className="col-span-2 text-center text-gray-300 font-medium">
                  <span className="md:hidden text-gray-500 text-sm mr-2 uppercase">Qty:</span>
                  {item.quantity}
                </div>

                {/* Item Total & Desktop Remove Button */}
                <div className="col-span-2 flex flex-col items-end w-full md:w-auto mt-4 md:mt-0">
                  <p className="text-[#D4AF37] font-bold text-lg tracking-wide mb-2">
                    ${(item.productId.price * item.quantity).toLocaleString()}
                  </p>
                  <button
                    onClick={() => dispatch(removeFromCart(item.productId._id))}
                    className="hidden md:block text-xs text-red-500/60 hover:text-red-500 uppercase tracking-widest transition-colors"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ================= RIGHT: ORDER SUMMARY ================= */}
        <div className="w-full lg:w-1/3">
          <div className="bg-[#0a0a0a] border border-[#D4AF37]/30 p-8 rounded-sm lg:sticky top-24 shadow-2xl">
           
            
            <div className="space-y-4 mb-6 text-sm tracking-wide">
             
             
            
            </div>

            <div className="border-t border-gray-800 pt-6 mb-8">
            
            </div>

            <button
              onClick={() => navigate("/checkout")}
             className="w-full bg-[#D4AF37] text-black py-4 rounded-sm font-bold uppercase tracking-widest hover:bg-[#b5952f] transition-all duration-300">
              Proceed to Checkout
            </button>
            
            <p className="text-center text-xs text-gray-500 mt-4 tracking-wide">
              Secure checkout. Free global shipping on all orders.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
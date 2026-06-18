import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import api from "../Services/api.js";
import { addToCart } from "../Features/cart/cartSlice";

const HomePage = () => {
  const [newArrivals, setNewArrivals] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchNewArrivals = async () => {
      try {
        setLoading(true);
        // Explicitly using params to ensure backend picks up limit/sort
        const res = await api.get("/products", { 
          params: { limit: 8, sort: "newest" } 
        });
        setNewArrivals(res.data);
      } catch (err) {
        console.error("Error fetching arrivals:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchNewArrivals();
  }, []);

  const handleAddToCart = async (event, productId) => {
    event.stopPropagation();
    if (!token) {
      toast.error("Please login first");
      navigate("/login");
      return;
    }
    try {
      await dispatch(addToCart({ productId, quantity: 1 })).unwrap();
      toast.success("Added to cart");
    } catch (error) {
      toast.error(error?.message || "Failed to add item");
    }
  };

  return (
    // max-w-7xl centers the content on large screens
    <div className="p-8 bg-black min-h-screen text-white flex flex-col items-center">
      <div className="w-full max-w-7xl">
        <h1 className="text-4xl font-bold mb-10 text-center text-[#D4AF37]">Welcome to Watch Cell</h1>

        <section>
          <div className="flex justify-between items-end mb-6">
            <h2 className="text-2xl font-semibold text-[#D4AF37]">New Arrivals</h2>
            {/* Alternative to pagination: a link to the full shop */}
            <button 
              onClick={() => navigate('/shop')}
              className="text-gray-400 hover:text-[#D4AF37] underline transition-colors"
            >
              View All Products
            </button>
          </div>
          
          {loading ? (
            <p className="text-center text-gray-400">Loading...</p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {newArrivals.map((product) => (
                <div 
                  key={product._id} 
                  onClick={() => navigate(`/products/${product._id}`)}
                  className="bg-[#0a0a0a] border border-gray-800 hover:border-[#D4AF37]/50 cursor-pointer transition-all duration-300"
                >
                  <img src={product.image} className="h-64 w-full object-cover" alt={product.name} />
                  <div className="p-4">
                    <p className="text-xs text-gray-500 uppercase">{product.brand}</p>
                    <h2 className="text-white font-semibold">{product.name}</h2>
                    <p className="text-[#D4AF37] font-bold mt-2">Rs: {product.price?.toLocaleString()}</p>
                    
                    <button
                      onClick={(e) => handleAddToCart(e, product._id)}
                      className="w-full mt-3 border border-[#D4AF37] text-[#D4AF37] py-2 hover:bg-[#D4AF37] hover:text-black transition-all"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default HomePage;
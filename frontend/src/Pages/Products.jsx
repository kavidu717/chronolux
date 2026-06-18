import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { FaFilter, FaTimes } from "react-icons/fa";

import {
  fetchProducts,
  fetchFilters,
  setCategory,
  setBrand,
  setSearch
} from "../Features/products/productSlice";

import { addToCart } from "../Features/cart/cartSlice";

export default function Products() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const {
    products,
    categories,
    brands,
    loading,
    category,
    brand,
    search
  } = useSelector((state) => state.products);

  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchFilters());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [category, brand, search, dispatch]);

  const handleAddToCart = async (event, productId) => {
    event.stopPropagation();

    if (!token) {
      toast.error("Please login first");
      navigate("/login");
      return;
    }

    try {
      await dispatch(
        addToCart({ productId, quantity: 1 })
      ).unwrap();

      toast.success("Added to cart");
      navigate("/cart");

    } catch (error) {
      toast.error(error?.message || "Failed to add item");
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-8 px-6 md:px-12 py-12 bg-black min-h-[calc(100vh-80px)] text-gray-200">

      <button 
        onClick={() => setIsFilterOpen(true)}
        className="md:hidden flex items-center justify-center gap-2 w-full border border-[#D4AF37] text-[#D4AF37] py-3 uppercase tracking-widest"
      >
        <FaFilter /> Filter Products
      </button>

      <div className={`fixed inset-0 z-50 bg-black/90 transition-transform duration-300 ${isFilterOpen ? 'translate-x-0' : '-translate-x-full'} md:static md:translate-x-0 md:block md:w-1/4 lg:w-1/5 bg-[#0a0a0a] border-r border-[#D4AF37]/30 p-6 shadow-2xl`}>
        
        <div className="flex justify-between items-center mb-6 md:hidden">
          <h2 className="text-[#D4AF37] font-serif text-2xl uppercase">Filters</h2>
          <button onClick={() => setIsFilterOpen(false)}><FaTimes size={24} className="text-gray-400" /></button>
        </div>

        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => dispatch(setSearch(e.target.value))}
          className="w-full bg-black border border-gray-800 text-gray-200 px-4 py-3 rounded-sm mb-8"
        />

        <div className="mb-8">
          <h3 className="text-sm text-gray-500 uppercase mb-4">Category</h3>
          <div className="flex flex-col space-y-3">
            {["", ...categories].map((cat) => (
              <button
                key={cat}
                onClick={() => dispatch(setCategory(cat))}
                className={`text-sm uppercase tracking-wider flex items-center gap-2 ${
                  category === cat ? "text-[#D4AF37] font-bold" : "text-gray-400"
                }`}
              >
                {category === cat && <span className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full"></span>}
                {cat === "" ? "All Categories" : cat}
              </button>
            ))}
          </div>
        </div>

        <div className="w-full h-px bg-gray-800 my-6"></div>

        <div>
          <h3 className="text-sm text-gray-500 uppercase mb-4">Brand</h3>
          <div className="flex flex-col space-y-3">
            {["", ...brands].map((br) => (
              <button
                key={br}
                onClick={() => dispatch(setBrand(br))}
                className={`text-sm uppercase tracking-wider flex items-center gap-2 ${
                  brand === br ? "text-[#D4AF37] font-bold" : "text-gray-400"
                }`}
              >
                {brand === br && <span className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full"></span>}
                {br === "" ? "All Brands" : br}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="w-full md:w-3/4 lg:w-4/5">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <p className="text-[#D4AF37] animate-pulse text-xl uppercase">Loading...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <div
                key={product._id}
                onClick={() => navigate(`/products/${product._id}`)}
                className="bg-[#0a0a0a] border border-gray-800 hover:border-[#D4AF37]/50 cursor-pointer"
              >
                <img src={product.image} className="h-64 w-full object-cover" />
                <div className="p-4">
                  <p className="text-xs text-gray-500 uppercase">{product.brand}</p>
                  <h2 className="text-white font-semibold">{product.name}</h2>
                  <p className="text-[#D4AF37] font-bold mt-2">Rs: {product.price?.toLocaleString()}</p>
                  <button
                    onClick={(e) => handleAddToCart(e, product._id)}
                    className="w-full mt-3 border border-[#D4AF37] text-[#D4AF37] py-2 hover:bg-[#D4AF37] hover:text-black"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && products.length === 0 && (
          <div className="text-center mt-20">
            <p className="text-gray-400 mb-4">No products found</p>
            <button
              onClick={() => {
                dispatch(setSearch(""));
                dispatch(setCategory(""));
                dispatch(setBrand(""));
              }}
              className="text-[#D4AF37] underline"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
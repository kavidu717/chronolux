import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  fetchProducts,
  setCategory,
  setBrand,
  setSearch
} from "../Features/products/productSlice";
import { addToCart } from "../Features/cart/cartSlice";

export default function Products() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { products, loading, category, brand, search } = useSelector(
    (state) => state.products
  );
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [category, brand, search, dispatch]);

  const handleAddToCart = async (event, productId) => {
    // Prevent the click from bubbling up and triggering the card's navigate event
    event.stopPropagation();

    if (!token) {
      toast.error("Please login first", {
        style: { background: '#111', color: '#ef4444', border: '1px solid #ef4444' }
      });
      navigate("/login");
      return;
    }

    try {
      await dispatch(
        addToCart({
          productId,
          quantity: 1
        })
      ).unwrap();

      toast.success("Added to cart", {
        style: { background: '#111', color: '#D4AF37', border: '1px solid #D4AF37' }
      });
      navigate("/cart");
    } catch (error) {
      toast.error(error?.message || "Failed to add item to cart", {
        style: { background: '#111', color: '#ef4444', border: '1px solid #ef4444' }
      });
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-8 px-6 md:px-12 py-12 bg-black min-h-[calc(100vh-80px)] text-gray-200">
      
      {/* ================= LEFT FILTER SIDEBAR ================= */}
      <div className="w-full md:w-1/4 lg:w-1/5 bg-[#0a0a0a] border border-[#D4AF37]/30 p-6 rounded-sm h-fit md:sticky top-24 shadow-2xl">
        <h2 className="text-[#D4AF37] font-serif text-2xl tracking-widest uppercase mb-6">
          Filters
        </h2>

        {/* SEARCH */}
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => dispatch(setSearch(e.target.value))}
          className="w-full bg-black border border-gray-800 text-gray-200 px-4 py-3 rounded-sm focus:outline-none focus:border-[#D4AF37] transition-colors duration-300 placeholder-gray-700 mb-8"
        />

        {/* CATEGORY */}
        <div className="mb-8">
          <h3 className="font-bold tracking-wider text-sm text-gray-500 uppercase mb-4">
            Category
          </h3>
          <div className="flex flex-col items-start space-y-3">
            {["", "luxury", "sport"].map((cat) => (
              <button
                key={cat}
                onClick={() => dispatch(setCategory(cat))}
                className={`uppercase tracking-wider text-sm transition-all duration-300 hover:text-[#D4AF37] flex items-center gap-2 ${
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

        {/* BRAND */}
        <div>
          <h3 className="font-bold tracking-wider text-sm text-gray-500 uppercase mb-4">
            Brand
          </h3>
          <div className="flex flex-col items-start space-y-3">
            {["", "Rolex", "Casio"].map((br) => (
              <button
                key={br}
                onClick={() => dispatch(setBrand(br))}
                className={`uppercase tracking-wider text-sm transition-all duration-300 hover:text-[#D4AF37] flex items-center gap-2 ${
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

      {/* ================= RIGHT PRODUCTS GRID ================= */}
      <div className="w-full md:w-3/4 lg:w-4/5">
        
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <p className="text-[#D4AF37] animate-pulse text-xl font-serif tracking-widest uppercase">
              Loading Collection...
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <div
                key={product._id}
                onClick={() => navigate(`/products/${product._id}`)}
                className="bg-[#0a0a0a] border border-gray-800 hover:border-[#D4AF37]/50 rounded-sm overflow-hidden flex flex-col group transition-all duration-300 shadow-lg cursor-pointer"
              >
                {/* Product Image Area - FULL SPACE */}
                <div className="overflow-hidden bg-black h-64 w-full relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
                  />
                </div>

                {/* Product Info */}
                <div className="p-5 flex flex-col flex-grow">
                  <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">
                    {product.brand}
                  </p>
                  <h2 className="font-serif text-lg text-gray-200 mb-2 line-clamp-1 group-hover:text-[#D4AF37] transition-colors duration-300">
                    {product.name}
                  </h2>
                  <p className="text-[#D4AF37] font-bold text-xl tracking-wider mt-auto mb-5">
                    ${product.price?.toLocaleString()}
                  </p>

                  {/* Add to Cart Button */}
                  <button
                    onClick={(event) => handleAddToCart(event, product._id)}
                    className="w-full border border-[#D4AF37] text-[#D4AF37] py-2.5 rounded-sm uppercase tracking-widest text-sm font-bold hover:bg-[#D4AF37] hover:text-black transition-all duration-300"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State Handle */}
        {!loading && products.length === 0 && (
          <div className="flex flex-col items-center justify-center h-64 text-center">
            <p className="text-gray-400 text-lg mb-4">No timepieces found matching your criteria.</p>
            <button 
              onClick={() => { dispatch(setSearch("")); dispatch(setCategory("")); dispatch(setBrand("")); }}
              className="text-[#D4AF37] hover:underline tracking-widest uppercase text-sm"
            >
              Clear all filters
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
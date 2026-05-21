import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../Services/api.js";

export default function ProductDetails() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await api.get(`/products/${id}`);
        console.log("PRODUCT:", res.data); // ✔ check console
        setProduct(res.data);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  // Luxury Loading State
  if (loading) {
    return (
      <div className="min-h-[calc(100vh-80px)] bg-black flex justify-center items-center">
        <p className="text-[#D4AF37] animate-pulse text-xl font-serif tracking-widest uppercase">
          Loading Details...
        </p>
      </div>
    );
  }

  // Error / Not Found State
  if (!product) {
    return (
      <div className="min-h-[calc(100vh-80px)] bg-black flex justify-center items-center">
        <p className="text-gray-400 text-lg uppercase tracking-widest">
          No product found.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-80px)] bg-black text-gray-200 py-12 px-6 md:px-12 lg:px-24 flex justify-center">
      <div className="max-w-6xl w-full flex flex-col md:flex-row gap-12 lg:gap-20">
        
        {/* IMAGE SECTION */}
        <div className="w-full md:w-1/2 bg-[#0a0a0a] border border-gray-800 rounded-sm overflow-hidden relative group shadow-2xl">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-[400px] md:h-[600px] object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
          />
        </div>

        {/* INFO SECTION */}
        <div className="w-full md:w-1/2 flex flex-col justify-center">
          
          <p className="text-[#D4AF37] uppercase tracking-widest text-sm font-bold mb-3">
            {product.brand}
          </p>
          
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-100 mb-4 leading-tight">
            {product.name}
          </h1>
          
          <p className="text-3xl font-medium text-[#D4AF37] tracking-wider mb-6">
            ${product.price?.toLocaleString()}
          </p>

          <div className="w-full h-px bg-gray-800 mb-8"></div>
          
          <div className="mb-8">
            <h3 className="text-sm uppercase tracking-wider text-gray-500 font-bold mb-3">
              Description
            </h3>
            <p className="text-gray-400 leading-relaxed">
              {product.description}
            </p>
          </div>

          <div className="mb-10 text-sm uppercase tracking-wider font-bold">
            <span className="text-gray-500 mr-3">Availability:</span>
            {product.stock > 0 ? (
              <span className="text-[#D4AF37]">{product.stock} in stock</span>
            ) : (
              <span className="text-red-500">Out of Stock</span>
            )}
          </div>

          <button 
            disabled={product.stock === 0}
            className="w-full md:w-auto bg-[#D4AF37] text-black px-10 py-4 rounded-sm font-bold uppercase tracking-widest hover:bg-[#b5952f] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {product.stock > 0 ? "Add to Cart" : "Out of Stock"}
          </button>

        </div>
      </div>
    </div>
  );
}
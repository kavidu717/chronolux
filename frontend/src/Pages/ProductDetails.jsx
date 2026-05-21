import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../Services/api.js";
import { addToCart } from "../Features/cart/cartSlice";

export default function ProductDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await api.get(`/products/${id}`);
        setProduct(res.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
    if (!token) {
      toast.error("Please login first");
      navigate("/login");
      return;
    }

    try {
      await dispatch(
        addToCart({
          productId: product._id,
          quantity: 1
        })
      ).unwrap();

      toast.success("Added to cart");
      navigate("/cart");
    } catch (error) {
      toast.error(error?.message || "Failed to add item to cart");
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[calc(100vh-80px)] items-center justify-center bg-black">
        <p className="animate-pulse font-serif text-xl uppercase tracking-widest text-[#D4AF37]">
          Loading Details...
        </p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex min-h-[calc(100vh-80px)] items-center justify-center bg-black">
        <p className="text-lg uppercase tracking-widest text-gray-400">
          No product found.
        </p>
      </div>
    );
  }

  return (
    <div className="flex min-h-[calc(100vh-80px)] justify-center bg-black px-6 py-12 text-gray-200 md:px-12 lg:px-24">
      <div className="flex w-full max-w-6xl flex-col gap-12 md:flex-row lg:gap-20">
        <div className="group relative w-full overflow-hidden rounded-sm border border-gray-800 bg-[#0a0a0a] shadow-2xl md:w-1/2">
          <img
            src={product.image}
            alt={product.name}
            className="h-[400px] w-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-105 md:h-[600px]"
          />
        </div>

        <div className="flex w-full flex-col justify-center md:w-1/2">
          <p className="mb-3 text-sm font-bold uppercase tracking-widest text-[#D4AF37]">
            {product.brand}
          </p>

          <h1 className="mb-4 font-serif text-4xl font-bold leading-tight text-gray-100 md:text-5xl">
            {product.name}
          </h1>

          <p className="mb-6 text-3xl font-medium tracking-wider text-[#D4AF37]">
            ${product.price?.toLocaleString()}
          </p>

          <div className="mb-8 h-px w-full bg-gray-800"></div>

          <div className="mb-8">
            <h3 className="mb-3 text-sm font-bold uppercase tracking-wider text-gray-500">
              Description
            </h3>
            <p className="leading-relaxed text-gray-400">{product.description}</p>
          </div>

          <div className="mb-10 text-sm font-bold uppercase tracking-wider">
            <span className="mr-3 text-gray-500">Availability:</span>
            {product.stock > 0 ? (
              <span className="text-[#D4AF37]">{product.stock} in stock</span>
            ) : (
              <span className="text-red-500">Out of Stock</span>
            )}
          </div>

          <button
            disabled={product.stock === 0}
            onClick={handleAddToCart}
            className="w-full rounded-sm bg-[#D4AF37] px-10 py-4 font-bold uppercase tracking-widest text-black transition-all duration-300 hover:bg-[#b5952f] disabled:cursor-not-allowed disabled:opacity-50 md:w-auto"
          >
            {product.stock > 0 ? "Add to Cart" : "Out of Stock"}
          </button>
        </div>
      </div>
    </div>
  );
}

import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../Services/api.js";

export default function Checkout() {
  const navigate = useNavigate();
  const { cart } = useSelector((state) => state.cart);
  const { token } = useSelector((state) => state.auth);

  const [form, setForm] = useState({
    name: "",
    address: "",
    city: "",
    phone: ""
  });
  const [loading, setLoading] = useState(false);

  const total = useMemo(() => {
    if (!cart?.items?.length) {
      return 0;
    }

    return cart.items.reduce(
      (sum, item) => sum + item.productId.price * item.quantity,
      0
    );
  }, [cart]);

  const handleChange = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value
    });
  };

  const handlePay = async () => {
    if (!token) {
      toast.error("Please login first");
      navigate("/login");
      return;
    }

    if (!cart?.items?.length) {
      toast.error("Your cart is empty");
      navigate("/cart");
      return;
    }

    if (!form.name || !form.address || !form.city || !form.phone) {
      toast.error("Please fill in all checkout fields");
      return;
    }

    try {
      setLoading(true);

      const res = await api.post(
        "/payment/create-checkout-session",
        { customerInfo: form },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (!res.data?.url) {
        throw new Error("Checkout session URL was not returned");
      }

      window.location.href = res.data.url;
    } catch (error) {
      toast.error(
        error.response?.data?.message || error.message || "Checkout failed"
      );
      setLoading(false);
    }
  };

  return (
    <main className="min-h-[calc(100vh-80px)] bg-black px-6 py-12 text-gray-200 md:px-12 lg:px-24">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1fr_380px]">
        <section className="rounded-sm border border-gray-800 bg-[#0a0a0a] p-8 shadow-2xl">
          <p className="text-sm uppercase tracking-[0.3em] text-[#D4AF37]">
            Checkout
          </p>
          <h1 className="mt-3 text-3xl font-serif font-bold text-white md:text-4xl">
            Delivery Information
          </h1>

          <div className="mt-8 grid gap-5">
            <input
              name="name"
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
              className="w-full rounded-sm border border-gray-800 bg-black px-4 py-3 text-gray-200 placeholder-gray-600 focus:border-[#D4AF37] focus:outline-none"
            />

            <input
              name="address"
              placeholder="Address"
              value={form.address}
              onChange={handleChange}
              className="w-full rounded-sm border border-gray-800 bg-black px-4 py-3 text-gray-200 placeholder-gray-600 focus:border-[#D4AF37] focus:outline-none"
            />

            <div className="grid gap-5 md:grid-cols-2">
              <input
                name="city"
                placeholder="City"
                value={form.city}
                onChange={handleChange}
                className="w-full rounded-sm border border-gray-800 bg-black px-4 py-3 text-gray-200 placeholder-gray-600 focus:border-[#D4AF37] focus:outline-none"
              />

              <input
                name="phone"
                placeholder="Phone"
                value={form.phone}
                onChange={handleChange}
                className="w-full rounded-sm border border-gray-800 bg-black px-4 py-3 text-gray-200 placeholder-gray-600 focus:border-[#D4AF37] focus:outline-none"
              />
            </div>
          </div>
        </section>

        <aside className="rounded-sm border border-[#D4AF37]/30 bg-[#0a0a0a] p-8 shadow-2xl">
          <h2 className="text-lg font-bold uppercase tracking-[0.25em] text-[#D4AF37]">
            Order Summary
          </h2>

          <div className="mt-6 space-y-4">
            {cart?.items?.map((item) => (
              <div
                key={item._id}
                className="flex items-center justify-between gap-4 border-b border-gray-800 pb-4"
              >
                <div>
                  <p className="font-medium text-white">{item.productId.name}</p>
                  <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                </div>
                <p className="font-medium text-[#D4AF37]">
                  ${(item.productId.price * item.quantity).toLocaleString()}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-6 border-t border-gray-800 pt-6">
            <div className="flex items-center justify-between text-lg font-semibold">
              <span>Total</span>
              <span className="text-[#D4AF37]">${total.toLocaleString()}</span>
            </div>
          </div>

          <button
            onClick={handlePay}
            disabled={loading}
            className="mt-8 w-full rounded-sm bg-[#D4AF37] py-4 font-bold uppercase tracking-widest text-black transition-colors hover:bg-[#b5952f] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Processing..." : "Pay Now"}
          </button>
        </aside>
      </div>
    </main>
  );
}

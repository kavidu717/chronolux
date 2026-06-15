import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../Services/api.js";

export default function PaymentSuccess() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState("processing");
  const [message, setMessage] = useState("Processing payment...");

  useEffect(() => {
    const sessionId = params.get("session_id");
    const token = localStorage.getItem("token");

    const saveOrder = async () => {
      if (!token) {
        setStatus("error");
        setMessage("Please login again to complete payment confirmation.");
        return;
      }

      if (!sessionId) {
        setStatus("error");
        setMessage("Payment session ID is missing.");
        return;
      }

      try {
        const res = await api.post(
          "/payment/success",
          { sessionId },
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        const orderId = res.data?.order?._id;

        if (orderId) {
          window.open(`/api/invoice/${orderId}`, "_blank");
        }

        setStatus("success");
        setMessage("Payment confirmed. Your order has been created.");
        toast.success("Payment successful");
      } catch (error) {
        setStatus("error");
        setMessage(
          error.response?.data?.message ||
            "Could not confirm the payment on the server."
        );
      }
    };

    saveOrder();
  }, [params]);

  return (
    <main className="flex min-h-[calc(100vh-80px)] items-center justify-center bg-black px-6 text-gray-200">
      <div className="w-full max-w-2xl rounded-sm border border-[#D4AF37]/30 bg-[#0a0a0a] p-10 text-center shadow-2xl">
        <p className="text-sm uppercase tracking-[0.3em] text-[#D4AF37]">
          Payment Status
        </p>
        <h1 className="mt-4 text-3xl font-serif font-bold text-white md:text-4xl">
          {status === "success"
            ? "Order Confirmed"
            : status === "error"
              ? "Payment Error"
              : "Processing Payment"}
        </h1>
        <p className="mt-6 text-base text-gray-400">{message}</p>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
          {status === "success" ? (
            <Link
              to="/shop"
              className="rounded-sm bg-[#D4AF37] px-6 py-3 font-medium text-black"
            >
              Continue Shopping
            </Link>
          ) : (
            <button
              onClick={() => navigate("/checkout")}
              className="rounded-sm bg-[#D4AF37] px-6 py-3 font-medium text-black"
            >
              Return to Checkout
            </button>
          )}

          <Link
            to="/cart"
            className="rounded-sm border border-white/20 px-6 py-3 font-medium text-white"
          >
            View Cart
          </Link>
        </div>
      </div>
    </main>
  );
}

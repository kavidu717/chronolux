import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../Features/auth/authSlice";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, token } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

   const handleSubmit = async (e) => {

  e.preventDefault();

  const res = await dispatch(
    login(formData)
  );

  // 🟢 LOGIN SUCCESS
  if (res.payload?.user) {

    // 🟢 ADMIN LOGIN
    if (res.payload.user.role === "admin") {

      toast.success("Welcome Admin", {
        style: {
          background: "#111",
          color: "#D4AF37",
          border: "1px solid #D4AF37"
        }
      });

      navigate("/admin");

    }

    // 🟢 NORMAL USER LOGIN
    else {

      toast.success("Login successful", {
        style: {
          background: "#111",
          color: "#D4AF37",
          border: "1px solid #D4AF37"
        }
      });

      navigate("/");

    }

  }

};
  

  // 🎯 SUCCESS LOGIN
  useEffect(() => {
    if (token) {
      toast.success("Login successful", {
        style: {
          background: '#111',
          color: '#D4AF37',
          border: '1px solid #D4AF37'
        }
      });
      navigate("/");
    }
  }, [token, navigate]);

  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-80px)] bg-black px-4 py-12">
      
      <form
        onSubmit={handleSubmit}
        className="bg-[#0a0a0a] border border-[#D4AF37]/30 p-8 md:p-10 rounded-sm shadow-2xl w-full max-w-md"
      >
        <h1 className="text-3xl font-serif font-bold mb-8 text-center text-[#D4AF37] tracking-widest uppercase">
          Luxe Watches
        </h1>

        {/* ERROR MESSAGE */}
        {error && (
          <div className="bg-red-950/40 border border-red-500/50 text-red-200 p-3 rounded-sm mb-6 text-sm text-center">
            {error}
          </div>
        )}

        <div className="space-y-5 mb-8">
          {/* EMAIL */}
          <div>
            <label className="block text-gray-400 text-sm tracking-wide mb-2">Email Address</label>
            <input
              name="email"
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-black border border-gray-800 text-gray-200 px-4 py-3 rounded-sm focus:outline-none focus:border-[#D4AF37] transition-colors duration-300 placeholder-gray-700"
            />
          </div>

          {/* PASSWORD */}
          <div>
            <label className="block text-gray-400 text-sm tracking-wide mb-2">Password</label>
            <input
              name="password"
              type="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              className="w-full bg-black border border-gray-800 text-gray-200 px-4 py-3 rounded-sm focus:outline-none focus:border-[#D4AF37] transition-colors duration-300 placeholder-gray-700"
            />
          </div>
        </div>

        {/* SUBMIT BUTTON */}
        <button
          disabled={loading}
          className="w-full bg-[#D4AF37] text-black py-3 rounded-sm font-bold uppercase tracking-widest hover:bg-[#b5952f] transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? "Authenticating..." : "Login"}
        </button>

        {/* REGISTER LINK */}
        <div className="mt-8 text-center text-sm text-gray-400">
          Don't have an account?{" "}
          <Link to="/register" className="text-[#D4AF37] hover:text-[#b5952f] hover:underline transition-colors duration-300">
            Register
          </Link>
        </div>

      </form>
    </div>
  );
}
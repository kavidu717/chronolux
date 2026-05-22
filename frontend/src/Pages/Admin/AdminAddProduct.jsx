import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createProduct } from "../../Features/admin/adminProductSlice.js";
import toast from "react-hot-toast";

const AddProduct = () => {
  const dispatch = useDispatch();

  const { loading, success, error } = useSelector(
    (state) => state.adminProducts
  );

  const [form, setForm] = useState({
    name: "",
    brand: "",
    price: "",
    description: "",
    stock: "",
    category: "",
  });

  const [image, setImage] = useState(null);

  // 🎯 WATCH FOR SUCCESS OR ERROR TO SHOW TOAST
  useEffect(() => {
    if (success) {
      toast.success("Product added successfully!", {
        style: { background: '#111', color: '#D4AF37', border: '1px solid #D4AF37' }
      });
      
      // Clear the form after successful submission
      setForm({
        name: "",
        brand: "",
        price: "",
        description: "",
        stock: "",
        category: "",
      });
      setImage(null);
    }

    if (error) {
      toast.error(error, {
        style: { background: '#111', color: '#ef4444', border: '1px solid #ef4444' }
      });
    }
  }, [success, error]);

  // 🟢 handle input change
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // 🟢 submit form
  const handleSubmit = (e) => {
    e.preventDefault();

    // Image validation before dispatching
    if (!image) {
      toast.error("Please select a product image.", {
        style: { background: '#111', color: '#ef4444', border: '1px solid #ef4444' }
      });
      return;
    }

    const formData = new FormData();

    // 🔥 MongoDB fields (MATCH your schema exactly)
    formData.append("name", form.name);
    formData.append("brand", form.brand);
    formData.append("price", form.price);
    formData.append("description", form.description);
    formData.append("stock", form.stock);
    formData.append("category", form.category);
    formData.append("image", image);

    dispatch(createProduct(formData));
  };

  return (
    <div className="w-full max-w-3xl mx-auto py-8">
      
      <div className="mb-8 border-b border-gray-800 pb-4">
        <h1 className="text-2xl md:text-3xl font-serif font-bold text-[#D4AF37] tracking-widest uppercase">
          Add New Product
        </h1>
        <p className="text-gray-500 text-sm tracking-wide mt-2">
          Enter the details to add a new timepiece to the inventory.
        </p>
      </div>

      <div className="bg-[#0a0a0a] border border-[#D4AF37]/30 p-8 md:p-10 rounded-sm shadow-2xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Row 1: Name & Brand */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-400 text-sm tracking-wide mb-2 uppercase">Product Name</label>
              <input
                type="text"
                name="name"
                placeholder="e.g. Submariner Date"
                onChange={handleChange}
                value={form.name}
                required
                className="w-full bg-black border border-gray-800 text-gray-200 px-4 py-3 rounded-sm focus:outline-none focus:border-[#D4AF37] transition-colors duration-300 placeholder-gray-700"
              />
            </div>
            <div>
              <label className="block text-gray-400 text-sm tracking-wide mb-2 uppercase">Brand</label>
              <input
                type="text"
                name="brand"
                placeholder="e.g. Rolex"
                onChange={handleChange}
                value={form.brand}
                required
                className="w-full bg-black border border-gray-800 text-gray-200 px-4 py-3 rounded-sm focus:outline-none focus:border-[#D4AF37] transition-colors duration-300 placeholder-gray-700"
              />
            </div>
          </div>

          {/* Row 2: Price & Stock */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-400 text-sm tracking-wide mb-2 uppercase">Price ($)</label>
              <input
                type="number"
                name="price"
                placeholder="0.00"
                onChange={handleChange}
                value={form.price}
                required
                min="0"
                className="w-full bg-black border border-gray-800 text-gray-200 px-4 py-3 rounded-sm focus:outline-none focus:border-[#D4AF37] transition-colors duration-300 placeholder-gray-700"
              />
            </div>
            <div>
              <label className="block text-gray-400 text-sm tracking-wide mb-2 uppercase">Initial Stock</label>
              <input
                type="number"
                name="stock"
                placeholder="Enter quantity"
                onChange={handleChange}
                value={form.stock}
                required
                min="0"
                className="w-full bg-black border border-gray-800 text-gray-200 px-4 py-3 rounded-sm focus:outline-none focus:border-[#D4AF37] transition-colors duration-300 placeholder-gray-700"
              />
            </div>
          </div>

          {/* Category */}
          <div>
            <label className="block text-gray-400 text-sm tracking-wide mb-2 uppercase">Category</label>
            <input
              type="text"
              name="category"
              placeholder="e.g. luxury, sport, dress"
              onChange={handleChange}
              value={form.category}
              required
              className="w-full bg-black border border-gray-800 text-gray-200 px-4 py-3 rounded-sm focus:outline-none focus:border-[#D4AF37] transition-colors duration-300 placeholder-gray-700"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-gray-400 text-sm tracking-wide mb-2 uppercase">Description</label>
            <textarea
              name="description"
              placeholder="Enter product details..."
              onChange={handleChange}
              value={form.description}
              required
              rows="4"
              className="w-full bg-black border border-gray-800 text-gray-200 px-4 py-3 rounded-sm focus:outline-none focus:border-[#D4AF37] transition-colors duration-300 placeholder-gray-700 resize-none"
            />
          </div>

          {/* IMAGE UPLOAD */}
          <div>
            <label className="block text-gray-400 text-sm tracking-wide mb-2 uppercase">Product Image</label>
            <input
              type="file"
              accept="image/*"
              // The key forces React to re-render and clear the input when 'image' is reset to null
              key={image ? "has-image" : "no-image"}
              onChange={(e) => setImage(e.target.files[0])}
              required
              className="w-full text-gray-400 file:mr-4 file:py-3 file:px-6 file:rounded-sm file:border-0 file:text-sm file:font-bold file:uppercase file:tracking-widest file:bg-[#D4AF37] file:text-black hover:file:bg-[#b5952f] file:transition-colors file:cursor-pointer cursor-pointer border border-gray-800 bg-black rounded-sm"
            />
          </div>

          {/* SUBMIT BUTTON */}
          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-[#D4AF37] text-black py-4 rounded-sm font-bold uppercase tracking-widest hover:bg-[#b5952f] transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed mt-4 flex justify-center items-center"
          >
            {loading ? <span className="animate-pulse">Adding Product...</span> : "Add Product"}
          </button>

        </form>
      </div>
    </div>
  );
};

export default AddProduct;